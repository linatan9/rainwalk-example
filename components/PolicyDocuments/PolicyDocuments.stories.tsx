import { PolicyDocuments } from '@rainwalk/components/PolicyDocuments';
import { examplePolicies } from '@rainwalk/components/TestData';
import type { ComponentMeta } from '@storybook/react-native';

const singlePolicy = examplePolicies.slice(0, 1);
const multiplePolicies = examplePolicies;

const meta: ComponentMeta<typeof PolicyDocuments> = {
  args: {
    policies: multiplePolicies,
  },
  argTypes: {
    policies: {
      options: {
        loading: [],
        single: singlePolicy,
        multiple: multiplePolicies,
      },
      control: { type: 'radio' },
    },
  },
  component: PolicyDocuments,
};

type PolicyDocumentsStory = typeof PolicyDocuments;

export const Default: PolicyDocumentsStory = ({ policies }) => (
  <PolicyDocuments policies={policies} />
);

export default meta;
