import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { setItem } from '@/utils/localStorageUtil';
import { ThemeMode, HexColor } from '@/models/theme';
import CustomColorPicker from '@/components/CustomColorPicker';

interface ThemeToggleProps {
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
  setThemeColor: React.Dispatch<React.SetStateAction<HexColor>>;
  currentThemeMode: ThemeMode;
  currentThemeColor: HexColor;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ setThemeMode, setThemeColor, currentThemeMode, currentThemeColor }) => {

  const toggleThemeMode = () => {
    const newThemeMode = currentThemeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    setItem('themeMode', newThemeMode); // Save the theme to localStorage
  };

  return (
    <>
      <CustomColorPicker color={currentThemeColor} setColor={setThemeColor} />
      <IconButton onClick={toggleThemeMode} color="inherit">
        {currentThemeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </>
  );
};

export default ThemeToggle;