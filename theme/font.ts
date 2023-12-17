import { Platform } from 'react-native';

const font = 'Mulish';

const fontTheme = {
  fonts: {
    heading: font,
    body: font,
    mono: font,
  },
};

if (Platform.OS === 'android') {
  Object.assign(fontTheme, {
    fontConfig: {
      // Downloadable Fonts: see react-native.config.js
      Mulish: {
        400: {
          normal: 'mulish',
        },
        500: {
          normal: 'mulish_medium',
          italic: 'mulish_medium_italic',
        },
        600: {
          normal: 'mulish_semibold',
        },
        700: {
          normal: 'mulish_bold',
        },
      },
    },
  });
}

export default fontTheme;
