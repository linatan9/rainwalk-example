import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, VStack } from 'native-base';
import type { FunctionComponent } from 'react';

const ThingsToDoCard: FunctionComponent = () => {
  const navigation = useNavigation();

  const links = [
    {
      text: 'Update policy info',
      onPress: () => {
        navigation.navigate('BottomTabNavigator', {
          screen: 'CoverageStack',
          params: {
            screen: 'Coverage',
          },
        });
      },
    },
    {
      text: 'Review billing and payment info',
      onPress: () => {
        navigation.navigate('BottomTabNavigator', {
          screen: 'BillingStack',
          params: {
            screen: 'Billing',
          },
        });
      },
    },
  ];

  // TODO(cjshearer): use proper capitalization instead of all caps. Screen
  // readers will read this as an acronym, not as a word.
  return (
    <RainwalkCard title={{ text: 'THINGS TO DO' }}>
      <VStack space={{ base: '3', sm: '4' }}>
        {links.map((link) => (
          <Pressable key={link.text} onPress={link.onPress}>
            <Text
              color="rainwalkGray.400"
              fontSize={{ base: 'md', lg: 'lg' }}
              underline
            >
              {link.text}
            </Text>
          </Pressable>
        ))}
      </VStack>
    </RainwalkCard>
  );
};

export default ThingsToDoCard;
