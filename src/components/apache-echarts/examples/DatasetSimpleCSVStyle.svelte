<script lang="ts">
  // https://echarts.apache.org/handbook/en/concepts/dataset#define-data-in-dataset

  import type { EChartsOption, BarSeriesOption } from 'echarts';

  import ECharts from '~/components/apache-echarts/ECharts';

  import {
    DEFAULT_RADIUS_BORDER,
    buildBarItemStyleBorderRadius
  } from '~/components/apache-echarts/common';

  const BAR_SERIE: BarSeriesOption = {
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
      // Provide a set of data ( CSV array style )
      source: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
      ]
    },
    // Declare an x-axis (category axis).
    // The category map the first column in the dataset by default.
    xAxis: { type: 'category' },
    // Declare a y-axis (value axis).
    yAxis: {},
    // Declare several 'bar' series,
    // every series will auto-map to each column by default.
    series: [BAR_SERIE, BAR_SERIE, BAR_SERIE]
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <ECharts id="dataset-simple-csv-style" {options}></ECharts>
  </div>
</div>
