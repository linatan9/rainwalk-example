import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Icon, Text, useBreakpointValue } from 'native-base';
import type { FunctionComponent } from 'react';
import type { SvgProps } from 'react-native-svg';

export const BottomTabBarLabel: BottomTabNavigationOptions['tabBarLabel'] = ({
  children,
  focused,
}) => (
  <Text
    color={focused ? 'rainwalkMidnightBlue.400' : 'rainwalkDarkestBrown.400'}
    fontSize={{ base: 'sm' }}
    fontWeight={focused ? 'bold' : 'semibold'}
  >
    {children}
  </Text>
);

export const BottomTabBarIconBuilder =
  (
    TabIcon: FunctionComponent<SvgProps>
  ): BottomTabNavigationOptions['tabBarIcon'] =>
  ({ focused }) => {
    // this is a React component
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const tabIconSize = useBreakpointValue({
      base: 30,
      sm: 34,
    });

    return (
      <Icon
        as={<TabIcon width={tabIconSize} height={tabIconSize} />}
        fill="currentColor"
        color={
          focused ? 'rainwalkMidnightBlue.400' : 'rainwalkDarkestBrown.400'
        }
      />
    );
  };
