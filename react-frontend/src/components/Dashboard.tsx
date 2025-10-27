import React, { useEffect, useState, useMemo, Suspense, lazy } from 'react';
import { Box, Typography, CircularProgress, Alert, Chip } from '@mui/material';
import { useGetDailyDataQuery, useGetRealtimePriceQuery, useGetExchangeRateQuery } from '../store/api/goldApi';
import { useTheme } from '../hooks/useTheme';
// import { useWebSocket } from '../hooks/useWebSocket';
import type { CurrencyUnit } from './CurrencyDropdown';
import { convertPrice, convertChartData } from '../utils/currencyConverter';

// Import Chart directly to avoid React module resolution issues with Plotly
import Chart from './Chart';

// Lazy load other heavy components
const AccuracyStats = lazy(() => import('./AccuracyStats'));
const PredictionExplanation = lazy(() => import('./PredictionExplanation'));

interface DashboardProps {
  currencyUnit: CurrencyUnit;
}

const Dashboard: React.FC<DashboardProps> = ({ currencyUnit }) => {
  const { isDark } = useTheme();
  const [realtimePrice, setRealtimePrice] = useState<number | null>(null);

  // WebSocket connection for real-time updates (temporarily disabled for debugging)
  // const { data: wsData, isConnected: wsConnected, error: wsError } = useWebSocket('wss://kgf-gold-price-predictor-ml-backend.onrender.com/ws/xauusd');
  const wsData = null;
  const wsConnected = false;
  const wsError = null;

  // Fetch daily data (fallback)
  const {
    data: dailyData,
    error: dailyError,
    isLoading: dailyLoading,
  } = useGetDailyDataQuery(undefined, {
    pollingInterval: 10000, // Poll every 10 seconds
  });

  // Fetch real-time price (fallback)
  const {
    data: realtimeData,
    error: realtimeError,
    isLoading: realtimeLoading,
  } = useGetRealtimePriceQuery(undefined, {
    pollingInterval: 2000, // Poll every 2 seconds for real-time updates
  });

  // Fetch USD/LKR exchange rate
  const {
    data: exchangeRateData,
  } = useGetExchangeRateQuery({ from: 'USD', to: 'LKR' }, {
    pollingInterval: 30000, // Poll every 30 seconds
  });

  // Use WebSocket data if available, otherwise fall back to REST API
  const displayData = wsData || dailyData;
  const displayError = wsError || dailyError;
  const displayLoading = !wsConnected && dailyLoading;

  // Use real-time price if available, otherwise fall back to daily data
  const currentPrice = realtimePrice || displayData?.current_price || 0;
  
  // Get exchange rate for conversion
  const usdToLkrRate = exchangeRateData?.exchange_rate || 300; // Fallback to 300 if API fails

  // Update real-time price when data changes
  useEffect(() => {
    if (realtimeData?.current_price) {
      console.log('Real-time price update:', realtimeData.current_price);
      setRealtimePrice(realtimeData.current_price);
    }
  }, [realtimeData]);


  // Update chart data with real-time price and convert based on currency unit
  const chartData = useMemo(() => {
    if (!displayData?.data) return [];
    
    const updatedData = [...displayData.data];
    if (realtimePrice && updatedData.length > 0) {
      // Update the last data point with real-time price (realtimePrice is always in USD)
      const lastDataPoint = updatedData[updatedData.length - 1];
      updatedData[updatedData.length - 1] = {
        ...lastDataPoint,
        close: realtimePrice
      };
    }
    
    // Convert data based on selected currency unit
    return convertChartData(updatedData, currencyUnit, usdToLkrRate);
  }, [displayData?.data, realtimePrice, currencyUnit, usdToLkrRate]);

  // Convert current price for display
  const convertedCurrentPrice = useMemo(() => {
    return convertPrice(currentPrice, currencyUnit, usdToLkrRate);
  }, [currentPrice, currencyUnit, usdToLkrRate]);

  // Convert prediction price for display
  const convertedPredictionPrice = useMemo(() => {
    if (!displayData?.prediction?.predicted_price) return null;
    return convertPrice(displayData.prediction.predicted_price, currencyUnit, usdToLkrRate);
  }, [displayData?.prediction?.predicted_price, currencyUnit, usdToLkrRate]);

  if (displayLoading) {
    return (
      <Box className="flex items-center justify-center h-96">
        <CircularProgress />
      </Box>
    );
  }

  if (displayError) {
    return (
      <Box className="p-4">
        <Alert severity="error">
          Unable to fetch data. Please check if the backend is running.
        </Alert>
      </Box>
    );
  }

  if (!displayData || displayData.status !== 'success') {
    return (
      <Box className="p-4">
        <Alert severity="warning">
          No data available
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="w-full">
      {/* Header */}
      <Typography 
        variant="h1" 
        className={`${isDark ? 'text-white' : 'text-black'} text-center mb-6`}
        sx={{
          fontSize: '2.8rem',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: isDark ? '#FFFFFF' : '#000000',
        }}
      >
        📈 Gold Price Prediction
      </Typography>

      {/* Connection Status */}
      <Box className="mb-4 flex justify-center items-center">
        <Chip
          label={wsConnected ? "LIVE" : "📡  REST API"}
          color={wsConnected ? "success" : "default"}
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Chart */}
      <Box className="mb-6">
        <Chart
          key={`chart-${realtimePrice || displayData?.current_price || 0}-${currencyUnit}`}
          data={chartData}
          prediction={displayData.prediction}
          historicalPredictions={displayData.historical_predictions}
          isDark={isDark}
          height={600}
          realtimePrice={realtimePrice || undefined}
          currencyUnit={currencyUnit}
          usdToLkrRate={usdToLkrRate}
        />
      </Box>

      {/* Price Information Cards */}
      <Box className="mb-6">
        <Box 
          className={`${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'} border rounded-xl`}
          sx={{ 
            backgroundColor: isDark ? '#111111' : '#FFFFFF',
            border: `1px solid ${isDark ? '#1f1f1f' : '#E0E0E0'}`,
            borderRadius: '12px',
            marginTop: '1rem',
            padding: '1.5rem',
          }}
        >
          {/* Grid layout for cards */}
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: '1rem',
            }}
          >
            {/* Current Price Card */}
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
                🔴 LIVE PRICE
              </Typography>
              <Typography 
                variant="h4" 
                className="text-yellow-500 font-bold"
                sx={{ 
                  color: '#F5D300',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                }}
              >
                {convertedCurrentPrice.displayText}
              </Typography>
            </Box>

            {/* Prediction Card */}
            {displayData.prediction && displayData.prediction.predicted_price && (
              <>
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
                    Next Day Prediction
                  </Typography>
                  <Typography 
                    variant="h4" 
                    className="text-prediction-green font-bold"
                    sx={{ 
                      color: '#26d4b4',
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      lineHeight: 1.2,
                    }}
                  >
                    {convertedPredictionPrice?.displayText || `$${displayData.prediction.predicted_price.toFixed(2)}`}
                  </Typography>
                </Box>

                {/* Expected Change Card */}
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
                    Expected Change
                  </Typography>
                  <Typography 
                    variant="h5" 
                    className="font-bold"
                    sx={{ 
                      color: (() => {
                        if (!convertedPredictionPrice) return '#666666';
                        const priceChange = convertedPredictionPrice.price - convertedCurrentPrice.price;
                        return priceChange >= 0 ? '#26d4b4' : '#ff4757';
                      })(),
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      lineHeight: 1.2,
                    }}
                  >
                    {(() => {
                      if (!convertedPredictionPrice) return 'N/A';
                      const priceChange = convertedPredictionPrice.price - convertedCurrentPrice.price;
                      const priceChangePct = convertedCurrentPrice.price > 0 ? (priceChange / convertedCurrentPrice.price) * 100 : 0;
                      const isPositive = priceChange >= 0;
                      const trendSymbol = isPositive ? "↗" : "↘";
                      const currencySymbol = currencyUnit === 'pawn' ? 'LKR ' : '$';
                      return `${trendSymbol} ${currencySymbol}${Math.abs(priceChange).toFixed(currencyUnit === 'pawn' ? 0 : 2)} (${priceChangePct >= 0 ? '+' : ''}${priceChangePct.toFixed(2)}%)`;
                    })()}
                  </Typography>
                </Box>

                {/* Method Card */}
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
                    Method
                  </Typography>
                  <Typography 
                    variant="h6" 
                    className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-bold`}
                    sx={{ 
                      color: isDark ? '#888888' : '#666666',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      lineHeight: 1.3,
                    }}
                  >
                    Lasso Regression
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Accuracy Stats */}
      <Box>
        <Suspense fallback={
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        }>
          <AccuracyStats
            accuracyStats={displayData.accuracy_stats}
            isDark={isDark}
          />
        </Suspense>
      </Box>

      {/* Prediction Explanation */}
      <Box>
        <Suspense fallback={
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        }>
          <PredictionExplanation isDark={isDark} />
        </Suspense>
      </Box>

      {/* Real-time loading indicator */}
      {realtimeLoading && (
        <Box className="fixed bottom-4 right-4">
          <CircularProgress size={24} />
        </Box>
      )}

      {/* Real-time error */}
      {realtimeError && (
        <Box className="fixed bottom-4 right-4">
          <Alert severity="warning" sx={{ fontSize: '0.75rem' }}>
            Real-time updates unavailable
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
