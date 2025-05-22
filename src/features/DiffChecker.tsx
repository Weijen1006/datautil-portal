import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { diffChars, diffLines } from 'diff';
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

interface DiffPart {
  count?: number | undefined; // The count of the diff part
  value: string;   // The text value of the diff part
  added: boolean;  // Whether the text was added
  removed: boolean; // Whether the text was removed
}

const DiffChecker: React.FC = () => {
  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [diffResult, setDiffResult] = useState<DiffPart[]>([]);
  const [addedCount, setAddedCount] = useState<number>(0);
  const [removedCount, setRemovedCount] = useState<number>(0);


  const countDiff = (diff: DiffPart[]) => {
    // Count added and removed lines
    let added = 0;
    let removed = 0;
    diff.forEach(part => {
      if (part.added && part.count) added = added + part.count;
      if (part.removed && part.count) removed = removed + part.count;
    });

    setAddedCount(added);
    setRemovedCount(removed);
  }

  // Compare the two texts and set the differences by characters
  const handleCompareChars = () => {
    const diff = diffChars(text1, text2); // Compare text1 and text2
    setDiffResult(diff);
    countDiff(diff);
  };

  // Compare the two texts and set the differences by lines
  const handleCompareLines = () => {
    const diff = diffLines(text1, text2); // Compare text1 and text2
    setDiffResult(diff);
    countDiff(diff);
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
        DiffChecker
      </Typography>

      <Grid container spacing={2} columns={{ xs: 6, sm: 12 }}>
        {/* First TextField */}
        <Grid size={6}>
          <TextField
            data-cy="text1-input"
            label="Text 1"
            multiline
            rows={12}
            fullWidth
            variant="outlined"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Grid>

        {/* Second TextField */}
        <Grid size={6}>
          <TextField
            data-cy="text2-input"
            label="Text 2"
            multiline
            rows={12}
            fullWidth
            variant="outlined"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
      </Grid>

      {/* Compare button */}
      <CustomResponsiveBox>
        <Button data-cy="compare-character" variant="contained" onClick={handleCompareChars} sx={{ marginBottom: 2 }}>
          Compare Characters
        </Button>
        <Button data-cy="compare-line" variant="contained" onClick={handleCompareLines} sx={{ marginBottom: 2 }}>
          Compare Lines
        </Button>
      </CustomResponsiveBox>

      {/* Display added and removed line counts with colors */}
      {diffResult.length > 0 && (
        <Box sx={{ marginY: 2, display: 'flex', gap: 1 }}>
          <Typography
            data-cy="added-count"
            variant="body2"
            sx={{ backgroundColor: 'lightgreen', fontWeight: 'bold', padding: '4px' }}
          >
            {addedCount}<strong> addition</strong>
          </Typography>
          <Typography
            data-cy="removed-count"
            variant="body2"
            sx={{ backgroundColor: 'lightcoral', fontWeight: 'bold', padding: '4px' }}
          >
            {removedCount}<strong> removal</strong>
          </Typography>
        </Box>
      )}

      {/* Render diff result */}
      {diffResult.length > 0 && (
        <Box sx={{
          padding: 2,
          border: '1px solid #ccc',
          maxHeight: '300px', // Limit height
          overflowY: 'auto',  // Enable scrolling if content exceeds max height
        }}>
          <Typography
            data-cy="diff-result"
            variant="body1"
            component="pre"
            sx={{
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}>
            {renderDiff()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DiffChecker;