import Gamepad from '@material-design-icons/svg/filled/gamepad.svg';
import Clipboard from '@rainwalk/assets/clipboard.svg';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { Box, Divider, HStack, Icon, Text, VStack } from 'native-base';
import type { FunctionComponent } from 'react';

const points = [
  'Visit any veterinarian or service provider.',
  'Go to your account portal, submit your claims form and receipt from your vet.',
  'Wait and get reimbursed!',
];

const HowOurClaimsWorkCard: FunctionComponent = () => {
  return (
    <RainwalkCard bg="rainwalkSageGreen.400">
      <Box alignContent="center" alignItems="center" marginY={6}>
        <Text
          color="rainwalkDeepGreen.400"
          fontSize={{
            base: 'sm',
            sm: '2xl',
          }}
          fontWeight="bold"
          textTransform="uppercase"
          marginBottom={2}
        >
          HOW OUR CLAIMS WORK
        </Text>
        <Divider bg="rainwalkGray.400" orientation="horizontal" />

        <Box marginTop={6}>
          <Clipboard width={75} />
        </Box>

        <VStack marginX={6} marginTop={6} space={4}>
          {points.map((text) => (
            <HStack w="100%" space={2} key={text}>
              <Icon
                as={<Gamepad />}
                fill="currentColor"
                color="rainwalkMidnightBlue.400"
              />
              <Text fontSize={{ base: 'sm', md: 'md' }}>{text}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </RainwalkCard>
  );
};

export default HowOurClaimsWorkCard;
