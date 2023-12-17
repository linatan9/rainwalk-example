import PolicyDocumentsControlled from '@rainwalk/components/PolicyDocuments';
import type { MoreStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import { Box } from 'native-base';
import type { FunctionComponent } from 'react';

const PetRecords: FunctionComponent<
  MoreStackScreenProps<'PetRecords'>
> = () => {
  return (
    <ScreenLayout hideTopBarOverflow title="Pet records">
      <Box mt={8}>
        <PolicyDocumentsControlled />
      </Box>
    </ScreenLayout>
  );
};

export default PetRecords;
