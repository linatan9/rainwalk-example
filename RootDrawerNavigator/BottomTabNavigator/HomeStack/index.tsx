import type { TabNavigatorParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator';
import ClaimInfoModalScreen, {
  type ClaimInfoModalScreenParams,
} from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimInfoModal';
import Home from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/HomeStack/Home';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="ClaimInfoModal"
      component={ClaimInfoModalScreen}
      options={{ presentation: 'containedTransparentModal' }}
    />
  </Stack.Navigator>
);

export type HomeStackParamList = {
  ClaimInfoModal: ClaimInfoModalScreenParams;
  Home: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<TabNavigatorParamList, 'HomeStack'>
  >;

export default HomeStack;
