import { LOGROCKET_APP_ID } from '@env';
import LogRocket from '@logrocket/react-native';
import * as Sentry from '@sentry/react-native';

export const initializeSessionLogging = () => {
  if (__DEV__) return;
  LogRocket.init(LOGROCKET_APP_ID);
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra('sessionURL', sessionURL);
    });
  });
};
