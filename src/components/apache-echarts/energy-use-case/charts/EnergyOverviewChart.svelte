<script lang="ts">
  import type {
    EChartsType,
    EChartsOption,
    ECElementEvent,
    BarSeriesOption
  } from 'echarts';

  import type { TimeSerie } from '~/utils/timeseries';
  import type { TimeSerieBarClick } from './common';

  // import dayjs from 'dayjs';
  import * as echarts from 'echarts';

  import { onMount } from 'svelte';

  import ECharts from '~/components/apache-echarts/ECharts';

  import { hexToRGB } from '~/utils/colors';

  import ChartLoadingSpinner from './ChartLoadingSpinner.svelte';

  import {
    COLOR_DEFAULT,
    COLOR_GRAY_50,
    LABEL_COLOR,
    DEFAULT_TIMESERIE_CLICK,
    DEFAULT_RADIUS_BORDER
  } from './common';

  //--------------------------------------------------------------------------//

  const locale = 'en-US';

  export let unit: string = '';

  export let xAxisAttribute: string = 'startedAt';
  export let yAxisAttribute: string = 'value';

  export let color: string = COLOR_DEFAULT;
  export let colorOpacity: number = 0.55;
  export let backgroundColor: string = COLOR_GRAY_50;

  export let timeseries: TimeSerie[];

  export let onclick: TimeSerieBarClick = DEFAULT_TIMESERIE_CLICK;

  let chart: EChartsType;
  let options: EChartsOption = {};

  $: updateOptions(
    timeseries,
    xAxisAttribute,
    yAxisAttribute,
    color,
    colorOpacity,
    backgroundColor
  );

  const updateOptions = (
    timeseries: TimeSerie[],
    xAxisAttribute: string,
    yAxisAttribute: string,
    color: string,
    colorOpacity: number,
    backgroundColor: string
  ) => {
    const lightColor = hexToRGB(color, colorOpacity);
    const lightLabelColor = hexToRGB(LABEL_COLOR, 0.75);

    const timeseriesLength = timeseries.length;
    const timeseriesLastIndex = timeseriesLength - 1;

    const numberFormat = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0
    });

    const dateTimeFormat = new Intl.DateTimeFormat(locale, {
      month: 'short'
    });

    const data = timeseries.reduce<{
      xAxis: string[];
      yAxis: Record<string, any>[];
    }>(
      (acc, item, index) => {
        const colorToUse = index === timeseriesLastIndex ? color : lightColor;

        const labelColor =
          index === timeseriesLastIndex ? LABEL_COLOR : lightLabelColor;

        acc.xAxis.push((item as any)[xAxisAttribute]);
        acc.yAxis.push({
          value: (item as any)[yAxisAttribute],
          itemStyle: {
            borderRadius: DEFAULT_RADIUS_BORDER,
            borderWidth: 1,
            borderColor: colorToUse,
            color: colorToUse
          },
          label: {
            show: true,
            position: 'top',
            color: labelColor,
            fontWeight: 'bold',
            formatter: (params: any) => {
              const value = params.value as number;

              if (value === 0) return '';

              return numberFormat.format(value);
            }
          }
        });

        return acc;
      },
      {
        xAxis: [],
        yAxis: []
      }
    );

    const X_PADDING = '2%';
    const Y_PADDING = '10%';

    const grid: EChartsOption['grid'] = {
      top: Y_PADDING,
      bottom: Y_PADDING,
      left: X_PADDING,
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
      // do not display
      formatter: () => ''
    };

    const xAxis: EChartsOption['xAxis'] = {
      type: 'category',
      data: data.xAxis,
      axisLabel: {
        //formatter: (value) => dayjs(value).format('MMM'),
        formatter: (value) => dateTimeFormat.format(new Date(value)),
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
      show: false,
      max: (value) => {
        return value.max + value.max * (15 / 100);
      }
    };

    const barSerie: BarSeriesOption = {
      type: 'bar',
      data: data.yAxis,
      // https://echarts.apache.org/en/option.html#series-bar.barCategoryGap
      barCategoryGap: 10
    };

    options = {
      backgroundColor,
      grid,
      tooltip,
      xAxis,
      yAxis,
      series: [barSerie]
    };
  };

  //--------------------------------------------------------------------------//

  // https://echarts.apache.org/handbook/en/concepts/event/
  const onChartClick = (event: ECElementEvent) => {
    console.log('onChartClick', event);

    if (!event.data) {
      return;
    }

    onclick(timeseries[event.dataIndex]);
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
      <ChartLoadingSpinner {color} />
    </ECharts>
  </div>
</div>
