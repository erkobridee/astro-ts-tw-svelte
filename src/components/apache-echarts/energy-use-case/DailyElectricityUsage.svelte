<script lang="ts">
  import type { DailyUsage, DayUsage } from '~/utils/timeseries';

  import DailyUsageChart from '~/components/apache-echarts/energy-use-case/charts/DailyUsageChart.svelte';

  import { COLOR_ELECTRICITY_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  export let data: DailyUsage;

  const onChartClick = (dayUsage: DayUsage) => {
    console.log('DailyElectricityUsage.onChartClick dayUsage:', dayUsage);
  };
</script>

<div class="flex h-[300px] w-[600px]">
  <DailyUsageChart
    {data}
    unit="kWh"
    currentColor={COLOR_ELECTRICITY_CONSUMPTION}
    onclick={onChartClick}
  />
</div>
