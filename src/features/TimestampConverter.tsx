import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

const TimestampConverter: React.FC = () => {
    const [timestamp, setTimestamp] = useState<string>('');
    const [convertedDate, setConvertedDate] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Convert timestamp to readable date
    const convertTimestamp = (timestamp: string) => {
        try {
            const parsedTimestamp = parseInt(timestamp, 10);
            if (isNaN(parsedTimestamp)) {
                throw new Error('Invalid timestamp');
            }
            const date = new Date(parsedTimestamp * 1000); // Convert from seconds to milliseconds
            setConvertedDate(date.toUTCString()); // Display the date in UTC format
            setError('');
        } catch (error) {
            console.error(error);
            setError('Invalid timestamp format');
            setConvertedDate('');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Timestamp Converter
            </Typography>

            {/* Textfield for Timestamp input */}
            <TextField
                label="Enter Unix Timestamp (seconds)"
                fullWidth
                variant="outlined"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Convert button */}
            <CustomResponsiveBox>
                <Button variant="contained" onClick={() => convertTimestamp(timestamp)}>
                    Convert Timestamp
                </Button>
            </CustomResponsiveBox>

            {/* Error message */}
            {error && (
                <Typography color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Converted Date */}
            {convertedDate && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Converted Date:
                    </Typography>
                    <TextField
                        multiline
                        rows={2}
                        fullWidth
                        variant="outlined"
                        value={convertedDate}
                        sx={{ marginBottom: 2 }}
                    />
                </>
            )}
        </Box>
    );
};

export default TimestampConverter;
