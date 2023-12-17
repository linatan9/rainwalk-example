import { SENTRY_DSN, SENTRY_TRACES_SAMPLE_RATE } from '@env';
import LogRocket from '@logrocket/react-native';
import * as Sentry from '@sentry/react-native';

const isTypeError = (error: unknown): error is TypeError =>
  error instanceof TypeError;

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

export const initializeErrorLogging = () => {
  Sentry.init({
    beforeSend: (event, hint) => {
      const error = hint.originalException;
      // Ignore unhandled promise rejections caused by LogRocket
      if (
        isTypeError(error) &&
        error.message === "Cannot assign to read-only property 'log'"
      )
        return null;
      return event;
    },
    dsn: SENTRY_DSN,
    enableNdkScopeSync: true,
    environment: __DEV__ ? 'development' : 'production',
    integrations: [
      new Sentry.ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
    tracesSampleRate: Number(SENTRY_TRACES_SAMPLE_RATE),
  });
};

export const captureException = (error: Error) => {
  LogRocket.captureException(error);
  Sentry.captureException(error);
};
