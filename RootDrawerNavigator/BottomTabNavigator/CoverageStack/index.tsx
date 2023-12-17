import type { TabNavigatorParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator';
import Coverage from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/CoverageStack/Coverage';
import PolicyDocuments from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/CoverageStack/PolicyDocuments';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<CoverageStackParamList>();

const CoverageStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Coverage" component={Coverage} />
    <Stack.Screen name="PolicyDocuments" component={PolicyDocuments} />
  </Stack.Navigator>
);

export type CoverageStackParamList = {
  Coverage: undefined;
  PolicyDocuments: undefined;
};

export type CoverageStackScreenProps<T extends keyof CoverageStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CoverageStackParamList, T>,
    BottomTabScreenProps<TabNavigatorParamList, 'CoverageStack'>
  >;

export default CoverageStack;
