import ContactSupportCard from '@rainwalk/components/ContactSupportCard';
import PaymentMethodCardControlled from '@rainwalk/components/PaymentMethodCard';
import PaymentPlanCardControlled from '@rainwalk/components/PaymentPlanCard';
import SimpleNavigationCard from '@rainwalk/components/SimpleNavigationCard';
import type { BillingStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/BillingStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import type { FunctionComponent } from 'react';
import { useCallback } from 'react';

const Billing: FunctionComponent<BillingStackScreenProps<'Billing'>> = ({
  navigation,
}) => {
  const navigateToPaymentHistory = useCallback(() => {
    navigation.navigate('BillingStack', { screen: 'PaymentHistory' });
  }, [navigation]);

  const navigateToClaimPayoutMethods = useCallback(() => {
    navigation.navigate('BillingStack', { screen: 'ClaimPayoutMethods' });
  }, [navigation]);

  return (
    <ScreenLayout hideBackButton>
      <PaymentMethodCardControlled />
      <PaymentPlanCardControlled />
      <SimpleNavigationCard
        onPress={navigateToPaymentHistory}
        text="View payment history"
      />
      <SimpleNavigationCard
        onPress={navigateToClaimPayoutMethods}
        text="Claim payout methods"
      />
      <ContactSupportCard />
    </ScreenLayout>
  );
};

export default Billing;
