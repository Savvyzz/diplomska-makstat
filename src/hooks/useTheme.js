import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const useTheme = () => {
  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: '#1a4b8c',
        light: '#e8f0fe',
        dark: '#0f2b52',
      },
      secondary: {
        main: '#7c3aed',
        light: '#ede9fe',
        dark: '#5b21b6',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#1a2b42',
        secondary: '#445167',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        'sans-serif'
      ].join(','),
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 0,
          },
        },
      },
    },
  }), []);

  return theme;
}; 