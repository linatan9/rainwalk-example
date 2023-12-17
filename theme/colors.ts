const rainwalkColors = {
  get primary() {
    return this.rainwalkRustRed;
  },
  get secondary() {
    return this.rainwalkDeepGreen;
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=success&color=57B894&size=10&diff=40
  success: {
    50: '#99e0c6',
    100: '#88d6b9',
    200: '#78ccad',
    300: '#69c0a0',
    400: '#57B894',
    500: '#50ae8c',
    600: '#509f82',
    700: '#4f9078',
    800: '#4e826f',
    900: '#4c7465',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=warning&color=ED8931&size=10&diff=40
  warning: {
    50: '#fdc08b',
    100: '#f9b274',
    200: '#f5a45e',
    300: '#ef9749',
    400: '#ED8931',
    500: '#e78127',
    600: '#e0791f',
    700: '#cd7221',
    800: '#bb6a24',
    900: '#aa6325',
  },
  error: {
    // extract only the first 10 from:
    // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=error&color=EB5757&size=13&diff=40
    50: '#FDBFBF',
    100: '#FBACAC',
    200: '#F99A9A',
    300: '#F68989',
    400: '#F27878',
    500: '#ED6868',
    600: '#EB5757',
    700: '#E74E4E',
    800: '#E24747',
    900: '#DD4040',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkMidnightBlue&color=003366&size=10&diff=40
  rainwalkMidnightBlue: {
    50: '#0068D0',
    100: '#005BB6',
    200: '#004E9B',
    300: '#004081',
    400: '#003366',
    500: '#022B55',
    600: '#032344',
    700: '#031B34',
    800: '#031424',
    900: '#020C15',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkLightBlue&color=c5d3d6&size=10&diff=40
  rainwalkLightBlue: {
    50: '#FFFFFF',
    100: '#F4F8F8',
    200: '#E4ECEE',
    300: '#D6E0E2',
    400: '#C5D3D6',
    500: '#BFCBCE',
    600: '#B9C3C5',
    700: '#B3B9BB',
    800: '#AEB0B0',
    900: '#AAA6A5',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkDeepGreen&color=566246&size=10&diff=40
  rainwalkDeepGreen: {
    50: '#8EAB67',
    100: '#809B5D',
    200: '#728657',
    300: '#647251',
    400: '#566246',
    500: '#4E5642',
    600: '#454B3E',
    700: '#3D403A',
    800: '#353534',
    900: '#2D2C2E',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkSageGreen&color=D4DACE&size=10&diff=40
  rainwalkSageGreen: {
    50: '#FFFFFF',
    100: '#FBFCFB',
    200: '#EEF1EB',
    300: '#E1E5DD',
    400: '#D4DACE',
    500: '#CCD1C7',
    600: '#C4C8C0',
    700: '#BCBDBB',
    800: '#B4B3B6',
    900: '#ACA7B1',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkRustRed&color=DC3838&size=10&diff=40
  rainwalkRustRed: {
    50: '#F38A8A',
    100: '#EE7575',
    200: '#E76161',
    300: '#E04E4E',
    400: '#DC3838',
    500: '#D42F2F',
    600: '#C62E2E',
    700: '#B43030',
    800: '#A43131',
    900: '#943131',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkLightPink&color=ECD4D4&size=10&diff=40
  rainwalkLightPink: {
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FDF9F9',
    300: '#F4E7E7',
    400: '#ECD4D4',
    500: '#E6CBCB',
    600: '#DFC2C2',
    700: '#D7BABA',
    800: '#CFB3B3',
    900: '#C6ACAC',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkDarkBrown&color=4E3636&size=10&diff=40
  rainwalkDarkBrown: {
    50: '#9B5454',
    100: '#864E4E',
    200: '#714848',
    300: '#5E4141',
    400: '#4E3636',
    500: '#433232',
    600: '#382E2E',
    700: '#2D2828',
    800: '#242222',
    900: '#1B1C1C',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkSand&color=fff9ee&size=10&diff=40
  rainwalkSand: {
    50: '#FF11F15A',
    100: '#FF11513F',
    200: '#FF10C125',
    300: '#FF10310A',
    400: '#FFF9EE',
    500: '#FEF4E1',
    600: '#FDEED2',
    700: '#FBE8C4',
    800: '#F9E2B7',
    900: '#F6DBAB',
  },
  // https://json-color-palette-generator.vercel.app/api/get-color-palette?name=rainwalkDarkestBrown&color=302c2c&size=10&diff=40
  rainwalkDarkestBrown: {
    50: '#735353',
    100: '#604B4B',
    200: '#4E4343',
    300: '#3E3939',
    400: '#302C2C',
    500: '#262626',
    600: '#1D1F1F',
    700: '#151818',
    800: '#0D1010',
    900: '#060808',
  },
  rainwalkGray: {
    50: '#EEEEEE', // lightest gray
    100: '#DADADA', // light gray
    200: '#B9B9B9', // medium gray
    300: '#828282', // regular gray
    400: '#4F4F4F', // dark gray
    500: '#333333', // darkest gray
  },
};

export default rainwalkColors;
