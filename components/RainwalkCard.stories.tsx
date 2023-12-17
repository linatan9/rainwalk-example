import type { RainwalkCardProps } from '@rainwalk/components/RainwalkCard';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { Text, VStack } from 'native-base';

const cardPropsTitleAction: RainwalkCardProps = {
  title: {
    text: 'Title',
  },
  action: {
    text: 'Action button',
    callback: () => {},
  },
};

const cardPropsTitle: RainwalkCardProps = {
  title: {
    text: 'Title',
  },
};

const cardPropsAction: RainwalkCardProps = {
  action: {
    text: 'Action button',
    callback: () => {},
  },
};

export default {
  render: () => (
    <VStack space={4}>
      <RainwalkCard {...cardPropsTitleAction}>
        <Text>Card with both title and action</Text>
      </RainwalkCard>
      <RainwalkCard {...cardPropsTitle}>
        <Text>Card with only title</Text>
      </RainwalkCard>
      <RainwalkCard {...cardPropsAction}>
        <Text>Card with only action</Text>
      </RainwalkCard>
      <RainwalkCard>
        <Text>Empty card props</Text>
      </RainwalkCard>
    </VStack>
  ),
};

export const All = {};
