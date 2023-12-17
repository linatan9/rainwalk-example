import type { Events } from '@rainwalk/components/AnalyticProvider/events';
import type { IMarketpalceItem } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MarketplaceStack/marketpalceData';
import { PERKS_TYPE } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MarketplaceStack/marketpalceData';
import { Box, Button, Icon, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  item: IMarketpalceItem;
  onClaim: (e: keyof Events, link: string) => void;
}

export const MarketplaceItem: React.FC<Props> = ({ item, onClaim }) => {
  const ImageItem = item.image;
  const whyLoveText =
    item.type === PERKS_TYPE.GENTLY_BEAST
      ? 'Why we love Gentle Beast'
      : 'Why we love The Pets Table';
  const onClaimPress = () => {
    onClaim(item.event, item.link);
  };
  return (
    <VStack
      borderStyle="solid"
      borderWidth="2"
      borderColor="rainwalkMidnightBlue.400"
      borderRadius={4}
      mt={3}
    >
      <Icon style={styles.logo} as={item.logo} />
      <Icon
        as={<ImageItem preserveAspectRatio="xMidYMid slice" width="100%" />}
      />
      <Text
        mt={5}
        color="rainwalkMidnightBlue.400"
        fontWeight="bold"
        textAlign="center"
        px={item.type === PERKS_TYPE.GENTLY_BEAST ? 4 : 14}
        lineHeight="2xs"
        fontSize={{
          base: '3xl',
        }}
      >
        {item.title}
      </Text>
      <Text
        mt={5}
        px={2}
        fontSize={{
          base: 'md',
        }}
        textAlign="center"
      >
        {item.subtitle}
      </Text>
      <Button
        alignSelf="center"
        mb={4}
        mt={7}
        colorScheme="primary"
        onPress={onClaimPress}
      >
        <Text
          alignSelf="center"
          fontWeight="bold"
          textAlign="center"
          color="rainwalkSageGreen.50"
          fontSize={{
            base: 'md',
          }}
        >
          Claim your discount
        </Text>
      </Button>
      <Text
        mt={5}
        color="rainwalkMidnightBlue.400"
        fontWeight="bold"
        textAlign="center"
        fontSize={{
          base: 'xl',
        }}
      >
        {whyLoveText}
      </Text>
      <Box p={4} mt={5} m={4} bg="rainwalkSageGreen.400">
        <Text
          fontSize={{
            base: 'md',
          }}
          textAlign="center"
        >
          {item.description}
        </Text>
        <Text
          mt={2}
          fontSize={{
            base: 'md',
          }}
          textAlign="center"
        >
          <Text fontWeight="semibold">- {item.username},&nbsp;</Text>
          {item.roleDescription}
        </Text>
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    zIndex: 20,
    left: 10,
    top: 10,
  },
});
