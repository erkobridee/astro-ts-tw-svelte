import type { BarSeriesOption, ECElementEvent } from 'echarts';

import type { TimeSerie, DayUsage } from '~/utils/timeseries';

//----------------------------------------------------------------------------//
// https://echarts.apache.org/en/option.html#color

// TODO: move it to the utils/format.ts

export const hexToRGB = (hex: string, alpha: number | undefined = 1) => {
  if (!hex) {
    return '';
  }

  if (alpha < 0 || alpha > 1) {
    alpha = 1;
  }

  hex = hex.toUpperCase();

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

//----------------------------------------------------------------------------//
// https://v3.tailwindcss.com/docs/customizing-colors

export const COLOR_GRAY_50 = '#f9fafb'; // tailwind color gray 50

export const COLOR_DEFAULT = '#6b7280'; // tailwind color gray 500

export const COLOR_GAS_CONSUMPTION = '#0891b2'; // tailwind color cyan 600

export const COLOR_ELECTRICITY_CONSUMPTION = '#3b82f6'; // tailwind color blue 500

export const COLOR_ELECTRICITY_PRODUCTION = '#f59e0b'; // tailwind color amber 500

export const LABEL_COLOR = '#5c6660';

export const LINE_COLOR = '#a3a3a3';

//---//

export const LINE_STYLE = {
  type: [1, 3],
  color: LINE_COLOR
};

//----------------------------------------------------------------------------//

// LineStyleOption
// https://github.com/apache/echarts/blob/b1a237448b11bcb326c3a61339c369c9ccded5ed/src/util/types.ts#L936

// https://echarts.apache.org/en/option.html#series-bar.markLine.lineStyle.type
// https://github.com/apache/echarts/blob/b1a237448b11bcb326c3a61339c369c9ccded5ed/src/util/types.ts#L71
export const LineType = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted'
} as const satisfies Record<string, string>;

export type LineTypeKeys = keyof typeof LineType;
export type LineTypes = (typeof LineType)[LineTypeKeys] | number | number[];

//---//

export interface MarkLineOptions {
  label?: string;
  color?: string;
  width?: number;
  type?: LineTypes;
}

//---//

export const DEFAULT_MARKLINE_LABEL = 'Reference Power';

export const DEFAULT_MARKLINE_COLOR = '#ea580c'; // tailwind color orange 600

export const DEFAULT_MARKLINE_WIDTH = 2;

export const DEFAULT_MARKLINE_TYPE = LineType.SOLID;

export const DEFAULT_MARKLINE_OPTIONS: MarkLineOptions = {
  label: DEFAULT_MARKLINE_LABEL,
  color: DEFAULT_MARKLINE_COLOR,
  width: DEFAULT_MARKLINE_WIDTH,
  type: DEFAULT_MARKLINE_TYPE
};

//----------------------------------------------------------------------------//
// https://day.js.org/docs/en/display/format

// TODO: remove and use the functions from utils/format.ts

export const WEEKDAY_FORMAT = 'ddd';

export const DATE_FORMAT = 'DD.MM.YYYY';

export const DATETIME_FORMAT = `${DATE_FORMAT}, HH:mm:ss`;

export const WEEKDAY_HOUR_FORMAT = 'dd HH:mm';

//----------------------------------------------------------------------------//

// TODO: review - it seems that could be remove
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

// https://echarts.apache.org/handbook/en/concepts/event/
export type ChartClick = (event: ECElementEvent) => void;

export const DEFAULT_CHART_CLICK: ChartClick = () => undefined;

export type TimeSerieBarClick = (timeserie: TimeSerie) => void;

export const DEFAULT_TIMESERIE_CLICK: TimeSerieBarClick = () => undefined;

export type DailyUsageBarClick = (dayUsage: DayUsage) => void;

export const DEFAULT_DAILYUSAGE_CLICK: DailyUsageBarClick = () => undefined;

//----------------------------------------------------------------------------//
