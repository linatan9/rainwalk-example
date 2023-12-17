import merge from 'lodash.merge';
import type { ComponentTheme, StyledProps } from 'native-base';
import { theme } from 'native-base';

const inputTheme: ComponentTheme = {
  baseStyle: merge(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    theme.components.Input.variants.unstyled() as StyledProps,
    {
      _focus: {
        _android: {
          // override unreadable default selection color on android
          selectionColor: 'rainwalkGray.100',
        } as StyledProps,
        _invalid: {
          selectionColor: 'error.200',
        } as StyledProps,
        borderColor: 'rainwalkGray.300',
        borderWidth: '2',
      } as StyledProps,
      _invalid: {
        borderColor: 'error.400',
        borderWidth: '2',
      } as StyledProps,
      _readOnly: {
        bg: 'rainwalkGray.50',
        borderColor: 'rainwalkGray.300',
        borderRadius: 4,
        borderWidth: 1,
      } as StyledProps,
      bg: 'white',
      borderColor: 'rainwalkGray.100',
      borderRadius: 'xl',
      borderWidth: '1',
      color: 'rainwalkGray.400',
      height: '45px',
    } as StyledProps
  ),
  defaultProps: {
    variant: '',
  },
  variants: {
    valid: {
      _focus: {
        _android: {
          selectionColor: 'rainwalkDeepGreen.50',
        },
        borderColor: 'rainwalkDeepGreen.400',
        selectionColor: 'rainwalkDeepGreen.50',
      } as StyledProps,
    } as StyledProps,
  },
};

export default inputTheme;
