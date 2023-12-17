import ClaimPayoutMethodsCardControlled from '@rainwalk/components/ClaimPayoutMethodsCard';
import type { BillingStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/BillingStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import type { FunctionComponent } from 'react';
import React from 'react';

const ClaimPayoutMethods: FunctionComponent<
  BillingStackScreenProps<'ClaimPayoutMethods'>
> = () => (
  <ScreenLayout>
    <ClaimPayoutMethodsCardControlled />
  </ScreenLayout>
);

export default ClaimPayoutMethods;
