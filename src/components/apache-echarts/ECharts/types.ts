/*
  inspiration from
  https://github.com/bherbruck/svelte-echarts/blob/main/src/lib/svelte-echarts/types.ts

  echarts.init
  https://echarts.apache.org/en/api.html#echarts.init
*/

import type { HTMLAttributes } from 'svelte/elements';

import type {
  EChartsInitOpts,
  EChartsType,
  EChartsOption,
  SetOptionOpts
} from 'echarts';

//---///

type OmitHandlers<T> = {
  [K in keyof T as K extends `on${string}` ? never : K]: T[K];
};

//---//

export type EChartsInstance = EChartsType;

export type EChartsPropReplaceMerge = SetOptionOpts['replaceMerge'];

export interface EChartsProps
  extends OmitHandlers<HTMLAttributes<HTMLDivElement>> {
  options?: EChartsOption | undefined;

  // https://github.com/apache/echarts/blob/release/src/core/locale.ts
  /* build in locales: `ZH` and `EN` */
  locale?: string | undefined;

  theme?: string | object | null | undefined;
  initOptions?: EChartsInitOpts | undefined;

  notMerge?: SetOptionOpts['notMerge'];
  lazyUpdate?: SetOptionOpts['lazyUpdate'];
  silent?: SetOptionOpts['silent'];
  replaceMerge?: EChartsPropReplaceMerge;
  transition?: SetOptionOpts['transition'];

  /** it's the chart instance, to allow binding it from outside */
  chart?: EChartsInstance | undefined;
}
