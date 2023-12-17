import { PetPolicyCard } from '@rainwalk/components/PetPolicyCard/PetPolicyCard';
import { examplePolicies } from '@rainwalk/components/TestData';
import type { ComponentMeta, ComponentStory } from '@storybook/react-native';

const meta: ComponentMeta<typeof PetPolicyCard> = {
  argTypes: {
    coverageTabVariant: {
      options: { none: undefined, empty: {} },
      control: { type: 'radio' },
    },
    policies: {
      options: {
        loading: [],
        single: examplePolicies.slice(0, 1),
        multiple: examplePolicies,
      },
      control: { type: 'radio' },
    },
  },
  component: PetPolicyCard,
};

type PetPolicyStory = ComponentStory<typeof PetPolicyCard>;

export const Default: PetPolicyStory = ({ policies, ...rest }) => (
  <PetPolicyCard policies={policies} {...rest} key={policies?.length} />
);

export default meta;
