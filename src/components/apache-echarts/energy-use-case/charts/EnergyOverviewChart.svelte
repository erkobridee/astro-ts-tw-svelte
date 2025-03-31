<script lang="ts">
  import type {
    EChartsType,
    EChartsOption,
    ECElementEvent,
    BarSeriesOption
  } from 'echarts';

  import type { TimeSerie } from '~/utils/timeseries';
  import type { TimeSerieBarClick } from './common';

  import dayjs from 'dayjs';
  import * as echarts from 'echarts';

  import { onMount } from 'svelte';

  import ECharts from '~/components/apache-echarts/ECharts';

  import {
    hexToRGB,
    COLOR_DEFAULT,
    COLOR_GRAY_50,
    LABEL_COLOR,
    DEFAULT_TIMESERIE_CLICK,
    DEFAULT_RADIUS_BORDER
  } from './common';

  //--------------------------------------------------------------------------//

  const locale = 'en-US';

  export let xAxisAttribute: string = 'startedAt';
  export let yAxisAttribute: string = 'value';

  export let color: string = COLOR_DEFAULT;
  export let colorOpacity: number = 0.5;
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

  const defineLightColor = (color: string, colorOpacity: number) => {
    if (!color) {
      return '';
    }

    if (colorOpacity < 0 || colorOpacity > 1) {
      colorOpacity = 1;
    }

    return hexToRGB(color, colorOpacity);
  };

  const updateOptions = (
    timeseries: TimeSerie[],
    xAxisAttribute: string,
    yAxisAttribute: string,
    color: string,
    colorOpacity: number,
    backgroundColor: string
  ) => {
    const lightColor = defineLightColor(color, colorOpacity);
    const lightLabelColor = defineLightColor(LABEL_COLOR, 0.7);

    const timeseriesLength = timeseries.length;
    const timeseriesLastIndex = timeseriesLength - 1;

    const numberFormat = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0
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

    const grid: EChartsOption['grid'] = {
      top: 30,
      bottom: 30,
      left: 10,
      right: 10
    };

    const xAxis: EChartsOption['xAxis'] = {
      type: 'category',
      data: data.xAxis,
      axisLabel: {
        formatter: (value) => dayjs(value).format('MMM'),
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

    const barSerie: BarSeriesOption = {
      type: 'bar',
      data: data.yAxis,
      // https://echarts.apache.org/en/option.html#series-bar.barCategoryGap
      barCategoryGap: 10
    };

    options = {
      backgroundColor,
      grid,
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
  <div
    class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-lg border border-gray-100"
  >
    <ECharts init={echarts.init} {options} notMerge bind:chart></ECharts>
  </div>
</div>
