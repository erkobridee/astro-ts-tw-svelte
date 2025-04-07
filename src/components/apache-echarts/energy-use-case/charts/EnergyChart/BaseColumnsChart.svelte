<script lang="ts" context="module">
  /* eslint-disable */

  import type {
    EChartsType,
    EChartsOption,
    BarSeriesOption,
    TooltipComponentFormatterCallback,
    TooltipComponentFormatterCallbackParams
  } from 'echarts';

  import {
    LABEL_COLOR,
    LINE_STYLE,
    DEFAULT_CHART_CLICK,
    DEFAULT_RADIUS_BORDER,
    buildBarItemStyleBorderRadius
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  //--------------------------------------------------------------------------//

  export type ChartXAxisLabelFormatter = (value: string) => string;
  export type ChartYAxisLabelFormatter = (value: number) => string;
  export type ChartTooltipFormatter =
    | string
    | TooltipComponentFormatterCallback<TooltipComponentFormatterCallbackParams>;

  export interface ChartOptions {
    color: string[];

    /** xAxis.data */
    categories: string[];

    series: BarSeriesOption[];

    xAxisLabelFormatter?: string | ChartXAxisLabelFormatter;
    yAxisLabelFormatter?: string | ChartYAxisLabelFormatter;
    tooltipFormatter?: ChartTooltipFormatter;
  }

  //--------------------------------------------------------------------------//

  const addBorderRadiusToBars = (
    series: BarSeriesOption[]
  ): EChartsOption['series'] => {
    const lastSeries = series.length - 1;

    series[lastSeries].itemStyle = buildBarItemStyleBorderRadius(
      DEFAULT_RADIUS_BORDER
    );

    return series;
  };

  //--------------------------------------------------------------------------//
</script>

<script lang="ts">
  import * as echarts from 'echarts';

  import { onMount } from 'svelte';

  import {
    COLOR_DEFAULT,
    TINY_SCREEN_MAX_WIDTH,
    TINY_SCREEN_MAX_HEIGHT,
    type ChartClick
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import ECharts from '~/components/apache-echarts/ECharts';
  import ChartLoadingSpinner from '~/components/apache-echarts/energy-use-case/charts/ChartLoadingSpinner.svelte';

  import { formatNumber } from '~/utils/format';

  //--------------------------------------------------------------------------//

  export let isTinyScreen = false;

  export let chartOptions: ChartOptions;

  export let onclick: ChartClick = DEFAULT_CHART_CLICK;

  let chart: EChartsType;
  let options: EChartsOption = {};

  let chartContainerDOMRect: DOMRectReadOnly | undefined = undefined;

  //--------------------------------------------------------------------------//

  $: color = chartOptions.color[1] ?? chartOptions.color[0] ?? COLOR_DEFAULT;

  //--------------------------------------------------------------------------//

  $: updateOptions(chartOptions, chartContainerDOMRect);

  const updateOptions = (
    chartOptions: ChartOptions,
    chartContainerDOMRect: DOMRectReadOnly | undefined
  ) => {
    const {
      color,
      categories,
      series,
      xAxisLabelFormatter,
      yAxisLabelFormatter = (value) => formatNumber(value),
      tooltipFormatter
    } = chartOptions;

    isTinyScreen = (() => {
      if (!chartContainerDOMRect) {
        return false;
      }

      const { width, height } = chartContainerDOMRect;

      // https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
      switch (screen.orientation.angle) {
        case 0:
          return (
            width <= TINY_SCREEN_MAX_WIDTH && height <= TINY_SCREEN_MAX_HEIGHT
          );
        case 90:
          return (
            width <= TINY_SCREEN_MAX_HEIGHT && height <= TINY_SCREEN_MAX_WIDTH
          );
      }

      return false;
    })();

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
      formatter: tooltipFormatter
    };

    const grid: EChartsOption['grid'] = {
      containLabel: true,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };

    const categoriesLenght = categories.length;
    const xAxis: EChartsOption['xAxis'] = {
      type: 'category',
      data: categories,
      axisLabel: {
        color: LABEL_COLOR,
        formatter: xAxisLabelFormatter,
        hideOverlap: true,
        showMinLabel:
          (isTinyScreen && categories.length > 10) || categories.length > 12
            ? false
            : true
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: LINE_STYLE
      },
      splitLine: {
        show: true,
        lineStyle: LINE_STYLE,
        showMinLine: false,
        showMaxLine: false,
        interval: categoriesLenght > 50 ? 10 : 2
      }
    };

    const yAxis: EChartsOption['yAxis'] = {
      type: 'value',
      position: 'right',
      axisLabel: {
        verticalAlign: 'bottom',
        padding: [0, -10, 2, 0],
        color: LABEL_COLOR,
        showMinLabel: false,
        showMaxLabel: false,
        formatter: yAxisLabelFormatter
      },
      splitLine: {
        lineStyle: LINE_STYLE,
        showMaxLine: false
      }
    };
    //---//

    options = {
      color,
      tooltip,
      grid,
      xAxis,
      yAxis,
      series: addBorderRadiusToBars(series)
    };
  };

  //--------------------------------------------------------------------------//

  let barName = '';

  const onInnerClick: ChartClick = (event) => {
    if (!isTinyScreen) {
      onclick(event);
      return;
    }

    /*
      on mobile screens, the first click won't call the event handler function from the
      parent to be able to display the tooltip, and if the user click again on the same bar
      that will call the event handler from the parent
     */
    const currentBarName = event.name;

    if (barName && currentBarName === barName) {
      onclick(event);
      barName = '';
      return;
    }

    barName = currentBarName;
  };

  onMount(() => {
    // https://echarts.apache.org/en/api.html#echartsInstance.on
    chart.on('click', onInnerClick);

    console.log('BaseColumnsChart - mounted', { chart });

    return () => {
      // https://echarts.apache.org/en/api.html#echartsInstance.off
      chart.off('click', onInnerClick);

      console.log('BaseColumnsChart - destroyed', { chart });
    };
  });
</script>

<ECharts
  init={echarts.init}
  {options}
  notMerge
  bind:chart
  bind:chartContainerDOMRect
>
  <ChartLoadingSpinner {color} />
</ECharts>
