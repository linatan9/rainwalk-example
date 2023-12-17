import BillingIcon from '@rainwalk/assets/billing-tab-icon.svg';
import ClaimsIcon from '@rainwalk/assets/claims-tab-icon.svg';
import CoverageIcon from '@rainwalk/assets/coverage-tab-icon.svg';
import HomeIcon from '@rainwalk/assets/home-tab-icon.svg';
import PerksIcon from '@rainwalk/assets/perks-tab-icon.svg';
// import MoreIcon from '@rainwalk/assets/more-tab-icon.svg';
import { useAnalytic } from '@rainwalk/components/AnalyticProvider';
import type { Events } from '@rainwalk/components/AnalyticProvider/events';
import {
  BottomTabBarIconBuilder,
  BottomTabBarLabel,
} from '@rainwalk/components/BottomTabBar';
import type { BillingStackParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/BillingStack';
import BillingStack from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/BillingStack';
import type { ClaimsStackParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import ClaimsStack from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/ClaimsStack';
import type { CoverageStackParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/CoverageStack';
import CoverageStack from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/CoverageStack';
import type { HomeStackParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/HomeStack';
import HomeStack from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/HomeStack';
import type { MarketplaceStackParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MarketplaceStack/MarketplaceStack';
import MarketplaceStack from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MarketplaceStack/MarketplaceStack';
import type { MoreStackParamList } from '@rainwalk/RootDrawerNavigator/BottomTabNavigator/MoreStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { useBreakpointValue } from 'native-base';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const HomeTabIcon = BottomTabBarIconBuilder(HomeIcon);
const CoverageTabIcon = BottomTabBarIconBuilder(CoverageIcon);
const BillingTabIcon = BottomTabBarIconBuilder(BillingIcon);
const ClaimsTabIcon = BottomTabBarIconBuilder(ClaimsIcon);
const PerksTabIcon = BottomTabBarIconBuilder(PerksIcon);
// const MoreTabIcon = BottomTabBarIconBuilder(MoreIcon);

const BottomTabNavigator = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const tabBarHeight: number = useBreakpointValue({ base: 60, sm: 70 });
  const { logEvent } = useAnalytic();
  const onTabPressed = (eventName: keyof Events) => {
    logEvent(eventName);
  };
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: Platform.OS === 'android',
        tabBarItemStyle: {
          height: tabBarHeight - 10,
          marginTop: 10,
        },
        tabBarLabel: BottomTabBarLabel,
        tabBarStyle: {
          height: tabBarHeight + safeAreaInsets.bottom,
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: HomeTabIcon,
          title: 'Home',
        }}
        listeners={() => ({
          tabPress: () => {
            onTabPressed('homePageTabPressed');
          },
        })}
      />
      <Tab.Screen
        name="CoverageStack"
        component={CoverageStack}
        options={{ tabBarIcon: CoverageTabIcon, title: 'Coverage' }}
        listeners={() => ({
          tabPress: () => {
            onTabPressed('coveragePageTabPressed');
          },
        })}
      />
      <Tab.Screen
        name="BillingStack"
        component={BillingStack}
        options={{ tabBarIcon: BillingTabIcon, title: 'Billing' }}
        listeners={() => ({
          tabPress: () => {
            onTabPressed('billingPageTabPressed');
          },
        })}
      />
      <Tab.Screen
        name="ClaimsStack"
        component={ClaimsStack}
        options={{ tabBarIcon: ClaimsTabIcon, title: 'Claims' }}
        listeners={() => ({
          tabPress: () => {
            onTabPressed('claimsPageTabPressed');
          },
        })}
      />

      <Tab.Screen
        name="MarketplaceStack"
        component={MarketplaceStack}
        listeners={() => ({
          tabPress: () => {
            onTabPressed('perksPageTabPressed');
          },
        })}
        options={() => ({ tabBarIcon: PerksTabIcon, title: 'Perks' })}
      />
      {/* <Tab.Screen */}
      {/*  name="MoreStack" */}
      {/*  component={MoreStack} */}
      {/*  listeners={() => ({ */}
      {/*    tabPress: () => { */}
      {/*      onTabPressed('morePageTabPressed'); */}
      {/*    }, */}
      {/*  })} */}
      {/*  options={({ route }) => ({ */}
      {/*    tabBarIcon: MoreTabIcon, */}
      {/*    ...(( */}
      {/*      [ */}
      {/*        'PetRecords', */}
      {/*        'Inbox', */}
      {/*        'InboxMessage', */}
      {/*      ] as (keyof MoreStackParamList)[] */}
      {/*    ).includes( */}
      {/*      getFocusedRouteNameFromRoute(route) as keyof MoreStackParamList */}
      {/*    ) && { */}
      {/*      tabBarStyle: { */}
      {/*        display: 'none', */}
      {/*      }, */}
      {/*    }), */}
      {/*    title: 'More', */}
      {/*  })} */}
      {/* /> */}
    </Tab.Navigator>
  );
};

type TabNavigatorParamList = {
  BillingStack: NavigatorScreenParams<BillingStackParamList>;
  ClaimsStack: NavigatorScreenParams<ClaimsStackParamList>;
  CoverageStack: NavigatorScreenParams<CoverageStackParamList>;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  MarketplaceStack: NavigatorScreenParams<MarketplaceStackParamList>;
  MoreStack: NavigatorScreenParams<MoreStackParamList>;
};

export type { TabNavigatorParamList };
export default BottomTabNavigator;
