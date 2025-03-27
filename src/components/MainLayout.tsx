import React, { useState} from 'react';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { getItem } from '@/utils/localStorageUtil';
import { UiMode } from '@/models/theme';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import MainContent from '@/components/MainContent';

const MainLayout: React.FC = () => {
    const currentMode = getItem<UiMode>('mode') || 'light';
    const [mode, setMode] = useState<UiMode>(currentMode);

    return (
        <MuiThemeProvider mode={mode}>
            <Box>
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            DataUtil Portal
                        </Typography>
                        <ThemeToggle setMode={setMode} currentMode={currentMode} />
                    </Toolbar>
                </AppBar>
                </Box>
               <MainContent/>
        </MuiThemeProvider>
    );
};

export default MainLayout;