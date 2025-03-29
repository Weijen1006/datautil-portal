import React from 'react';
import { IconButton, Box } from '@mui/material';
import { setItem } from '@/utils/localStorageUtil';
import { FormatColorFill } from '@mui/icons-material';
import { HexColor } from '@/models/theme';

interface CustomColorPickerProps {
  color: HexColor;
  setColor: React.Dispatch<React.SetStateAction<HexColor>>
}


const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ color, setColor }) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThemeColor = event.target.value as HexColor;
    setColor(newThemeColor); // Update color state
    setItem('themeColor', newThemeColor);
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {/* Icon Button as Color Picker Trigger */}
      <IconButton color='inherit'>
        <FormatColorFill />
      </IconButton>

      {/* Color Input Positioned Directly Under the Icon */}
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0, // Makes it invisible but still clickable
          cursor: 'pointer',
        }}
      />
    </Box>
  );
};

export default CustomColorPicker;