import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { diffLines } from 'diff';

interface DiffPart {
  value: string;   // The text value of the diff part
  added: boolean;  // Whether the text was added
  removed: boolean; // Whether the text was removed
}

const DiffChecker: React.FC = () => {
  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [diffResult, setDiffResult] = useState<DiffPart[]>([]);

  // Compare the two texts and set the differences
  const handleCompare = () => {
    const diff = diffLines(text1, text2); // Compare text1 and text2
    setDiffResult(diff);
  };

  // Render the diff result with added and removed text
  const renderDiff = () => {
    return diffResult.map((part, index) => {
      const isAdded = part.added;
      const isRemoved = part.removed;

      return (
        <span
          key={index}
          style={{
            backgroundColor: isAdded ? 'lightgreen' : isRemoved ? 'lightcoral' : 'transparent',
            textDecoration: isRemoved ? 'line-through' : 'none',
          }}
        >
          {part.value}
        </span>
      );
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Diff Checker
      </Typography>

      {/* Textfield for the first text input */}
      <TextField
        label="Text 1"
        multiline
        rows={6}
        fullWidth
        variant="outlined"
        value={text1}
        onChange={(e) => setText1(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Textfield for the second text input */}
      <TextField
        label="Text 2"
        multiline
        rows={6}
        fullWidth
        variant="outlined"
        value={text2}
        onChange={(e) => setText2(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Compare button */}
      <Button variant="contained" onClick={handleCompare} sx={{ marginBottom: 2 }}>
        Compare Texts
      </Button>

      {/* Render diff result */}
      {diffResult.length > 0 && (
        <Box sx={{
          padding: 2,
          border: '1px solid #ccc',
          maxHeight: '300px', // Limit height
          overflowY: 'auto',  // Enable scrolling if content exceeds max height
        }}>
          <Typography variant="body1" component="pre">
            {renderDiff()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DiffChecker;