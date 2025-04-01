<script lang="ts" context="module">
  import type { BarSeriesOption } from 'echarts';

  export type XAxisValue = string | number;

  export interface ChartData {
    xAxis: XAxisValue[];

    series: BarSeriesOption[];
  }
</script>

<script lang="ts">
  export let colors: string[] | undefined = undefined;

  export let data: ChartData;

  // it should contains the basic columns charts definitions
</script>
