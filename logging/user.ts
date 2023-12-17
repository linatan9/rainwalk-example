import LogRocket from '@logrocket/react-native';
import * as Sentry from '@sentry/react-native';
import OneSignal from 'react-native-onesignal';

const previouslyIdentifiedUser = {
  email: '',
  name: '',
};

export const identifyUser = (user: typeof previouslyIdentifiedUser) => {
  if (user.email === previouslyIdentifiedUser.email) return;
  Object.assign(previouslyIdentifiedUser, user);

  if (user.email === '') {
    OneSignal.removeExternalUserId();
    OneSignal.logoutEmail();
    Sentry.setUser(null);
    return;
  }
  LogRocket.identify(user.email, user);
  OneSignal.setExternalUserId(user.email);
  OneSignal.setEmail(user.email);
  Sentry.setUser(user);
};
