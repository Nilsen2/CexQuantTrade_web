import type { CandlestickData, SeriesMarker, UTCTimestamp } from 'lightweight-charts';
import { generateMockKlines, generateMarkers, generateBoxKlinesReal } from '@/lib/mockKline';

export type StrategyKlineData = {
  klines: CandlestickData[];
  markers: SeriesMarker<UTCTimestamp>[];
};

export const meanStrategy: StrategyKlineData = {
  klines: generateMockKlines(100, 90, 1),
  markers: [],
};
meanStrategy.markers = generateMarkers(meanStrategy.klines, 'mean');

export const breakoutStrategy: StrategyKlineData = {
  klines: generateMockKlines(50, 90, 2),
  markers: [],
};
breakoutStrategy.markers = generateMarkers(breakoutStrategy.klines, 'breakout');

export const trendStrategy: StrategyKlineData = {
  klines: generateMockKlines(70, 90, 1.5),
  markers: [],
};
trendStrategy.markers = generateMarkers(trendStrategy.klines, 'trend');


const { klines, markers } = generateBoxKlinesReal(100, 90, 5, 2);

export const boxStrategy: StrategyKlineData = {
  klines,
  markers,
};