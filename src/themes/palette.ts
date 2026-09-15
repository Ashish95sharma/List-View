import { PaletteOptions } from '@mui/material/styles';

interface ThemeColors {
  primaryLight: string;
  primaryMain: string;
  secondaryLight: string;
  secondaryMain: string;
  errorLight: string;
  errorMain: string;
  errorDark: string;
  infoLight: string;
  infoMain: string;
  infoDark: string;
  warningLight: string;
  warningMain: string;
  warningDark: string;
  successLight: string;
  successMain: string;
  successDark: string;
  grey50: string;
  grey100: string;
  grey200: string;
  grey300: string;
  grey400: string;
  grey500: string;
  grey600: string;
  grey700: string;
  grey900: string;
  paper: string;
  placeholder: string;
  caption: string;
  main: string;
}

interface ThemeOption {
  colors: ThemeColors;
  darkTextPrimary: string;
  paper: string;
  backgroundDefault: string;
  placeholder: string;
  customization?: { navType?: 'light' | 'dark' };
}

export default function themePalette(theme: ThemeOption): PaletteOptions {
  return {
    mode: theme?.customization?.navType || 'light',
    primary: {
      light: theme.colors.primaryLight,
      main: theme.colors.primaryMain
    },
    secondary: {
      light: theme.colors.secondaryLight,
      main: theme.colors.secondaryMain
    },
    error: {
      light: theme.colors.errorLight,
      main: theme.colors.errorMain,
      dark: theme.colors.errorDark
    },
    info: {
      light: theme.colors.infoLight,
      main: theme.colors.infoMain,
      dark: theme.colors.infoDark
    },
    warning: {
      light: theme.colors.warningLight,
      main: theme.colors.warningMain,
      dark: theme.colors.warningDark
    },
    success: {
      light: theme.colors.successLight,
      main: theme.colors.successMain,
      dark: theme.colors.successDark
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.placeholder
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault
    }
  };
}
