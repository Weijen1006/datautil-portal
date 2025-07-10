import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

const PkceGenerator: React.FC = () => {
  const [codeVerifier, setCodeVerifier] = useState<string>('');
  const [codeChallenge, setCodeChallenge] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Helper: base64-url encode ArrayBuffer
  const base64UrlEncode = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (const b of bytes) {
      binary += String.fromCharCode(b);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  // Helper: SHA-256 hash function using SubtleCrypto API
  const sha256 = async (plain: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return await crypto.subtle.digest('SHA-256', data);
  };

  // Generate PKCE code verifier and challenge
  const generatePkce = async () => {
    try {
      // RFC 7636 recommends length between 43-128
      const length = 64;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      let verifier = '';
      for (let i = 0; i < length; i++) {
        verifier += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setCodeVerifier(verifier);

      const hashed = await sha256(verifier);
      const challenge = base64UrlEncode(hashed);
      setCodeChallenge(challenge);

      setError('');
    } catch (err) {
      console.error(err);
      setError('Error generating PKCE code challenge');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        PKCE Generator
      </Typography>

      <CustomResponsiveBox>
        <Button data-cy="generate-pkce" variant="contained" onClick={generatePkce}>
          Generate PKCE Code Verifier & Challenge
        </Button>
      </CustomResponsiveBox>

      {error && (
        <Typography data-cy="pkce-error" color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      {codeVerifier && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Code Verifier:
          </Typography>
          <TextField
            data-cy="pkce-code-verifier"
            value={codeVerifier}
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            InputProps={{ readOnly: true }}
            sx={{ marginBottom: 2 }}
          />
        </>
      )}

      {codeChallenge && (
        <>
          <Typography variant="h6" gutterBottom>
            Code Challenge:
          </Typography>
          <TextField
            data-cy="pkce-code-challenge"
            value={codeChallenge}
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            InputProps={{ readOnly: true }}
          />
        </>
      )}
    </Box>
  );
};

export default PkceGenerator;