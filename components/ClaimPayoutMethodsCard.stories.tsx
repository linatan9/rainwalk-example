import { ClaimPayoutMethodsCard } from '@rainwalk/components/ClaimPayoutMethodsCard';
import { exampleClaimPaymentMethodList } from '@rainwalk/components/TestData';
import type { Meta } from '@storybook/react-native';
import { Center } from 'native-base';

export default {
  component: ClaimPayoutMethodsCard,
  decorators: [
    (Story) => (
      <Center alignContent="center" w="full" h="full" p="4">
        <Story />
      </Center>
    ),
  ],
} satisfies Meta<typeof ClaimPayoutMethodsCard>;

export const Default = {
  args: { payoutMethods: exampleClaimPaymentMethodList },
};
