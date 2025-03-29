import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

const NumberSystemConverter: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [inputBase, setInputBase] = useState<string>('decimal');
    const [outputBase, setOutputBase] = useState<string>('hex');
    const [convertedValue, setConvertedValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Function to convert values between different bases
    const convertNumber = () => {
        try {
            if (!inputValue) {
                setError('Please enter a value to convert.');
                setConvertedValue('');
                return;
            }

            setError('');

            // Convert the input value to decimal first
            let decimalValue: number;
            if (inputBase === 'decimal') {
                decimalValue = parseInt(inputValue, 10);
            } else if (inputBase === 'hex') {
                decimalValue = parseInt(inputValue, 16);
            } else if (inputBase === 'binary') {
                decimalValue = parseInt(inputValue, 2);
            } else if (inputBase === 'octal') {
                decimalValue = parseInt(inputValue, 8);
            } else {
                throw new Error('Invalid input base.');
            }

            if (isNaN(decimalValue)) {
                setError('Invalid number input for the given base.');
                setConvertedValue('');
                return;
            }

            // Convert the decimal value to the selected output base
            let result: string = '';
            if (outputBase === 'decimal') {
                result = decimalValue.toString(10);
            } else if (outputBase === 'hex') {
                result = decimalValue.toString(16).toUpperCase();
            } else if (outputBase === 'binary') {
                result = decimalValue.toString(2);
            } else if (outputBase === 'octal') {
                result = decimalValue.toString(8);
            } else {
                throw new Error('Invalid output base.');
            }

            setConvertedValue(result);
        } catch (error) {
            console.error(error);
            setError('Error during conversion.');
            setConvertedValue('');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Number System Converter
            </Typography>

            {/* Input for value to convert */}
            <TextField
                label={`Enter Value (${inputBase})`}
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
            />

            {/* Dropdown for selecting the input base */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Input Base</InputLabel>
                <Select
                    value={inputBase}
                    onChange={(e) => {
                        setInputBase(e.target.value as string);
                        setConvertedValue('');
                    }}
                    label="Input Base"
                >
                    <MenuItem value="decimal">Decimal</MenuItem>
                    <MenuItem value="hex">Hexadecimal</MenuItem>
                    <MenuItem value="binary">Binary</MenuItem>
                    <MenuItem value="octal">Octal</MenuItem>
                </Select>
            </FormControl>

            {/* Dropdown for selecting the output base */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Output Base</InputLabel>
                <Select
                    value={outputBase}
                    onChange={(e) => {
                        setOutputBase(e.target.value as string);
                        setConvertedValue('');
                    }}
                    label="Output Base"
                >
                    <MenuItem value="decimal">Decimal</MenuItem>
                    <MenuItem value="hex">Hexadecimal</MenuItem>
                    <MenuItem value="binary">Binary</MenuItem>
                    <MenuItem value="octal">Octal</MenuItem>
                </Select>
            </FormControl>

            {/* Convert Button */}
            <CustomResponsiveBox>
                <Button variant="contained" onClick={convertNumber} sx={{ marginBottom: 2 }}>
                    Convert
                </Button>
            </CustomResponsiveBox>

            {/* Error Message */}
            {error && (
                <Typography color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Converted Value Display */}
            {convertedValue && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Converted Value ({outputBase}):
                    </Typography>
                    <TextField
                        value={convertedValue}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                </>
            )}
        </Box>
    );
};

export default NumberSystemConverter;