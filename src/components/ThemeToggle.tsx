import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { setItem } from '@/utils/localStorageUtil';
import { UiMode } from '@/models/theme';


interface ThemeToggleProps {
  setMode: React.Dispatch<React.SetStateAction<UiMode>>;
  currentMode: UiMode;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ setMode, currentMode }) => {

  const toggleTheme = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setItem('theme', newMode); // Save the theme to localStorage
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {currentMode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

export default ThemeToggle;