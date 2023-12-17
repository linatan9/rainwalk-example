import { apiHooks, PetNameUpdate } from '@rainwalk/api';
import { captureException } from '@rainwalk/logging';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  Text,
  useToast,
  VStack,
} from 'native-base';
import type { FunctionComponent } from 'react';
import { useCallback } from 'react';
import type { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

interface UpdateYourPetNameModalProps {
  isOpen: boolean;
  onClose: () => unknown;
  petToUpdate: z.infer<typeof PetNameUpdate>;
}

const getInsuredPolicyKey = apiHooks.getKeyByPath('get', '/insured/policy/');
const getPaymentMethodsKey = apiHooks.getKeyByPath(
  'get',
  '/insured/payment/payment-method'
);

const UpdateYourPetNameModal: FunctionComponent<
  UpdateYourPetNameModalProps
> = ({ isOpen, onClose, petToUpdate }) => {
  const toast = useToast();
  const { mutate, isLoading } = apiHooks.usePut('/insured/pet/name/');
  const queryClient = useQueryClient();

  const invalidateDataWithPetNames = useCallback(() => {
    queryClient.invalidateQueries(getInsuredPolicyKey).catch(captureException);
    queryClient.invalidateQueries(getPaymentMethodsKey).catch(captureException);
  }, [queryClient]);

  const onSubmit = useCallback(
    (submittedValues: Parameters<typeof mutate>[0]) => {
      mutate(submittedValues, {
        onSuccess: () => {
          invalidateDataWithPetNames();
          onClose();
        },
        onError: (e) => {
          toast.show({
            title: 'Failed to pet name',
            description: e.message,
          });
        },
      });
    },
    [toast, mutate, invalidateDataWithPetNames, onClose]
  );

  const {
    errors: formErrors,
    handleChange,
    handleSubmit,
    values: formValues,
  } = useFormik<typeof petToUpdate>({
    enableReinitialize: true,
    initialValues: petToUpdate,
    onSubmit,
    validate: toFormikValidate(PetNameUpdate),
    validateOnChange: false,
  });

  return (
    <Modal avoidKeyboard isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Content>
        <Modal.Body>
          <VStack alignItems="center" space={4}>
            <Text
              color="rainwalkGray.400"
              fontSize={{ base: 'xl', sm: '2xl' }}
              fontWeight="bold"
            >
              Update your pet&apos;s name
            </Text>
            <FormControl
              isDisabled={isLoading}
              isInvalid={'pet_name' in formErrors}
              isRequired
            >
              <Input
                _input={{
                  color: 'rainwalkDarkBrown.400',
                  fontSize: 'md',
                }}
                defaultValue={formValues.pet_name}
                inputMode="text"
                maxLength={Number(PetNameUpdate.shape.pet_name.maxLength)}
                onChangeText={handleChange('pet_name')}
              />
              <HStack alignItems="center" justifyContent="space-between">
                <FormControl.ErrorMessage flex={1}>
                  {formErrors.pet_name}
                </FormControl.ErrorMessage>
                <Text
                  color="rainwalkGray.300"
                  fontSize={{ base: '2xs', sm: 'sm' }}
                  mt={1}
                  textAlign="right"
                  flex={1}
                >
                  Max Characters: {PetNameUpdate.shape.pet_name.maxLength}
                </Text>
              </HStack>
            </FormControl>
            <Button
              onPress={() => {
                handleSubmit();
              }}
              isLoading={isLoading}
            >
              Save
            </Button>
            <Button onPress={onClose} variant="outline" isDisabled={isLoading}>
              Cancel
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export type { UpdateYourPetNameModalProps };
export default UpdateYourPetNameModal;
