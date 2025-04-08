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

  import ButtonsToggle from '~/components/apache-echarts/ButtonsToggle.svelte';

  import {
    COLOR_ELECTRICITY_EXCEEDANCE,
    COLOR_ELECTRICITY_SHARED,
    COLOR_ELECTRICITY_CONSUMPTION
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { Unit, Aggregation } from '~/utils/timeseries';
  import { formatDate /*, formatDayStringId */ } from '~/utils/format';

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
  let unit: Units = Unit.KWH;
  let aggregation: Aggregations = Aggregation.MONTH;

  let dataStartedAt: string;
  let timeseries: TimeSerie[] = [];

  export let data: ElectricityData;

  $: onData(data);

  const onData = (data: ElectricityData) => {
    type = EnergyChartType.PLAIN;
    unit = Unit.KWH;
    aggregation = Aggregation.MONTH;
    timeseries = data.months.plain;
    dataStartedAt = timeseries[0].startedAt;
    color = COLORS_MAP[type];
    labels = LABELS_MAP[type];
  };

  //---//

  const onTypeChange = (selectedType: string) => {
    type = selectedType as EnergyChartTypes;

    updateTimeseries();
  };

  //---//

  const updateTimeseries = () => {
    unit = aggregation === Aggregation.MINUTES ? Unit.KW : Unit.KWH;

    timeseries =
      data.months[
        type === EnergyChartType.REPARTITION ? 'repartition' : 'plain'
      ];

    dataStartedAt = timeseries[0].startedAt;

    color = COLORS_MAP[type];
    labels = LABELS_MAP[type];

    // TODO: remove
    console.log('ElectricityConsumption.updateTimeseries', {
      type,
      aggregation,
      color,
      labels,
      data
    });
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

      <svelte:fragment slot="footer">
        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center gap-2">
            <span>Consumption</span>

            <ButtonsToggle
              name="buttons-toggle"
              selected={type}
              onchange={onTypeChange}
              list={[
                { label: 'Measured', value: EnergyChartType.PLAIN },
                { label: 'Repartition', value: EnergyChartType.REPARTITION },
                {
                  label: 'Exceedance',
                  value: EnergyChartType.EXCEEDANCE,
                  disabled: true
                }
              ]}
            />
          </div>

          <div class="flex items-center gap-1 text-sm">
            <span>Data started at:</span>
            <span class="font-semibold">{formatDate(dataStartedAt)}</span>
          </div>
        </div>
      </svelte:fragment>
    </EnergyChart>
  </div>
</div>
