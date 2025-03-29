import React from 'react';
import { Box, Typography } from '@mui/material';
import { APP_NAME, LOGO_PATH } from '@/configs/constant';

const Home: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                padding: 4,
                textAlign: 'center',
            }}
        >
            {/* Logo with styling */}
            <Box
                component="img"
                src={LOGO_PATH}
                alt="Logo"
                sx={{
                    width: 120,
                    height: 120,
                    padding: 1,
                }}
            />

            {/* Main Heading */}
            <Typography variant="h3" sx={{ fontWeight: 600, marginBottom: 2 }}>
                Welcome to {APP_NAME}
            </Typography>

            {/* Subtitle */}
            <Typography variant="h6" sx={{ maxWidth: '600px', opacity: 0.9, marginBottom: 3 }}>
                Your go-to suite for powerful data utilities—JSON, Base64, JWT and more.
            </Typography>

            {/* Description */}
            <Typography variant="body1" sx={{ maxWidth: '600px', opacity: 0.8, marginBottom: 4 }}>
                Simplify your workflow with easy-to-use tools, built for developers, data analysts, and tech enthusiasts.
            </Typography>
        </Box>
    );
};

export default Home;