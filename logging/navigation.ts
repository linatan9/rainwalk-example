import LogRocket from '@logrocket/react-native';
import { routingInstrumentation } from '@rainwalk/logging/error';
import type {
  NavigationState,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { getPathFromState } from '@react-navigation/native';

export const initializeNavigationLogging = (
  navigation: ReturnType<typeof useNavigationContainerRef>
) => {
  routingInstrumentation.registerNavigationContainer(navigation);
};

let previousPath = '';
export const logNavigationStateChange = (state?: NavigationState) => {
  if (state === undefined) return;
  const path = getPathFromState(state).replace('/', '');
  // a state update isn't necessarily a navigation, but we only want to log
  // navigations
  if (path === previousPath) return;
  previousPath = path;
  LogRocket.tagPage(path);
};
