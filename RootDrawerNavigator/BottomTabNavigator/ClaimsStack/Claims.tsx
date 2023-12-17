import ContactSupportCard from '@rainwalk/components/ContactSupportCard';
import HowOurClaimsWorkCard from '@rainwalk/components/HowOurClaimsWorkCard';
import RecentClaimsCardControlled from '@rainwalk/components/RecentClaimsCard';
import type { ClaimsStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import type { FunctionComponent } from 'react';

const Claims: FunctionComponent<ClaimsStackScreenProps<'Claims'>> = () => {
  return (
    <ScreenLayout hideBackButton>
      <RecentClaimsCardControlled limit={3} status="Open" title="OPEN CLAIMS" />
      <HowOurClaimsWorkCard />
      <ContactSupportCard />
    </ScreenLayout>
  );
};

export default Claims;
