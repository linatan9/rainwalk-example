import type { Claim, PayoutMethodEnum } from '@rainwalk/api';
import { apiHooks, PostClaimBody } from '@rainwalk/api';
import { useAnalytic } from '@rainwalk/components/AnalyticProvider';
import ClaimsDocumentUpload from '@rainwalk/components/ClaimsDocumentUpload';
import type { SelectedMedia } from '@rainwalk/components/MediaSelector';
import PolicySelection from '@rainwalk/components/PolicySelection';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import {
  SelectedPolicyIDContext,
  SelectedPolicyIDUpdateContext,
} from '@rainwalk/contexts/SelectedPolicyID';
import { captureException } from '@rainwalk/logging';
import type { ClaimsStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  TextArea,
  useToast,
  VStack,
} from 'native-base';
import type { FunctionComponent } from 'react';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import type { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

interface SubmitClaimFormProps {
  claim?: z.infer<typeof Claim>;
  payoutMethod?: z.infer<typeof PayoutMethodEnum>;
}

const helpfulHints = [
  'Is this your first claim (or first claim in a while)? If so, our team may ' +
    'need up-to-date medical history, which you can request from your ' +
    "veterinarian. Please upload your pet's records here to get a faster " +
    'claims decision.',
  'A receipt from your veterinarian is required in order to submit a claim.',
  'If you are taking a picture, find a well-lit area and hold your device ' +
    'steady.',
];

const SubmitClaimForm: FunctionComponent<SubmitClaimFormProps> = ({
  claim,
  payoutMethod,
}) => {
  const { logEvent } = useAnalytic();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const toast = useToast();

  const readonly = claim !== undefined;
  const { data: { policies } = { policies: undefined } } =
    apiHooks.useGet('/insured/policy/');
  const { mutate, isLoading } = apiHooks.usePost('/insured/claim');

  const defaultPayoutMethod = 'Venmo';

  const onSuccess = () => {
    // invalidate insured/claims/search endpoint
    const key = apiHooks.getKeyByPath('get', '/insured/claim/search');
    queryClient.invalidateQueries(key).catch(captureException);
    navigation.navigate('BottomTabNavigator', {
      screen: 'ClaimsStack',
      params: {
        screen: 'SubmitClaimSuccessModal',
      },
    });
  };

  const onSubmit = (submittedValues: z.input<typeof PostClaimBody>) => {
    mutate(submittedValues, {
      onSuccess,
      onError: (e) => {
        captureException(e);
        toast.show({
          title: 'Failed to upload Claim',
          description: e.message,
        });
      },
    });
  };

  const {
    errors: formErrors,
    handleChange,
    handleSubmit,
    setFieldValue,
    values: formValues,
  } = useFormik<z.input<typeof PostClaimBody>>({
    enableReinitialize: true,
    initialValues: {
      condition_summary: claim?.condition_summary ?? '',
      condition_type: claim?.condition_type ?? '',
      payout_method: defaultPayoutMethod,
      pet: claim?.pet ?? '',
      policy: '',
      receipts:
        claim?.receipt_urls.map((url) => ({
          type: '',
          name: url.replace('receipts/', ''),
          size: 0,
          uri: url,
        })) ?? [],
      status: claim?.status ?? 'Open',
      treatment_cost: String(claim?.treatment_cost ?? ''),
      veterinarian_practice: String(claim?.veterinarian_practice ?? ''),
      veterinarian: claim?.veterinarian ?? '',
    },
    onSubmit,
    // @ts-expect-error toFormikValidate's type handling doesn't handle
    // transforms, despite them being perfectly safe to use. It's complaining
    // because, while the input for PostClaimBody.treatment_cost is a string,
    // the output is a number, but it only sees the output, which doesn't match
    // the type of formValues provided above in useFormik<z.input<typeof
    // PostClaimBody>>...
    validate: toFormikValidate(PostClaimBody),
    validateOnChange: false,
  });

  const selectPayoutMethod = useCallback(() => {
    navigation.navigate('BottomTabNavigator', {
      screen: 'ClaimsStack',
      params: {
        screen: 'ClaimPayoutSelectionModal',
        params: {
          payoutMethod: formValues.payout_method ?? defaultPayoutMethod,
        },
      },
    });
  }, [defaultPayoutMethod, formValues.payout_method, navigation]);

  const setReceiptsToUpload = (filesToUpload: SelectedMedia[]) => {
    setFieldValue('receipts', filesToUpload).catch(captureException);
  };

  const selectedPolicyID = useContext(SelectedPolicyIDContext);
  const selectedPolicy = useMemo(
    () => policies?.find((policy) => policy.id === selectedPolicyID),
    [policies, selectedPolicyID]
  );

  // Navigating to the SubmitClaim form with a payout method from the
  // ClaimPayoutSelectionModal signals that the form should be submitted
  useFocusEffect(
    useCallback(() => {
      if (payoutMethod === undefined) return;
      setFieldValue('payout_method', payoutMethod).catch(captureException);
      if (selectedPolicy) {
        logEvent('submitFormClaimButtonPressed', {
          petId: selectedPolicy.quote.pet.id,
        });
      }
      handleSubmit();
    }, [payoutMethod, setFieldValue, handleSubmit, logEvent, selectedPolicy])
  );

  // Changing the selected policy should update the form's policy and pet IDs.
  useEffect(() => {
    if (selectedPolicy === undefined || readonly) return;
    setFieldValue('policy', selectedPolicy.id).catch(captureException);
    setFieldValue('pet', selectedPolicy.quote.pet.id).catch(captureException);
  }, [readonly, selectedPolicy, setFieldValue]);

  // Viewing an existing claim needs to display the correct policy
  const updateSelectedPolicyID = useContext(SelectedPolicyIDUpdateContext);
  useEffect(() => {
    if (!readonly) return;
    updateSelectedPolicyID(claim.policy);
  }, [claim?.policy, readonly, updateSelectedPolicyID]);
  return (
    <RainwalkCard>
      <VStack space={3} alignItems="center" flex={1}>
        <Text fontWeight="bold" fontSize="xl" color="rainwalkDeepGreen.400">
          SUBMIT A CLAIM
        </Text>
        <PolicySelection w="full" policies={policies} />
        <FormControl
          isDisabled={isLoading}
          isInvalid={'receipts' in formErrors}
          isReadOnly={readonly}
          isRequired
        >
          <FormControl.Label
            _text={{ color: 'rainwalkDarkBrown.400', fontSize: 'md' }}
          >
            Helpful Hints
          </FormControl.Label>
          <VStack space={3}>
            {helpfulHints.map((hint) => (
              <HStack key={hint}>
                <Text mr={2}>{'\u2022'}</Text>
                <Text
                  color="rainwalkGray.400"
                  fontSize={{ base: 'sm', sm: 'md' }}
                >
                  {hint}
                </Text>
              </HStack>
            ))}
          </VStack>
          <ClaimsDocumentUpload
            key={formValues.receipts.length}
            filesToUpload={formValues.receipts}
            onChangeFilesToUpload={setReceiptsToUpload}
            readonly={readonly}
          />
          <FormControl.ErrorMessage>
            {formErrors.receipts}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isDisabled={isLoading}
          isInvalid={'condition_type' in formErrors}
          isReadOnly={readonly}
          isRequired
        >
          <FormControl.Label
            _text={{ color: 'rainwalkDarkBrown.400', fontSize: 'md' }}
          >
            Diagnosis
          </FormControl.Label>
          <TextArea
            _input={{
              color: 'rainwalkDarkBrown.400',
              fontSize: 'md',
            }}
            autoCompleteType={false}
            isInvalid={'condition_type' in formErrors}
            onChangeText={handleChange('condition_type')}
            value={formValues.condition_type}
            isReadOnly={readonly}
            w="full"
          />
          <FormControl.ErrorMessage>
            {formErrors.condition_type}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isDisabled={isLoading}
          isInvalid={'treatment_cost' in formErrors}
          isReadOnly={readonly}
          isRequired
        >
          <FormControl.Label
            _text={{ color: 'rainwalkDarkBrown.400', fontSize: 'md' }}
          >
            Treatment Cost
          </FormControl.Label>
          <Input
            inputMode="decimal"
            _input={{
              color: 'rainwalkDarkBrown.400',
              fontSize: 'md',
            }}
            onChangeText={(treatmentCostString) => {
              handleChange('treatment_cost')(
                // Only keep first match of a number, followed by an optional
                // decimal point, followed by up to two decimal places.
                /^\d*(?:\.\d{0,2})?/.exec(treatmentCostString)?.[0] ?? ''
              );
            }}
            value={formValues.treatment_cost}
            w="full"
          />
          <FormControl.ErrorMessage>
            {formErrors.treatment_cost}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isDisabled={isLoading}
          isInvalid={'veterinarian_practice' in formErrors}
          isReadOnly={readonly}
          isRequired
        >
          <FormControl.Label
            _text={{ color: 'rainwalkDarkBrown.400', fontSize: 'md' }}
          >
            Veterinarian Practice
          </FormControl.Label>
          <Input
            _input={{
              color: 'rainwalkDarkBrown.400',
              fontSize: 'md',
            }}
            onChangeText={handleChange('veterinarian_practice')}
            value={formValues.veterinarian_practice}
            w="full"
          />
          <FormControl.ErrorMessage>
            {formErrors.veterinarian_practice}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isDisabled={isLoading}
          isInvalid={'veterinarian' in formErrors}
          isReadOnly={readonly}
          isRequired
        >
          <FormControl.Label
            _text={{ color: 'rainwalkDarkBrown.400', fontSize: 'md' }}
          >
            Veterinarian
          </FormControl.Label>
          <Input
            _input={{
              color: 'rainwalkDarkBrown.400',
              fontSize: 'md',
            }}
            onChangeText={handleChange('veterinarian')}
            value={formValues.veterinarian}
            w="full"
          />
          <FormControl.ErrorMessage>
            {formErrors.veterinarian}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isDisabled={isLoading}
          isInvalid={'condition_summary' in formErrors}
          isRequired
        >
          <FormControl.Label
            _text={{ color: 'rainwalkDarkBrown.400', fontSize: 'md' }}
          >
            Tell us what happened
          </FormControl.Label>
          <TextArea
            _input={{
              color: 'rainwalkDarkBrown.400',
              fontSize: 'md',
            }}
            autoCompleteType={false}
            isInvalid={'condition_summary' in formErrors}
            onChangeText={handleChange('condition_summary')}
            value={formValues.condition_summary}
            isReadOnly={readonly}
            w="full"
          />
          <FormControl.ErrorMessage>
            {formErrors.condition_summary}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          mt="2"
          colorScheme="primary"
          onPress={selectPayoutMethod}
          isLoading={isLoading}
          isDisabled={readonly}
        >
          Submit Claim
        </Button>
        <Button
          colorScheme="primary"
          variant="outline"
          onPress={navigation.goBack}
          isDisabled={isLoading}
        >
          Back
        </Button>
      </VStack>
    </RainwalkCard>
  );
};

SubmitClaimForm.defaultProps = {
  claim: undefined,
  payoutMethod: undefined,
};

const SubmitClaim: FunctionComponent<ClaimsStackScreenProps<'SubmitClaim'>> = ({
  route,
}) => {
  const claimId =
    route.params !== undefined && 'claimId' in route.params
      ? route.params.claimId
      : undefined;
  const payoutMethod =
    route.params !== undefined && 'payoutMethod' in route.params
      ? route.params.payoutMethod
      : undefined;

  const { data: claim } =
    claimId !== undefined
      ? apiHooks.useGet('/insured/claim/:id', {
          params: {
            id: claimId,
          },
        })
      : { data: undefined };

  return (
    <ScreenLayout>
      <SubmitClaimForm claim={claim} payoutMethod={payoutMethod} />
    </ScreenLayout>
  );
};

export default SubmitClaim;
