import type { ThemeOptions } from '@mui/material/styles';

export default function themeTypography(theme: {
  darkTextPrimary: string;
  colors: { grey500: string };
}): ThemeOptions['typography'] {
  return {
    fontFamily: `'Poppins', sans-serif`,
    h4: {
      fontWeight: 600,
      color: theme.darkTextPrimary
    },
    h5: {
      fontWeight: 600,
      color: theme.darkTextPrimary
    },
    h6: {
      fontWeight: 600,
      color: theme.darkTextPrimary
    },
    body1: {
      color: theme.darkTextPrimary
    },
    body2: {
      color: theme.colors.grey500
    }
  };
}
