import type { Events } from '@rainwalk/components/AnalyticProvider/events';
import React from 'react';

export type LogEventParams<K extends keyof Events> = undefined extends Events[K]
  ? [event: K, params: Events[K]] | [event: K]
  : [event: K, params: Events[K]];

export type AnalyticsContextState = {
  logEvent: <K extends keyof Events>(
    ...args: LogEventParams<K>
  ) => Promise<void>;
};

export const AnalyticsContext = React.createContext<AnalyticsContextState>({
  logEvent: async () => {},
});
