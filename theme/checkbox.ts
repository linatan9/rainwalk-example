import type { ComponentTheme, ICheckboxProps, StyledProps } from 'native-base';

const checkboxTheme: ComponentTheme = {
  baseStyle: {
    _disabled: {
      backgroundColor: 'rainwalkGray.50',
      borderColor: 'rainwalkGray.100',
      _checked: {
        backgroundColor: 'rainwalkGray.100',
        _icon: {
          backgroundColor: 'rainwalkGray.100',
        },
      },
      _icon: {
        backgroundColor: 'rainwalkGray.50',
      },
      _text: {
        color: 'rainwalkGray.300',
      },
      opacity: 1,
    },
    _checked: {
      _text: {
        fontWeight: 'bold',
      },
    },
    _text: {
      // fixes text not wrapping on iOS
      flexShrink: 1,
      fontSize: { base: 'xs', sm: 'md' },
      fontWeight: 'semibold',
    },
    borderRadius: 0,
    flex: 1,
  } satisfies Partial<ICheckboxProps> as StyledProps,
  sizes: {
    sm: {
      _text: {
        fontSize: { base: 'xs', sm: 'md' },
      },
    } satisfies Partial<ICheckboxProps> as StyledProps,
  },
};

export default checkboxTheme;
