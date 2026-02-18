import React, { useState } from 'react';
import { 
  Container, Box, TextField, Button, Typography, Paper, 
  CircularProgress, Chip, Divider, Stack 
} from '@mui/material';
import { Send as SendIcon, SentimentSatisfiedAlt, SentimentVeryDissatisfied, SentimentNeutral } from '@mui/icons-material';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Greška:", error);
    }
    setLoading(false);
  };

  const getSentimentDetails = (sentiment) => {
    switch(sentiment) {
      case 'positive': return { color: 'success', icon: <SentimentSatisfiedAlt /> };
      case 'negative': return { color: 'error', icon: <SentimentVeryDissatisfied /> };
      default: return { color: 'warning', icon: <SentimentNeutral /> };
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', textTransform: 'uppercase' }}>
          Sentiment Analyzer
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Enter text to analyze its emotional tone.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="E.g. This is the best day of my life!"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={analyzeSentiment}
            disabled={loading || !text.trim()}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{ py: 1.5, borderRadius: 2 }}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </Button>

          {result && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ my: 2 }}>RESULT</Divider>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Sentiment:</Typography>
                <Chip 
                  label={result.sentiment.toUpperCase()} 
                  color={getSentimentDetails(result.sentiment).color}
                  icon={getSentimentDetails(result.sentiment).icon}
                  sx={{ fontWeight: 'bold', px: 1 }}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Confidence Score:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {(result.confidence * 100).toFixed(0)}%
                </Typography>
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;