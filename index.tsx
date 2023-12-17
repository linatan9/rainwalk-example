// Error logging should be initialized first so that it can catch any errors
// that occur during other imports.
/* eslint-disable import/first */
import { initializeErrorLogging } from '@rainwalk/logging';

initializeErrorLogging();

import 'react-native-gesture-handler';
import '@rainwalk/extensions';
import '@rainwalk/messaging';

import StorybookToggle from '@rainwalk/.storybook/toggle-storybook';
import AppRoot from '@rainwalk/App';

export default () => (
  <StorybookToggle>
    <AppRoot />
  </StorybookToggle>
);
