<script lang="ts">
  import type { TimeSerie } from '~/utils/timeseries';

  import EnergyOverviewChart from '~/components/apache-echarts/energy-use-case/charts/EnergyOverviewChart.svelte';

  import { COLOR_ELECTRICITY_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  import Toggle from '~/components/apache-echarts/Toggle.svelte';

  //--------------------------------------------------------------------------//

  let showData = true;

  export let data: TimeSerie[];

  $: timeseries = showData ? data : [];

  //--------------------------------------------------------------------------//

  const onChartClick = (timeserie: TimeSerie) => {
    console.log(
      'ElectricityConsumptionOverview.onChartClick timeserie:',
      timeserie
    );
  };
</script>

<div class="flex flex-col gap-2">
  <div class="flex h-[250px] w-full sm:h-[300px] sm:w-[500px] lg:w-[600px]">
    <EnergyOverviewChart
      {timeseries}
      unit="kWh"
      color={COLOR_ELECTRICITY_CONSUMPTION}
      onclick={onChartClick}
    />
  </div>

  <div class="flex">
    <Toggle bind:checked={showData} label="show data" />
  </div>
</div>
