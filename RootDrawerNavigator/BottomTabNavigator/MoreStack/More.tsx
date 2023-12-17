import MenuItems from '@rainwalk/components/MenuItems';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import type { MoreStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import type { FunctionComponent } from 'react';

const navigationLinks: [string, 'Inbox' | 'PetRecords'][] = [
  // TODO(cjshearer): uncomment when Inbox is implemented
  // ['Inbox', 'Inbox'],
  ['Pet Records', 'PetRecords'],
];

// TODO(cjshearer): use proper capitalization for the rainwalk card title
// instead of all caps. Screen readers will read this as an acronym, not as a
// word.
const More: FunctionComponent<MoreStackScreenProps<'More'>> = ({
  navigation,
}) => (
  <ScreenLayout hideBackButton>
    <RainwalkCard title={{ text: 'MORE' }}>
      <MenuItems
        items={navigationLinks.map(([title, screen]) => ({
          key: screen,
          onPress: () => {
            navigation.navigate(screen);
          },
          title,
        }))}
      />
    </RainwalkCard>
  </ScreenLayout>
);

export default More;
