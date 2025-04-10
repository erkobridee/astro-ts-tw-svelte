<script lang="ts">
  import type { DailyUsage, DayUsage } from '~/utils/timeseries';

  import DailyUsageChart from '~/components/apache-echarts/energy-use-case/charts/DailyUsageChart.svelte';

  import { COLOR_ELECTRICITY_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  import Toggle from '~/components/apache-echarts/Toggle.svelte';

  //--------------------------------------------------------------------------//

  let showData = true;

  export let data: DailyUsage;

  $: innerData = showData ? data : { current: [], previous: [] };

  //--------------------------------------------------------------------------//

  const onChartClick = (dayUsage: DayUsage) => {
    console.log('DailyElectricityUsage.onChartClick dayUsage:', dayUsage);
  };
</script>

<div class="flex flex-col gap-2">
  <div class="flex h-[250px] w-full sm:h-[300px] sm:w-[500px] lg:w-[600px]">
    <DailyUsageChart
      data={innerData}
      unit="kWh"
      currentColor={COLOR_ELECTRICITY_CONSUMPTION}
      onclick={onChartClick}
    />
  </div>

  <div class="flex">
    <Toggle bind:checked={showData} label="show data" />
  </div>
</div>
