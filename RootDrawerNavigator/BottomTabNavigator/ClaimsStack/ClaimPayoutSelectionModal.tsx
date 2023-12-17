import { RAINWALK_INSURED_URL } from '@env';
import { apiHooks, PayoutMethodEnum } from '@rainwalk/api';
import { captureException } from '@rainwalk/logging';
import type { ClaimsStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import { Button, Modal, Select, Text, VStack } from 'native-base';
import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import { Linking } from 'react-native';

const ClaimPayoutSelectionModal: FunctionComponent<
  ClaimsStackScreenProps<'ClaimPayoutSelectionModal'>
> = ({ navigation, route }) => {
  const [payoutMethod, setPayoutMethod] = useState(route.params.payoutMethod);
  const { data: claimPayoutMethods } = apiHooks.useGet(
    '/insured/claim/payment-method/search'
  );

  const onSubmit = useCallback(() => {
    if (payoutMethod === 'Direct Deposit' && claimPayoutMethods?.length === 0) {
      Linking.openURL(
        `https://${RAINWALK_INSURED_URL}/claims/payment-method`
      ).catch(captureException);
      return;
    }
    navigation.navigate('SubmitClaim', {
      payoutMethod,
    });
  }, [navigation, payoutMethod, claimPayoutMethods]);

  return (
    <Modal
      alignSelf="center"
      defaultIsOpen
      onClose={navigation.goBack}
      px={{
        base: 7,
        sm: 8,
      }}
    >
      <Modal.Content
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
        w="full"
      >
        <VStack alignItems="center" space="4" mb="2">
          <Text
            color="rainwalkGray.400"
            fontSize={{ base: 'md', sm: '2xl' }}
            fontWeight="bold"
            textAlign="center"
          >
            You&apos;re almost done.
          </Text>
          <Text
            color="rainwalkDarkBrown.400"
            fontSize={{ base: 'xs', sm: 'md', lg: '2xl' }}
            textAlign="center"
          >
            Choose your preferred claims payout method
          </Text>
          <Select
            mb={4}
            onValueChange={(itemValue) => {
              setPayoutMethod(itemValue as typeof route.params.payoutMethod);
            }}
            selectedValue={payoutMethod}
            w="full"
          >
            {PayoutMethodEnum.options.map((payoutMethodOption) => (
              <Select.Item
                key={payoutMethodOption}
                label={payoutMethodOption}
                value={payoutMethodOption}
              />
            ))}
          </Select>
          <Button colorScheme="primary" mt="2" onPress={onSubmit}>
            Submit Claim
          </Button>
          <Button
            colorScheme="primary"
            onPress={navigation.goBack}
            variant="outline"
          >
            Back
          </Button>
        </VStack>
      </Modal.Content>
    </Modal>
  );
};

export default ClaimPayoutSelectionModal;
