import type { BarSeriesOption, ECElementEvent } from 'echarts';

import type { TimeSerie, DayUsage } from '~/utils/timeseries';

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

export const DEFAULT_RADIUS_BORDER = 8;

export const buildBarItemStyleBorderRadius = (
  topBorder = 0,
  bottomBorder = 0
): BarSeriesOption['itemStyle'] => ({
  borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
});

//----------------------------------------------------------------------------//

export interface BuildTooltipBarItemParam {
  color?: string;
  label?: string;
  value: any;
}

export type BuildTooltipBarItem = (param: BuildTooltipBarItemParam) => string;

export const buildTooltipBarItem: BuildTooltipBarItem = ({
  color,
  label,
  value
}) => {
  let content = '<div>';
  if (color) {
    content += `<span style="display:inline-block;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;
  }
  if (label) {
    content += `<span>${label}</span>`;
  }
  content += `<span style="float:right;margin-left:20px;font-weight:600">${value}</span>`;
  content += '</div>';

  return content;
};

//----------------------------------------------------------------------------//

// https://echarts.apache.org/handbook/en/concepts/event/
export type ChartClick = (event: ECElementEvent) => void;

export const DEFAULT_CHART_CLICK: ChartClick = () => undefined;

export type TimeSerieBarClick = (timeserie: TimeSerie) => void;

export const DEFAULT_TIMESERIE_CLICK: TimeSerieBarClick = () => undefined;

export type DailyUsageBarClick = (dayUsage: DayUsage) => void;

export const DEFAULT_DAILYUSAGE_CLICK: DailyUsageBarClick = () => undefined;

//----------------------------------------------------------------------------//
