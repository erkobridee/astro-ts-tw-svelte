<script lang="ts">
  // https://echarts.apache.org/handbook/en/basics/import#import-all-echarts-functionality

  import type { EChartsProps } from './types';

  import { onMount } from 'svelte';
  import * as echarts from 'echarts';

  // Svelte v4 way to define the component props TypeScript types
  interface $$Props extends EChartsProps {}

  type ChartInstance = EChartsProps['chart'];
  type ChartOptions = EChartsProps['options'];

  export let chart: ChartInstance = undefined;
  export let options: ChartOptions = undefined;

  let element: HTMLDivElement;

  $: updateChartOptions(chart, options);

  const updateChartOptions = (
    chartInstance: ChartInstance,
    newOptions: ChartOptions
  ) => {
    if (!chartInstance || !newOptions) {
      return;
    }

    chartInstance.setOption(newOptions);
  };

  const initChart = () => {
    if (chart) {
      chart?.dispose();
    }

    // TODO: review the init
    chart = echarts.init(element);
  };

  const onResize = () => {
    chart?.resize();
  };

  onMount(() => {
    /*
    console.log('ECharts.svelte onMount');
    console.log({ chartContainerElement: element });
    */

    initChart();

    //window.addEventListener('resize', onResize);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(element);

    return () => {
      //window.removeEventListener('resize', onResize);

      resizeObserver.disconnect();

      chart?.dispose();
    };
  });
</script>

<div
  class="chart-container"
  bind:this={element}
  style="width: 100%; height: 100%;"
>
  <slot>Chart loading...</slot>
</div>
