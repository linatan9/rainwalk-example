import { NotificationSettingsContext } from '@rainwalk/contexts/NotificationSettings';
import type { RootDrawerScreenProps } from '@rainwalk/RootDrawerNavigator';
import ScreenLayout from '@rainwalk/RootDrawerNavigator/ScreenLayout';
import { Divider, HStack, Switch, Text, useBreakpointValue } from 'native-base';
import { type FunctionComponent, useContext } from 'react';

const Notifications: FunctionComponent<
  RootDrawerScreenProps<'Notifications'>
> = () => {
  const switchSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
  });
  const {
    isPushDisabled,
    hasNotificationPermission,
    updateNotificationSettings,
    isLoading,
  } = useContext(NotificationSettingsContext);

  return (
    <ScreenLayout
      hideBackButton={isLoading}
      hideSettingsButton
      hideTopBarOverflow
      title="Notifications"
    >
      <HStack
        alignItems="center"
        justifyContent="space-between"
        mb={{ base: 5, sm: 8 }}
        mt={9}
      >
        <Text
          fontSize={{ base: 'xs', sm: 'md' }}
          fontWeight={{ base: 'medium', sm: 'semibold' }}
        >
          Enable push notifications?
        </Text>
        <Switch
          disabled={isLoading}
          isChecked={
            !hasNotificationPermission
              ? hasNotificationPermission
              : !isPushDisabled
          }
          onToggle={() => {
            updateNotificationSettings({
              isPushDisabled: !isPushDisabled,
            });
          }}
          size={switchSize}
        />
      </HStack>
      <Divider bg="rainwalkGray.400" mb={{ base: 6, sm: 8 }} />
    </ScreenLayout>
  );
};

export default Notifications;
