<script lang="ts">
  // https://echarts.apache.org/handbook/en/concepts/dataset#define-data-in-dataset

  import type { EChartsOption, BarSeriesOption } from 'echarts';

  import ECharts from '~/components/apache-echarts/ECharts';

  import {
    DEFAULT_RADIUS_BORDER,
    buildBarItemStyleBorderRadius
  } from '~/components/apache-echarts/common';

  const BASE_BAR_SERIE: BarSeriesOption = {
    type: 'bar',
    emphasis: {
      itemStyle: {
        // https://echarts.apache.org/en/option.html#series-bar.emphasis.itemStyle.color
        color: 'inherit'
      }
    },
    itemStyle: buildBarItemStyleBorderRadius(DEFAULT_RADIUS_BORDER)
  };

  const options: EChartsOption = {
    legend: {},
    tooltip: {},

    dataset: {
      source: [
        ['product', '2020', '2021', '2022', '2023'],
        ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
        ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
        ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
      ]
    },

    grid: [{ bottom: '55%' }, { top: '55%' }],

    xAxis: [
      { type: 'category', gridIndex: 0 },
      { type: 'category', gridIndex: 1 }
    ],
    yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],

    series: [
      // These series will show in the first coordinate, each series map a row in dataset.
      {
        ...BASE_BAR_SERIE,
        seriesLayoutBy: 'row',
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      {
        ...BASE_BAR_SERIE,
        seriesLayoutBy: 'row',
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      {
        ...BASE_BAR_SERIE,
        seriesLayoutBy: 'row',
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      // These series will show in the second coordinate, each series map a column in dataset.
      {
        ...BASE_BAR_SERIE,
        seriesLayoutBy: 'column',
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        ...BASE_BAR_SERIE,
        seriesLayoutBy: 'column',
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        ...BASE_BAR_SERIE,
        seriesLayoutBy: 'column',
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        ...BASE_BAR_SERIE,
        seriesLayoutBy: 'column',
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <ECharts id="dataset-mapped-to-series" {options}></ECharts>
  </div>
</div>
