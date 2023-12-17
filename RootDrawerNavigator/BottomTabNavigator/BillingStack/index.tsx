import type { TabNavigatorParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator';
import Billing from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/BillingStack/Billing';
import ClaimPayoutMethods from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/BillingStack/ClaimPayoutMethods';
import PaymentHistory from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/BillingStack/PaymentHistory';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<BillingStackParamList>();

const BillingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Billing" component={Billing} />
    <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
    <Stack.Screen name="ClaimPayoutMethods" component={ClaimPayoutMethods} />
  </Stack.Navigator>
);

export type BillingStackParamList = {
  Billing: undefined;
  ClaimPayoutMethods: undefined;
  PaymentHistory: undefined;
};

export type BillingStackScreenProps<T extends keyof BillingStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<BillingStackParamList, T>,
    BottomTabScreenProps<TabNavigatorParamList, 'BillingStack'>
  >;

export default BillingStack;
