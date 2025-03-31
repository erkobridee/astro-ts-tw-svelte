import type { BarSeriesOption } from 'echarts';

import type { TimeSerie } from '~/utils/timeseries';

//----------------------------------------------------------------------------//
// https://echarts.apache.org/en/option.html#color

export const hexToRGB = (hex: string, alpha: number | undefined = 1) => {
  hex = hex.toUpperCase();

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

//----------------------------------------------------------------------------//
// https://v3.tailwindcss.com/docs/customizing-colors

export const COLOR_GRAY_50 = '#f9fafb'; // tailwind color gray 50

export const COLOR_DEFAULT = '#9ca3af'; // tailwind color gray 400

export const COLOR_GAS_CONSUMPTION = '#0891b2'; // tailwind color cyan 600

export const COLOR_ELECTRICITY_CONSUMPTION = '#3b82f6'; // tailwind color blue 500

export const COLOR_ELECTRICITY_PRODUCTION = '#f59e0b'; // ailwind color amber 500

export const LABEL_COLOR = '#5c6660';

//----------------------------------------------------------------------------//

export const dimensions = [`startedAt`, `value`];

//----------------------------------------------------------------------------//

export const DEFAULT_RADIUS_BORDER = 8;

export const buildBarItemStyleBorderRadius = (
  topBorder = 0,
  bottomBorder = 0
): BarSeriesOption['itemStyle'] => ({
  borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
});

//----------------------------------------------------------------------------//

export type TimeSerieBarClick = (timeserie: TimeSerie) => void;

export const DEFAULT_TIMESERIE_CLICK: TimeSerieBarClick = () => undefined;
