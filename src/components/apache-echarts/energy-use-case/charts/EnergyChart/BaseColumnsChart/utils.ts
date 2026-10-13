import type { EChartsOption, BarSeriesOption } from 'echarts';

import type { StackInfo } from './types';

import {
  DEFAULT_RADIUS_BORDER,
  buildBarItemStyleBorderRadius
} from '~/components/apache-echarts/energy-use-case/charts/common';

//----------------------------------------------------------------------------//

// map to know which bar entry needs to have the border radius
const buildStackInfo = (series: BarSeriesOption[]) => {
  const stackInfo: StackInfo = {};

  for (let i = 0; i < series[0].data!.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const serie = series[j];

      const stackName = serie.stack;
      if (!stackName) {
        continue;
      }

      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: []
        };
      }

      const info = stackInfo[stackName];
      const data = serie.data![i];

      // https://echarts.apache.org/en/option.html#series-bar.data
      // empty value: '-' or null or undefined or NaN
      const isPresent = (() => {
        const value = data && (data as any).value ? (data as any).value : data;

        if (!value || value === null) {
          return false;
        }

        switch (typeof value) {
          case 'number':
            return !isNaN(value);
          case 'string':
            return value !== '-';
        }
      })();

      if (isPresent) {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j;
        }

        info.stackEnd[i] = j;
      }
    }
  }

  return stackInfo;
};

// add the border radius to the specific data entry that needs to render it
export const addBorderRadiusToBars = (
  series: BarSeriesOption[]
): EChartsOption['series'] => {
  const stackInfo = buildStackInfo(series);

  for (let i = 0; i < series.length; ++i) {
    const serie = series[i];

    if (!serie.stack) {
      serie.itemStyle = {
        ...buildBarItemStyleBorderRadius(DEFAULT_RADIUS_BORDER),
        borderWidth: 1
      };

      continue;
    } else {
      serie.itemStyle = {
        borderWidth: 1
      };
    }

    const data = serie.data!;
    const dataLength = data.length;

    const info = stackInfo[serie.stack];

    for (let j = 0; j < dataLength; ++j) {
      // const isStart = info.stackStart[j] === i;
      const isEnd = info.stackEnd[j] === i;

      const value = (data[j] && (data[j] as any).value) || data[j];
      const itemStyle = {
        ...buildBarItemStyleBorderRadius(isEnd ? DEFAULT_RADIUS_BORDER : 0),
        borderWidth: 1
      };

      data[j] = {
        value,
        itemStyle
      } as any;
    }
  }

  return series;
};
