import { RAINWALK_INSURED_URL } from '@env';
import type { PaymentMethod } from '@rainwalk/api';
import { apiHooks } from '@rainwalk/api';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { captureException } from '@rainwalk/logging';
import { Flex, Text } from 'native-base';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';
import { Linking } from 'react-native';
import type { z } from 'zod';

interface PaymentMethodCardProps {
  paymentMethods?: z.infer<typeof PaymentMethod>[];
}

const onPressUpdateYourPreferredPaymentMethod = () => {
  Linking.openURL(
    `https://${RAINWALK_INSURED_URL}/billing/payment-methods`
  ).catch(captureException);
};

// TODO(cjshearer): there were no iPhone SE sized mockups at the time of
// creating this component, so a future QA/responsive pass should verify the
// following `base` responsive values
const PaymentMethodCard: FunctionComponent<PaymentMethodCardProps> = ({
  paymentMethods,
}) => {
  // TODO(cjshearer): refactor as a reusable component that can be shared with
  // the ClaimPayoutMethodsCard
  const PaymentMethods = useMemo(
    () =>
      paymentMethods?.map((paymentMethod) =>
        paymentMethod.policies.map((policy) => (
          <Flex
            flexDir="row"
            justifyContent="space-between"
            key={paymentMethod.token}
            pb={{ base: 6, sm: 8 }}
          >
            <Text
              color="rainwalkMidnightBlue.400"
              fontSize={{ base: 'xs', sm: 'md' }}
              fontWeight="semibold"
            >
              Policy: {policy.quote.pet.pet_name.toUpperCase().truncate(10)}-
              {policy.policy_number}
            </Text>
            <Text
              color="rainwalkMidnightBlue.400"
              fontSize={{ base: 'xs', sm: 'md' }}
              fontWeight="semibold"
            >
              **** {paymentMethod.last4}
            </Text>
          </Flex>
        ))
      ),
    [paymentMethods]
  );

  // TODO(cjshearer): use proper capitalization instead of all caps. Screen
  // readers will read this as an acronym, not as a word.
  return (
    <RainwalkCard title={{ text: 'PAYMENT METHODS' }}>
      {PaymentMethods}
      <Text
        color="rainwalkDarkestBrown.400"
        fontSize={{ base: 'xs', sm: 'md' }}
        fontWeight="medium"
        textAlign="center"
      >
        To update your payment,{' '}
        <Text
          color="rainwalkRustRed.400"
          onPress={onPressUpdateYourPreferredPaymentMethod}
          underline
        >
          click here
        </Text>{' '}
        to manage your payment method.
      </Text>
    </RainwalkCard>
  );
};

PaymentMethodCard.defaultProps = {
  paymentMethods: undefined,
};

const PaymentMethodCardControlled: FunctionComponent = () => {
  const { data: { data: paymentMethods } = { data: undefined } } =
    apiHooks.useGet('/insured/payment/payment-method');
  return <PaymentMethodCard paymentMethods={paymentMethods} />;
};

export { PaymentMethodCard };
export default PaymentMethodCardControlled;
