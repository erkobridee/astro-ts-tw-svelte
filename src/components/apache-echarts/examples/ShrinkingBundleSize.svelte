<script lang="ts">
  // https://echarts.apache.org/handbook/en/basics/import#shrinking-bundle-size

  import type { EChartsOption, BarSeriesOption } from 'echarts';

  //---//

  // Import the echarts core module, which provides the necessary interfaces for using echarts.
  import * as echarts from 'echarts/core';

  // Import bar charts, all suffixed with Chart
  import { BarChart } from 'echarts/charts';

  // Import the title, tooltip, rectangular coordinate system, dataset and transform components
  import {
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
  } from 'echarts/components';

  // Features like Universal Transition and Label Layout
  import { LabelLayout, UniversalTransition } from 'echarts/features';

  // Import the Canvas renderer
  // Note that including the CanvasRenderer or SVGRenderer is a required step
  import { CanvasRenderer } from 'echarts/renderers';

  //---//

  import ECharts from '~/components/apache-echarts/ECharts';

  import {
    DEFAULT_RADIUS_BORDER,
    buildBarItemStyleBorderRadius
  } from '~/components/apache-echarts/common';

  //---//

  // Register the required components
  echarts.use([
    BarChart,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ]);

  //---//

  export let dataSource: (string | number)[][];

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
    // colors picked from TailwindCSS v3 default palette
    // https://v3.tailwindcss.com/docs/customizing-colors#default-color-palette
    color: ['#84cc16', '#22c55e', '#10b981'],
    legend: {},
    tooltip: {},
    dataset: {
      source: dataSource
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
    <ECharts id="shrinking-bundle-size" init={echarts.init} {options}></ECharts>
  </div>
</div>
