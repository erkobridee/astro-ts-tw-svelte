<script lang="ts">
  /*
    Apache ECharts uses internally the following lib below to manage the rendering
    https://github.com/ecomfe/zrender
  */

  // https://echarts.apache.org/handbook/en/basics/import#import-all-echarts-functionality

  import type { EChartsProps } from './types';

  import { onMount } from 'svelte';
  import * as echarts from 'echarts';

  // Svelte v4 way to define the component props TypeScript types
  interface $$Props extends EChartsProps {}

  type ChartOptions = EChartsProps['options'];
  type ChartLocale = EChartsProps['locale'];
  type ChartTheme = EChartsProps['theme'];
  type ChartInitOptions = EChartsProps['initOptions'];
  type ChartInstance = EChartsProps['chart'];

  export let options: ChartOptions = undefined;
  export let locale: ChartLocale = undefined;

  export let theme: ChartTheme = null;
  export let initOptions: ChartInitOptions = {};

  export let notMerge: EChartsProps['notMerge'] = true;
  export let lazyUpdate: EChartsProps['lazyUpdate'] = false;
  export let silent: EChartsProps['silent'] = false;
  export let replaceMerge: EChartsProps['replaceMerge'] = undefined;
  export let transition: EChartsProps['transition'] = undefined;

  export let chart: ChartInstance = undefined;

  let element: HTMLDivElement;

  $: initChart(theme, initOptions, locale);
  $: updateChartOptions(chart, options);

  const updateChartOptions = (
    chartInstance: ChartInstance,
    newOptions: ChartOptions
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

    chart = echarts.init(element, theme, initOptions);
  };

  const onResize = () => {
    chart?.resize();
  };

  onMount(() => {
    /*
    console.log('ECharts.svelte onMount');
    console.log({ chartContainerElement: element });
    */

    initChart(theme, initOptions, locale);

    //window.addEventListener('resize', onResize);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(element);

    return () => {
      //window.removeEventListener('resize', onResize);

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
