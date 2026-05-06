// @ts-nocheck
import type { CandlestickData, SeriesMarker, UTCTimestamp } from 'lightweight-charts';

export function generateMockKlines(
  base: number,
  len: number,
  volatility: number
): CandlestickData[] {
  const klines: CandlestickData[] = [];
  let lastClose = base;

  for (let i = 0; i < len; i++) {
    const change = (Math.random() - 0.5) * volatility;
    const open = lastClose;
    const close = lastClose + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;

    klines.push({ time: 1710000000 + i * 60, open, high, low, close });
    lastClose = close;
  }

  return klines;
}

export function generateMarkers(
  klines: CandlestickData[],
  strategy: 'mean' | 'breakout' | 'trend' | 'box'
): SeriesMarker[] {
  const markers: SeriesMarker[] = [];

  for (let i = 1; i < klines.length; i++) {
    const k = klines[i];
    const prev = klines[i - 1];

    if (strategy === 'mean') {
      if (k.close < prev.close - 0.3) {
        markers.push({
          time: k.time,
          position: 'belowBar',
          color: '#4caf50',
          shape: 'arrowUp',
          text: 'BUY',
        });
      } else if (k.close > prev.close + 0.3) {
        markers.push({
          time: k.time,
          position: 'aboveBar',
          color: '#ff5722',
          shape: 'arrowDown',
          text: 'SELL',
        });
      }
    }

    if (strategy === 'breakout') {
      if (k.high > prev.high + 0.5) {
        markers.push({
          time: k.time,
          position: 'belowBar',
          color: '#4caf50',
          shape: 'circle',
          text: 'BUY',
        });
      } else if (k.low < prev.low - 0.5) {
        markers.push({
          time: k.time,
          position: 'aboveBar',
          color: '#ff5722',
          shape: 'circle',
          text: 'SELL',
        });
      }
    }

    if (strategy === 'trend') {
      const prev2 = klines[i - 2];
      if (i >= 2) {
        if (prev2.close < prev.close && prev.close < k.close) {
          markers.push({
            time: k.time,
            position: 'belowBar',
            color: '#4caf50',
            shape: 'arrowUp',
            text: 'BUY',
          });
        } else if (prev2.close > prev.close && prev.close > k.close) {
          markers.push({
            time: k.time,
            position: 'aboveBar',
            color: '#ff5722',
            shape: 'arrowDown',
            text: 'SELL',
          });
        }
      }
    }

  }

  return markers;
}

export function generateBoxKlinesReal(
  base: number,
  len: number,
  rangeWidth: number,
  volatility: number = 0.5
): { klines: CandlestickData[]; markers: SeriesMarker<UTCTimestamp>[] } {
  const klines: CandlestickData[] = [];
  const markers: SeriesMarker<UTCTimestamp>[] = [];

  const top = base + rangeWidth / 2;
  const bottom = base - rangeWidth / 2;

  let lastClose = base;
  let direction = 1; // 初始向上

  for (let i = 0; i < len; i++) {
    // 箱体震荡：连续方向 + 小幅随机波动
    let step = direction * (Math.random() * volatility + 0.1);

    let close = lastClose + step;

    // 碰到箱体边界反转
    if (close >= top) {
      close = top - Math.random() * volatility;
      direction = -1;
      markers.push({
        time: (1710000000 + i * 60) as UTCTimestamp,
        position: 'aboveBar',
        color: '#ff5722',
        shape: 'arrowDown',
        text: 'SELL',
      });
    } else if (close <= bottom) {
      close = bottom + Math.random() * volatility;
      direction = 1;
      markers.push({
        time: (1710000000 + i * 60) as UTCTimestamp,
        position: 'belowBar',
        color: '#4caf50',
        shape: 'arrowUp',
        text: 'BUY',
      });
    }

    const open = lastClose;

    // 高低价添加自然浮动
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;

    klines.push({ time: 1710000000 + i * 60, open, high, low, close });

    lastClose = close;

    // 小概率微调方向，增加自然感
    if (Math.random() < 0.05) direction *= -1;
  }

  return { klines, markers };
}

