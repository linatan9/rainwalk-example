import { PaymentPlanCard } from '@rainwalk/components/PaymentPlanCard';
import { examplePolicies } from '@rainwalk/components/TestData';
import type { Meta } from '@storybook/react-native';
import { Center } from 'native-base';

export default {
  args: {
    policies: examplePolicies,
  },
  component: PaymentPlanCard,
  decorators: [
    (Story) => (
      <Center alignContent="center" w="full" h="full" p="4">
        <Story />
      </Center>
    ),
  ],
} as Meta<typeof PaymentPlanCard>;

export const Default = {};
