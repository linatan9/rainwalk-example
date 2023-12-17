import FirstVetCard from '@rainwalk/components/FirstVetCard';
import type { Meta } from '@storybook/react-native';
import { Center } from 'native-base';

export default {
  component: FirstVetCard,
  decorators: [
    (Story) => (
      <Center alignContent="center" w="full" h="full" p="4">
        <Story />
      </Center>
    ),
  ],
} as Meta<typeof FirstVetCard>;

export const Default = {};
