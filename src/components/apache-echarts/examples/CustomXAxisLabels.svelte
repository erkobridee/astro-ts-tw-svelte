<script lang="ts">
  import type { EChartsOption } from 'echarts';

  import dayjs from 'dayjs';

  import ECharts from '~/components/apache-echarts/ECharts';

  import { getRandomInt } from '~/utils/random';

  //---//

  const MIN = 20;
  const MAX = 40;

  const currentYear = new Date().getFullYear();

  const source = [
    `${currentYear}-01-31T00:00:00.000Z`,
    `${currentYear}-02-28T00:00:00.000Z`,
    `${currentYear}-03-31T00:00:00.000Z`,
    `${currentYear}-04-30T00:00:00.000Z`,
    `${currentYear}-05-31T00:00:00.000Z`,
    `${currentYear}-06-30T00:00:00.000Z`,
    `${currentYear}-07-31T00:00:00.000Z`,
    `${currentYear}-08-31T00:00:00.000Z`,
    `${currentYear}-09-30T00:00:00.000Z`,
    `${currentYear}-10-31T00:00:00.000Z`,
    `${currentYear}-11-30T00:00:00.000Z`,
    `${currentYear}-12-31T00:00:00.000Z`
  ].map((date) => ({
    date,
    value: getRandomInt(MIN, MAX)
  }));

  const dimensions = ['date', 'value'];

  // https://day.js.org/docs/en/display/format
  const dateFormatter = (value: string) => dayjs(value).format('YYYY-MM');

  //---//

  const dataset: EChartsOption['dataset'] = [
    {
      dimensions,
      source
    }
  ];

  const grid: EChartsOption['grid'] = {
    containLabel: true,
    left: '5%',
    right: '5%'
  };

  const tooltip: EChartsOption['tooltip'] = {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  };

  const yAxis: EChartsOption['yAxis'] = {
    type: 'value',
    axisLabel: {
      verticalAlign: 'bottom',
      margin: 10,
      padding: [0, 0, 2, 0],
      showMinLabel: false,
      showMaxLabel: false
    },
    axisLine: {
      onZero: false
    },
    splitLine: {
      showMaxLine: false,
      showMinLine: false
    },
    min: MIN - 5,
    max: MAX + 5
  };

  const xAxis: EChartsOption['xAxis'] = {
    type: 'category',
    boundaryGap: false,
    splitLine: {
      show: true,
      showMinLine: false,
      showMaxLine: true
    },
    axisLabel: {
      showMinLabel: false,

      // https://echarts.apache.org/en/option.html#xAxis.axisLabel.formatter
      formatter: dateFormatter
    },
    axisPointer: {
      snap: true,

      label: {
        // https://echarts.apache.org/en/option.html#xAxis.axisPointer.label.formatter
        formatter: ({ value }) => dateFormatter(value as string)
      }
    },
    axisLine: {
      onZero: false
    },
    axisTick: {
      alignWithLabel: true
    }
  };

  const series: EChartsOption['series'] = [
    {
      dimensions,

      type: 'line',
      zlevel: 0,
      z: 0,
      smooth: true,

      // https://echarts.apache.org/handbook/en/concepts/style#color-palette
      color: ['#3fb1e3']
    }
  ];

  //---//

  const options: EChartsOption = {
    dataset,
    grid,
    tooltip,
    yAxis,
    xAxis,
    series
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <ECharts id="custom-x-axis" {options}></ECharts>
  </div>
</div>
