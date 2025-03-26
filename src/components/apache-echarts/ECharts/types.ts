import type { EChartsType, EChartsOption } from 'echarts';

export interface EChartsProps {
  // TODO: remove
  message?: string | undefined;

  chart?: EChartsType | undefined;
  options?: EChartsOption | undefined;
}

export type { EChartsType, EChartsOption } from 'echarts';
