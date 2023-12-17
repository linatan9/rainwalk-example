import actionsheetTheme from '@rainwalk/theme/actionsheet';
import buttonTheme from '@rainwalk/theme/button';
import checkboxTheme from '@rainwalk/theme/checkbox';
import rainwalkColors from '@rainwalk/theme/colors';
import fontTheme from '@rainwalk/theme/font';
import { formControlErrorMessageTheme } from '@rainwalk/theme/form-control';
import inputTheme from '@rainwalk/theme/input';
import { modalContentTheme } from '@rainwalk/theme/modal';
import selectTheme from '@rainwalk/theme/select';
import skeletonTheme from '@rainwalk/theme/skeleton';
import switchTheme from '@rainwalk/theme/switch';
import type { INativebaseConfig } from 'native-base';
import { extendTheme } from 'native-base';

const rainwalkConfig: INativebaseConfig = {
  strictMode: 'error',
  theme: extendTheme({
    breakpoints: {
      // When targeting responsive values from the mockups, use:
      // - base: for iPhone SE
      // - sm: for iPhone 13 Pro Max
      // - lg: for tablet
      base: 0,
      // 375 iPhone SE
      sm: 428, // iPhone 14 Plus, iPhone 13 Pro Max
      // 430 iPhone 14 Pro Max
      md: 744, // iPad Mini (6th gen)
      lg: 1024, // iPad Pro (12.9-inch) (6th generation) (rotated 90deg!)
      xl: 1280,
    },
    colors: rainwalkColors,
    components: {
      Actionsheet: actionsheetTheme,
      Button: buttonTheme,
      Checkbox: checkboxTheme,
      FormControlErrorMessage: formControlErrorMessageTheme,
      Input: inputTheme,
      Select: selectTheme,
      Skeleton: skeletonTheme,
      Switch: switchTheme,
      ModalContent: modalContentTheme,
    },
    ...fontTheme,
  }),
};

export default rainwalkConfig;
