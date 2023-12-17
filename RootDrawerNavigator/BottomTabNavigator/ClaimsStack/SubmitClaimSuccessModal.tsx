import { RainwalkRequestAppReviewKey } from '@rainwalk/api';
import {
  askStoreReviewAlert,
  isLocalKeyPresent,
} from '@rainwalk/helpers/helpers';
import type { ClaimsStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import { Button, HStack, Modal, Text, VStack } from 'native-base';
import type { FunctionComponent } from 'react';

const nextSteps = [
  'Our Pet Claims Advocate will start processing your claim, and will ' +
    'contact you for any additional documentation needed.',
  'Once your claim is processed and resolved, you will receive our decision ' +
    'via email.',
];

const ClaimsSuccessModal: FunctionComponent<
  ClaimsStackScreenProps<'SubmitClaimSuccessModal'>
> = ({ navigation }) => {
  const goToClaims = async (): Promise<void> => {
    const isLeftReview = await isLocalKeyPresent(RainwalkRequestAppReviewKey);
    navigation.navigate('Claims');
    if (isLeftReview === null) {
      askStoreReviewAlert();
    }
  };
  return (
    <Modal
      alignSelf="center"
      defaultIsOpen
      onClose={goToClaims}
      px={{
        base: 7,
        sm: 8,
      }}
    >
      <Modal.Content
        w="full"
        px={{
          base: 6,
          sm: 8,
        }}
        py={{
          base: 7,
          sm: 10,
        }}
      >
        <VStack space="4" mb="2">
          <Text
            textAlign="center"
            color="rainwalkGray.400"
            fontSize={{ base: 'sm', sm: 'xl' }}
            fontWeight="bold"
          >
            Thank you!{'\n'}We got your claim.
          </Text>
          <Text
            textAlign="center"
            color="rainwalkGray.400"
            fontSize={{ base: 'sm', sm: 'lg' }}
            fontWeight={{ base: 'medium', sm: 'semibold' }}
          >
            Next steps:
          </Text>
          {nextSteps.map((step, stepIndex) => (
            <HStack key={step} space={1}>
              <Text
                color="rainwalkGray.400"
                fontSize={{ base: 'sm', sm: 'md' }}
              >
                {stepIndex + 1}.
              </Text>
              <Text
                color="rainwalkGray.400"
                fontSize={{ base: 'sm', sm: 'md' }}
              >
                {step}
              </Text>
            </HStack>
          ))}
          <Button
            alignSelf="center"
            colorScheme="primary"
            mt="2"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onPress={goToClaims}
            textAlign="center"
          >
            Go back to claims
          </Button>
        </VStack>
      </Modal.Content>
    </Modal>
  );
};

export default ClaimsSuccessModal;
