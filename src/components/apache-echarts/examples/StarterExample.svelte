<script lang="ts">
  import ECharts, {
    type EChartsOption
  } from '~/components/apache-echarts/ECharts';

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
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
</script>

<ECharts
  theme="dark"
  class="chart-container-starter-example"
  id="test-id-charts"
  {options}>Loading Starter Example Chart...</ECharts
>
