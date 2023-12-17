import ContactSupportCard from '@rainwalk/components/ContactSupportCard';
import type { Meta } from '@storybook/react-native';
import { Center } from 'native-base';

export default {
  component: ContactSupportCard,
  decorators: [
    (Story) => (
      <Center alignContent="center" w="full" h="full" p="4">
        <Story />
      </Center>
    ),
  ],
} as Meta<typeof ContactSupportCard>;

export const Default = {};
