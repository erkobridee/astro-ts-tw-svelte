export const EnergyChartType = {
  PLAIN: 'PLAIN',
  REPARTITION: 'REPARTITION',
  EXCEEDANCE: 'EXCEEDANCE'
} as const satisfies Record<string, string>;

export type EnergyChartTypeKeys = keyof typeof EnergyChartType;
export type EnergyChartTypes = (typeof EnergyChartType)[EnergyChartTypeKeys];

export type { ChartOptions, ChartDataZoomOptions } from './BaseColumnsChart';
export type { CallbackDataParams } from 'echarts/types/dist/shared.d.ts';
