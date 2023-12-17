import { RAINWALK_MARKETING_URL } from '@env';
import ChevronRight from '@material-design-icons/svg/filled/chevron_right.svg';
import Close from '@material-design-icons/svg/filled/close.svg';
import { apiHooks } from '@rainwalk/api';
import { useAnalytic } from '@rainwalk/components/AnalyticProvider';
import { AuthenticationCredentialsUpdateContext } from '@rainwalk/contexts/AuthenticationCredentials';
import { NotificationSettingsContext } from '@rainwalk/contexts/NotificationSettings';
import { SelectedPolicyIDUpdateContext } from '@rainwalk/contexts/SelectedPolicyID';
import { captureException, identifyUser } from '@rainwalk/logging';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import {
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import {
  type FunctionComponent,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { Linking } from 'react-native';

const links: DrawerItemProps[] = [
  {
    onPress: () => {
      Linking.openURL(
        `https://${RAINWALK_MARKETING_URL}/terms-conditions/`
      ).catch(captureException);
    },
    text: 'Terms of Use',
  },
  {
    onPress: () => {
      Linking.openURL(
        `https://${RAINWALK_MARKETING_URL}/privacy-policy/`
      ).catch(captureException);
    },
    text: 'Privacy Policy',
  },
];

interface DrawerItemProps {
  onPress: () => void;
  text: string;
}

const DrawerItem: FunctionComponent<DrawerItemProps> = ({ onPress, text }) => (
  <Pressable onPress={onPress}>
    <HStack>
      <Text
        color="rainwalkSand.400"
        fontSize={{ base: 'sm', sm: 'md' }}
        fontWeight={{ base: 'medium', sm: 'semibold' }}
      >
        {text}
      </Text>
      <Spacer />
      <Icon
        as={<ChevronRight width={30} height={30} />}
        color="rainwalkSand.400"
        fill="currentColor"
      />
    </HStack>
  </Pressable>
);

const DrawerContent: FunctionComponent<DrawerContentComponentProps> = ({
  state,
  navigation,
  descriptors,
}) => {
  const { logEvent } = useAnalytic();
  const { data } = apiHooks.useGet('/insured/profile');
  const updateAuthenticationCredentials = useContext(
    AuthenticationCredentialsUpdateContext
  );
  const { updateNotificationSettings } = useContext(
    NotificationSettingsContext
  );
  const updateSelectedPolicyID = useContext(SelectedPolicyIDUpdateContext);

  const onDrawerClose = useCallback(() => {
    // while navigation.closeDrawer exists, it isn't officially exposed through
    // the useNavigation hook, so we use dispatch to open the drawer instead
    navigation.dispatch(DrawerActions.closeDrawer());
  }, [navigation]);

  const logout = useCallback(() => {
    onDrawerClose();
    updateSelectedPolicyID('');
    updateAuthenticationCredentials({
      accessToken: '',
      refreshToken: '',
    });
    updateNotificationSettings({ isPushDisabled: true });
    identifyUser({ email: '', name: '' });
    logEvent('logOutPressed');
  }, [
    onDrawerClose,
    updateAuthenticationCredentials,
    updateSelectedPolicyID,
    updateNotificationSettings,
    logEvent,
  ]);

  const drawerItems = useMemo(
    () =>
      state.routes
        .map((route, i) => ({
          // adapted from @react-navigation/drawer/src/viewsDrawerItemList.tsx
          onPress: () => {
            const event = navigation.emit({
              type: 'drawerItemPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              navigation.dispatch({
                ...(i === state.index
                  ? DrawerActions.closeDrawer()
                  : CommonActions.navigate({ name: route.name, merge: true })),
                target: state.key,
              });
            }
          },
          text: descriptors[route.key].options.title,
        }))
        .filter((item): item is DrawerItemProps => item.text !== undefined)
        .concat(links)
        .map((item) => (
          <DrawerItem key={item.text} onPress={item.onPress} text={item.text} />
        )),
    [state, descriptors, navigation]
  );

  return (
    <VStack bg="rainwalkMidnightBlue.400" h="full" px={6} py={12} space={6}>
      <Pressable alignSelf="flex-end" onPress={onDrawerClose}>
        <Icon
          as={<Close width={40} height={40} />}
          fill="currentColor"
          color="rainwalkSand.400"
        />
      </Pressable>
      <Text
        color="rainwalkSand.400"
        fontSize={{ base: 'md', sm: '2xl' }}
        fontWeight={{
          base: 'medium',
          sm: 'bold',
        }}
      >
        {data?.user.first_name} {data?.user.last_name}
      </Text>
      <Divider bg="rainwalkSand.400" />
      {drawerItems}
      <Spacer />
      <Center>
        <Button variant="outline" onPress={logout} mb={2}>
          Log out
        </Button>
      </Center>
    </VStack>
  );
};

export default DrawerContent;
