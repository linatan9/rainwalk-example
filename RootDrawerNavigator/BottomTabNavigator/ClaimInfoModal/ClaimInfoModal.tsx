import type { Claim, Pet, Policy } from '@rainwalk/api';
import { apiHooks } from '@rainwalk/api';
import FileAttachmentIcon from '@rainwalk/assets/file-attachment-icon.svg';
import { claimStatusToColorMap } from '@rainwalk/components/ClaimRow';
import type { ClaimsStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import type { HomeStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/HomeStack';
import {
  Button,
  Hidden,
  HStack,
  Icon,
  Modal,
  Pressable,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  View,
  VStack,
} from 'native-base';
import type { FunctionComponent } from 'react';
import React, { useMemo } from 'react';
import type { z } from 'zod';

interface ClaimInfoModalProps {
  claim?: z.infer<typeof Claim>;
  onPressCloseModal: () => void;
  onPressViewClaimDetails: () => void;
  pet?: z.infer<typeof Pet>;
  policy?: z.infer<typeof Policy>;
}

const ClaimInfoModal: FunctionComponent<ClaimInfoModalProps> = ({
  claim,
  onPressCloseModal,
  onPressViewClaimDetails,
  pet,
  policy,
}) => {
  const fileAttachmentIconSizePixels: number = useBreakpointValue({
    base: 14,
    sm: 24,
  });
  const diagnosisNumberOfLines: number = useBreakpointValue({
    base: 6,
    sm: 8,
  });
  const Attachments = useMemo(
    () =>
      claim?.receipt_urls.map((recieptURL) => (
        <Text
          key={recieptURL}
          color="rainwalkGray.300"
          fontSize={{
            base: 'xs',
            sm: 'md',
            lg: 'lg',
          }}
          isTruncated
          mb={{
            base: 1,
            sm: 2,
          }}
        >
          <Icon
            as={
              <FileAttachmentIcon
                width={fileAttachmentIconSizePixels}
                height={fileAttachmentIconSizePixels}
              />
            }
            color="rainwalkGray.300"
            fill="currentColor"
          />
          {` ${recieptURL.replace('receipts/', '')}`}
        </Text>
      )),
    [claim, fileAttachmentIconSizePixels]
  );

  return (
    <Modal
      alignSelf="center"
      defaultIsOpen
      onClose={onPressCloseModal}
      px={{
        base: 7,
        sm: 8,
      }}
      size="full"
    >
      <Modal.Content>
        <Modal.Body
          _scrollview={{ scrollEnabled: false }}
          px={{
            base: '6',
            sm: '8',
            lg: '10',
          }}
          py={{
            base: '7',
            sm: '10',
            lg: '16',
          }}
        >
          <Text
            color={claimStatusToColorMap[claim?.status ?? 'Open']}
            fontSize={{
              base: 'sm',
              sm: 'lg',
            }}
            fontWeight="bold"
          >
            <Text fontWeight="black">{'∙ '}</Text>
            {claim?.status}
          </Text>
          <Stack
            direction={{
              base: 'column',
              lg: 'row',
            }}
            mb="2"
          >
            <Text
              color="rainwalkMidnightBlue.400"
              fontSize={{
                base: 'md',
                sm: '2xl',
              }}
              fontWeight="bold"
            >
              {`${pet?.pet_name ?? ''}'s Claim`}
            </Text>
            <Hidden till="lg">
              <Spacer />
            </Hidden>
            <Text
              color="rainwalkDarkBrown.400"
              fontSize={{
                base: 'xs',
                sm: 'md',
                lg: '2xl',
              }}
              fontWeight={{
                base: 'bold',
                lg: 'normal',
              }}
            >
              {`CLAIM #${claim?.claim_number ?? ''}`}
            </Text>
          </Stack>
          <View
            borderColor="rainwalkGray.300"
            borderRadius="md"
            borderStyle="solid"
            borderWidth="1"
            overflow="hidden"
          >
            <VStack
              px={{
                base: 3,
                lg: 8,
              }}
              py={{
                base: 3,
                sm: 5,
                lg: 9,
              }}
              space={{
                base: 2,
                sm: 5,
                lg: 6,
              }}
            >
              <HStack>
                <Text
                  color="rainwalkGray.400"
                  fontSize={{
                    base: 'xs',
                    sm: 'md',
                    lg: 'lg',
                  }}
                  fontWeight="bold"
                >
                  Policy #:
                </Text>
                <Spacer />
                <Text
                  color="rainwalkGray.300"
                  fontSize={{
                    base: 'xs',
                    sm: 'md',
                    lg: 'lg',
                  }}
                >
                  {`${pet?.pet_name ?? ''}-${policy?.policy_number ?? ''}`}
                </Text>
              </HStack>
              <HStack>
                <Text
                  color="rainwalkGray.400"
                  fontSize={{
                    base: 'xs',
                    sm: 'md',
                    lg: 'lg',
                  }}
                  fontWeight="bold"
                >
                  Submitted Date
                  <Hidden till="md">
                    <Text>{' Date'}</Text>
                  </Hidden>
                  :
                </Text>
                <Spacer />
                <Text
                  color="rainwalkGray.300"
                  fontSize={{
                    base: 'xs',
                    sm: 'md',
                    lg: 'lg',
                  }}
                >
                  {claim?.created_at.toLocaleDateString()}
                </Text>
              </HStack>
              <Stack
                direction={{
                  base: 'column',
                  lg: 'row',
                }}
              >
                <Text
                  color="rainwalkGray.400"
                  fontSize={{
                    base: 'xs',
                    sm: 'md',
                    lg: 'lg',
                  }}
                  fontWeight="bold"
                >
                  Diagnosis:
                </Text>
                <Hidden till="md">
                  <Spacer />
                </Hidden>
                <Text
                  color="rainwalkGray.300"
                  fontSize={{
                    base: 'xs',
                    sm: 'md',
                    lg: 'lg',
                  }}
                  w={{ lg: '70%' }}
                  lineHeight={{
                    base: 'sm',
                    lg: '2xl',
                  }}
                  numberOfLines={diagnosisNumberOfLines}
                >
                  {claim?.condition_summary}
                </Text>
              </Stack>
              <HStack>
                <Text
                  color="rainwalkGray.400"
                  fontSize={{
                    base: 'xs',
                    sm: 'md',
                    lg: 'lg',
                  }}
                  fontWeight="bold"
                >
                  Treatment Cost:
                </Text>
                <Spacer />
                <Text
                  color="rainwalkGray.300"
                  fontSize={{
                    base: 'xs',
                    sm: 'md',
                    lg: 'lg',
                  }}
                >
                  {`$${claim?.treatment_cost.toFixed(2) ?? ''}`}
                </Text>
              </HStack>
            </VStack>
            <Pressable
              w="full"
              bgColor="rainwalkGray.100"
              h={{
                base: 12,
                sm: 16,
              }}
              justifyContent="center"
              onPress={onPressViewClaimDetails}
            >
              <Text
                textAlign="center"
                fontSize={{
                  base: 'xs',
                  sm: 'md',
                  lg: 'lg',
                }}
                color="rainwalkGray.400"
              >
                View full details
              </Text>
            </Pressable>
          </View>
          <Stack
            direction={{
              base: 'column',
              lg: 'row',
            }}
            px={{
              base: 3,
              lg: 8,
            }}
            py={{
              base: 3,
              sm: 5,
              lg: 9,
            }}
          >
            <Text
              fontSize={{
                base: 'xs',
                sm: 'md',
                lg: 'lg',
              }}
              fontWeight="medium"
            >
              Attached:
            </Text>
            <Hidden till="lg">
              <Spacer />
            </Hidden>
            <View>{Attachments}</View>
          </Stack>
          <Button
            alignSelf="center"
            onPress={onPressCloseModal}
            variant="outline"
          >
            Close
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

ClaimInfoModal.defaultProps = {
  claim: undefined,
  pet: undefined,
  policy: undefined,
};

interface ClaimInfoModalScreenParams {
  id: number;
}

const ClaimInfoModalScreen: FunctionComponent<
  ClaimsStackScreenProps<'ClaimInfoModal'> &
    HomeStackScreenProps<'ClaimInfoModal'>
> = ({ navigation, route }) => {
  const { data: claim } = apiHooks.useGet('/insured/claim/:id', {
    params: { id: route.params.id },
  });
  const { data: { policies } = { policies: [] } } = apiHooks.useGet(
    '/insured/policy/',
    undefined,
    {
      enabled: claim !== undefined,
    }
  );
  const policy = useMemo(
    () => policies.find((p) => p.id === claim?.policy),
    [claim, policies]
  );

  return (
    <ClaimInfoModal
      claim={claim}
      onPressCloseModal={navigation.goBack}
      onPressViewClaimDetails={() => {
        navigation.goBack();
        navigation.navigate('ClaimsStack', {
          initial: false,
          params: {
            claimId: route.params.id,
            petName: policy?.quote.pet.pet_name,
          },
          screen: 'ClaimView',
        });
      }}
      pet={policy?.quote.pet}
      policy={policy}
    />
  );
};
export { ClaimInfoModal };
export type { ClaimInfoModalProps, ClaimInfoModalScreenParams };
export default ClaimInfoModalScreen;
