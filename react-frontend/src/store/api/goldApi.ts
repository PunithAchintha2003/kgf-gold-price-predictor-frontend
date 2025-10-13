import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface DailyDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface HistoricalPrediction {
  date: string;
  predicted_price: number;
  actual_price?: number;
}

export interface Prediction {
  next_day: string;
  predicted_price: number;
  current_price: number;
  prediction_method: string;
}

export interface AccuracyStats {
  average_accuracy: number;
  r2_score: number;
  total_predictions: number;
  evaluated_predictions: number;
}

export interface DailyDataResponse {
  symbol: string;
  timeframe: string;
  data: DailyDataPoint[];
  historical_predictions: HistoricalPrediction[];
  accuracy_stats: AccuracyStats;
  current_price: number;
  prediction?: Prediction;
  timestamp: string;
  status: string;
  message?: string;
}

export interface RealtimePriceResponse {
  symbol: string;
  current_price: number;
  timestamp: string;
  status: string;
  message?: string;
}

export interface PredictionFactor {
  factor: string;
  value: string;
  interpretation: string;
  impact: 'Bullish' | 'Bearish' | 'Neutral' | 'Uncertain' | 'Stable';
  confidence: 'High' | 'Medium' | 'Low';
}

export interface PredictionExplanation {
  current_price: number;
  overall_sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  sentiment_explanation: string;
  factors: PredictionFactor[];
  summary: {
    bullish_factors: number;
    bearish_factors: number;
    neutral_factors: number;
    total_factors: number;
  };
  error?: string;
}

export interface ExchangeRateResponse {
  from_currency: string;
  to_currency: string;
  exchange_rate: number;
  timestamp: string;
  status: string;
  message?: string;
}

export const goldApi = createApi({
  reducerPath: 'goldApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8001',
  }),
  tagTypes: ['DailyData', 'RealtimePrice', 'PredictionExplanation', 'ExchangeRate'],
  endpoints: (builder) => ({
    getDailyData: builder.query<DailyDataResponse, void>({
      query: () => '/xauusd',
      providesTags: ['DailyData'],
    }),
    getRealtimePrice: builder.query<RealtimePriceResponse, void>({
      query: () => '/xauusd/realtime',
      providesTags: ['RealtimePrice'],
    }),
    getPredictionExplanation: builder.query<PredictionExplanation, void>({
      query: () => '/xauusd/explanation',
      providesTags: ['PredictionExplanation'],
    }),
    getExchangeRate: builder.query<ExchangeRateResponse, { from: string; to: string }>({
      query: ({ from, to }) => `/exchange-rate/${from}/${to}`,
      providesTags: ['ExchangeRate'],
    }),
  }),
});

export const { useGetDailyDataQuery, useGetRealtimePriceQuery, useGetPredictionExplanationQuery, useGetExchangeRateQuery } = goldApi;
