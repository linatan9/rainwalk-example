import HowOurClaimsWorkCard from '@rainwalk/components/HowOurClaimsWorkCard';
import type { Meta } from '@storybook/react-native';
import { Center } from 'native-base';

export default {
  component: HowOurClaimsWorkCard,
  decorators: [
    (Story) => (
      <Center alignContent="center" w="full" h="full" p="4">
        <Story />
      </Center>
    ),
  ],
} as Meta<typeof HowOurClaimsWorkCard>;

export const Default = {};
