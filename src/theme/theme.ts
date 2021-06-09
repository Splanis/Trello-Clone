import baseStyled, { ThemedStyledInterface } from 'styled-components';

const lightThemeColors = {
  background: { primary: '#ffffff', secondary: '#f4f4f4', alternative: '#c4c4c4' },
  font: { primary: '#000000' }
};
const darkThemeColors = {
  background: { primary: '#2F2F2F', secondary: '#676766', alternative: '#3F3F3F' },
  font: { primary: '#ffffff' }
};

export const theme = {
  colors: {
    light: '#f4f4ef',
    gray: '#c4c4c4',
    black: '#000',
    white: '#fff',
    dark: '#a3a599',
    primary: '#202020',
    secondary: '#FF8C00',
    alternative: '#3F3F3F',
    common: {
      green: '#317140',
      red: '#f51720',
      orange: '#ffb067',
      blue: '#2eb5e0'
    }
  },
  shadow: {
    primary: '0 0 10px rgba(0, 0, 0, 0.1)',
    big: '0 0 10px rgba(0, 0, 0, 0.5)'
  },
  fonts: {
    primary: "'Source Sans Pro', sans-serif"
  },
  sizing: {
    font: {
      small: '0.8rem',
      base: '1rem',
      large: '1.2rem',
      veryLarge: '1.5rem'
    }
  }
};

export const lightTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: lightThemeColors.background,
    font: lightThemeColors.font
  }
};
export type Theme = typeof lightTheme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: darkThemeColors.background,
    font: darkThemeColors.font
  }
};

export const styled = baseStyled as ThemedStyledInterface<Theme>;
