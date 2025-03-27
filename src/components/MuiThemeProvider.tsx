import React, { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UiMode } from '@/models/theme';

interface MuiThemeProviderProps {
  mode: UiMode,
  children: React.ReactNode
}

const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({ mode, children }) => {
  // Use useMemo to memoize the theme creation
  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#1976d2', // Blue color for primary
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212', // Set custom background for light and dark modes
      },
    },
  }), [mode]); // Only re-create the theme if `mode` changes

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>;
};

export default MuiThemeProvider;