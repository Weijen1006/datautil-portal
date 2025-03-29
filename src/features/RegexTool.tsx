import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

const RegexTool: React.FC = () => {
    const [regexPattern, setRegexPattern] = useState<string>('');
    const [testString, setTestString] = useState<string>('');
    const [matches, setMatches] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    // Handle regex testing
    const handleTestRegex = () => {
        try {
            setMatches([]);
            setError('');
            const regex = new RegExp(regexPattern, 'g'); // Create a new regex object
            // Test the regex pattern against the test string
            const foundMatches = testString.match(regex);

            if (foundMatches) {
                setMatches(foundMatches); // Set matches if found
            } else {
                setMatches([]); // No matches
            }

        } catch (error) {
            console.error(error)
            setError('Invalid regular expression');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Regex Tool
            </Typography>

            {/* Textfield for regex pattern */}
            <TextField
                label="Enter Regex Pattern"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Textfield for test string */}
            <TextField
                label="Enter Test String"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Button to trigger regex test */}
            <CustomResponsiveBox>
                <Button variant="contained" onClick={handleTestRegex}>
                    Test Regex
                </Button>
            </CustomResponsiveBox>

            {/* Error message for invalid regex */}
            {error && (
                <Typography color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Display matches if any */}
            {matches.length > 0 && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Matches:
                    </Typography>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={matches.join('\n')} // Display each match in a new line
                        sx={{ marginBottom: 2 }}
                    />
                </>
            )}

            {/* Message if no matches found */}
            {matches.length === 0 && testString && (
                <Typography variant="body2" color="textSecondary">
                    No matches found.
                </Typography>
            )}
        </Box>
    );
};

export default RegexTool;