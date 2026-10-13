import type {
  BarSeriesOption,
  TooltipComponentFormatterCallback,
  TooltipComponentFormatterCallbackParams
} from 'echarts';

//----------------------------------------------------------------------------//

export interface ChartDataZoomOptions {
  show?: boolean;
  windowSize?: number;
  minWindowSize?: number;

  /** once defining the data zoom if it's true that will selectt all the slider */
  showAll?: boolean;
}
export type ChartDataZoomLabelFormatter = (
  value: number,
  valueStr: string
) => string;

export type ChartXAxisLabelFormatter = (value: string) => string;
export type ChartYAxisLabelFormatter = (value: number) => string;
export type ChartTooltipFormatter =
  TooltipComponentFormatterCallback<TooltipComponentFormatterCallbackParams>;

export interface ChartOptions {
  color: string[];

  /** xAxis.data */
  categories: string[];

  series: BarSeriesOption[];

  xAxisLabelFormatter?: string | ChartXAxisLabelFormatter;
  yAxisLabelFormatter?: string | ChartYAxisLabelFormatter;
  tooltipFormatter?: string | ChartTooltipFormatter;

  dataZoomLabelFormatter?: string | ChartDataZoomLabelFormatter;
  dataZoomOptions?: ChartDataZoomOptions;
}

export type StackInfo = Record<
  string,
  {
    stackStart: number[];
    stackEnd: number[];
  }
>;

//--------------------------------------------------------------------------//

export const CLICK_EVENT = 'click';

export const MOUSE_EVENT = 'mousemove';

export const DEFAULT_DATA_ZOOM_OPTIONS: ChartDataZoomOptions = {
  show: false,
  windowSize: 12,
  showAll: false
};
