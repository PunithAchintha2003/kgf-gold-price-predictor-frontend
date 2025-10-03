import React, { useMemo, useCallback, Suspense, lazy } from 'react';
// Assuming these types are correctly defined elsewhere:
import type { DailyDataPoint, HistoricalPrediction, Prediction } from '../store/api/goldApi';
import type { CurrencyUnit } from './CurrencyDropdown';
// Assuming this utility is correctly defined elsewhere:
import { convertPrice } from '../utils/currencyConverter';

// Lazy load Plotly to reduce initial bundle size
const Plot = lazy(() => import('react-plotly.js'));

// Placeholder for Plotly.js type (if not available globally)
declare type PlotlyData = Plotly.Data;

interface ChartProps {
  data: DailyDataPoint[];
  prediction?: Prediction;
  historicalPredictions?: HistoricalPrediction[];
  isDark: boolean;
  height?: number;
  realtimePrice?: number;
  currencyUnit: CurrencyUnit;
  usdToLkrRate: number;
}

const Chart: React.FC<ChartProps> = ({
  data,
  prediction,
  historicalPredictions,
  isDark,
  height = 600,
  realtimePrice,
  currencyUnit,
  usdToLkrRate,
}) => {
  // Convert realtime price if it exists and we're in LKR mode (pawn)
  const convertedRealtimePrice = useMemo(() => {
    if (!realtimePrice) return realtimePrice;
    
    return currencyUnit === 'pawn' 
      ? convertPrice(realtimePrice, currencyUnit, usdToLkrRate).price 
      : realtimePrice;
  }, [realtimePrice, currencyUnit, usdToLkrRate]);
  
  // Calculate current price (this will be the converted price from the data)
  const currentPrice = useMemo(() => {
    if (convertedRealtimePrice) return convertedRealtimePrice;
    return data && data.length > 0 ? data[data.length - 1].close : 0;
  }, [convertedRealtimePrice, data]);
  
  // Helper function to format LKR values in user-friendly way
  const formatLKRValue = useCallback((value: number) => {
    if (currencyUnit === 'pawn') {
      if (value >= 1000000) {
        return `LKR ${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `LKR ${(value / 1000).toFixed(0)}K`;
      } else {
        return `LKR ${value.toFixed(0)}`;
      }
    } else {
      return `$${value.toFixed(2)}`;
    }
  }, [currencyUnit]);

  const plotData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const traces: PlotlyData[] = [];

    // Main price line (gold yellow)
    traces.push({
      x: data.map(d => d.date),
      y: data.map(d => d.close),
      type: 'scatter',
      mode: 'lines',
      name: 'Gold Price Line',
      line: {
        color: '#F5D300',
        width: 2,
      },
      hovertemplate: `Date: %{x}<br>Price: %{customdata}<extra></extra>`,
      customdata: data.map(d => formatLKRValue(d.close)),
    });

    // Ghost line - show all predicted prices with specified color #0055ff
    if (historicalPredictions && historicalPredictions.length > 0) {
      const ghostData = historicalPredictions.filter(p => p.predicted_price);

      if (ghostData.length > 0) {
        // Convert historical predictions to current currency unit
        const convertedGhostData = ghostData.map(p => ({
          ...p,
          predicted_price: convertPrice(p.predicted_price, currencyUnit, usdToLkrRate).price
        }));

        traces.push({
          x: convertedGhostData.map(p => p.date),
          y: convertedGhostData.map(p => p.predicted_price),
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Accuracy Line',
          line: {
            color: '#0055ff', // Your specified color
            width: 3,
            dash: 'solid',
          },
          marker: {
            color: '#0055ff',
            size: 8,
            symbol: 'circle',
          },
          opacity: 0.8,
          hovertemplate: `Predicted: %{x}<br>Price: %{customdata}<extra></extra>`,
          customdata: convertedGhostData.map(p => formatLKRValue(p.predicted_price)),
        });
      }
    }

    let predDate: string | undefined;
    let predPrice: number | undefined;

    if (prediction && prediction.predicted_price) {
      predDate = prediction.next_day;
      predPrice = convertPrice(prediction.predicted_price, currencyUnit, usdToLkrRate).price;

      // Future predictions (predictions without actual prices)
      const isAlreadyInHistorical = historicalPredictions?.some(p => p.date === predDate);

      if (!isAlreadyInHistorical) {
        traces.push({
          x: [predDate],
          y: [predPrice],
          type: 'scatter',
          mode: 'markers',
          name: 'Future Prediction',
          marker: {
            color: '#ff6b35',
            size: 8,
            symbol: 'diamond',
          },
          opacity: 0.8,
          hovertemplate: `Future Prediction: %{x}<br>Price: ${formatLKRValue(predPrice)}<extra></extra>`,
        });
      }
    }

    // Current price marker
    const lastDate = data[data.length - 1].date;

    traces.push({
      x: [lastDate],
      y: [currentPrice],
      type: 'scatter',
      mode: 'markers',
      name: 'Current Price',
      marker: {
        color: '#F5D300', // Back to original yellow
        size: 9,
      },
      hovertemplate: `Current Price<br>Date: %{x}<br>Price: ${formatLKRValue(currentPrice)}<extra></extra>`,
    });

    // Current price horizontal line
    traces.push({
      x: [data[0].date, lastDate],
      y: [currentPrice, currentPrice],
      type: 'scatter',
      mode: 'lines',
      name: 'Current Price Level',
      line: {
        color: '#F5D300', // Back to original yellow
        width: 1.5,
        dash: 'dot',
      },
      showlegend: false,
      hoverinfo: 'skip',
    });

    // Prediction line and level
    if (predDate && predPrice !== undefined) {
      // Prediction line
      traces.push({
        x: [lastDate, predDate],
        y: [currentPrice, predPrice],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Prediction',
        line: {
          color: '#00fa2e',
          width: 2,
          dash: 'dot',
        },
        marker: {
          color: '#00fa2e',
          size: 7,
        },
        hovertemplate: `Prediction Date: %{x}<br>Price: ${formatLKRValue(predPrice)}<extra></extra>`,
      });

      // Prediction horizontal line
      traces.push({
        x: [data[0].date, predDate],
        y: [predPrice, predPrice],
        type: 'scatter',
        mode: 'lines',
        name: 'Prediction Level',
        line: {
          color: '#26d4b4',
          width: 1.5,
          dash: 'dot',
        },
        showlegend: false,
        hoverinfo: 'skip',
      });
    }

    return traces;
  }, [data, prediction, historicalPredictions, currentPrice, currencyUnit, usdToLkrRate, formatLKRValue]);

  const layout = useMemo(() => {
    // Dynamic LKR tick calculation for clean chart
    const getLKRTickVals = () => {
      const allPrices = data.map(d => d.close);
      if (currentPrice > 0) allPrices.push(currentPrice);
      if (prediction && prediction.predicted_price) {
        allPrices.push(convertPrice(prediction.predicted_price, currencyUnit, usdToLkrRate).price);
      }
      
      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      const range = maxPrice - minPrice;
      
      let tickStep = 0;
      
      // Determine a dynamic step based on the range for a clean look
      if (range >= 50000) {
        tickStep = 10000; // 10K step for large fluctuations
      } else if (range >= 10000) {
        tickStep = 5000; // 5K step
      } else if (range >= 2000) {
        tickStep = 1000; // 1K step
      } else {
        tickStep = 500; // 500 LKR for small ranges
      }
      
      // Calculate a "clean" starting point by rounding down the minPrice to the nearest tickStep
      const start = Math.floor(minPrice / tickStep) * tickStep;
      
      const levels: number[] = [];
      let currentLevel = start;
      // Generate ticks until they exceed the max price
      while (currentLevel <= maxPrice) {
        levels.push(currentLevel);
        currentLevel += tickStep;
      }
      
      // Ensure we have at least 5 ticks if possible, even if the step needs slight adjustment
      if (levels.length < 3 && range > 0) {
          // If the range is very small, use an even smaller step
          tickStep = Math.max(100, Math.ceil(range / 50) * 10);
          levels.length = 0; // Reset
          currentLevel = Math.floor(minPrice / tickStep) * tickStep;
           while (currentLevel <= maxPrice) {
               levels.push(currentLevel);
               currentLevel += tickStep;
           }
      }
      
      return levels.filter(val => val > 0); // Filter out zero if it appears
    };

    const predPriceConverted = prediction && prediction.predicted_price 
        ? convertPrice(prediction.predicted_price, currencyUnit, usdToLkrRate).price 
        : undefined;

    return {
      title: undefined,
      xaxis: {
        showgrid: true,
        gridwidth: 1,
        gridcolor: isDark ? '#1f1f1f' : '#E0E0E0',
        color: isDark ? '#888888' : '#666666',
        showline: true,
        linewidth: 1,
        linecolor: isDark ? '#333333' : '#CCCCCC',
        zeroline: false,
        tickformat: '%b %d',
      },
      yaxis: {
        showgrid: true,
        gridwidth: 1,
        gridcolor: isDark ? '#1f1f1f' : '#E0E0E0',
        color: isDark ? '#888888' : '#666666',
        showline: true,
        linewidth: 1,
        linecolor: isDark ? '#333333' : '#CCCCCC',
        zeroline: false,
        // Plotly will automatically format the ticks based on the data and range
        tickformat: currencyUnit === 'pawn' ? ',.0f' : '$,.2f',
        ticksuffix: currencyUnit === 'pawn' ? ' LKR' : '',
        side: 'right' as const,
        // Dynamic LKR tick values for clean, representative gaps
        ...(currencyUnit === 'pawn' ? {
          tickmode: 'array' as const,
          tickvals: getLKRTickVals(),
        } : {
          tickmode: 'auto' as const,
        }),
      },
      plot_bgcolor: isDark ? '#000000' : '#FFFFFF',
      paper_bgcolor: isDark ? '#000000' : '#FFFFFF',
      font: {
        color: isDark ? '#FFFFFF' : '#000000',
        family: 'Segoe UI, Roboto, sans-serif',
      },
      hovermode: 'x' as const,
      showlegend: true,
      legend: {
        x: 0.02,
        y: 0.98,
        bgcolor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
        bordercolor: isDark ? '#333333' : '#CCCCCC',
        borderwidth: 1,
        font: {
          size: 10,
        },
      },
      margin: {
        l: 10,
        r: 80,
        t: 20,
        b: 40,
      },
      height,
      annotations: [
        // Current price annotation aligned with prediction
        {
          x: prediction && prediction.predicted_price ? prediction.next_day : data[data.length - 1].date,
          y: currentPrice,
          text: formatLKRValue(currentPrice),
          showarrow: false,
          font: {
            color: '#F5D300',
            size: 14,
            family: 'Segoe UI, Roboto, sans-serif'
          },
          xanchor: 'left' as const,
          yanchor: 'middle' as const,
          xshift: 10
        },
        // Prediction price annotation
        ...(predPriceConverted !== undefined ? [{
          x: prediction!.next_day,
          y: predPriceConverted, // Use the converted price
          text: formatLKRValue(predPriceConverted),
          showarrow: false,
          font: {
            color: '#26d4b4',
            size: 14,
            family: 'Segoe UI, Roboto, sans-serif'
          },
          xanchor: 'left' as const,
          yanchor: 'middle' as const,
          xshift: 10
        }] : [])
      ]
    };
  }, [isDark, height, currentPrice, prediction, data, currencyUnit, usdToLkrRate, formatLKRValue]);

  const config = {
    displayModeBar: false,
    displaylogo: false,
    responsive: true,
  };

  if (!data || data.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center h-${height} ${isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg`}
        style={{ height: `${height}px` }}
      >
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Suspense fallback={
        <div 
          className={`flex items-center justify-center h-${height} ${isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg`}
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-2"></div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading chart...</p>
          </div>
        </div>
      }>
        <Plot
          // Key ensures Plotly re-renders when crucial props change
        key={`plot-${currencyUnit}-${data.length}-${isDark}`} 
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: `${height}px` }}
      />
      </Suspense>
    </div>
  );
};

export default Chart;