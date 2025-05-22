import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

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
            console.error(error)
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
            console.error(error)
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
                data-cy="base64-input"
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
            <CustomResponsiveBox>
                <Button data-cy="base64-encode" variant="contained" onClick={handleEncode}>
                    Encode to Base64
                </Button>
                <Button data-cy="base64-decode" variant="contained" onClick={handleDecode}>
                    Decode from Base64
                </Button>
            </CustomResponsiveBox>

            {/* Error message */}
            {error && (
                <Typography data-cy="base64-error" color="error" variant="body2" gutterBottom>
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
                        data-cy="base64-encoded-output"
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
                        data-cy="base64-decoded-output"
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