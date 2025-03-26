<!--script lang="ts" context="module">
  import type {
    EChartsType as BaseEchartsType /*, EChartsOption */
  } from 'echarts';
  import type { EChartsType as CoreEchartsType } from 'echarts/core';

  type ChartInstanceType = BaseEchartsType | CoreEchartsType;

  // export type { EChartsOption } from 'echarts';
</script-->

<script lang="ts">
  // https://echarts.apache.org/handbook/en/basics/import#import-all-echarts-functionality

  import type { EChartsType } from 'echarts';

  import type { EChartsProps } from './types';

  import { onMount } from 'svelte';
  import * as echarts from 'echarts';

  // TODO: review
  /*
  interface $$Props {
    message?: string;
  }*/

  // Svelte v4 way to define the component props TypeScript typings
  interface $$Props extends EChartsProps {}

  let chart: EChartsType | undefined;

  let element: HTMLDivElement;

  const initChart = () => {
    if (chart) {
      chart?.dispose();
    }

    chart = echarts.init(element);
  };

  const onResize = () => {
    chart?.resize();
  };

  onMount(() => {
    // TODO: remove
    console.log('ECharts.svelte onMount');
    console.log({ chartContainerElement: element });

    // chartInstance = echarts.init(chartContainerElement);
    initChart();

    // TODO: review
    chart?.setOption({
      title: {
        text: 'Getting Started',
        subtext: 'ECharts Basic Example'
      },
      tooltip: {},
      xAxis: {
        data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });

    //window.addEventListener('resize', onResize);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(element);

    return () => {
      //window.removeEventListener('resize', onResize);

      resizeObserver.disconnect();

      chart?.dispose();
    };
  });

  /*
  console.log('ECharts.svelte');

  $: if (chartContainerElement) {
    console.log({ chartContainerElement });
  }
  */
</script>

<!--{@debug chartContainerElement}-->

<div
  class="chart-container"
  bind:this={element}
  style="width: 100%; height: 100%;"
>
  <slot>Chart loading...</slot>
</div>

<!--style lang="postcss">
  /*
    https://tailwindcss.com/docs/functions-and-directives#reference-directive
  */
  @reference "tailwindcss";

  .chart-container {
    @apply relative h-full w-full overflow-hidden;
  }
</style-->
