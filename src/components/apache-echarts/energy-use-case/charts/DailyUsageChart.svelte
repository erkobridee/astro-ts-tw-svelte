<script lang="ts">
  import type {
    EChartsType,
    EChartsOption,
    ECElementEvent,
    BarSeriesOption
  } from 'echarts';
  import type { DailyUsage, TimeSerie } from '~/utils/timeseries';
  import type { DailyUsageBarClick } from './common';

  import dayjs from 'dayjs';
  import * as echarts from 'echarts';

  import { onMount } from 'svelte';

  import ECharts from '~/components/apache-echarts/ECharts';

  import { hexToRGB } from '~/utils/colors';
  import {
    formatNumber,
    dayjsFormat,
    DATE_FORMAT,
    WEEKDAY_SHORT_FORMAT
  } from '~/utils/format';

  import ChartLoadingSpinner from './ChartLoadingSpinner.svelte';

  import {
    COLOR_DEFAULT,
    COLOR_GRAY_50,
    LABEL_COLOR,
    DEFAULT_DAILYUSAGE_CLICK,
    DEFAULT_RADIUS_BORDER,
    buildTooltipBarItem
  } from './common';

  //--------------------------------------------------------------------------//

  // const locale = 'en-US';

  export let unit: string = '';
  export const tooltipDatetimeFormat: string = DATE_FORMAT;
  export const xAxisDatetimeFormat: string = WEEKDAY_SHORT_FORMAT;

  export let xAxisAttribute: string = 'startedAt';
  export let yAxisAttribute: string = 'value';

  export let currentColor: string = COLOR_DEFAULT;
  export let previousColor: string = COLOR_DEFAULT;
  export let colorOpacity: number = 0.55;
  export let backgroundColor: string = COLOR_GRAY_50;

  export let data: DailyUsage = { current: [], previous: [] };

  export let onclick: DailyUsageBarClick = DEFAULT_DAILYUSAGE_CLICK;

  let chart: EChartsType;
  let options: EChartsOption = {};

  $: updateOptions(
    data,
    xAxisAttribute,
    yAxisAttribute,
    currentColor,
    previousColor,
    colorOpacity,
    backgroundColor
  );

  const updateOptions = (
    dailyUsageData: DailyUsage,
    xAxisAttribute: string,
    yAxisAttribute: string,
    currentColor: string,
    previousColor: string,
    colorOpacity: number,
    backgroundColor: string
  ) => {
    const lightCurrentColor = hexToRGB(currentColor, colorOpacity);
    const lightPreviousColor = hexToRGB(previousColor, colorOpacity);

    const renderMarkLine = dailyUsageData.current.length > 0;
    dailyUsageData = generateEmptyDataIfNeeded(dailyUsageData);

    const { current: currentTimeSeries, previous: previousTimeSeries } =
      dailyUsageData;
    const dataLength = currentTimeSeries.length;
    const lastIndex = dataLength - 1;

    const data = currentTimeSeries.reduce<{
      xAxis: string[];
      current: Record<string, any>[];
      previous: Record<string, any>[];
    }>(
      (acc, item, index) => {
        const colorCurrent =
          index === lastIndex ? currentColor : lightCurrentColor;
        const colorPrevious =
          index === lastIndex ? previousColor : lightPreviousColor;

        acc.xAxis.push((item as any)[xAxisAttribute]);

        acc.current.push({
          value: (item as any)[yAxisAttribute],
          date: (item as any)[xAxisAttribute],
          itemStyle: {
            borderRadius: DEFAULT_RADIUS_BORDER,
            borderWidth: 1,
            borderColor: colorCurrent,
            color: colorCurrent
          }
        });

        acc.previous.push({
          value: (previousTimeSeries[index] as any)[yAxisAttribute],
          date: (previousTimeSeries[index] as any)[xAxisAttribute],
          itemStyle: {
            borderRadius: DEFAULT_RADIUS_BORDER,
            borderWidth: 1,
            borderColor: colorPrevious,
            color: colorPrevious
          }
        });

        return acc;
      },
      {
        xAxis: [],
        current: [],
        previous: []
      }
    );

    const X_PADDING = '2%';
    const Y_PADDING = 30;

    const grid: EChartsOption['grid'] = {
      top: Y_PADDING,
      bottom: Y_PADDING,
      left: '15%',
      right: X_PADDING
    };

    const tooltip: EChartsOption['tooltip'] = {
      trigger: 'axis',

      axisPointer: {
        type: 'shadow',
        // https://echarts.apache.org/en/option.html#tooltip.axisPointer.z
        z: 0,
        shadowStyle: {
          color: 'rgba(150,150,150,0.1)'
        }
      },

      // https://echarts.apache.org/en/option.html#tooltip.formatter
      formatter: (params: any) => {
        let content = '';
        (params as any[]).forEach((item) => {
          content += buildTooltipBarItem({
            color: item.color,
            label: dayjsFormat({
              date: item.data.date,
              template: tooltipDatetimeFormat
            }),
            value: formatNumber(item.value)
          });
        });
        return content;
      }
    };

    const xAxis: EChartsOption['xAxis'] = {
      type: 'category',
      data: data.xAxis,
      axisLabel: {
        formatter: (value) =>
          dayjsFormat({ date: value, template: xAxisDatetimeFormat }),
        color: LABEL_COLOR
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    };

    const yAxis: EChartsOption['yAxis'] = {
      type: 'value',
      show: false
    };

    const barPreviousSerie: BarSeriesOption = {
      type: 'bar',
      data: data.previous
    };

    const markLine: any = renderMarkLine
      ? {
          symbol: ['none', 'none'],
          data: [
            {
              type: 'average',

              // https://echarts.apache.org/en/option.html#series-bar.markLine.data.0.x
              // @ts-ignore
              x: X_PADDING,

              lineStyle: {
                color: currentColor,
                width: 2,
                type: 'solid'
              },

              // https://echarts.apache.org/en/option.html#series-bar.markLine.data.0.emphasis
              emphasis: {
                disabled: true
              },

              label: {
                show: true,
                position: 'insideStartTop',
                fontWeight: 'bold',
                fontSize: 12,
                formatter: (params: any) => Number(params.value).toFixed(3)
              }
            },
            {
              type: 'average',
              name: 'Average',

              // https://echarts.apache.org/en/option.html#series-bar.markLine.data.0.x
              // @ts-ignore
              x: X_PADDING,

              lineStyle: {
                color: 'transparent'
              },

              label: {
                show: true,
                position: 'insideStartBottom',
                fontSize: 12,
                formatter: '{b}',
                opacity: 0.8
              }
            }
          ]
        }
      : undefined;

    const barCurrentSerie: BarSeriesOption = {
      type: 'bar',
      data: data.current,
      // https://echarts.apache.org/en/option.html#series-bar.barCategoryGap
      barCategoryGap: 30,

      markLine
    };

    options = {
      backgroundColor,
      grid,
      tooltip,
      xAxis,
      yAxis,
      series: [barPreviousSerie, barCurrentSerie]
    };
  };

  //--------------------------------------------------------------------------//

  const generateEmptyDataIfNeeded = (dailyUsageData: DailyUsage) => {
    if (dailyUsageData.current.length > 0) {
      return dailyUsageData;
    }

    for (let i = 6; i >= 0; i--) {
      let date = (i > 0 ? dayjs().subtract(i, 'day') : dayjs()).startOf('day');

      const current: TimeSerie = {
        startedAt: date.format(),
        endedAt: date.endOf('day').format(),
        value: 0
      };

      date = date.subtract(1, 'week').startOf('day');

      const previous: TimeSerie = {
        startedAt: date.format(),
        endedAt: date.endOf('day').format(),
        value: 0
      };

      dailyUsageData.current.push(current);
      dailyUsageData.previous.push(previous);
    }

    return dailyUsageData;
  };

  //--------------------------------------------------------------------------//

  // https://echarts.apache.org/handbook/en/concepts/event/
  const onChartClick = (event: ECElementEvent) => {
    console.log('onChartClick', event);

    if (!event.data) {
      return;
    }

    const index = event.dataIndex;

    onclick({
      current: data.current[index],
      previous: data.previous[index]
    });
  };

  onMount(() => {
    // https://echarts.apache.org/en/api.html#echartsInstance.on
    chart.on('click', onChartClick);

    console.log('EnergyOverviewChart - mounted', { chart });

    return () => {
      // https://echarts.apache.org/en/api.html#echartsInstance.off
      chart.off('click', onChartClick);

      console.log('EnergyOverviewChart - destroyed', { chart });
    };
  });
</script>

<div class="relative grow">
  {#if unit}
    <div class="absolute top-2 left-4 z-10">
      <span class="text-[0.7rem]" title="Unit: {unit}">{unit}</span>
    </div>
  {/if}

  <div
    class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-lg border border-gray-100"
  >
    <ECharts init={echarts.init} {options} notMerge bind:chart>
      <ChartLoadingSpinner color={currentColor} />
    </ECharts>
  </div>
</div>
