import WhatsNewLogo from '@rainwalk/assets/images/whatsNew.svg';
import { useAnalytic } from '@rainwalk/components/AnalyticProvider';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Icon, Text, VStack } from 'native-base';
import React from 'react';

export const WhatsNew = () => {
  const navigation = useNavigation();
  const { logEvent } = useAnalytic();
  const goToPerks = () => {
    logEvent('whatsNewClaimPerksPressed');
    navigation.navigate('BottomTabNavigator', {
      screen: 'MarketplaceStack',
      params: { screen: 'Marketplace' },
    });
  };
  return (
    <RainwalkCard boxPX={{}} boxPY={{}}>
      <Box width="100%" height={4} bg="rainwalkRustRed.400" />
      <VStack
        mt={-2}
        p={4}
        pt={0}
        alignContent="center"
        bg="rainwalkLightBlue.50"
        alignItems="center"
        borderRadius={10}
      >
        <Text
          color="rainwalkMidnightBlue.400"
          fontSize={{ base: '2xl' }}
          fontWeight="bold"
          mt={3}
          textAlign="center"
        >
          What&apos;s new
        </Text>
        <Icon
          alignSelf="center"
          as={<WhatsNewLogo width={180} height={180} />}
          color="rainwalkDarkestBrown.400"
          fill="currentColor"
          mt={2}
        />
        <Text
          color="rainwalkMidnightBlue.400"
          fontSize={{ base: 'md', sm: 'xl' }}
          fontWeight="bold"
          mt={3}
          textAlign="center"
        >
          Claim discounts for dog training and fresh pet food
        </Text>
        <Text fontSize={{ base: 'sm', sm: 'md' }} mt={2} textAlign="center">
          Rainwalk is partnering with companies we love to provide you with
          exclusive discounts and freebies.
        </Text>
        <Button alignSelf="center" mt={8} variant="outline" onPress={goToPerks}>
          Claim your perks
        </Button>
      </VStack>
    </RainwalkCard>
  );
};
