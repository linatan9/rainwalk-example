import { PaymentMethodCard } from '@rainwalk/components/PaymentMethodCard';
import { examplePaymentMethods } from '@rainwalk/components/TestData';
import type { Meta } from '@storybook/react-native';
import { Center } from 'native-base';

export default {
  component: PaymentMethodCard,
  decorators: [
    (Story) => (
      <Center alignContent="center" w="full" h="full" p="4">
        <Story />
      </Center>
    ),
  ],
} satisfies Meta<typeof PaymentMethodCard>;

export const Default = { args: { paymentMethods: examplePaymentMethods } };
