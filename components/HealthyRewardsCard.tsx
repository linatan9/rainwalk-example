import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { Button, Center, Skeleton, Text } from 'native-base';
import type { FunctionComponent } from 'react';

export interface IHealthyRewardsProps {
  onPressEarnRewards?: () => unknown;
  onPressRedeemPoints?: () => unknown;
  points?: number | string;
}

const HealthyRewardsCard: FunctionComponent<IHealthyRewardsProps> = ({
  onPressEarnRewards,
  onPressRedeemPoints,
  points,
}) => (
  <RainwalkCard title={{ text: 'healthy rewards' }}>
    <Center>
      <Center h={{ base: '12', md: '16' }} mb="2" w={{ base: '40', md: '48' }}>
        <Skeleton isLoaded={Boolean(points)} mt="2" h="100%">
          <Text
            color="rainwalkMidnightBlue.400"
            fontSize={{
              base: '3xl',
              md: '4xl',
            }}
            fontWeight="bold"
          >
            ⭐️ {points}
          </Text>
        </Skeleton>
      </Center>
      <Center h={{ base: '6', md: '8' }} w={{ base: '40', md: '48' }}>
        <Skeleton isLoaded={Boolean(points)} mt="2" h="100%">
          <Text
            color="rainwalkGray.300"
            fontSize={{
              base: 'md',
              md: 'xl',
            }}
            fontWeight="medium"
            h="100%"
          >
            Rewards points
          </Text>
        </Skeleton>
      </Center>
      <Button
        colorScheme="secondary"
        onPress={onPressEarnRewards}
        mt="6"
        mb="4"
      >
        Earn rewards
      </Button>
      <Button
        colorScheme="secondary"
        onPress={onPressRedeemPoints}
        variant="outline"
      >
        Redeem points
      </Button>
    </Center>
  </RainwalkCard>
);

HealthyRewardsCard.defaultProps = {
  onPressEarnRewards: undefined,
  onPressRedeemPoints: undefined,
  points: undefined,
};

export default HealthyRewardsCard;
