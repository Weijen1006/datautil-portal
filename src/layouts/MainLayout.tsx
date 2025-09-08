import React, { useState } from 'react';
import MuiThemeProvider from '@/layouts/MuiThemeProvider';
import ThemeToggle from '@/layouts/ThemeToggle';
import { getItem } from '@/utils/localStorageUtil';
import { ThemeMode, HexColor } from '@/models/theme';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import MainContent from '@/layouts/MainContent';
import { HashRouter } from 'react-router';
import { APP_NAME, LOGO_PATH, DEFAULT_THEME_MODE, DEFAULT_THEME_COLOR } from '@/configs/constant';

const MainLayout: React.FC = () => {
    const currentThemeMode = getItem<ThemeMode>('themeMode') || DEFAULT_THEME_MODE;
    const [themeMode, setThemeMode] = useState<ThemeMode>(currentThemeMode);
    const currentThemeColor = getItem<HexColor>('themeColor') || DEFAULT_THEME_COLOR;
    const [themeColor, setThemeColor] = useState<HexColor>(currentThemeColor)

    return (
        <MuiThemeProvider themeMode={themeMode} themeColor={themeColor}>
            <Box sx={{ height: '100vh' }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <img
                            src={LOGO_PATH}
                            alt="Logo"
                            style={{ width: 30, height: 30, marginRight: 10 }}
                        />
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {APP_NAME}
                        </Typography>
                        <ThemeToggle setThemeMode={setThemeMode} setThemeColor={setThemeColor} currentThemeMode={currentThemeMode} currentThemeColor={currentThemeColor} />
                    </Toolbar>
                </AppBar>
                {/* Content below AppBar will be scrollable */}
                <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
                    <HashRouter>
                        <MainContent />
                    </HashRouter>
                </Box>
            </Box>
        </MuiThemeProvider>
    );
};

export default MainLayout;