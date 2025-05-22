import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const HtmlViewer: React.FC = () => {
    const [inputHtml, setInputHtml] = useState<string>('');
    const [iframeSrcDoc, setIframeSrcDoc] = useState<string>(''); // We will use srcDoc to inject HTML into the iframe
    const [error, setError] = useState<string>('');

    // Function to render raw HTML inside an iframe
    const handleRenderHtml = () => {
        try {
            // Clear previous error
            setError('');

            // Set the raw HTML content inside the iframe
            setIframeSrcDoc(inputHtml);
        } catch (error) {
            setError('Error rendering HTML');
            console.error(error);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                HTML Viewer
            </Typography>

            {/* Textfield for HTML input */}
            <TextField
                data-cy="html-input"
                label="Enter HTML"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={inputHtml}
                onChange={(e) => setInputHtml(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Button to render HTML */}
            <Button variant="contained" onClick={handleRenderHtml}>
                Render HTML
            </Button>

            {/* Error Message */}
            {error && (
                <Typography data-cy="html-error" color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Iframe to render HTML */}
            {iframeSrcDoc && (
                <Box
                    sx={{
                        marginTop: 3,
                        width: '100%',
                        height: 450,
                        border: '1px solid #ddd',
                        borderRadius: 2,
                    }}
                >
                    <iframe
                        data-cy="html-output"
                        title="Rendered HTML"
                        srcDoc={iframeSrcDoc} // Inject the HTML content directly into the iframe
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default HtmlViewer;
