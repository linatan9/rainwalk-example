import PolicyDocumentsControlled from '@rainwalk/components/PolicyDocuments';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import type { CoverageStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/CoverageStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import type { FunctionComponent } from 'react';

const PolicyDocuments: FunctionComponent<
  CoverageStackScreenProps<'PolicyDocuments'>
> = () => {
  // TODO(cjshearer): use proper capitalization instead of all caps. Screen
  // readers will read this as an acronym, not as a word.
  return (
    <ScreenLayout>
      <RainwalkCard title={{ text: 'POLICY DOCUMENTS' }}>
        <PolicyDocumentsControlled />
      </RainwalkCard>
    </ScreenLayout>
  );
};

export default PolicyDocuments;
