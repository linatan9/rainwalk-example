import AuthenticationCredentialsProvider from '@rainwalk/contexts/AuthenticationCredentials';
import NotificationSettingsProvider from '@rainwalk/contexts/NotificationSettings';
import SelectPolicyProvider from '@rainwalk/contexts/SelectedPolicyID';
import type { FunctionComponent, PropsWithChildren } from 'react';

const ContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <AuthenticationCredentialsProvider>
    <NotificationSettingsProvider>
      <SelectPolicyProvider>{children}</SelectPolicyProvider>
    </NotificationSettingsProvider>
  </AuthenticationCredentialsProvider>
);

export default ContextProvider;
