<script lang="ts">
  import type {
    Aggregations,
    Units,
    TimeSerie,
    ElectricityData
  } from '~/utils/timeseries';

  import EnergyChart, {
    type EnergyChartTypes,
    EnergyChartType
  } from '~/components/apache-echarts/energy-use-case/charts/EnergyChart/EnergyChart.svelte';

  import {
    COLOR_ELECTRICITY_SHARED,
    COLOR_ELECTRICITY_CONSUMPTION
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { Unit, Aggregation } from '~/utils/timeseries';

  //--------------------------------------------------------------------------//

  let type: EnergyChartTypes = EnergyChartType.PLAIN;
  let color = [COLOR_ELECTRICITY_CONSUMPTION];
  let labels: string[] = ['Consumption', 'Exceedance'];
  let unit: Units = Unit.KW;
  let aggregation: Aggregations = Aggregation.MINUTES;
  let timeseries: TimeSerie[] = [];

  export let data: ElectricityData;

  $: updateTimeSeries(data);

  const updateTimeSeries = (data: ElectricityData) => {
    // TODO: remove
    console.log('ElectricityConsumption.updateTimeSeries', data);

    color = [COLOR_ELECTRICITY_SHARED, COLOR_ELECTRICITY_CONSUMPTION];
    labels = ['Shared with me', 'Bought from market'];
    unit = Unit.KWH;
    aggregation = Aggregation.MONTH;
    timeseries = data.months.repartition;
    type = EnergyChartType.REPARTITION;
  };

  //--------------------------------------------------------------------------//

  const onChartClick = (timeserie: TimeSerie) => {
    console.log('ElectricityConsumption.onChartClick timeserie:', timeserie);
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <EnergyChart
      {type}
      {color}
      {labels}
      {unit}
      {aggregation}
      {timeseries}
      onclick={onChartClick}
    >
      <svelte:fragment slot="headerActions">
        Electricity Consumption header actions
      </svelte:fragment>

      <svelte:fragment slot="footer">Footer Row</svelte:fragment>
    </EnergyChart>
  </div>
</div>
