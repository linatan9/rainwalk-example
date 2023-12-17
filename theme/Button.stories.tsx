import type { Meta } from '@storybook/react-native';
import { Button, HStack, type IButtonProps, VStack } from 'native-base';

export default {
  render: (args: IButtonProps) => (
    <VStack space={2} justifyContent="center" h="full">
      <HStack space={2}>
        <Button {...args} colorScheme="secondary" flex={1}>
          Secondary
        </Button>
        <Button {...args} flex={1}>
          Primary
        </Button>
      </HStack>
      <HStack space={2}>
        <Button {...args} isLoading colorScheme="secondary" flex={1} />
        <Button {...args} isLoading flex={1} />
      </HStack>
      <HStack space={2}>
        <Button {...args} isDisabled flex={1}>
          Disabled
        </Button>
        <Button {...args} isDisabled colorScheme="secondary" flex={1}>
          Disabled
        </Button>
      </HStack>
    </VStack>
  ),
  component: Button,
  // TODO(cjshearer): There's a way to generate these automatically from the
  // proptypes, but I haven't figured out how to make that work yet.
  argTypes: {
    colorScheme: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Button>;

export const Solid = {};

export const Outline = {
  args: { variant: 'outline' },
};
