import RecentClaimsCardControlled from '@rainwalk/components/RecentClaimsCard';
import type { ClaimsStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import type { FunctionComponent } from 'react';

const ViewAllClaims: FunctionComponent<
  ClaimsStackScreenProps<'ViewAllClaims'>
> = () => {
  return (
    <ScreenLayout>
      <RecentClaimsCardControlled
        hideSeeAllClaimsButton
        hideSubmitClaimButton
        title="ALL CLAIMS"
      />
    </ScreenLayout>
  );
};

export default ViewAllClaims;
