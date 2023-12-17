import { RAINWALK_INSURED_URL } from '@env';
import { apiHooks } from '@rainwalk/api';
import { isJWTExpired } from '@rainwalk/api/authentication';
import { useAnalytic } from '@rainwalk/components/AnalyticProvider';
import RainwalkCard from '@rainwalk/components/RainwalkCard';
import { AuthenticationCredentialsContext } from '@rainwalk/contexts/AuthenticationCredentials';
import { captureException } from '@rainwalk/logging';
import { Pressable } from 'native-base';
import { useContext, useMemo } from 'react';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const FirstVetWidget = () => {
  const { mutate } = apiHooks.usePost('/insured/auth/refresh-token');
  const { logEvent } = useAnalytic();
  const { accessToken, refreshToken } = useContext(
    AuthenticationCredentialsContext
  );
  const firstVetWidgetURL = useMemo(
    () =>
      accessToken !== undefined
        ? `https://${RAINWALK_INSURED_URL}/first-vet-widget?token=${accessToken}`
        : undefined,
    [accessToken]
  );

  const onPress = () => {
    if (firstVetWidgetURL === undefined) return;
    logEvent('firstVetNextAvailableTime');
    Linking.openURL(`${firstVetWidgetURL}&openSchedulingModal=true`).catch(
      captureException
    );
  };

  const updateExpiredAccessToken = () => {
    if (!isJWTExpired(accessToken)) return;
    if (refreshToken === undefined) return;
    mutate({ refresh: refreshToken });
  };

  return firstVetWidgetURL !== undefined ? (
    <Pressable h="full" w="full" onPress={onPress}>
      <WebView
        source={{ uri: firstVetWidgetURL }}
        startInLoadingState
        pointerEvents="none"
        onLoadStart={updateExpiredAccessToken}
      />
    </Pressable>
  ) : null;
};

const FirstVetCard = () => (
  <RainwalkCard h="300px">
    <FirstVetWidget />
  </RainwalkCard>
);

export default FirstVetCard;
