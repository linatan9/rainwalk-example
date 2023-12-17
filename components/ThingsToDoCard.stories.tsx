import ThingsToDoCard from '@rainwalk/components/ThingsToDoCard';
import type { ComponentMeta, ComponentStory } from '@storybook/react-native';

const meta: ComponentMeta<typeof ThingsToDoCard> = {
  component: ThingsToDoCard,
};

type ThingsToDoCardStory = ComponentStory<typeof ThingsToDoCard>;

export const Default: ThingsToDoCardStory = () => <ThingsToDoCard />;

export default meta;
