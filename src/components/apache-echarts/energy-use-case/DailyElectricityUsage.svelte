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
  <!--div class="flex h-[160px] w-[450px]"-->
  <div class="flex h-[360px] w-[550px]">
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
