import React from 'react';
import { Box } from '@mui/material';

interface CustomResponsiveBoxProps {
    children: React.ReactNode;
}

const CustomResponsiveBox: React.FC<CustomResponsiveBoxProps> = ({ children }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                marginBottom: 2,
                flexDirection: { xs: 'column', sm: 'row' }, // Column on mobile, row on larger screens
                alignItems: { xs: 'stretch', sm: 'center' }, // Stretch buttons to full width on mobile
            }}>{children}</Box>
    );
};

export default CustomResponsiveBox;