import React from 'react';
import { Box, Typography } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            padding: 4,
        }}>
            <Typography variant="h2" gutterBottom align="center">
                Welcome to the DataUtil Portal
            </Typography>
            <Typography variant="h5" align="center">
                The DataUtil Portal offers a collection of tools to help with various data utilities, such as JSON formatting, Base64 encoding/decoding, JWT decoding, and more.
            </Typography>
            <Typography variant="body1" align="center">
                Easily manage and transform your data with these utilities to enhance your workflows and improve productivity.
            </Typography>
        </Box>
    );
};

export default Home;