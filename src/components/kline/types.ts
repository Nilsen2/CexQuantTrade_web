import type { CandlestickData, SeriesMarker, UTCTimestamp } from 'lightweight-charts';


export type StrategyChartData = {
  klines: CandlestickData[];
  markers?: SeriesMarker<UTCTimestamp>[];
};
