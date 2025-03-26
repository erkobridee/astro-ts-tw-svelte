<script lang="ts">
  import ECharts, {
    type EChartsOption
  } from '~/components/apache-echarts/ECharts';

  const options: EChartsOption = {
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
  };
</script>

<ECharts {options}>Loading Starter Example Chart...</ECharts>
