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
    COLOR_ELECTRICITY_EXCEEDANCE,
    COLOR_ELECTRICITY_SHARED,
    COLOR_ELECTRICITY_CONSUMPTION
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { Unit, Aggregation } from '~/utils/timeseries';

  //--------------------------------------------------------------------------//

  const LABELS_MAP = {
    [`${EnergyChartType.PLAIN}`]: ['Consumption', 'Exceedance'],
    [`${EnergyChartType.PLAIN}_EXCEEDANCE`]: ['Consumption', 'Exceedance'],
    [`${EnergyChartType.REPARTITION}`]: ['Shared with me', 'Bought from market']
  };

  const COLORS_MAP = {
    [`${EnergyChartType.PLAIN}`]: [COLOR_ELECTRICITY_CONSUMPTION],
    [`${EnergyChartType.PLAIN}_EXCEEDANCE`]: [
      COLOR_ELECTRICITY_CONSUMPTION,
      COLOR_ELECTRICITY_EXCEEDANCE
    ],
    [`${EnergyChartType.REPARTITION}`]: [
      COLOR_ELECTRICITY_SHARED,
      COLOR_ELECTRICITY_CONSUMPTION
    ]
  };

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

    unit = Unit.KWH;
    aggregation = Aggregation.MONTH;
    timeseries = data.months.repartition;
    type = EnergyChartType.REPARTITION;

    color = COLORS_MAP[type];
    labels = LABELS_MAP[type];
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
