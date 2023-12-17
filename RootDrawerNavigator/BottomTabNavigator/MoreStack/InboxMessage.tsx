import type { MoreStackScreenProps } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import { Box, Text } from 'native-base';
import type { FunctionComponent } from 'react';

const InboxMessage: FunctionComponent<
  MoreStackScreenProps<'InboxMessage'>
> = () => {
  // TODO(cjshearer): fetch inbox message when Rainwalk has an endpoint for this
  const subjectLine = '[Subject line]';
  const message =
    'Sed ut perspiciatis, \n\nUnde omnis iste natus error sit voluptatem ' +
    'accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ' +
    'ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt ' +
    'explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut ' +
    'odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ' +
    'voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum ' +
    'quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam ' +
    'eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat ' +
    'voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam ' +
    'corporis suscipit laboriosam, nisi ut aliquid ex ea commodi ' +
    'consequatur?\n\n Quis autem vel,\n Eum Iure';
  return (
    <ScreenLayout hideTopBarOverflow title="Inbox message">
      <Box mt={8}>
        <Text
          fontSize={{ base: 'xs', sm: 'md' }}
          fontWeight="bold"
          mb={{ base: 2, sm: 5 }}
        >
          {subjectLine}
        </Text>
        <Text fontSize={{ base: 'xs', sm: 'md' }} fontWeight="medium" italic>
          {message}
        </Text>
      </Box>
    </ScreenLayout>
  );
};

export default InboxMessage;
