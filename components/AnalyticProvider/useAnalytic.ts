import type { AnalyticsContextState } from '@rainwalk/components/AnalyticProvider/AnalyticsContext';
import { AnalyticsContext } from '@rainwalk/components/AnalyticProvider/AnalyticsContext';
import { useContext } from 'react';

export function useAnalytic(): AnalyticsContextState {
  return useContext(AnalyticsContext);
}
