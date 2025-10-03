import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useGetPredictionExplanationQuery } from '../store/api/goldApi';

interface PredictionExplanationProps {
  isDark: boolean;
}

const PredictionExplanationComponent: React.FC<PredictionExplanationProps> = ({ isDark }) => {
  const { data: explanation, error, isLoading } = useGetPredictionExplanationQuery(undefined, {
    pollingInterval: 30000, // Poll every 30 seconds for market factors
  });

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Bullish':
        return <TrendingUpIcon sx={{ color: '#26d4b4', fontSize: '1.2rem' }} />;
      case 'Bearish':
        return <TrendingDownIcon sx={{ color: '#ff6b6b', fontSize: '1.2rem' }} />;
      default:
        return <TrendingFlatIcon sx={{ color: '#ffa500', fontSize: '1.2rem' }} />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Bullish':
        return '#26d4b4';
      case 'Bearish':
        return '#ff6b6b';
      default:
        return '#ffa500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Bullish':
        return '#26d4b4';
      case 'Bearish':
        return '#ff6b6b';
      case 'Neutral':
        return '#ffa500';
      case 'Uncertain':
        return '#9c27b0';
      case 'Stable':
        return '#2196f3';
      default:
        return '#666666';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return '#4caf50';
      case 'Medium':
        return '#ff9800';
      case 'Low':
        return '#f44336';
      default:
        return '#666666';
    }
  };

  if (isLoading) {
    return (
      <Card 
        className={`${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'} border rounded-xl mt-4`}
        sx={{ 
          backgroundColor: isDark ? '#111111' : '#FFFFFF',
          border: `1px solid ${isDark ? '#1f1f1f' : '#E0E0E0'}`,
          borderRadius: '12px',
          marginTop: '1rem',
        }}
      >
        <CardContent sx={{ padding: '1.5rem', textAlign: 'center' }}>
          <CircularProgress size={40} />
          <Typography 
            variant="body2" 
            className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}
            sx={{ 
              color: isDark ? '#cccccc' : '#666666',
              marginTop: '0.5rem',
            }}
          >
            Analyzing market conditions...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error || explanation?.error) {
    return (
      <Card 
        className={`${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'} border rounded-xl mt-4`}
        sx={{ 
          backgroundColor: isDark ? '#111111' : '#FFFFFF',
          border: `1px solid ${isDark ? '#1f1f1f' : '#E0E0E0'}`,
          borderRadius: '12px',
          marginTop: '1rem',
        }}
      >
        <CardContent sx={{ padding: '1.5rem' }}>
          <Alert severity="error">
            Failed to load prediction explanation. Please try again later.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!explanation) {
    return null;
  }

  return (
    <Card 
      className={`${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'} border rounded-xl mt-4`}
      sx={{ 
        backgroundColor: isDark ? '#111111' : '#FFFFFF',
        border: `1px solid ${isDark ? '#1f1f1f' : '#E0E0E0'}`,
        borderRadius: '12px',
        marginTop: '1rem',
      }}
    >
      <CardContent sx={{ padding: '1.5rem' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Typography 
            variant="h6" 
            className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold`}
            sx={{ 
              color: isDark ? '#FFFFFF' : '#111827',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginRight: '0.5rem',
            }}
          >
            Why This Prediction?
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            {getSentimentIcon(explanation.overall_sentiment)}
            <Typography 
              variant="body2" 
              className={`${isDark ? 'text-gray-300' : 'text-gray-600'} ml-2`}
              sx={{ 
                color: isDark ? '#cccccc' : '#666666',
                marginLeft: '0.5rem',
              }}
            >
              {explanation.sentiment_explanation}
            </Typography>
          </Box>
        </Box>

        {/* Overall Sentiment Summary */}
        <Box 
          className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4 mb-4`}
          sx={{ 
            backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: getSentimentColor(explanation.overall_sentiment),
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginRight: '0.5rem',
              }}
            >
              {explanation.overall_sentiment} Outlook
            </Typography>
            <Chip 
              label={explanation.overall_sentiment}
              size="small"
              sx={{ 
                backgroundColor: getSentimentColor(explanation.overall_sentiment),
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          </Box>
          <Typography 
            variant="body2" 
            className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            sx={{ 
              color: isDark ? '#cccccc' : '#666666',
              fontSize: '0.875rem',
            }}
          >
            {explanation.sentiment_explanation}
          </Typography>
        </Box>

        {/* Market Factors Summary */}
        <Box sx={{ marginBottom: '1.5rem' }}>
          <Typography 
            variant="subtitle1" 
            className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold mb-3`}
            sx={{ 
              color: isDark ? '#FFFFFF' : '#111827',
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            Market Analysis Summary
          </Typography>
          <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Chip 
              label={`${explanation.summary.bullish_factors} Bullish`}
              size="small"
              sx={{ 
                backgroundColor: '#26d4b4',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
            <Chip 
              label={`${explanation.summary.bearish_factors} Bearish`}
              size="small"
              sx={{ 
                backgroundColor: '#ff6b6b',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
            <Chip 
              label={`${explanation.summary.neutral_factors} Neutral`}
              size="small"
              sx={{ 
                backgroundColor: '#ffa500',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
            <Chip 
              label={`${explanation.summary.total_factors} Total Factors`}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: isDark ? '#666666' : '#cccccc',
                color: isDark ? '#cccccc' : '#666666',
              }}
            />
          </Box>
        </Box>

        {/* Detailed Factors */}
        <Typography 
          variant="subtitle1" 
          className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold mb-3`}
          sx={{ 
            color: isDark ? '#FFFFFF' : '#111827',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Detailed Market Factors
        </Typography>

        {explanation.factors.map((factor, index) => (
          <Accordion 
            key={index}
            sx={{ 
              backgroundColor: isDark ? '#1a1a1a' : '#F9F9F9',
              marginBottom: '0.5rem',
              '&:before': { display: 'none' },
              boxShadow: 'none',
              border: `1px solid ${isDark ? '#333333' : '#E0E0E0'}`,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: isDark ? '#cccccc' : '#666666' }} />}
              sx={{ 
                padding: '0.75rem 1rem',
                '& .MuiAccordionSummary-content': {
                  margin: 0,
                  alignItems: 'center',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography 
                  variant="body2" 
                  className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}
                  sx={{ 
                    color: isDark ? '#FFFFFF' : '#111827',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  {factor.factor}
                </Typography>
                <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Chip 
                    label={factor.impact}
                    size="small"
                    sx={{ 
                      backgroundColor: getImpactColor(factor.impact),
                      color: 'white',
                      fontSize: '0.75rem',
                      height: '20px',
                    }}
                  />
                  <Chip 
                    label={factor.confidence}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      borderColor: getConfidenceColor(factor.confidence),
                      color: getConfidenceColor(factor.confidence),
                      fontSize: '0.75rem',
                      height: '20px',
                    }}
                  />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0 1rem 1rem 1rem' }}>
              <Box>
                <Typography 
                  variant="body2" 
                  className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}
                  sx={{ 
                    color: isDark ? '#cccccc' : '#666666',
                    fontSize: '0.8rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <strong>Current Value:</strong> {factor.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  sx={{ 
                    color: isDark ? '#cccccc' : '#374151',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                  }}
                >
                  <strong>Analysis:</strong> {factor.interpretation}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Disclaimer */}
        <Box 
          className={`${isDark ? 'bg-gray-800' : 'bg-blue-50'} rounded-lg p-3 mt-4`}
          sx={{ 
            backgroundColor: isDark ? '#1a1a1a' : '#EFF6FF',
            borderRadius: '8px',
            padding: '0.75rem',
            marginTop: '1rem',
          }}
        >
          <Typography 
            variant="caption" 
            className={`${isDark ? 'text-gray-400' : 'text-blue-600'}`}
            sx={{ 
              color: isDark ? '#9ca3af' : '#2563eb',
              fontSize: '0.75rem',
              lineHeight: 1.4,
            }}
          >
            <strong>Disclaimer:</strong> This analysis is based on technical indicators and market data. 
            Past performance does not guarantee future results. Always consider your risk tolerance 
            and consult with financial advisors before making investment decisions.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PredictionExplanationComponent;
