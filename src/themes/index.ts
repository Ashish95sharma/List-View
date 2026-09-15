import { ThemeOptions, createTheme } from '@mui/material/styles';
import colors from '@assets/scss/_themes-vars.module.scss';
import componentStyleOverrides from './compStyleOverride';
import importedThemePalette from './palette';
import themeTypography from './typography';

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

export const theme = (customization: Record<string, unknown>) => {
  const color = colors as unknown as ThemeColors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    placeholder: color.placeholder,
    caption: color.caption,
    textDark: color.grey900,
    menuSelected: color.primaryMain,
    menuSelectedBack: color.paper,
    divider: color.grey200,
    main: color.main,
    customization
  };

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: importedThemePalette(themeOption),
    typography: themeTypography(themeOption),
    components: componentStyleOverrides()
  };

  return createTheme(themeOptions);
};

export default theme;
