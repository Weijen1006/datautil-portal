import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Base64EncoderDecoder: React.FC = () => {
    const [inputData, setInputData] = useState<string>('');
    const [encodedData, setEncodedData] = useState<string>('');
    const [decodedData, setDecodedData] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Encode input data to Base64
    const handleEncode = () => {
        try {
            setDecodedData('');
            const encoded = btoa(inputData); // Encode to Base64
            setEncodedData(encoded);
            setError('');
        } catch (error) {
            console.log(error)
            setError('Error encoding data');
        }
    };

    // Decode Base64 data
    const handleDecode = () => {
        try {
            setEncodedData('');
            const decoded = atob(inputData); // Decode from Base64
            setDecodedData(decoded);
            setError('');
        } catch (error) {
            console.log(error)
            setError('Error decoding data');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Base64 Encoder/Decoder
            </Typography>

            {/* Textfield for input data */}
            <TextField
                label="Enter Data"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Buttons to trigger encoding and decoding */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    marginBottom: 2,
                    flexDirection: { xs: 'column', sm: 'row' }, // Column on mobile, row on larger screens
                    alignItems: { xs: 'stretch', sm: 'center' }, // Stretch buttons to full width on mobile
                }}>
                <Button variant="contained" onClick={handleEncode}>
                    Encode to Base64
                </Button>
                <Button variant="contained" onClick={handleDecode}>
                    Decode from Base64
                </Button>
            </Box>

            {/* Error message */}
            {error && (
                <Typography color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Result Display for Encoded Data */}
            {encodedData && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Encoded Data:
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={encodedData}
                        sx={{ marginBottom: 2 }}
                    />
                </>
            )}

            {/* Result Display for Decoded Data */}
            {decodedData && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Decoded Data:
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={decodedData}
                        sx={{ marginBottom: 2 }}
                    />
                </>
            )}
        </Box>
    );
};

export default Base64EncoderDecoder;