import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

const UrlEncoderDecoder: React.FC = () => {
    const [inputData, setInputData] = useState<string>('');
    const [encodedData, setEncodedData] = useState<string>('');
    const [decodedData, setDecodedData] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Encode input data to URL-encoded format
    const handleEncode = () => {
        try {
            setDecodedData('');
            const encoded = encodeURIComponent(inputData); // URL Encode
            setEncodedData(encoded);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error encoding data');
        }
    };

    // Decode URL-encoded data
    const handleDecode = () => {
        try {
            setEncodedData('');
            const decoded = decodeURIComponent(inputData); // URL Decode
            setDecodedData(decoded);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error decoding data');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                URL Encoder/Decoder
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
            <CustomResponsiveBox>
                <Button variant="contained" onClick={handleEncode}>
                    Encode to URL
                </Button>
                <Button variant="contained" onClick={handleDecode}>
                    Decode from URL
                </Button>
            </CustomResponsiveBox>

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

export default UrlEncoderDecoder