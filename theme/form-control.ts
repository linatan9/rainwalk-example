import type { ComponentTheme, StyledProps } from 'native-base';

const formControlErrorMessageTheme: ComponentTheme = {
  baseStyle: {
    _text: {
      fontSize: 'sm',
      fontStyle: 'italic',
      fontWeight: 'medium',
    } as StyledProps,
    ml: '3',
  } as StyledProps,
};

export { formControlErrorMessageTheme };
