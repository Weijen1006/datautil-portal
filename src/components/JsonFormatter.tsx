import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const JsonFormatter: React.FC = () => {
    const [inputJson, setInputJson] = useState<string>('');
    const [formattedJson, setFormattedJson] = useState<string>('');

    const formatJson = () => {
        try {
            const parsed = JSON.parse(inputJson);
            const formatted = JSON.stringify(parsed, null, 2); // Indent with 2 spaces
            setFormattedJson(formatted);
        } catch (error) {
            console.log(error);
            setFormattedJson('Invalid JSON');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                JSON Formatter
            </Typography>
            <TextField
                label="Enter JSON"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" onClick={formatJson} sx={{ marginBottom: 2 }}>
                Format JSON
            </Button>
            <Typography variant="h6" gutterBottom>
                Formatted JSON:
            </Typography>
            <TextField
                multiline
                rows={10}
                fullWidth
                variant="outlined"
                value={formattedJson}
            />
        </Box>
    );
};

export default JsonFormatter;