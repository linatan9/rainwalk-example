import EditIcon from '@material-design-icons/svg/filled/edit.svg';
import type { PetNameUpdate, Policy } from '@rainwalk/api';
import { apiHooks } from '@rainwalk/api';
import CircularPetImageUpload from '@rainwalk/components/PetPolicyCard/CircularPetImageUpload';
import { RainwalkProgressBar } from '@rainwalk/components/PetPolicyCard/RainwalkProgressBar';
import UpdateYourPetNameModal from '@rainwalk/components/PetPolicyCard/UpdateYourPetNameModal';
import PolicySelection from '@rainwalk/components/PolicySelection';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { SelectedPolicyIDContext } from '@rainwalk/contexts/SelectedPolicyID';
import {
  Box,
  Checkbox,
  HStack,
  type IBoxProps,
  Icon,
  Pressable,
  Skeleton,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import type { FunctionComponent } from 'react';
import { useCallback, useContext, useMemo } from 'react';
import { Platform } from 'react-native';
import type { z } from 'zod';

interface PetPolicyCardProps {
  coverageTabVariant?: Partial<{
    reimbursementToDate: number;
  }>;
  policies?: z.infer<typeof Policy>[];
}

const PetPolicyCard: FunctionComponent<PetPolicyCardProps> = ({
  coverageTabVariant,
  policies,
}) => {
  const selectedPolicyID = useContext(SelectedPolicyIDContext);
  const selectedPolicy = useMemo(
    () => policies?.find((policy) => policy.id === selectedPolicyID),
    [policies, selectedPolicyID]
  );
  const {
    isOpen: petNameModalIsOpen,
    onOpen: onPetNameModalOpen,
    onClose: onPetNameModalClose,
  } = useDisclose();

  const petToUpdate: z.infer<typeof PetNameUpdate> = useMemo(
    () => ({
      policy_id: selectedPolicy?.id ?? '',
      pet_id: selectedPolicy?.quote.pet.id ?? '',
      pet_name: selectedPolicy?.quote.pet.pet_name ?? '',
    }),
    [selectedPolicy]
  );

  const onPressOpenPetNameModal = useCallback(() => {
    if (!coverageTabVariant) return;
    onPetNameModalOpen();
  }, [coverageTabVariant, onPetNameModalOpen]);

  const policyDetailsBoxProps = useMemo(
    () =>
      ({
        borderColor: 'rainwalkDeepGreen.400',
        borderRadius: 10,
        borderWidth: 1,
        mt: { base: 3, sm: 7 },
        px: { base: 3, sm: 6 },
        py: { base: 2, sm: 4 },
      }) satisfies IBoxProps,
    []
  );

  const PolicyDetails = useMemo(
    () =>
      Boolean(coverageTabVariant) && (
        <>
          {selectedPolicy?.remaining_deductible !== undefined && (
            <>
              <Text
                color="rainwalkDeepGreen.400"
                fontSize={{ base: 'sm', sm: 'lg' }}
                fontWeight="bold"
                mt={8}
                textAlign="center"
              >
                💰Deductible spent 💰
              </Text>
              <Box w="80%" alignSelf="center" mt={2} mb={2}>
                <RainwalkProgressBar
                  value={selectedPolicy.spent_deductible || 0}
                  max={selectedPolicy.quote.deductible || 0}
                />
              </Box>
              <Text
                color={
                  selectedPolicy.remaining_deductible !== 0
                    ? 'rainwalkDarkBrown.400'
                    : 'rainwalkDeepGreen.400'
                }
                fontSize={{
                  base: 'sm',
                  sm: 'md',
                }}
                fontWeight="bold"
                textAlign="center"
              >
                ${selectedPolicy.spent_deductible} of{' $'}
                {selectedPolicy.quote.deductible} fulfilled
              </Text>
              {selectedPolicy.remaining_deductible === 0 && (
                <Text
                  color="rainwalkDarkBrown.400"
                  fontSize={{
                    base: 'sm',
                    sm: 'md',
                  }}
                  fontWeight="semibold"
                  textAlign="center"
                >
                  You&apos;ve met your deductible
                </Text>
              )}
            </>
          )}
          {Boolean(coverageTabVariant?.reimbursementToDate) && (
            <>
              <Text
                color="rainwalkDeepGreen.400"
                fontSize={{ base: 'sm', sm: 'lg' }}
                fontWeight="bold"
                mt={6}
                textAlign="center"
              >
                🎉Amount reimbursed to date🎉
              </Text>
              <Text
                color="rainwalkDeepGreen.400"
                fontSize={{ base: 'md', sm: 'xl' }}
                fontWeight="bold"
                textAlign="center"
              >
                ${coverageTabVariant?.reimbursementToDate}
              </Text>
            </>
          )}
          <Box {...policyDetailsBoxProps}>
            {[
              ['Start date', selectedPolicy?.issued_date.toLocaleDateString()],
              ['End date', selectedPolicy?.effective_date.toLocaleDateString()],
              [
                'Annual deductible',
                `$${selectedPolicy?.quote.deductible ?? ''}`,
              ],
              ['Annual limit', `$${selectedPolicy?.quote.policy_limit ?? ''}`],
              ['Coinsurance', `${selectedPolicy?.quote.coinsurance ?? ''}%`],
            ].map((row, i, arr) => (
              <HStack
                justifyContent="space-between"
                key={row[0]}
                {...(arr.length - 1 !== i && { mb: { base: 2 } })}
              >
                <Text
                  color="rainwalkDarkBrown.400"
                  fontSize={{ base: 'xs', sm: 'md' }}
                  fontWeight="bold"
                >
                  {row[0]}
                </Text>
                <Text
                  color="rainwalkDarkBrown.400"
                  fontSize={{ base: 'xs', sm: 'md' }}
                >
                  {row[1]}
                </Text>
              </HStack>
            ))}
          </Box>
        </>
      ),
    [selectedPolicy, coverageTabVariant, policyDetailsBoxProps]
  );

  const ExtraCoverages = useMemo(
    () =>
      Boolean(coverageTabVariant) && (
        <>
          <Text
            color="rainwalkGray.400"
            fontSize={{ base: 'xs', sm: 'md' }}
            fontWeight="bold"
            pl={{ base: 4, sm: 5 }}
            pt={{ base: 8, sm: 16 }}
          >
            EXTRA COVERAGES
          </Text>
          <Box {...policyDetailsBoxProps} mt={{ base: 1, sm: 2 }}>
            {(
              [
                [selectedPolicy?.quote.exam_fee, 'Exam Fee Package'],
                [
                  selectedPolicy?.quote.breeding_endorsement,
                  'Breeding Package',
                ],
                [
                  selectedPolicy?.quote.boarding_advertising,
                  'Boarding, Advertising, and Holiday Cancel Package',
                ],
                [
                  selectedPolicy?.quote.holistic_alternative,
                  'Holistic and Alternative Treatment Package',
                ],
              ] satisfies [boolean | undefined, string][]
            ).map((row, i, arr) => (
              <Checkbox
                isChecked={row[0]}
                isDisabled
                key={row[1]}
                value={row[1]}
                {...(arr.length - 1 !== i && { mb: { base: 2, sm: 5 } })}
              >
                {row[1]}
              </Checkbox>
            ))}
          </Box>
          <Text
            fontSize={{ base: 'xs', sm: 'md' }}
            fontWeight="medium"
            textAlign="center"
            py={{
              base: 10 - policyDetailsBoxProps.py.base,
              sm: 12 - policyDetailsBoxProps.py.sm,
            }}
          >
            To update your policy, please contact us.
          </Text>
        </>
      ),
    [selectedPolicy, coverageTabVariant, policyDetailsBoxProps]
  );

  return (
    <RainwalkCard
      title={{
        text:
          (policies?.length ?? 0) <= 1 ? 'MY PET POLICY' : 'MY PET POLICIES',
        _Text: { color: 'rainwalkGray.400' },
      }}
      expandableChildren={ExtraCoverages}
      {...(coverageTabVariant && { justifyContent: 'center' })}
    >
      <PolicySelection hideIfOnlyOnePolicy policies={policies} />
      <HStack
        alignItems="center"
        space={4}
        {...(coverageTabVariant && { justifyContent: 'center' })}
      >
        <CircularPetImageUpload
          size={
            coverageTabVariant ? { base: 24, sm: 32 } : { base: 16, sm: 20 }
          }
          petId={selectedPolicy?.quote.pet.id}
          mr={2}
        />
        <VStack flexShrink={1} justifyContent="center">
          <Skeleton isLoaded={Boolean(selectedPolicy)} size={8} w="full">
            <Pressable onPress={onPressOpenPetNameModal}>
              <HStack alignContent="center">
                <Text
                  ellipsizeMode="middle"
                  fontSize="2xl"
                  isTruncated
                  flexShrink={1}
                  {...(!coverageTabVariant && { flex: 1 })}
                >
                  <Text color="rainwalkMidnightBlue.400" fontWeight="bold">
                    {selectedPolicy?.quote.pet.pet_name}
                  </Text>
                  {!coverageTabVariant && (
                    <Text color="rainwalkDarkBrown.400">
                      {' '}
                      #{selectedPolicy?.policy_number}
                    </Text>
                  )}
                  {Platform.OS === 'android' && (
                    // HACK(cjshearer): Text width calculation seems to fail in
                    // these particular circumstances on Android. This is
                    // certainly a react-native bug, related to nested text
                    // elements with truncation, as opening the element
                    // inspector and attempting to inspect this element also
                    // fails on Android. Removing the truncation or the parent
                    // text element fixes the issue, but at the cost of the
                    // desired UI.
                    <Text> </Text>
                  )}
                </Text>
                {Boolean(coverageTabVariant) && (
                  <>
                    <Icon
                      as={<EditIcon width={21} height={21} />}
                      color="rainwalkGray.400"
                      fill="currentColor"
                      flexShrink={1}
                      mt={2}
                      ml={1}
                    />
                    <UpdateYourPetNameModal
                      isOpen={petNameModalIsOpen}
                      onClose={onPetNameModalClose}
                      petToUpdate={petToUpdate}
                    />
                  </>
                )}
              </HStack>
            </Pressable>
          </Skeleton>
          {!coverageTabVariant && (
            <Skeleton.Text isLoaded={Boolean(selectedPolicy)} lines={2} mt={4}>
              <Text
                color="rainwalkGray.400"
                fontSize={{ base: 'sm', lg: 'md' }}
                numberOfLines={2}
              >
                {selectedPolicy?.quote.pet.pet_age} old,{' '}
                {selectedPolicy?.quote.pet.pet_breed}
              </Text>
            </Skeleton.Text>
          )}
        </VStack>
      </HStack>
      {PolicyDetails}
    </RainwalkCard>
  );
};

PetPolicyCard.defaultProps = {
  coverageTabVariant: undefined,
  policies: [],
};

const PetPolicyCardControlled: FunctionComponent<{
  coverageTabVariant?: boolean;
}> = ({ coverageTabVariant }) => {
  const { data: { policies } = { policies: [] } } =
    apiHooks.useGet('/insured/policy/');
  // TODO(cjshearer): enable this when the total_reimbursement value is correct

  // const {
  //   data: { total_reimbursement: reimbursementToDate } = {
  //     total_reimbursement: undefined,
  //   },
  // } = apiHooks.useGet('/insured/claim/reimbursement-to-date', undefined, {
  //   enabled: Boolean(coverageTabVariant),
  // });

  return (
    <PetPolicyCard
      policies={policies}
      coverageTabVariant={
        coverageTabVariant
          ? {
              // reimbursementToDate,
            }
          : undefined
      }
    />
  );
};

PetPolicyCardControlled.defaultProps = {
  coverageTabVariant: undefined,
};

export { PetPolicyCard };
export default PetPolicyCardControlled;
