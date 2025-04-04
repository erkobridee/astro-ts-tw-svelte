<script lang="ts">
  // use max space by echarts
  // https://github.com/apache/echarts/issues/11791#issuecomment-1875763303

  import type { EChartsOption } from 'echarts';

  import * as echarts from 'echarts';

  import ECharts from '~/components/apache-echarts/ECharts';

  import Toggle from '~/components/apache-echarts/Toggle.svelte';

  import {
    DEFAULT_RADIUS_BORDER,
    buildBarItemStyleBorderRadius
  } from '~/components/apache-echarts/common';

  let themeToggleChecked = false;

  $: theme = themeToggleChecked ? 'dark' : 'light';

  const options: EChartsOption = {
    // https://echarts.apache.org/en/option.html#grid
    grid: {
      top: 85,

      left: 15,
      right: 15,
      bottom: 15,

      containLabel: true
    },

    // https://echarts.apache.org/en/option.html#title
    title: {
      text: 'Getting Started',
      subtext: 'ECharts Basic Example',

      // https://echarts.apache.org/en/option.html#title.padding
      padding: 15
    },

    // https://echarts.apache.org/en/option.html#tooltip
    tooltip: {},

    // https://echarts.apache.org/en/option.html#xAxis
    xAxis: {
      data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
    },

    // https://echarts.apache.org/en/option.html#yAxis
    yAxis: {},

    series: [
      // https://echarts.apache.org/en/option.html#series-bar
      {
        name: 'sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
        emphasis: {
          itemStyle: {
            // https://echarts.apache.org/en/option.html#series-bar.emphasis.itemStyle.color
            color: 'inherit'
          }
        },
        itemStyle: buildBarItemStyleBorderRadius(DEFAULT_RADIUS_BORDER)
      }
    ]
  };
</script>

<div class="flex grow flex-col gap-2">
  <div class="flex items-center justify-end gap-2">
    <span>Theme</span>

    <Toggle
      id="themeToggle"
      layout="labels"
      label={['light', 'dark']}
      bind:checked={themeToggleChecked}
    />
  </div>

  <div class="relative grow">
    <div class="absolute top-0 right-0 bottom-0 left-0">
      <ECharts
        class="chart-container-starter-example"
        id="test-id-charts"
        init={echarts.init}
        {theme}
        {options}>Loading Starter Example Chart...</ECharts
      >
    </div>
  </div>
</div>
