import type { ComponentTheme, ISelectProps, StyledProps } from 'native-base';

const selectTheme: ComponentTheme = {
  baseStyle: {
    _disabled: {
      bg: 'transparent',
      placeholderTextColor: 'muted.400',
    } as ISelectProps,
  } as StyledProps,
};

export default selectTheme;
