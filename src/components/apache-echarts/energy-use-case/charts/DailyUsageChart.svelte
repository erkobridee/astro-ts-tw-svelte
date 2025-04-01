<script lang="ts">
  import type {
    EChartsType,
    EChartsOption,
    ECElementEvent,
    BarSeriesOption
  } from 'echarts';

  import type { DailyUsage } from '~/utils/timeseries';
  import type { DailyUsageBarClick } from './common';

  // import dayjs from 'dayjs';
  import * as echarts from 'echarts';

  import { onMount } from 'svelte';

  import ECharts from '~/components/apache-echarts/ECharts';

  import {
    hexToRGB,
    COLOR_DEFAULT,
    COLOR_GRAY_50,
    LABEL_COLOR,
    DEFAULT_DAILYUSAGE_CLICK,
    DEFAULT_RADIUS_BORDER
  } from './common';

  //--------------------------------------------------------------------------//

  const locale = 'en-US';

  export let unit: string = '';

  export let xAxisAttribute: string = 'startedAt';
  export let yAxisAttribute: string = 'value';

  export let currentColor: string = COLOR_DEFAULT;
  export let previousColor: string = COLOR_DEFAULT;
  export let colorOpacity: number = 0.7;
  export let backgroundColor: string = COLOR_GRAY_50;

  export let data: DailyUsage;

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

    const { current: currentTimeSeries, previous: previousTimeSeries } =
      dailyUsageData;
    const dataLength = currentTimeSeries.length;
    const lastIndex = dataLength - 1;

    const dateTimeFormat = new Intl.DateTimeFormat(locale);
    const dateTimeWeekDayFormat = new Intl.DateTimeFormat(locale, {
      weekday: 'short'
    });

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

    const grid: EChartsOption['grid'] = {
      top: '10%',
      bottom: '10%',
      left: '12%',
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
          content += `
            <div>
              <span style="display:inline-block;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>
              <span>${dateTimeFormat.format(new Date(item.data.date))}</span>
              <span style="float:right;margin-left:20px;font-weight:600">${item.value}</span>
            </div>
          `;
        });
        return content;
      }
    };

    const xAxis: EChartsOption['xAxis'] = {
      type: 'category',
      data: data.xAxis,
      axisLabel: {
        //formatter: (value) => dayjs(value).format('ddd'),
        formatter: (value) => dateTimeWeekDayFormat.format(new Date(value)),
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

    const barCurrentSerie: BarSeriesOption = {
      type: 'bar',
      data: data.current,
      // https://echarts.apache.org/en/option.html#series-bar.barCategoryGap
      barCategoryGap: 30,

      markLine: {
        symbol: ['none', 'none'],
        data: [
          {
            type: 'average',

            // https://echarts.apache.org/en/option.html#series-bar.markLine.data.0.x
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
              formatter: (params) => Number(params.value).toFixed(3)
            }
          },
          {
            type: 'average',
            name: 'Average',

            // https://echarts.apache.org/en/option.html#series-bar.markLine.data.0.x
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
      <div class="flex h-full w-full items-center justify-center">
        <div
          class="h-20 w-20 animate-spin rounded-full border-4 border-t-4 border-gray-200"
          style="border-top-color: {currentColor};"
        ></div>
      </div>
    </ECharts>
  </div>
</div>
