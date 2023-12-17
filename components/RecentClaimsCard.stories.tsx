import { RecentClaimsCard } from '@rainwalk/components/RecentClaimsCard';
import { exampleClaim, examplePolicies } from '@rainwalk/components/TestData';
import type { ComponentMeta, ComponentStory } from '@storybook/react-native';

const meta: ComponentMeta<typeof RecentClaimsCard> = {
  argTypes: {
    claims: {
      options: {
        loading: undefined,
        empty: [],
        loaded: [exampleClaim],
      },
      control: { type: 'radio' },
    },
    policies: {
      options: {
        loading: undefined,
        empty: [],
        loaded: examplePolicies,
      },
      control: { type: 'radio' },
    },
  },
  args: {
    onPressClaim: (_: number) => {},
    onPressSeeAllClaims: () => {},
    onPressSubmitClaim: () => {},
    title: 'RECENT CLAIMS STORY',
  },
  component: RecentClaimsCard,
};

type RecentClaimsCardStory = ComponentStory<typeof RecentClaimsCard>;

export const Default: RecentClaimsCardStory = (props) => (
  <RecentClaimsCard {...props} />
);

export default meta;
