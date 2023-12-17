import ArrowBackIcon from '@material-design-icons/svg/filled/arrow_back.svg';
import SettingsIcon from '@material-design-icons/svg/filled/settings.svg';
import RainwalkLogo from '@rainwalk/assets/rainwalk-logo.svg';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  Box,
  Factory,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  useBreakpointValue,
} from 'native-base';
import type { FunctionComponent, PropsWithChildren } from 'react';
import React, { useCallback, useContext, useMemo } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const NBRainwalkLogo = Factory(RainwalkLogo);

interface IScreenLayoutProps {
  hideBackButton?: boolean;
  hideSettingsButton?: boolean;
  hideTopBarOverflow?: boolean;
  title?: string;
}

const ScreenLayout: FunctionComponent<
  PropsWithChildren<IScreenLayoutProps>
> = ({
  children,
  hideBackButton,
  hideSettingsButton,
  hideTopBarOverflow,
  title,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  // ScreenLayout isn't necessarily used within a TabNavigator, so we set the
  // height to 0 if the context isn't available
  const tabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;

  const buttonIconsSizePixels: number = useBreakpointValue({
    base: 30,
    md: 40,
  });
  const logoWidthPixels: number = useBreakpointValue({
    base: 148,
    md: 48,
  });

  const navigation = useNavigation();

  const canGoBack = useMemo(() => {
    return !hideBackButton || navigation.canGoBack();
  }, [hideBackButton, navigation]);

  const onDrawerOpen = useCallback(() => {
    // while navigation.openDrawer exists, it isn't officially exposed through
    // the useNavigation hook, so we use dispatch to open the drawer instead
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const screenPaddingX: number = useBreakpointValue({
    base: 7,
    sm: 6,
  });

  let keyboard: ReturnType<typeof useAnimatedKeyboard> | undefined = undefined;
  let keyboardOffsetStyle: ReturnType<typeof useAnimatedStyle> | undefined =
    undefined;

  if (Platform.OS === 'ios') {
    // These hook will always be called in the same order, since the platform is
    // constant at runtime:
    //
    // eslint-disable-next-line react-hooks/rules-of-hooks
    keyboard = useAnimatedKeyboard();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    keyboardOffsetStyle = useAnimatedStyle(() => ({
      height: withTiming(
        (keyboard as NonNullable<typeof keyboard>).height.value
      ),
    }));
  }
  return (
    <Box bg="white" safeAreaX safeAreaTop flex={1}>
      <ScrollView overScrollMode="never" bg="white" flex={1}>
        <Box
          width="full"
          bg="rainwalkSand.400"
          pt={{ base: 10, sm: 12 }}
          px={screenPaddingX}
        >
          {Boolean(canGoBack) && (
            <Pressable onPress={navigation.goBack} paddingBottom={3}>
              <Icon
                as={
                  <ArrowBackIcon
                    width={buttonIconsSizePixels}
                    height={buttonIconsSizePixels}
                  />
                }
                fontWeight="bold"
                fill="currentColor"
                color="rainwalkDarkestBrown.400"
              />
            </Pressable>
          )}
          <HStack mb={4}>
            {title === undefined ? (
              <NBRainwalkLogo w={logoWidthPixels} />
            ) : (
              <Text fontSize="lg" color="rainwalkDarkestBrown.400">
                {title}
              </Text>
            )}
            <Spacer />
            {!hideSettingsButton && (
              <Pressable onPress={onDrawerOpen}>
                <Icon
                  as={
                    <SettingsIcon
                      width={buttonIconsSizePixels}
                      height={buttonIconsSizePixels}
                    />
                  }
                  fill="currentColor"
                  color="rainwalkDarkestBrown.400"
                />
              </Pressable>
            )}
          </HStack>
        </Box>
        <Box px={screenPaddingX} pb={tabBarHeight}>
          {!hideTopBarOverflow && (
            <Box
              position="absolute"
              top={0}
              left={0}
              w={windowWidth}
              bg="rainwalkSand.400"
              h={{
                base: 16,
                sm: 24,
              }}
            />
          )}
          {children}
        </Box>
        <Animated.View style={keyboardOffsetStyle} />
      </ScrollView>
    </Box>
  );
};

ScreenLayout.defaultProps = {
  hideBackButton: undefined,
  hideSettingsButton: undefined,
  hideTopBarOverflow: undefined,
  title: undefined,
};

export default ScreenLayout;
