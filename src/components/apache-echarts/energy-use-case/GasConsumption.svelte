<script lang="ts">
  import type { TimeSerie } from '~/utils/timeseries';

  import EnergyChart from '~/components/apache-echarts/energy-use-case/charts/EnergyChart/EnergyChart.svelte';

  import { COLOR_GAS_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { Unit, Aggregation } from '~/utils/timeseries';

  //--------------------------------------------------------------------------//

  export let timeseries: TimeSerie[] = [];

  //--------------------------------------------------------------------------//

  const onChartClick = (timeserie: TimeSerie) => {
    console.log('GasConsumption.onChartClick timeserie:', timeserie);
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <EnergyChart
      {timeseries}
      onclick={onChartClick}
      color={COLOR_GAS_CONSUMPTION}
      unit={Unit.M3}
      aggregation={Aggregation.HOUR}
    >
      <svelte:fragment slot="headerActions">
        Gas Consumption header actions
      </svelte:fragment>

      <svelte:fragment slot="footer">Footer Row</svelte:fragment>
    </EnergyChart>
  </div>
</div>
