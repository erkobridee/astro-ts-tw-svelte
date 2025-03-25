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

  import { onMount } from 'svelte';
  import * as echarts from 'echarts';

  let chartInstance: EChartsType | undefined;
  let chartContainerElement: HTMLDivElement;

  onMount(() => {
    console.log('ECharts.svelte onMount');

    console.log({ chartContainerElement });

    chartInstance = echarts.init(chartContainerElement);

    // TODO: review
    chartInstance.setOption({
      title: {
        text: 'ECharts Getting Started Example'
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

    return () => {
      chartInstance?.dispose();
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
  bind:this={chartContainerElement}
  style="width: 100%; height: 100%;"
>
  Chart loading...
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
