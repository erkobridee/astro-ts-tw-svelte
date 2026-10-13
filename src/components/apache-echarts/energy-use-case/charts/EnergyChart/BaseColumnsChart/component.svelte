<script lang="ts">
  import type { EChartsType, EChartsOption } from 'echarts';
  import type {
    ChartClick,
    ChartMouseMove
  } from '~/components/apache-echarts/energy-use-case/charts/common';
  import type { ChartOptions, ChartDataZoomOptions } from './types';

  import { init as echartsInit } from 'echarts';

  import { untrack } from 'svelte';

  import {
    LABEL_COLOR,
    LINE_STYLE,
    DEFAULT_CHART_CLICK,
    COLOR_DEFAULT_SHADOW,
    COLOR_DEFAULT,
    TINY_SCREEN_MAX_WIDTH,
    TINY_SCREEN_MAX_HEIGHT
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import ECharts from '~/components/apache-echarts/ECharts';
  import ChartLoadingSpinner from '~/components/apache-echarts/energy-use-case/charts/ChartLoadingSpinner.svelte';

  import { formatNumber } from '~/utils/format';
  import { debounce } from '~/utils/debounce';

  import { CLICK_EVENT, MOUSE_EVENT, DEFAULT_DATA_ZOOM_OPTIONS } from './types';

  import { addBorderRadiusToBars } from './utils';

  //--------------------------------------------------------------------------//

  interface BaseColumnsChartProps {
    isTinyScreen?: boolean;
    onclick?: ChartClick;
    chartOptions: ChartOptions;
  }

  let {
    isTinyScreen = false,
    onclick = DEFAULT_CHART_CLICK,
    chartOptions
  }: BaseColumnsChartProps = $props();

  //--------------------------------------------------------------------------//

  let chart = $state<EChartsType>();
  let options = $state<EChartsOption>({});

  let chartContainerDOMRect = $state<DOMRectReadOnly | undefined>(undefined);

  let barName = $state<string>('');
  let barOverName = $state<string>('');

  //--------------------------------------------------------------------------//

  const color = $derived(
    chartOptions.color[1] ?? chartOptions.color[0] ?? COLOR_DEFAULT
  );

  //--------------------------------------------------------------------------//

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
          color: COLOR_DEFAULT_SHADOW
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

      // the minimum amount to display should be the half of slider window size value
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

    // TODO: remove
    console.log('BaseColumnChart.updateOptions ', { chartOptions, options });
  };

  $effect(() => {
    if (!chartOptions || !chartContainerDOMRect) return;

    const currentChartOptions = chartOptions;
    const currentChartContainerDOMRect = chartContainerDOMRect;

    untrack(() => {
      updateOptions(currentChartOptions, currentChartContainerDOMRect);
    });
  });

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

  $effect(() => {
    // https://echarts.apache.org/en/api.html#echartsInstance.on
    chart?.on(CLICK_EVENT, 'series', onInnerClick);
    chart?.on(MOUSE_EVENT, 'series', onInnerMouse);

    // TODO: remove
    console.log('BaseColumnsChart - mounted', { chart });

    return () => {
      // https://echarts.apache.org/en/api.html#echartsInstance.off
      chart?.off(CLICK_EVENT, onInnerClick);
      chart?.off(MOUSE_EVENT, onInnerMouse);

      // TODO: remove
      console.log('BaseColumnsChart - destroyed', { chart });
    };
  });
</script>

<ECharts
  init={echartsInit}
  {options}
  notMerge
  bind:chart
  bind:chartContainerDOMRect
>
  <ChartLoadingSpinner {color} />
</ECharts>
