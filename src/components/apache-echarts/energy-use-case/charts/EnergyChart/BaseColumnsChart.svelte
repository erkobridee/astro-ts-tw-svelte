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

  type StackInfo = Record<
    string,
    {
      stackStart: number[];
      stackEnd: number[];
    }
  >;

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

        if (data && !isNaN(data as number)) {
          if (info.stackStart[i] == null) {
            info.stackStart[i] = j;
          }

          info.stackEnd[i] = j;
        }
      }
    }

    return stackInfo;
  };

  const addBorderRadiusToBars = (
    series: BarSeriesOption[]
  ): EChartsOption['series'] => {
    const stackInfo = buildStackInfo(series);

    for (let i = 0; i < series.length; ++i) {
      const serie = series[i];

      if (!serie.stack) {
        serie.itemStyle = buildBarItemStyleBorderRadius(DEFAULT_RADIUS_BORDER);

        continue;
      }

      const data = serie.data!;
      const dataLength = data.length;

      const info = stackInfo[serie.stack];

      for (let j = 0; j < dataLength; ++j) {
        // const isStart = info.stackStart[j] === i;
        const isEnd = info.stackEnd[j] === i;

        data[j] = {
          value: data[j],
          itemStyle: buildBarItemStyleBorderRadius(
            isEnd ? DEFAULT_RADIUS_BORDER : 0
          )
        } as any;
      }
    }

    return series;
  };

  //--------------------------------------------------------------------------//
</script>

<script lang="ts">
  import * as echarts from 'echarts';

  import { onMount } from 'svelte';

  import {
    COLOR_DEFAULT,
    type ChartClick
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import ECharts from '~/components/apache-echarts/ECharts';
  import ChartLoadingSpinner from '~/components/apache-echarts/energy-use-case/charts/ChartLoadingSpinner.svelte';

  import { formatNumber } from '~/utils/format';

  //--------------------------------------------------------------------------//

  export let chartOptions: ChartOptions;

  export let onclick: ChartClick = DEFAULT_CHART_CLICK;

  let chart: EChartsType;
  let options: EChartsOption = {};

  //--------------------------------------------------------------------------//

  $: color = chartOptions.color[0] ?? COLOR_DEFAULT;

  //--------------------------------------------------------------------------//

  $: updateOptions(chartOptions);

  const updateOptions = (chartOptions: ChartOptions) => {
    const {
      color,
      categories,
      series,
      xAxisLabelFormatter,
      yAxisLabelFormatter = (value) => formatNumber(value),
      tooltipFormatter
    } = chartOptions;

    // TODO: remove
    console.log(chartOptions);

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
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    };

    const categoriesLenght = categories.length;
    const xAxis: EChartsOption['xAxis'] = {
      type: 'category',
      data: categories,
      axisLabel: {
        color: LABEL_COLOR,
        formatter: xAxisLabelFormatter,
        showMinLabel: categoriesLenght < 50
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

  onMount(() => {
    // https://echarts.apache.org/en/api.html#echartsInstance.on
    chart.on('click', onclick);

    console.log('BaseColumnsChart - mounted', { chart });

    return () => {
      // https://echarts.apache.org/en/api.html#echartsInstance.off
      chart.off('click', onclick);

      console.log('BaseColumnsChart - destroyed', { chart });
    };
  });
</script>

<ECharts init={echarts.init} {options} notMerge bind:chart>
  <ChartLoadingSpinner {color} />
</ECharts>
