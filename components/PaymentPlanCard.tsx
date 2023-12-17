import type { Policy } from '@rainwalk/api';
import { apiHooks } from '@rainwalk/api';
import PolicySelection from '@rainwalk/components/PolicySelection';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { SelectedPolicyIDContext } from '@rainwalk/contexts/SelectedPolicyID';
import { Text } from 'native-base';
import type { FunctionComponent } from 'react';
import { useContext, useMemo } from 'react';
import type { z } from 'zod';

interface PaymentPlanCardProps {
  policies?: z.infer<typeof Policy>[];
}

const PaymentPlanCard: FunctionComponent<PaymentPlanCardProps> = ({
  policies,
}) => {
  const selectedPolicyID = useContext(SelectedPolicyIDContext);
  const selectedPolicy = useMemo(
    () => policies?.find((policy) => policy.id === selectedPolicyID),
    [policies, selectedPolicyID]
  );
  const selectedPolicyPaymentPlanFrequency = useMemo(
    () => selectedPolicy?.policy_plan?.concat('ly'),
    [selectedPolicy]
  );

  return (
    <RainwalkCard bg="rainwalkSageGreen.400" my={6}>
      <Text
        color="rainwalkDeepGreen.400"
        fontSize={{
          base: 'sm',
          sm: '2xl',
        }}
        fontWeight="bold"
        pb={{
          base: 7,
          sm: 8,
        }}
        textAlign="center"
      >
        PAYMENT PLAN
      </Text>
      <Text
        color="rainwalkGray.400"
        fontSize={{
          base: 'xs',
          sm: 'sm',
          md: 'md',
        }}
        fontWeight="bold"
        pb={1}
      >
        MY POLICIES
      </Text>
      <PolicySelection policies={policies} />
      <Text
        color="rainwalkDarkestBrown.400"
        fontSize={{ base: 'sm', sm: 'lg' }}
        fontWeight="bold"
        textAlign="center"
      >
        Payment Plan :{' '}
        <Text color="rainwalkDeepGreen.400">
          {selectedPolicyPaymentPlanFrequency}
        </Text>
      </Text>
      <Text
        color="rainwalkDarkestBrown.400"
        fontSize={{ base: 'xs', sm: 'md' }}
        py={{
          base: 9,
          sm: 12,
        }}
        textAlign="center"
      >
        To update your payment plan, please contact us.
      </Text>
    </RainwalkCard>
  );
};

PaymentPlanCard.defaultProps = {
  policies: undefined,
};

const PaymentPlanCardControlled: FunctionComponent = () => {
  const { data: { policies } = { policies: undefined } } =
    apiHooks.useGet('/insured/policy/');

  return <PaymentPlanCard policies={policies} />;
};

export { PaymentPlanCard };
export default PaymentPlanCardControlled;
