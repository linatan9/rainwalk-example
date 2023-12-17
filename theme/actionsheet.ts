import type { ComponentTheme } from 'native-base';

/**
 * Overrides/merges with default theme defined at
 * https://github.com/GeekyAnts/NativeBase/blob/master/src/theme/components/actionsheet.ts
 */
const actionsheetTheme: ComponentTheme = {
  // this is a workaround for
  // https://github.com/GeekyAnts/NativeBase/issues/5739
  defaultProps: {
    animationPreset: 'none',
  },
};

export default actionsheetTheme;
