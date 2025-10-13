import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import type { AccuracyStats as AccuracyStatsType } from '../store/api/goldApi';

interface AccuracyStatsProps {
  accuracyStats: AccuracyStatsType;
  isDark: boolean;
}

const AccuracyStats: React.FC<AccuracyStatsProps> = ({
  accuracyStats,
  isDark,
}) => {
  const pendingPredictions = accuracyStats.total_predictions - accuracyStats.evaluated_predictions;

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
        {/* Grid layout for accuracy stats cards */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: '1rem',
          }}
        >
          {/* Model Accuracy Card */}
          <Box 
            className={`flex flex-col justify-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
            sx={{ 
              backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5',
              borderRadius: '12px',
              padding: '1.5rem',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="body2" 
              className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-2`}
              sx={{ 
                color: isDark ? '#cccccc' : '#666666',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              R² Score
            </Typography>
            <Typography 
              variant="h4" 
              className="text-prediction-green font-bold"
              sx={{ 
                color: '#26d4b4',
                fontSize: '1.75rem',
                fontWeight: 'bold',
                lineHeight: 1.2,
                marginBottom: '0.25rem',
              }}
            >
              {accuracyStats.r2_score ? accuracyStats.r2_score.toFixed(3) : 'N/A'}
            </Typography>
            <Typography 
              variant="body2" 
              className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs font-medium`}
              sx={{ 
                color: isDark ? '#888888' : '#999999',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {accuracyStats.r2_score ? (accuracyStats.r2_score >= 0.7 ? 'Good' : 'Bad') : 'N/A'}
            </Typography>
          </Box>

          {/* Total Predictions Card */}
          <Box 
            className={`flex flex-col justify-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
            sx={{ 
              backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5',
              borderRadius: '12px',
              padding: '1.5rem',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="body2" 
              className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-2`}
              sx={{ 
                color: isDark ? '#cccccc' : '#666666',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              Total Predictions
            </Typography>
            <Typography 
              variant="h5" 
              className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-bold`}
              sx={{ 
                color: isDark ? '#888888' : '#666666',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                lineHeight: 1.2,
              }}
            >
              {accuracyStats.total_predictions} predictions
            </Typography>
          </Box>

          {/* Evaluated Card */}
          <Box 
            className={`flex flex-col justify-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
            sx={{ 
              backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5',
              borderRadius: '12px',
              padding: '1.5rem',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="body2" 
              className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-2`}
              sx={{ 
                color: isDark ? '#cccccc' : '#666666',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              Evaluated
            </Typography>
            <Typography 
              variant="h5" 
              className="text-prediction-green font-bold"
              sx={{ 
                color: '#26d4b4',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                lineHeight: 1.2,
              }}
            >
              {accuracyStats.evaluated_predictions} with results
            </Typography>
          </Box>

          {/* Pending Card */}
          <Box 
            className={`flex flex-col justify-center p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
            sx={{ 
              backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5',
              borderRadius: '12px',
              padding: '1.5rem',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="body2" 
              className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-2`}
              sx={{ 
                color: isDark ? '#cccccc' : '#666666',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              Pending
            </Typography>
            <Typography 
              variant="h5" 
              className="text-orange-500 font-bold"
              sx={{ 
                color: '#ffa500',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                lineHeight: 1.2,
              }}
            >
              {pendingPredictions} awaiting market results
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccuracyStats;
