import type { ComponentTheme, StyledProps } from 'native-base';

const buttonTheme: ComponentTheme = {
  baseStyle: {
    _disabled: {
      opacity: 1,
    } as StyledProps,
    _text: {
      fontWeight: 'bold',
    } as StyledProps,
    rounded: '2xl',
    width: {
      base: '188px',
      sm: '243px',
    },
  } as StyledProps,
  variants: {
    outline: ({ colorScheme }: { colorScheme: string }) => ({
      _disabled: {
        _spinner: {
          color: 'rainwalkGray.100',
        },
        _text: {
          color: 'rainwalkGray.100',
        } as StyledProps,
        borderColor: 'rainwalkGray.100',
      } as StyledProps,
      _text: {
        color: `${colorScheme}.400`,
      } as StyledProps,
      borderColor: `${colorScheme}.400`,
      borderWidth: '2',
      bg: 'white',
    }),
    solid: ({ colorScheme }: { colorScheme: string }) => ({
      _disabled: {
        _spinner: {
          color: 'rainwalkDarkestBrown.400',
        },
        _text: {
          color: 'rainwalkDarkestBrown.400',
        } as StyledProps,
        bg: 'rainwalkGray.100',
      } as StyledProps,
      _pressed: {
        bg: `${colorScheme}.600`,
      } as StyledProps,
      bg: `${colorScheme}.400`,
      shadow: '2',
    }),
  },
};

export default buttonTheme;
