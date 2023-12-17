import ChevronRight from '@material-design-icons/svg/filled/chevron_right.svg';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { Flex, Icon, Pressable, Text, useBreakpointValue } from 'native-base';

interface SimpleNavigationCardProps {
  onPress: () => unknown;
  text: string;
}
const SimpleNavigationCard = ({ text, onPress }: SimpleNavigationCardProps) => {
  const chevronRightIconSizePixels = useBreakpointValue({
    base: 42,
    sm: 50,
  });
  return (
    <Pressable onPress={onPress}>
      <RainwalkCard>
        <Flex
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Text
            color="rainwalkGray.500"
            fontSize={{ base: 'md', sm: 'lg' }}
            fontWeight="bold"
          >
            {text}
          </Text>
          <Icon
            as={
              <ChevronRight
                width={chevronRightIconSizePixels}
                height={chevronRightIconSizePixels}
              />
            }
            color="rainwalkGray.500"
            fill="currentColor"
          />
        </Flex>
      </RainwalkCard>
    </Pressable>
  );
};

export default SimpleNavigationCard;
