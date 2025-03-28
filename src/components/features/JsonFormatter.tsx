import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const JsonFormatter: React.FC = () => {
    const [inputJson, setInputJson] = useState<string>('');
    const [formattedJson, setFormattedJson] = useState<string>('');

    // Format JSON (pretty print)
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

    // Serialize JSON (to string without pretty print)
    const serializeJson = () => {
        try {
            const parsed = JSON.parse(inputJson);
            const serialized = JSON.stringify(parsed); // Convert JSON object to string
            setFormattedJson(serialized);
        } catch (error) {
            console.log(error);
            setFormattedJson('Invalid JSON');
        }
    };

    // Escape characters in JSON (escape special characters)
    const escapeJson = () => {
        try {
            // Escape special characters
            const escaped = inputJson.replace(/\\/g, '\\\\')    // Escape backslashes
                .replace(/"/g, '\\"')    // Escape double quotes
                .replace(/\n/g, '\\n')   // Escape newline characters
                .replace(/\r/g, '\\r')   // Escape carriage return characters
                .replace(/\t/g, '\\t');  // Escape tab characters
            setFormattedJson(escaped);
        } catch (error) {
            console.log(error);
            setFormattedJson('Invalid JSON or error unescaping');
        }
    };

    // Unescape JSON (restore escaped characters)
    const unescapeJson = () => {
        try {
            // Convert escape sequences back to original characters
            const unescaped = inputJson.replace(/\\"/g, '"')     // Unescape double quotes
                .replace(/\\\\/g, '\\')   // Unescape backslashes
                .replace(/\\n/g, '\n')    // Unescape newline characters
                .replace(/\\r/g, '\r')    // Unescape carriage return characters
                .replace(/\\t/g, '\t');   // Unescape tab characters
            setFormattedJson(unescaped);
        } catch (error) {
            console.log(error);
            setFormattedJson('Invalid JSON or error unescaping');
        }
    };

    // Sort JSON keys alphabetically
    const sortJson = () => {
        try {
            const parsed = JSON.parse(inputJson);
            const sorted = Object.keys(parsed)
                .sort()
                .reduce((acc: Record<string, unknown>, key) => {
                    acc[key] = parsed[key];
                    return acc;
                }, {} as Record<string, unknown>);
            const formattedSortedJson = JSON.stringify(sorted, null, 2); // Pretty print after sorting
            setFormattedJson(formattedSortedJson);
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
            {/* Buttons to trigger JSON actions */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    marginBottom: 2,
                    flexDirection: { xs: 'column', sm: 'row' }, // Column on mobile, row on larger screens
                    alignItems: { xs: 'stretch', sm: 'center' }, // Stretch buttons to full width on mobile
                }}>
                <Button variant="contained" onClick={formatJson}>
                    Format JSON
                </Button>
                <Button variant="contained" onClick={serializeJson}>
                    Serialize JSON
                </Button>
                <Button variant="contained" onClick={escapeJson}>
                    Escape Characters
                </Button>
                <Button variant="contained" onClick={unescapeJson}>
                    Unescape Characters
                </Button>
                <Button variant="contained" onClick={sortJson}>
                    Sort JSON Keys
                </Button>
            </Box>
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