import CircularPetImageUpload from '@rainwalk/components/PetPolicyCard/CircularPetImageUpload';
import { examplePolicies } from '@rainwalk/components/TestData';
import type { ComponentMeta } from '@storybook/react-native';

const meta: ComponentMeta<typeof CircularPetImageUpload> = {
  args: {
    petId: undefined,
  },
  argTypes: {
    petId: {
      options: [undefined, examplePolicies[0].quote.pet.id],
      control: { type: 'radio' },
    },
  },
  component: CircularPetImageUpload,
};

type CircularPetImageUploadStory = typeof CircularPetImageUpload;

export const Default: CircularPetImageUploadStory = ({ petId }) => (
  <CircularPetImageUpload size="lg" petId={petId} />
);

export default meta;
