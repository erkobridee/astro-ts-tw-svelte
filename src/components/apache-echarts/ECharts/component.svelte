<script lang="ts">
  /*
    Apache ECharts uses internally the following lib below to manage the rendering
    https://github.com/ecomfe/zrender
  */

  // https://echarts.apache.org/handbook/en/basics/import#import-all-echarts-functionality

  import type {
    EChartsProps,
    ChartInstance,
    ChartOptions,
    ChartNotMerge,
    ChartInitFunction,
    ChartTheme,
    ChartInitOptions,
    ChartLocale
  } from './types';

  import { onMount, untrack } from 'svelte';

  //--------------------------------------------------------------------------//

  let {
    init,

    options,
    locale,

    theme = null,

    initOptions = {},

    notMerge = false,
    lazyUpdate = false,
    silent = false,

    replaceMerge,
    transition,

    chart = $bindable(),
    chartContainerDOMRect = $bindable(),

    children,

    loadingRenderer,
    loadingLabel = 'Chart loading...',

    style = '',
    ...restProps
  }: EChartsProps = $props();

  let element: HTMLDivElement;

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

  $effect.pre(() => {
    updateChartOptions(chart, options, notMerge);
  });

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

    const innerInitOptions =
      initOptions && locale ? { ...initOptions, locale } : initOptions;

    chart = initFunction(element, theme, innerInitOptions);
  };

  $effect.pre(() => {
    const currentInit = init;
    const currentTheme = theme;
    const currentInitOptions = initOptions;
    const currentLocale = locale;

    untrack(() => {
      initChart(currentInit, currentTheme, currentInitOptions, currentLocale);
    });
  });

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
  style="width: 100%; height: 100%; {style}"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else if loadingRenderer}
    {@render loadingRenderer()}
  {:else}
    {loadingLabel}
  {/if}
</div>
