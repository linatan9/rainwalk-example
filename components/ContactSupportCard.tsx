import { RAINWALK_SUPPORT_EMAIL, RAINWALK_SUPPORT_NUMBER } from '@env';
import { useAnalytic } from '@rainwalk/components/AnalyticProvider';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { captureException } from '@rainwalk/logging';
import { Actionsheet, Button, Text, useDisclose, VStack } from 'native-base';
import type { FunctionComponent } from 'react';
import { Linking } from 'react-native';

const callRainwalkActionSheetText = `Call ${RAINWALK_SUPPORT_NUMBER}`;
const onPressCallRainwalkActionSheet = () => {
  Linking.openURL(`tel://${RAINWALK_SUPPORT_NUMBER}`).catch(captureException);
};

const emailRainwalkActionSheetText = `Email ${RAINWALK_SUPPORT_EMAIL}`;
const onPressEmailRainwalkActionSheet = () => {
  Linking.openURL(`mailto:${RAINWALK_SUPPORT_EMAIL}`).catch(captureException);
};

const ContactSupportCard: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { logEvent } = useAnalytic();

  const onGetSupport = () => {
    onOpen();
    logEvent('onGetSupportPressed');
  };

  return (
    <RainwalkCard bg="rainwalkLightBlue.400">
      <VStack alignContent="center" alignItems="center" space="8">
        <Text
          color="rainwalkMidnightBlue.400"
          fontSize={{
            base: 'sm',
            sm: '2xl',
          }}
          fontWeight="bold"
          textTransform="uppercase"
        >
          NEED HELP?
        </Text>
        <Text
          color="rainwalkGray.400"
          fontSize={{ base: 'xs', sm: 'xl' }}
          fontWeight="medium"
          textAlign="center"
        >
          Contact us for support and help regarding your policy.
        </Text>

        <Button
          colorScheme="secondary"
          variant="outline"
          onPress={onGetSupport}
        >
          Get support
        </Button>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item onPress={onPressCallRainwalkActionSheet}>
              {callRainwalkActionSheetText}
            </Actionsheet.Item>

            <Actionsheet.Item onPress={onPressEmailRainwalkActionSheet}>
              {emailRainwalkActionSheetText}
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
    </RainwalkCard>
  );
};

export default ContactSupportCard;
