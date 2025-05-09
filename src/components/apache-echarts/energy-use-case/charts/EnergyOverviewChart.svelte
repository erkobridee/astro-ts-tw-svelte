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

  import { hexToRGB } from '~/utils/colors';
  import { formatMonthShort } from '~/utils/format';
  import { addPercentageValueTo } from '~/utils/math';

  import ChartLoadingSpinner from './ChartLoadingSpinner.svelte';

  import {
    COLOR_DEFAULT_OPACITY,
    COLOR_DEFAULT_SHADOW,
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
  export let colorOpacity: number = COLOR_DEFAULT_OPACITY;
  export let backgroundColor: string = COLOR_GRAY_50;

  export let catchClickOnEmpty: boolean = false;

  export let timeseries: TimeSerie[] = [];

  export let onclick: TimeSerieBarClick = DEFAULT_TIMESERIE_CLICK;

  let chart: EChartsType;
  let options: EChartsOption = {};

  $: updateOptions(
    timeseries,
    xAxisAttribute,
    yAxisAttribute,
    color,
    colorOpacity,
    backgroundColor,
    catchClickOnEmpty
  );

  const updateOptions = (
    timeseries: TimeSerie[],
    xAxisAttribute: string,
    yAxisAttribute: string,
    color: string,
    colorOpacity: number,
    backgroundColor: string,
    catchClickOnEmpty: boolean
  ) => {
    const lightColor = hexToRGB(color, colorOpacity);
    const lightLabelColor = hexToRGB(LABEL_COLOR, 0.75);

    timeseries = generateEmptyDataIfNeeded(timeseries);

    const timeseriesLength = timeseries.length;
    const timeseriesLastIndex = timeseriesLength - 1;

    const numberFormat = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0
    });

    const data = timeseries.reduce<{
      xAxis: string[];
      yAxis: Record<string, any>[];
      maxYAxisValue: number;
    }>(
      (acc, item, index) => {
        const colorToUse = index === timeseriesLastIndex ? color : lightColor;

        const labelColor =
          index === timeseriesLastIndex ? LABEL_COLOR : lightLabelColor;

        const value = item.value;
        const isZero = value === 0;
        if (value > acc.maxYAxisValue) {
          acc.maxYAxisValue = value;
        }

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

              if (isZero) return '';

              return numberFormat.format(value);
            }
          }
        });

        return acc;
      },
      {
        xAxis: [],
        yAxis: [],
        maxYAxisValue: 0
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
          color: COLOR_DEFAULT_SHADOW
        }
      },
      // do not display
      formatter: () => ''
    };

    const xAxis: EChartsOption['xAxis'] = {
      type: 'category',
      data: data.xAxis,
      axisLabel: {
        formatter: formatMonthShort,
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
        return catchClickOnEmpty
          ? value.max
          : addPercentageValueTo(value.max, 15);
      }
    };

    const barSerie: BarSeriesOption = {
      type: 'bar',
      data: data.yAxis,
      // https://echarts.apache.org/en/option.html#series-bar.barCategoryGap
      barCategoryGap: 10
    };

    const maxYAxisValue = addPercentageValueTo(data.maxYAxisValue, 15);
    const barSerieBackground: BarSeriesOption = {
      type: 'bar',
      color: 'transparent',
      data: data.yAxis.map(() => maxYAxisValue),
      barGap: '-100%'
    };

    options = {
      backgroundColor,
      grid,
      tooltip,
      xAxis,
      yAxis,
      series: catchClickOnEmpty ? [barSerieBackground, barSerie] : [barSerie]
    };
  };

  //--------------------------------------------------------------------------//

  const generateEmptyDataIfNeeded = (timeseries: TimeSerie[]) => {
    if (timeseries.length > 0) {
      return timeseries;
    }

    for (let i = 6 - 1; i >= 0; i--) {
      const startDate = (i > 0 ? dayjs().subtract(i, 'month') : dayjs())
        .startOf('month')
        .startOf('day');

      timeseries.push({
        startedAt: startDate.format(),
        endedAt: startDate.endOf('month').endOf('day').format(),
        value: 0
      });
    }

    return timeseries;
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

    // TODO: remove
    console.log('EnergyOverviewChart - mounted', { chart });

    return () => {
      // https://echarts.apache.org/en/api.html#echartsInstance.off
      chart.off('click', onChartClick);

      // TODO: remove
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
