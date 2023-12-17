import type { PayoutMethodEnum } from '@rainwalk/api';
import type { TabNavigatorParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator';
import ClaimInfoModalScreen, {
  type ClaimInfoModalScreenParams,
} from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimInfoModal';
import ClaimPayoutSelectionModal from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack/ClaimPayoutSelectionModal';
import ClaimsHome from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack/Claims';
import ClaimView from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack/ClaimView';
import SubmitClaim from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack/SubmitClaim';
import SubmitClaimSuccessModalScreen from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack/SubmitClaimSuccessModal';
import ViewAllClaims from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack/ViewAllClaims';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { z } from 'zod';

const Stack = createNativeStackNavigator<ClaimsStackParamList>();

const ClaimsStack = () => (
  <Stack.Navigator
    initialRouteName="Claims"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Claims" component={ClaimsHome} />
    <Stack.Screen name="SubmitClaim" component={SubmitClaim} />
    <Stack.Screen name="ClaimView" component={ClaimView} />
    <Stack.Screen name="ViewAllClaims" component={ViewAllClaims} />
    <Stack.Group screenOptions={{ presentation: 'containedTransparentModal' }}>
      <Stack.Screen name="ClaimInfoModal" component={ClaimInfoModalScreen} />
      <Stack.Screen
        name="ClaimPayoutSelectionModal"
        component={ClaimPayoutSelectionModal}
      />
      <Stack.Screen
        name="SubmitClaimSuccessModal"
        component={SubmitClaimSuccessModalScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export type ClaimsStackParamList = {
  ClaimInfoModal: ClaimInfoModalScreenParams;
  ClaimPayoutSelectionModal: { payoutMethod: z.infer<typeof PayoutMethodEnum> };
  ClaimView: { claimId: number; petName: string | undefined };
  Claims: undefined;
  SubmitClaim:
    | { claimId: number }
    | { payoutMethod: z.infer<typeof PayoutMethodEnum> }
    | undefined;
  SubmitClaimSuccessModal: undefined;
  ViewAllClaims: undefined;
};

export type ClaimsStackScreenProps<T extends keyof ClaimsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ClaimsStackParamList, T>,
    BottomTabScreenProps<TabNavigatorParamList, 'ClaimsStack'>
  >;

export default ClaimsStack;
