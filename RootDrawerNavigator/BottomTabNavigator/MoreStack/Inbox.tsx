import MenuItems from '@rainwalk/components/MenuItems';
import type { MoreStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import { Box } from 'native-base';
import type { FunctionComponent } from 'react';

const Inbox: FunctionComponent<MoreStackScreenProps<'Inbox'>> = ({
  navigation,
}) => {
  // TODO(cjshearer): fetch inbox messages when Rainwalk has an endpoint for
  // this
  const inboxMessageLinks: [string, string][] = [
    ['[Subject line]', 'Message ID'],
    ['[Subject line]', 'a'],
    ['[Subject line]', 'b'],
    ['[Subject line]', 'c'],
  ];

  return (
    <ScreenLayout hideTopBarOverflow title="Inbox">
      <Box mt={8}>
        <MenuItems
          items={inboxMessageLinks.map(([title, messageId]) => ({
            key: messageId,
            onPress: () => {
              navigation.navigate('InboxMessage', { messageId });
            },
            title,
          }))}
        />
      </Box>
    </ScreenLayout>
  );
};

export default Inbox;
