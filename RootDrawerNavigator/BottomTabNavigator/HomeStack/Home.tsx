import { apiHooks } from '@rainwalk/api';
import ContactSupportCard from '@rainwalk/components/ContactSupportCard';
import FirstVetCard from '@rainwalk/components/FirstVetCard';
import { OffersCard } from '@rainwalk/components/OffersCard';
import PetPolicyCardControlled from '@rainwalk/components/PetPolicyCard';
import RecentClaimsCardControlled from '@rainwalk/components/RecentClaimsCard';
import ThingsToDoCard from '@rainwalk/components/ThingsToDoCard';
import { WhatsNew } from '@rainwalk/components/WhatsNew';
import { NotificationSettingsContext } from '@rainwalk/contexts/NotificationSettings';
import type { HomeStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/HomeStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import type { FunctionComponent } from 'react';
import { useContext, useEffect } from 'react';

const Home: FunctionComponent<HomeStackScreenProps<'Home'>> = () => {
  const { data } = apiHooks.useGet('/insured/profile');
  const { updateNotificationSettings } = useContext(
    NotificationSettingsContext
  );
  useEffect(() => {
    if (data?.user.push_notifications_enabled !== null) {
      updateNotificationSettings({
        isPushDisabled: !data?.user.push_notifications_enabled,
      });
    }
  }, [data?.user, updateNotificationSettings]);
  return (
    <ScreenLayout
      hideBackButton
      title={`Hello ${data?.user.first_name ?? ''} 👋`}
    >
      <PetPolicyCardControlled />
      <RecentClaimsCardControlled limit={3} />
      <OffersCard />
      <WhatsNew />
      <FirstVetCard />
      <ThingsToDoCard />
      <ContactSupportCard />
    </ScreenLayout>
  );
};

export default Home;
