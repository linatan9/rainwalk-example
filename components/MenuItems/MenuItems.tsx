import ChevronRight from '@material-design-icons/svg/filled/chevron_right.svg';
import type { IPressableProps } from 'native-base';
import { HStack, Icon, Pressable, Text } from 'native-base';
import type { FunctionComponent } from 'react';

interface MenuItemsProps {
  items: (IPressableProps & {
    key: string;
    title: string;
  })[];
}

const MenuItems: FunctionComponent<MenuItemsProps> = ({ items, ...rest }) => (
  <>
    {items.map(({ key, onPress, title }, itemIndex) => (
      <Pressable
        key={key}
        onPress={onPress}
        mb={itemIndex !== items.length - 1 ? { base: 3, sm: 4 } : undefined}
        {...rest}
      >
        <HStack justifyContent="space-between">
          <Text
            color="rainwalkGray.400"
            fontSize="md"
            fontWeight={{ base: 'medium', sm: 'semibold' }}
          >
            {title}
          </Text>
          <Icon
            as={<ChevronRight width={24} height={24} />}
            color="rainwalkGray.300"
            fill="currentColor"
          />
        </HStack>
      </Pressable>
    ))}
  </>
);
export default MenuItems;
