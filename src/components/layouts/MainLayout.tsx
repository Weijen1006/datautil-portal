import React, { useState } from 'react';
import MuiThemeProvider from '@/components/layouts/MuiThemeProvider';
import ThemeToggle from '@/components/layouts/ThemeToggle';
import { getItem } from '@/utils/localStorageUtil';
import { ThemeMode } from '@/models/theme';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import MainContent from '@/components/layouts/MainContent';

const MainLayout: React.FC = () => {
    const currentThemeMode = getItem<ThemeMode>('themeMode') || 'light';
    const [themeMode, setThemeMode] = useState<ThemeMode>(currentThemeMode);
    const currentThemeColor = getItem<string>('themeColor') || '#1976d2';
    const [themeColor, setThemeColor] = useState<string>(currentThemeColor)

    return (
        <MuiThemeProvider themeMode={themeMode} themeColor={themeColor}>
            <Box sx={{ height: '100vh' }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <img
                            src="logo.png"
                            alt="Logo"
                            style={{ width: 30, height: 30, marginRight: 10 }}
                        />
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            DataUtil Portal
                        </Typography>
                        <ThemeToggle setThemeMode={setThemeMode} setThemeColor={setThemeColor} currentThemeMode={currentThemeMode} currentThemeColor={currentThemeColor} />
                    </Toolbar>
                </AppBar>
                {/* Content below AppBar will be scrollable */}
                <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
                    <MainContent />
                </Box>
            </Box>
        </MuiThemeProvider>
    );
};

export default MainLayout;