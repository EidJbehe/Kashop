import { createTheme } from '@mui/material/styles';

/* Color Tokens */
const colors = {
  primary: { light: '#3b82f6', dark: '#60a5fa' },
  secondary: { light: '#f97316', dark: '#fb923c' },
  success: { light: '#16a34a', dark: '#22c55e' },
  error: { light: '#dc2626', dark: '#ef4444' },
};

/* Light Palette */
const lightPalette = {
  mode: 'light',
  primary: { main: colors.primary.light },
  secondary: { main: colors.secondary.light },
  success: { main: colors.success.light },
  error: { main: colors.error.light },
  background: { default: '#f9fafb', paper: '#ffffff' },
  text: { primary: '#111827', secondary: '#6b7280' },
  divider: '#e5e7eb',
};

/* Dark Palette */
const darkPalette = {
  mode: 'dark',
  primary: { main: colors.primary.dark },
  secondary: { main: colors.secondary.dark },
  success: { main: colors.success.dark },
  error: { main: colors.error.dark },
  background: { default: '#121212', paper: '#1e1e1e' }, // <- خلفية داكنة محسّنة
  text: { primary: '#f9fafb', secondary: '#9ca3af' },
  divider: '#1f2933',
};

/* Theme Generator */
const getTheme = (mode) =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,

    typography: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      body1: { lineHeight: 1.7 },
      button: { textTransform: 'none', fontWeight: 600 },
    },

    shape: { borderRadius: 12 },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor:
              mode === 'dark' ? darkPalette.background.default : lightPalette.background.default,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: { padding: '10px 22px', borderRadius: 12 },
          containedSecondary: { color: '#ffffff' },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: 'none',
            boxShadow:
              mode === 'light' ? '0 6px 24px rgba(0,0,0,0.08)' : '0 6px 24px rgba(0,0,0,0.7)',
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#121212' : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : '#111827',
            boxShadow: 'none',
            borderBottom: mode === 'light' ? '1px solid #e5e7eb' : '1px solid #1f2933',
          },
        },
      },
    },
  });

export default getTheme;
