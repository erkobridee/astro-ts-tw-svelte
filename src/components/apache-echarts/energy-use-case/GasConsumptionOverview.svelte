<script lang="ts">
  import type { TimeSerie } from '~/utils/timeseries';

  import EnergyOverviewChart from '~/components/apache-echarts/energy-use-case/charts/EnergyOverviewChart.svelte';

  import { COLOR_GAS_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  export let timeseries: TimeSerie[];

  const onChartClick = (timeserie: TimeSerie) => {
    console.log('GasConsumptionOverview.onChartClick timeserie:', timeserie);
  };
</script>

<div class="flex h-[300px] w-[600px]">
  <EnergyOverviewChart
    {timeseries}
    color={COLOR_GAS_CONSUMPTION}
    onclick={onChartClick}
  />
</div>
