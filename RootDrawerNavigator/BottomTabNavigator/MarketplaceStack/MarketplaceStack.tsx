import { MarketplaceList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MarketplaceStack/MarketplaceList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MarketplaceStackParamList>();

const MarketplaceStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Marketplace" component={MarketplaceList} />
  </Stack.Navigator>
);

export type MarketplaceStackParamList = {
  Marketplace: undefined;
};

export default MarketplaceStack;
