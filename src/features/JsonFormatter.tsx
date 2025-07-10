import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';
import JSON5 from 'json5';

const JsonFormatter: React.FC = () => {
    const [inputJson, setInputJson] = useState<string>('');
    const [formattedJson, setFormattedJson] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Format JSON (pretty print)
    const formatJson = () => {
        try {
            const parsed = JSON5.parse(inputJson); // Can parse JS-style objects
            const formatted = JSON.stringify(parsed, null, 2); // Indent with 2 spaces
            setFormattedJson(formatted);
            setError('')
        } catch (error) {
            console.error(error);
            setError('Invalid JSON');
            setFormattedJson('');
        }
    };

    // Serialize JSON (to string without pretty print)
    const serializeJson = () => {
        try {
            const parsed = JSON5.parse(inputJson);
            const serialized = JSON.stringify(parsed); // Convert JSON object to string
            setFormattedJson(serialized);
        } catch (error) {
            console.error(error);
            setError('Invalid JSON');
            setFormattedJson('');
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
            console.error(error);
            setError('Invalid JSON or error unescaping');
            setFormattedJson('');
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
            console.error(error);
            setError('Invalid JSON or error unescaping');
            setFormattedJson('');
        }
    };

    // Sort JSON keys alphabetically
    const sortJson = () => {
        try {
            const parsed = JSON5.parse(inputJson);
            const sorted = Object.keys(parsed)
                .sort()
                .reduce((acc: Record<string, unknown>, key) => {
                    acc[key] = parsed[key];
                    return acc;
                }, {} as Record<string, unknown>);
            const formattedSortedJson = JSON.stringify(sorted, null, 2); // Pretty print after sorting
            setFormattedJson(formattedSortedJson);
        } catch (error) {
            console.error(error);
            setError('Invalid JSON');
            setFormattedJson('');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                JSON Formatter
            </Typography>
            <TextField
                data-cy="json-input"
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
            <CustomResponsiveBox>
                <Button data-cy="format-json" variant="contained" onClick={formatJson}>
                    Format JSON
                </Button>
                <Button data-cy="serialize-json" variant="contained" onClick={serializeJson}>
                    Serialize JSON
                </Button>
                <Button data-cy="escape-json" variant="contained" onClick={escapeJson}>
                    Escape Characters
                </Button>
                <Button data-cy="unescape-json" variant="contained" onClick={unescapeJson}>
                    Unescape Characters
                </Button>
                <Button data-cy="sort-json" variant="contained" onClick={sortJson}>
                    Sort JSON Keys
                </Button>
            </CustomResponsiveBox>

            {/* Error message */}
            {error && (
                <Typography data-cy="json-error" color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Formatted JSON */}
            {formattedJson && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Formatted JSON:
                    </Typography>
                    <TextField
                        data-cy="json-output"
                        multiline
                        rows={10}
                        fullWidth
                        variant="outlined"
                        value={formattedJson}
                    />
                </>
            )}
        </Box>
    );
};

export default JsonFormatter;