import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

const SecretGenerator: React.FC = () => {
    const [secretLength, setSecretLength] = useState<number>(16);  // Default length 16
    const [generatedSecret, setGeneratedSecret] = useState<string>('');
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Function to generate a random secret
    const generateSecret = () => {
        try {
            if (secretLength <= 0) {
                setError('Secret length must be greater than 0');
                return;
            }

            let characters = '';
            if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
            if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (includeNumbers) characters += '0123456789';
            if (includeSpecialChars) characters += '!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';

            if (characters === '') {
                setError('You must select at least one character set');
                return;
            }

            let secret = '';
            for (let i = 0; i < secretLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                secret += characters[randomIndex];
            }

            setGeneratedSecret(secret);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error generating secret');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Secret Generator
            </Typography>

            {/* Input for secret length */}
            <TextField
                data-cy="secret-length-input"
                label="Secret Length"
                defaultValue={secretLength}
                type="number"
                onChange={(e) => setSecretLength(Number(e.target.value))}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />

            {/* Checkbox for character sets */}
            <Box sx={{ marginBottom: 2 }}>
                <FormControlLabel
                    control={<Checkbox data-cy="include-lowercase" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />}
                    label="Include Lowercase"
                />
                <FormControlLabel
                    control={<Checkbox data-cy="include-uppercase" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />}
                    label="Include Uppercase"
                />
                <FormControlLabel
                    control={<Checkbox data-cy="include-number" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />}
                    label="Include Numbers"
                />
                <FormControlLabel
                    control={<Checkbox data-cy="include-special-character" checked={includeSpecialChars} onChange={() => setIncludeSpecialChars(!includeSpecialChars)} />}
                    label="Include Special Characters"
                />
            </Box>

            {/* Button to generate secret */}
            <CustomResponsiveBox>
                <Button data-cy="generate-secret" variant="contained" onClick={generateSecret}>
                    Generate Secret
                </Button>
            </CustomResponsiveBox>

            {/* Error message */}
            {error && (
                <Typography data-cy="secret-error" color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Display generated secret */}
            {generatedSecret && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Generated Secret:
                    </Typography>
                    <TextField
                        data-cy="secret-output"
                        value={generatedSecret}
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        sx={{
                            marginBottom: 2
                        }}
                    />
                </>
            )}
        </Box>
    );
};

export default SecretGenerator;