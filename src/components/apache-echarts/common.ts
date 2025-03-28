import type { BarSeriesOption } from 'echarts';

//---//

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//---//

export const LABEL_COLOR = '#71717a';

export const LINE_COLOR = '#a3a3a3';

//---//

export const LINE_STYLE = {
  type: [1, 3],
  color: LINE_COLOR
};

//---//

export const DEFAULT_RADIUS_BORDER = 10;

export const buildBarItemStyleBorderRadius = (
  topBorder = 0,
  bottomBorder = 0
): BarSeriesOption['itemStyle'] => ({
  borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
});
