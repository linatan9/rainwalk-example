import type { AnalyticsContextState } from '@rainwalk/components/AnalyticProvider/AnalyticsContext';
import { AnalyticsContext } from '@rainwalk/components/AnalyticProvider/AnalyticsContext';
import analytics from '@react-native-firebase/analytics';
import type { ReactElement } from 'react';
import React, { useMemo, useState } from 'react';
import RNUxcam from 'react-native-ux-cam';

interface Props {
  children: React.ReactNode;
}

export const AnalyticsContextProvider = ({ children }: Props): ReactElement => {
  // eslint-disable-next-line react/hook-use-state
  const [state] = useState<AnalyticsContextState>({
    logEvent: async (...args): Promise<void> => {
      // @ts-expect-error args
      await analytics().logEvent(...args);
      // @ts-expect-error args
      RNUxcam.logEvent(...args);
    },
  });

  const value = useMemo(() => {
    return { ...state };
  }, [state]);

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
