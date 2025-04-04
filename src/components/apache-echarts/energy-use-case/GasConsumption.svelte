<script lang="ts">
  import type {
    Aggregations,
    GasConsumptionData,
    TimeSerie
  } from '~/utils/timeseries';

  import EnergyChart from '~/components/apache-echarts/energy-use-case/charts/EnergyChart/EnergyChart.svelte';

  import Toggle from '~/components/apache-echarts/Toggle.svelte';

  import { COLOR_GAS_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { Unit, Aggregation } from '~/utils/timeseries';

  //--------------------------------------------------------------------------//

  export let data: GasConsumptionData;

  //export let timeseries: TimeSerie[] = [];

  const aggregation: Aggregations = Aggregation.WEEK;

  let showAverage = false;

  //--------------------------------------------------------------------------//

  const onChartClick = (timeserie: TimeSerie) => {
    console.log('GasConsumption.onChartClick timeserie:', timeserie);
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <EnergyChart
      timeseries={data.weeks}
      showAverageMarkline={showAverage}
      onclick={onChartClick}
      color={COLOR_GAS_CONSUMPTION}
      unit={Unit.M3}
      {aggregation}
    >
      <svelte:fragment slot="headerActions">
        <ul class="flex-inline flex gap-2">
          <li>
            <button class="font-semibold">Months</button>
            <span>/</span>
          </li>
          <li>
            <button>Weeks</button>
            <span>/</span>
          </li>
          <li>
            <button>Days</button>
            <span>/</span>
          </li>
          <li>
            <button>Hours</button>
          </li>
        </ul>
      </svelte:fragment>

      <svelte:fragment slot="footer">
        <Toggle
          id="showAverageToggle"
          label="show average mark line"
          bind:checked={showAverage}
        />
      </svelte:fragment>
    </EnergyChart>
  </div>
</div>
