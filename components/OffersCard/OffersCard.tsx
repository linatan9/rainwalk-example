import { RAINWALK_QUOTING_URL } from '@env';
import TwoPetsIcon from '@rainwalk/assets/two-pets-icon.svg';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { captureException } from '@rainwalk/logging';
import { Button, Icon, Text } from 'native-base';
import { Linking } from 'react-native';

const addNewPet = () => {
  Linking.openURL(
    `https://${RAINWALK_QUOTING_URL}/start?utm_source=SecondPet&utm_medium=customer&utm_campaign=mobile-app&discount=10`
  ).catch(captureException);
};

export const OffersCard = () => (
  // TODO(cjshearer): use proper capitalization instead of all caps. Screen
  // readers will read this as an acronym, not as a word.
  <RainwalkCard title={{ text: 'OFFERS' }}>
    <Icon
      alignSelf="center"
      as={<TwoPetsIcon width={66} height={66} />}
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
      10% multipet discount
    </Text>
    <Text
      color="rainwalkDarkestBrown.400"
      fontSize={{ base: 'sm', sm: 'md' }}
      mt={2}
      textAlign="center"
    >
      When you sign up additional pets, we&apos;ll take 10% off your premiums.
    </Text>
    <Button alignSelf="center" mt={8} variant="outline" onPress={addNewPet}>
      Add new pet
    </Button>
  </RainwalkCard>
);
