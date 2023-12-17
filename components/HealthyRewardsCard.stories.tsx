import HealthyRewardsCard from '@rainwalk/components/HealthyRewardsCard';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useEffect, useState } from '@storybook/addons';
import type { Meta } from '@storybook/react-native';
import { Center } from 'native-base';

export default {
  component: HealthyRewardsCard,
  decorators: [
    (Story) => (
      <Center alignContent="center" w="full" h="full" p="4">
        <Story />
      </Center>
    ),
  ],
} as Meta<typeof HealthyRewardsCard>;

export const Loading = {};

export const Loaded = {
  args: {
    points: 200,
  },
};

const RenderAll = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 1000);
  }, [loading]);
  return <HealthyRewardsCard points={loading ? undefined : '300'} />;
};

export const AutomaticToggling = {
  render: RenderAll,
};
