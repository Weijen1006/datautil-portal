import React, { useState } from 'react';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { getItem } from '@/utils/localStorageUtil';
import { UiMode } from '@/models/theme';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';

const MainLayout: React.FC = () => {
    const currentMode = getItem<UiMode>('theme') || 'light';
    const [mode, setMode] = useState<UiMode>(currentMode);

    return (
        <MuiThemeProvider mode={mode}>
            <Box sx={{ padding: 0}}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            My Application
                        </Typography>
                        <ThemeToggle setMode={setMode} currentMode={currentMode} />
                    </Toolbar>
                </AppBar>

                {/* Main content inside Container */}
                <Container sx={{ width: '100vw', flexGrow: 1 }}>
                    {/* Your main content goes here */}
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="body1">
                            Hello my app
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </MuiThemeProvider>
    );
};

export default MainLayout;