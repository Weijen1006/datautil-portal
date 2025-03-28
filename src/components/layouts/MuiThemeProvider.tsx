import React, { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeMode } from '@/models/theme';

interface MuiThemeProviderProps {
  themeMode: ThemeMode,
  themeColor: string,
  children: React.ReactNode
}

const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({ themeMode, themeColor, children }) => {
  // Use useMemo to memoize the theme creation
  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeColor
      },
      background: {
        default: themeMode === 'light' ? '#f5f5f5' : '#121212', // Set custom background for light and dark modes
      },
    },
  }), [themeMode, themeColor]); // Only re-create the theme if `mode` changes

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>;
};

export default MuiThemeProvider;