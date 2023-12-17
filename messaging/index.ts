import { ONESIGNAL_APP_ID } from '@env';
import OneSignal from 'react-native-onesignal';

export const initializeMessaging = () => {
  OneSignal.setAppId(ONESIGNAL_APP_ID);
};
