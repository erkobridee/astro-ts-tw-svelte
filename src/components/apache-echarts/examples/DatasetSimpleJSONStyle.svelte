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
      // Define the dimension of array. In cartesian coordinate system,
      // if the type of x-axis is category, map the first dimension to
      // x-axis by default, the second dimension to y-axis.
      // You can also specify 'series.encode' to complete the map
      // without specify dimensions. Please see below.

      dimensions: ['product', '2015', '2016', '2017'],
      source: [
        { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
        { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
        { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
        { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [BAR_SERIE, BAR_SERIE, BAR_SERIE]
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <ECharts id="dataset-simple-json-style" {options}></ECharts>
  </div>
</div>
