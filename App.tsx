import { ApiPluginLoader } from '@rainwalk/api';
import { AnalyticsContextProvider } from '@rainwalk/components/AnalyticProvider';
import { UxCamProvider } from '@rainwalk/components/UxCamProvider/UxCamProvider';
import ContextProvider from '@rainwalk/contexts';
import {
  initializeNavigationLogging,
  logNavigationStateChange,
} from '@rainwalk/logging';
import RootDrawerNavigator from '@rainwalk/RootDrawerNavigator';
import rainwalkConfig from '@rainwalk/theme';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import type { PropsWithChildren } from 'react';
import { StrictMode, useEffect } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState, Platform } from 'react-native';
import { enableFreeze } from 'react-native-screens';

enableFreeze(true);

const queryClient = new QueryClient();

/**
 * Component used to set app-wide context.
 *
 * Also used as a global storybook decorator.
 */
export const SharedAppAndStorybookEnvironment = ({
  children,
}: PropsWithChildren<unknown>) => {
  // https://tanstack.com/query/v4/docs/react/react-native#refetch-on-app-focus
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider config={rainwalkConfig}>
          <ContextProvider>
            <ApiPluginLoader>{children}</ApiPluginLoader>
          </ContextProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export const App = () => {
  const navigationRef = useNavigationContainerRef();
  return (
    <SharedAppAndStorybookEnvironment>
      <AnalyticsContextProvider>
        <UxCamProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              initializeNavigationLogging(navigationRef);
            }}
            onStateChange={logNavigationStateChange}
          >
            <RootDrawerNavigator />
          </NavigationContainer>
        </UxCamProvider>
      </AnalyticsContextProvider>
    </SharedAppAndStorybookEnvironment>
  );
};

export default App;
