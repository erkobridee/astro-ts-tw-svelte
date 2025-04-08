<script lang="ts">
  import type { TimeSerie } from '~/utils/timeseries';

  import EnergyChart from '~/components/apache-echarts/energy-use-case/charts/EnergyChart/EnergyChart.svelte';

  import { COLOR_ELECTRICITY_PRODUCTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { Unit, Aggregation } from '~/utils/timeseries';

  //--------------------------------------------------------------------------//

  export let timeseries: TimeSerie[] = [];

  //--------------------------------------------------------------------------//

  const onChartClick = (timeserie: TimeSerie) => {
    console.log('ElectricityProduction.onChartClick timeserie:', timeserie);
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <EnergyChart
      {timeseries}
      onclick={onChartClick}
      dataZoomOptions={{
        showAll: true
      }}
      color={COLOR_ELECTRICITY_PRODUCTION}
      unit={Unit.KW}
      aggregation={Aggregation.MINUTES}
      labels={['Production', 'Exceedance']}
    >
      <svelte:fragment slot="headerActions">
        Electricity Consumption header actions
      </svelte:fragment>

      <svelte:fragment slot="footer">Footer Row</svelte:fragment>
    </EnergyChart>
  </div>
</div>
