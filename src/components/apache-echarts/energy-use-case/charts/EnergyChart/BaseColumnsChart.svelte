<script lang="ts" context="module">
  /* eslint-disable */

  import type { BarSeriesOption } from 'echarts';

  export type AxisLabelFormatter = string;
  export type tooltipFormatter = (params: any) => string;

  export interface ChartOptions {
    /** xAxis.data */
    categories: string[];

    series: BarSeriesOption[];

    // xAxisLabelFormatter
    // tooltipFormatter
  }
</script>

<script lang="ts">
  import {
    COLOR_DEFAULT,
    type ChartClick
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { DEFAULT_CHART_CLICK } from '~/components/apache-echarts/energy-use-case/charts/common';

  //--------------------------------------------------------------------------//

  export let color: string = COLOR_DEFAULT;

  export let chartOptions: ChartOptions;

  export let onclick: ChartClick = DEFAULT_CHART_CLICK;

  //--------------------------------------------------------------------------//

  // TODO: build the echarts.options

  // it should contains the basic columns charts definitions
</script>

<div class="flex flex-col gap-2">
  <div><strong>TODO:</strong> define the BaseColumnChart</div>

  <div>
    <strong>color:</strong>
    <span
      style="display:inline-block;border-radius:10px;width:10px;height:10px;background-color:{color};"
    ></span>
  </div>

  <pre><code>{JSON.stringify({ color, chartOptions }, null, 2)}</code></pre>
</div>
