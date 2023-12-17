import { RAINWALK_INSURED_URL } from '@env';
import type { ClaimPaymentMethodList } from '@rainwalk/api';
import { apiHooks } from '@rainwalk/api';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { captureException } from '@rainwalk/logging';
import { Flex, Text } from 'native-base';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';
import { Linking } from 'react-native';
import type { z } from 'zod';

interface ClaimPayoutMethodsCardProps {
  payoutMethods?: z.infer<typeof ClaimPaymentMethodList>[];
}

const friendlyPaymentMethodName = (
  payoutMethod: z.infer<typeof ClaimPaymentMethodList>['payment_method']
) => {
  switch (payoutMethod) {
    case 'eft':
      return 'Bank account';
    case 'card':
      return 'Card';
    default:
      return 'Unknown';
  }
};

const onPressUpdateYourPreferredPayoutMethod = () => {
  Linking.openURL(
    `https://${RAINWALK_INSURED_URL}/claims/payment-method`
  ).catch(captureException);
};

// TODO(cjshearer): there were no iPhone SE sized mockups at the time of
// creating this component, so a future QA/responsive pass should verify the
// following `base` responsive values
const ClaimPayoutMethodsCard: FunctionComponent<
  ClaimPayoutMethodsCardProps
> = ({ payoutMethods }) => {
  // TODO(cjshearer): refactor as a reusable component that can be shared with
  // the PaymentMethodsCard
  const PayoutMethods = useMemo(
    () =>
      payoutMethods?.map((payoutMethod) => (
        <Flex
          flexDir="row"
          justifyContent="space-between"
          key={payoutMethod._uuid}
          pb={{ base: 6, sm: 8 }}
        >
          <Text
            color="rainwalkMidnightBlue.400"
            fontSize={{ base: 'xs', sm: 'md' }}
            fontWeight="semibold"
          >
            {friendlyPaymentMethodName(payoutMethod.payment_method)}:
          </Text>
          <Text
            color="rainwalkMidnightBlue.400"
            fontSize={{ base: 'xs', sm: 'md' }}
            fontWeight="semibold"
          >
            **** {payoutMethod.last_4_digits}
          </Text>
        </Flex>
      )),
    [payoutMethods]
  );
  // TODO(cjshearer): use proper capitalization instead of all caps. Screen
  // readers will read this as an acronym, not as a word.
  return (
    <RainwalkCard title={{ text: 'CLAIM PAYOUT METHODS' }}>
      {PayoutMethods}
      <Text
        color="rainwalkDarkestBrown.400"
        fontSize={{ base: 'xs', sm: 'md' }}
        fontWeight="medium"
        textAlign="center"
      >
        To update your preferred payout method,{' '}
        <Text
          color="rainwalkRustRed.400"
          onPress={onPressUpdateYourPreferredPayoutMethod}
          underline
        >
          click here.
        </Text>
      </Text>
    </RainwalkCard>
  );
};

ClaimPayoutMethodsCard.defaultProps = {
  payoutMethods: undefined,
};

const ClaimPayoutMethodsCardControlled = () => {
  const { data: payoutMethods } = apiHooks.useGet(
    '/insured/claim/payment-method/search'
  );
  return <ClaimPayoutMethodsCard payoutMethods={payoutMethods} />;
};

export { ClaimPayoutMethodsCard };
export default ClaimPayoutMethodsCardControlled;
