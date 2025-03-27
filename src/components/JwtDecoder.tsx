import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const JwtDecoder: React.FC = () => {
    const [jwt, setJwt] = useState<string>('');
    const [decodedHeader, setDecodedHeader] = useState<string>('');
    const [decodedPayload, setDecodedPayload] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Decode base64url encoded JWT part
    const base64UrlToBase64 = (base64Url: string) => {
        return base64Url.replace(/-/g, '+').replace(/_/g, '/');
    };

    const decodeJwt = (jwt: string) => {
        try {
            const [header, payload] = jwt.split('.'); // JWT consists of 3 parts

            if (!header || !payload) {
                throw new Error('Invalid JWT structure');
            }

            // Decode the header and payload parts
            const decodedHeader = JSON.parse(atob(base64UrlToBase64(header)));
            const decodedPayload = JSON.parse(atob(base64UrlToBase64(payload)));

            // Store the decoded values
            setDecodedHeader(JSON.stringify(decodedHeader, null, 2));
            setDecodedPayload(JSON.stringify(decodedPayload, null, 2));
            setError('');
        } catch (error) {
            console.log(error)
            setError('Invalid JWT format or unable to decode');
            setDecodedHeader('');
            setDecodedPayload('');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                JWT Decoder
            </Typography>

            {/* Textfield for JWT input */}
            <TextField
                label="Enter JWT"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={jwt}
                onChange={(e) => setJwt(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Decode button */}
            <Button variant="contained" onClick={() => decodeJwt(jwt)}>
                Decode JWT
            </Button>

            {/* Error message */}
            {error && (
                <Typography color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Decoded Header */}
            {decodedHeader && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Header:
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={decodedHeader}
                        sx={{ marginBottom: 2 }}
                    />
                </>
            )}

            {/* Decoded Payload */}
            {decodedPayload && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Payload:
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={decodedPayload}
                        sx={{ marginBottom: 2 }}
                    />
                </>
            )}
        </Box>
    );
};

export default JwtDecoder;