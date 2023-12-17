import { apiHooks } from '@rainwalk/api';
import { isJWTExpired } from '@rainwalk/api/authentication';
import DrawerContent from '@rainwalk/components/DrawerContent';
import { AuthenticationCredentialsContext } from '@rainwalk/contexts/AuthenticationCredentials';
import { identifyUser, initializeSessionLogging } from '@rainwalk/logging';
import { initializeMessaging } from '@rainwalk/messaging';
import BottomTabNavigator, {
  type TabNavigatorParamList,
} from '@rainwalk/RootDrawerNavigator/BottomTabNavigator';
import { Login, LoginContainer } from '@rainwalk/RootDrawerNavigator/Login';
import Notifications from '@rainwalk/RootDrawerNavigator/Notifications';
import PersonalInformation from '@rainwalk/RootDrawerNavigator/PersonalInformation';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { useContext, useEffect } from 'react';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const RootDrawerNavigator = () => {
  const { refreshToken } = useContext(AuthenticationCredentialsContext);
  const isAuthenticated = !isJWTExpired(refreshToken);
  const {
    data: { user: { email, first_name: firstName, last_name: lastName } } = {
      user: { email: undefined, first_name: undefined, last_name: undefined },
    },
  } = apiHooks.useGet('/insured/profile', undefined, {
    enabled: isAuthenticated,
  });
  useEffect(() => {
    if (email === undefined) return;
    initializeMessaging();
    initializeSessionLogging();
    identifyUser({ email, name: `${firstName ?? ''} ${lastName ?? ''}` });
  }, [email, firstName, lastName]);

  if (refreshToken === undefined) return <LoginContainer />;

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          width: '80%',
        },
        drawerType: 'front',
        headerShown: false,
        // swipe is disabled as the drawer could be opened in the login screen
        swipeEnabled: false,
      }}
      initialRouteName={isAuthenticated ? 'BottomTabNavigator' : 'Login'}
    >
      {isAuthenticated ? (
        <>
          <Drawer.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Drawer.Screen
            name="PersonalInformation"
            component={PersonalInformation}
            options={{ title: 'Personal Info' }}
          />
          <Drawer.Screen
            name="Notifications"
            component={Notifications}
            options={{ title: 'Notifications' }}
          />
        </>
      ) : (
        <Drawer.Screen name="Login" component={Login} />
      )}
    </Drawer.Navigator>
  );
};

type RootDrawerParamList = {
  BottomTabNavigator: NavigatorScreenParams<TabNavigatorParamList>;
  Login: undefined;
  Notifications: undefined;
  PersonalInformation: undefined;
};

type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
  DrawerScreenProps<RootDrawerParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootDrawerParamList {}
  }
}

export type { RootDrawerParamList, RootDrawerScreenProps };
export default RootDrawerNavigator;
