import type { TabNavigatorParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator';
import Inbox from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack/Inbox';
import InboxMessage from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack/InboxMessage';
import More from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack/More';
import PetRecords from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack/PetRecords';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MoreStackParamList>();

const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="More" component={More} />
    <Stack.Screen name="Inbox" component={Inbox} />
    <Stack.Screen name="InboxMessage" component={InboxMessage} />
    <Stack.Screen name="PetRecords" component={PetRecords} />
  </Stack.Navigator>
);

export type MoreStackParamList = {
  Inbox: undefined;
  InboxMessage: { messageId: string };
  More: undefined;
  PetRecords: undefined;
};

export type MoreStackScreenProps<T extends keyof MoreStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MoreStackParamList, T>,
    BottomTabScreenProps<TabNavigatorParamList, 'MoreStack'>
  >;

export default MoreStack;
