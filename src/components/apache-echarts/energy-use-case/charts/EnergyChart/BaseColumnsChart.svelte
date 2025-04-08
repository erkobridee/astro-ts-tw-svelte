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

  export interface ChartDataZoomOptions {
    show?: boolean;
    windowSize?: number;
    minWindowSize?: number;

    /** once defining the data zoom if it's true that will selectt all the slider */
    showAll?: boolean;
  }
  export type ChartDataZoomLabelFormatter = (
    value: number,
    valueStr: string
  ) => string;

  export type ChartXAxisLabelFormatter = (value: string) => string;
  export type ChartYAxisLabelFormatter = (value: number) => string;
  export type ChartTooltipFormatter =
    TooltipComponentFormatterCallback<TooltipComponentFormatterCallbackParams>;

  export interface ChartOptions {
    color: string[];

    /** xAxis.data */
    categories: string[];

    series: BarSeriesOption[];

    xAxisLabelFormatter?: string | ChartXAxisLabelFormatter;
    yAxisLabelFormatter?: string | ChartYAxisLabelFormatter;
    tooltipFormatter?: string | ChartTooltipFormatter;

    dataZoomLabelFormatter?: string | ChartDataZoomLabelFormatter;
    dataZoomOptions?: ChartDataZoomOptions;
  }

  //--------------------------------------------------------------------------//

  export const DEFAULT_DATA_ZOOM_OPTIONS: ChartDataZoomOptions = {
    show: false,
    windowSize: 12,
    showAll: false
  };

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

        // https://echarts.apache.org/en/option.html#series-bar.data
        // empty value: '-' or null or undefined or NaN
        const isPresent = (() => {
          const value =
            data && (data as any).value ? (data as any).value : data;

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

        const value = (data[j] && (data[j] as any).value) || data[j];
        const itemStyle = buildBarItemStyleBorderRadius(
          isEnd ? DEFAULT_RADIUS_BORDER : 0
        );

        data[j] = {
          value,
          itemStyle
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
    TINY_SCREEN_MAX_WIDTH,
    TINY_SCREEN_MAX_HEIGHT,
    type ChartClick,
    type ChartMouseMove
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import ECharts from '~/components/apache-echarts/ECharts';
  import ChartLoadingSpinner from '~/components/apache-echarts/energy-use-case/charts/ChartLoadingSpinner.svelte';

  import { formatNumber } from '~/utils/format';
  import { debounce } from '~/utils/debounce';

  //--------------------------------------------------------------------------//

  const CLICK_EVENT = 'click';
  const MOUSE_EVENT = 'mousemove';

  export let isTinyScreen = false;

  export let chartOptions: ChartOptions;

  export let onclick: ChartClick = DEFAULT_CHART_CLICK;

  let chart: EChartsType;
  let options: EChartsOption = {};

  let chartContainerDOMRect: DOMRectReadOnly | undefined = undefined;

  let barName = '';
  let barOverName = '';

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
      tooltipFormatter,
      dataZoomLabelFormatter,
      dataZoomOptions = {}
    } = chartOptions;

    const {
      show: dataZoomShow = DEFAULT_DATA_ZOOM_OPTIONS.show!,
      windowSize: dataZoomWindowSize = DEFAULT_DATA_ZOOM_OPTIONS.windowSize!,
      minWindowSize: dataZoomMinWindowSize = dataZoomWindowSize
        ? Math.floor(dataZoomWindowSize / 2)
        : undefined,
      showAll: dataZoomShowAll = DEFAULT_DATA_ZOOM_OPTIONS.showAll!
    } = dataZoomOptions as Required<ChartDataZoomOptions>;

    barName = '';
    barOverName = '';

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
          (isTinyScreen && categoriesLenght > 10) || categoriesLenght > 12
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

    if (
      dataZoomShow ||
      (isTinyScreen && categoriesLenght > dataZoomWindowSize)
    ) {
      grid.bottom = 55;

      // the minimum amount to display should be the halp of slider window size value
      const minSpan = dataZoomMinWindowSize
        ? (dataZoomMinWindowSize * 100) / categoriesLenght
        : undefined;

      const end = 100;
      let startValue = categories[0];

      if (!dataZoomShowAll) {
        const lastIndex = categoriesLenght - 1;
        startValue = categories[lastIndex - dataZoomWindowSize];
      }

      // https://echarts.apache.org/en/option.html#dataZoom
      options.dataZoom = [
        {
          type: 'inside',
          startValue,
          end,
          minSpan
        },
        {
          show: true,
          type: 'slider',
          startValue,
          end,
          minSpan,
          labelFormatter: dataZoomLabelFormatter
        }
      ];
    }
  };

  //--------------------------------------------------------------------------//

  const onInnerMouseDef: ChartMouseMove = (event) => {
    if (!isTinyScreen || event.event?.type !== MOUSE_EVENT) {
      return;
    }

    barOverName = event.name;
  };

  const onInnerMouse = debounce(onInnerMouseDef, 500);

  const onInnerClick: ChartClick = (event) => {
    if (!isTinyScreen) {
      onclick(event);
      return;
    }

    onInnerMouse.cleanup();

    /*
      on mobile screens, the first click won't call the event handler function from the
      parent to be able to display the tooltip, and if the user click again on the same bar
      that will call the event handler from the parent
     */
    const currentBarName = event.name;

    if (
      (barName && currentBarName === barName) ||
      (barOverName && currentBarName === barOverName)
    ) {
      barName = '';
      barOverName = '';

      onclick(event);
      return;
    }

    barName = currentBarName;
    barOverName = '';
  };

  onMount(() => {
    // https://echarts.apache.org/en/api.html#echartsInstance.on
    chart.on(CLICK_EVENT, 'series', onInnerClick);
    chart.on(MOUSE_EVENT, 'series', onInnerMouse);

    // TODO: remove
    console.log('BaseColumnsChart - mounted', { chart });

    return () => {
      // https://echarts.apache.org/en/api.html#echartsInstance.off
      chart.off(CLICK_EVENT, onInnerClick);
      chart.off(MOUSE_EVENT, onInnerMouse);

      // TODO: remove
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
