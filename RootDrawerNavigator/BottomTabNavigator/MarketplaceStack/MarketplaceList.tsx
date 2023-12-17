import PerksArtboard1 from '@rainwalk/assets/images/perksArtboard_1.svg';
import PerksArtboard2 from '@rainwalk/assets/images/perksArtboard_2.svg';
import { useAnalytic } from '@rainwalk/components/AnalyticProvider';
import type { Events } from '@rainwalk/components/AnalyticProvider/events';
import { MarketplaceItem } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MarketplaceStack/components/MarketplaceItem/MarketplaceItem';
import { MARKETPLACE_ITEMS } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MarketplaceStack/marketpalceData';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import { HStack, Icon, Text, VStack } from 'native-base';
import React from 'react';
import { Linking, StyleSheet } from 'react-native';

export const MarketplaceList = () => {
  const { logEvent } = useAnalytic();
  const onClaim = (event: keyof Events, link: string) => {
    logEvent(event);
    Linking.openURL(link);
  };
  return (
    <ScreenLayout hideBackButton>
      <VStack backgroundColor="rainwalkLightBlue.400" p={4} pb={8}>
        <HStack>
          <Icon style={style.artBoard1} as={<PerksArtboard1 width="50%" />} />
          <Icon style={style.artBoard2} as={<PerksArtboard2 width="50%" />} />
        </HStack>
        <Text
          color="rainwalkMidnightBlue.400"
          fontWeight="bold"
          textAlign="start"
          lineHeight="xs"
          mb={5}
          fontSize={{
            base: '5xl',
          }}
        >
          {`Pet parent \nperks`}
        </Text>
        <Text
          color="rainwalkDarkestBrown.400"
          fontWeight="bold"
          textAlign="start"
          lineHeight="md"
          fontSize={{
            base: 'xl',
          }}
        >
          Rainwalk has partnered with these companies that we love to provide
          you with great rewards and discounts.
        </Text>
      </VStack>
      {MARKETPLACE_ITEMS.map((item) => (
        <MarketplaceItem onClaim={onClaim} key={item.username} item={item} />
      ))}
    </ScreenLayout>
  );
};

const style = StyleSheet.create({
  artBoard1: {
    marginTop: 20,
  },
  artBoard2: {
    marginTop: -20,
  },
});
