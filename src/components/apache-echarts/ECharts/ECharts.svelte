<script lang="ts">
  /*
    Apache ECharts uses internally the following lib below to manage the rendering
    https://github.com/ecomfe/zrender
  */

  // https://echarts.apache.org/handbook/en/basics/import#import-all-echarts-functionality

  import type { EChartsProps } from './types';

  import { onMount } from 'svelte';

  // Svelte v4 way to define the component props TypeScript types
  interface $$Props extends EChartsProps {}

  type ChartInitFunction = EChartsProps['init'];
  type ChartOptions = EChartsProps['options'];
  type ChartLocale = EChartsProps['locale'];
  type ChartTheme = EChartsProps['theme'];
  type ChartInitOptions = EChartsProps['initOptions'];
  type ChartNotMerge = EChartsProps['notMerge'];
  type ChartInstance = EChartsProps['chart'];
  type ChartContainerDOMRect = EChartsProps['chartContainerDOMRect'];

  export let init: ChartInitFunction;

  export let options: ChartOptions = undefined;
  export let locale: ChartLocale = undefined;

  export let theme: ChartTheme = null;
  export let initOptions: ChartInitOptions = {};

  export let notMerge: ChartNotMerge = false;
  export let lazyUpdate: EChartsProps['lazyUpdate'] = false;
  export let silent: EChartsProps['silent'] = false;
  export let replaceMerge: EChartsProps['replaceMerge'] = undefined;
  export let transition: EChartsProps['transition'] = undefined;

  export let chart: ChartInstance = undefined;

  export let chartContainerDOMRect: ChartContainerDOMRect = undefined;

  let element: HTMLDivElement;

  $: initChart(init, theme, initOptions, locale);
  $: updateChartOptions(chart, options, notMerge);

  const updateChartOptions = (
    chartInstance: ChartInstance,
    newOptions: ChartOptions,
    notMerge: ChartNotMerge
  ) => {
    if (!chartInstance || !newOptions) {
      return;
    }

    chartInstance.setOption(newOptions, {
      notMerge,
      lazyUpdate,
      silent,
      replaceMerge,
      transition
    });
  };

  const initChart = (
    initFunction: ChartInitFunction,
    theme: ChartTheme,
    initOptions: ChartInitOptions = {},
    locale: ChartLocale = undefined
  ) => {
    if (!element) {
      return;
    }

    if (chart) {
      // https://github.com/apache/echarts/blob/5.6.0/src/core/echarts.ts#L1186
      chart?.dispose();
    }

    if (locale) {
      initOptions = {
        ...initOptions,
        locale
      };
    }

    chart = initFunction(element, theme, initOptions);
  };

  const onResize = (entries: ResizeObserverEntry[]) => {
    const chartContainer = entries[0];
    chartContainerDOMRect = chartContainer?.contentRect;

    chart?.resize();
  };

  onMount(() => {
    initChart(init, theme, initOptions, locale);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();

      // https://github.com/apache/echarts/blob/5.6.0/src/core/echarts.ts#L1186
      chart?.dispose();
    };
  });
</script>

<div
  bind:this={element}
  style="width: 100%; height: 100%; {$$props.style}"
  {...$$restProps}
>
  <slot>Chart loading...</slot>
</div>
