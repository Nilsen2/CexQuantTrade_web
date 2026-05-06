'use client';

import { useEffect, useRef } from 'react';
import {
  createChart,
  IChartApi,
  CandlestickData,
} from 'lightweight-charts';
import type { StrategyChartData } from './types';

type Props = {
  data: StrategyChartData;
  height?: number;
};

export default function KlineChart({ data, height = 420 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart: IChartApi = createChart(ref.current, {
      height,
      layout: {
        background: {
          color: '#0b0e11',
        },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#1e222d' },
        horzLines: { color: '#1e222d' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#1e222d',
      },
    });
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candleSeries.setData(data.klines as CandlestickData[]);
    if (data.markers?.length) {
      candleSeries.setMarkers(data.markers);
    }

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [data, height]);

  return <div ref={ref} style={{ width: '100%' }} />;
}
