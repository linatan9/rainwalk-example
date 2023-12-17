import { apiHooks, RainwalkFirstAppLaunchKey } from '@rainwalk/api';
import { isLocalKeyPresent, saveString } from '@rainwalk/helpers/helpers';
import { captureException } from '@rainwalk/logging';
import type { FunctionComponent, PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState } from 'react-native';
import type { DeviceState, SubscriptionChange } from 'react-native-onesignal';
import OneSignal from 'react-native-onesignal';

// TODO: union with other notification subscription types as needed
export type NotificationSettings = Partial<DeviceState> & SubscriptionChange;
export interface INotificationsContext {
  isLoading: boolean;
  updateNotificationSettings: ({
    isPushDisabled,
  }: Partial<NotificationSettings>) => void;
}
export const initialNotificationSettings: NotificationSettings = {
  isPushDisabled: false,
  isSubscribed: false,
} as const;

export const NotificationSettingsContext = createContext<
  INotificationsContext & NotificationSettings
>({
  ...initialNotificationSettings,
  updateNotificationSettings: (_: Partial<NotificationSettings>) => {},
  isLoading: false,
});

const NotificationSettingsProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { mutate, isLoading } = apiHooks.usePatch('/insured/profile');
  const appState = useRef(AppState.currentState);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(initialNotificationSettings);

  const setFirstLaunchKey = async () => {
    const currentDate = new Date().toDateString();
    await saveString(RainwalkFirstAppLaunchKey, currentDate);
  };

  const updateSettings = useCallback(
    (settings: NotificationSettings) => {
      setNotificationSettings((prevSettings) => ({
        ...prevSettings,
        ...settings,
      }));
    },
    [setNotificationSettings]
  );

  const getSetitngs = useCallback(async () => {
    return getNotificationSettings()
      .then(updateSettings)
      .catch(captureException);
  }, [updateSettings]);
  // hydrate notification settings
  useEffect(() => {
    const askNotificationPermissions = async (): Promise<void> => {
      const isFirstLaunch = await isLocalKeyPresent(
        RainwalkFirstAppLaunchKey
      ).catch(captureException);
      if (isFirstLaunch === null) {
        OneSignal.promptForPushNotificationsWithUserResponse();
        await setFirstLaunchKey();
      }
    };
    getSetitngs().then(async () => {
      await askNotificationPermissions();
    });
  }, [getSetitngs]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        /inactive|background/.exec(appState.current) &&
        nextAppState === 'active'
      ) {
        getNotificationSettings()
          .then((deviceState) => {
            if (deviceState.hasNotificationPermission) {
              updateSettings(deviceState);
              subscription.remove();
            }
          })
          .catch(captureException);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [updateSettings]);

  // subscribe to notification settings
  useEffect(() => {
    subscribeToNotificationSettings(updateSettings);
  }, [updateSettings]);

  const getNotificationSettings = async (): Promise<NotificationSettings> => {
    const deviceState = await OneSignal.getDeviceState().catch(
      captureException
    );
    return {
      ...initialNotificationSettings,
      ...deviceState,
    };
  };

  const handleUpdatePushNotification = useCallback(
    (isPushDisabled: boolean, deviceState: DeviceState) => {
      if (!deviceState.hasNotificationPermission) {
        OneSignal.promptForPushNotificationsWithUserResponse(true);
        return;
      }
      if (isPushDisabled === deviceState.isPushDisabled) {
        return;
      }
      OneSignal.disablePush(isPushDisabled);
      mutate(
        { push_notifications_enabled: !isPushDisabled },
        {
          onSuccess: () => {
            setNotificationSettings({
              ...notificationSettings,
              isPushDisabled,
            });
          },
          onError: captureException,
        }
      );
    },
    [notificationSettings, mutate]
  );

  /**
   * Subscribe to changes notification settings changes.
   *
   * @param callback A function that will be called when the notification settings
   * change.
   *
   * @returns A function that will unsubscribe ALL notification settings
   * subscribers. OneSignal does not provide a way to unsubscribe a per-callback
   * unsubscribe function, so this function will unsubscribe ALL callbacks.
   */
  const subscribeToNotificationSettings = (
    callback: (notificationSettings: NotificationSettings) => unknown
  ) => {
    OneSignal.addSubscriptionObserver((event) => {
      callback(event.to);
    });
    return () => {
      OneSignal.clearSubscriptionObservers();
    };
  };

  /**
   * Update the notification settings.
   *
   * @param newSettings The notification settings that should be updated. Handlers
   * for each new setting provided will be called.
   */
  const updateNotificationSettings = useCallback(
    ({ isPushDisabled }: Partial<NotificationSettings>) => {
      OneSignal.getDeviceState()
        .then((deviceState) => {
          if (deviceState === null) return;
          if (isPushDisabled !== undefined)
            handleUpdatePushNotification(isPushDisabled, deviceState);
          // TODO: handle updating other notification settings as needed
        })
        .catch(captureException);
    },
    [handleUpdatePushNotification]
  );

  const value = useMemo(
    () => ({
      ...notificationSettings,
      isLoading,
      updateNotificationSettings,
    }),
    [notificationSettings, updateNotificationSettings, isLoading]
  );

  return (
    <NotificationSettingsContext.Provider value={value}>
      {children}
    </NotificationSettingsContext.Provider>
  );
};

export default NotificationSettingsProvider;
