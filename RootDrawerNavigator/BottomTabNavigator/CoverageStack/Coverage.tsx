import ContactSupportCard from '@rainwalk/components/ContactSupportCard';
import PetPolicyCardControlled from '@rainwalk/components/PetPolicyCard';
import SimpleNavigationCard from '@rainwalk/components/SimpleNavigationCard';
import type { CoverageStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/CoverageStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import type { FunctionComponent } from 'react';
import { useCallback } from 'react';

const Coverage: FunctionComponent<CoverageStackScreenProps<'Coverage'>> = ({
  navigation,
}) => {
  const navigateToPolicyDocuments = useCallback(() => {
    navigation.navigate('CoverageStack', { screen: 'PolicyDocuments' });
  }, [navigation]);

  return (
    <ScreenLayout hideBackButton>
      <PetPolicyCardControlled coverageTabVariant />
      <SimpleNavigationCard
        onPress={navigateToPolicyDocuments}
        text="View policy documents"
      />
      <ContactSupportCard />
    </ScreenLayout>
  );
};

export default Coverage;
