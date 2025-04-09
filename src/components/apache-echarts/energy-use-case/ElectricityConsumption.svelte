<script lang="ts">
  import type {
    AggregationLevelSelectionClick,
    AggregationLevelSelectionLayouts
  } from '~/components/apache-echarts/energy-use-case/AggregationLevelSelection';
  import type {
    Aggregations,
    Units,
    ReferencePower,
    TimeSerie,
    ElectricityTimeserieData,
    ElectricityData
  } from '~/utils/timeseries';

  import dayjs from 'dayjs';

  import EnergyChart, {
    type EnergyChartTypes,
    EnergyChartType
  } from '~/components/apache-echarts/energy-use-case/charts/EnergyChart/EnergyChart.svelte';
  import AggregationLevelSelection, {
    AggregationLevelSelectionLayout
  } from '~/components/apache-echarts/energy-use-case/AggregationLevelSelection';

  import Toggle from '~/components/apache-echarts/Toggle.svelte';
  import ButtonsToggle, {
    type ButtonToggle
  } from '~/components/apache-echarts/ButtonsToggle.svelte';

  import {
    COLOR_ELECTRICITY_EXCEEDANCE,
    COLOR_ELECTRICITY_SHARED,
    COLOR_ELECTRICITY_CONSUMPTION
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { EnergyType, Unit, Aggregation } from '~/utils/timeseries';
  import { formatDate, formatDayStringId } from '~/utils/format';
  import { getRandomBoolean } from '~/utils/random';

  //--------------------------------------------------------------------------//

  const LABELS_MAP = {
    [`${EnergyChartType.PLAIN}`]: ['Consumption'],
    [`${EnergyChartType.EXCEEDANCE}`]: ['Consumption', 'Exceedance'],
    [`${EnergyChartType.REPARTITION}`]: ['Shared with me', 'Bought from market']
  };

  const COLORS_MAP = {
    [`${EnergyChartType.PLAIN}`]: [COLOR_ELECTRICITY_CONSUMPTION],
    [`${EnergyChartType.EXCEEDANCE}`]: [
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
  let color = COLORS_MAP[type];
  let labels: string[] = LABELS_MAP[type];
  let unit: Units = Unit.KWH;

  let aggregation: Aggregations = Aggregation.MONTH;
  let aggregationSelectionLayout: AggregationLevelSelectionLayouts =
    AggregationLevelSelectionLayout.YEAR;

  let showAverage = false;
  let dataStartedAt: string;
  let timeseries: TimeSerie[] = [];

  let referencePower: ReferencePower[] = [];
  let referencePowerAmount: string = '0';
  let referencePowerOptions: ButtonToggle[] = [];

  export let data: ElectricityData;

  $: onData(data);

  const onData = (data: ElectricityData) => {
    type = EnergyChartType.PLAIN;
    unit = Unit.KWH;
    aggregation = Aggregation.MONTH;
    aggregationSelectionLayout = AggregationLevelSelectionLayout.YEAR;
    timeseries = data.months.plain;
    dataStartedAt = timeseries[0].startedAt;
    color = COLORS_MAP[type];
    labels = LABELS_MAP[type];

    updateReferencePowerOptions();

    // TODO: remove
    console.log('ElectricityConsumption.onData', data);
  };

  //---//

  const readTimeseries = <T = TimeSerie,>(
    data: ElectricityTimeserieData<T>
  ) => {
    const dataType =
      type === EnergyChartType.REPARTITION ? 'repartition' : 'plain';
    return data[dataType];
  };

  //---//

  const onTypeChange = (selectedType: string) => {
    type = selectedType as EnergyChartTypes;
    unit = Unit.KWH;

    showAverage = false;
    aggregation = Aggregation.MONTH;
    aggregationSelectionLayout = AggregationLevelSelectionLayout.YEAR;

    timeseries = readTimeseries(data.months);
    dataStartedAt = timeseries[0].startedAt;

    color = COLORS_MAP[type];
    labels = LABELS_MAP[type];

    updateReferencePowerOptions();
  };

  //--------------------------------------------------------------------------//

  const onReferencePowerAmountChange = (selectedAmount: string) => {
    referencePowerAmount = selectedAmount;

    // TODO: remove
    console.log(
      'ElectricityConsumption.onReferencePowerAmountChange ',
      referencePowerAmount
    );

    if (referencePowerAmount === '0') {
      referencePower = [];
      return;
    }

    defineReferencePower();
  };

  const updateReferencePowerOptions = () => {
    if (type !== EnergyChartType.EXCEEDANCE) {
      referencePowerAmount = '0';
      referencePower = [];
      referencePowerOptions = [];
      return;
    }

    const length = timeseries.length;

    let maxAmount = 3;
    if (length <= 6) {
      maxAmount = 1;
    } else if (length <= 12) {
      maxAmount = 2;
    }

    if (Number(referencePowerAmount) > maxAmount) {
      referencePowerAmount = String(maxAmount);
    }

    referencePowerOptions = [
      {
        label: 'None',
        value: '0'
      }
    ];

    for (let amount = 1; amount <= maxAmount; amount++) {
      referencePowerOptions.push({
        value: String(amount)
      });
    }

    defineReferencePower();
  };

  const defineReferencePower = () => {
    const amount = Number(referencePowerAmount);
    const startAtBeginning = getRandomBoolean();

    // TODO: remove
    console.log('ElectricityConsumption.defineReferencePower ', {
      amount,
      startAtBeginning
    });

    // TODO: define the code logic
  };

  //--------------------------------------------------------------------------//

  const onAggregationLevelSelectionClick: AggregationLevelSelectionClick = (
    selectedAggregation,
    selectedLayout
  ) => {
    unit = Unit.KWH;

    if (selectedLayout === AggregationLevelSelectionLayout.YEAR) {
      switch (selectedAggregation) {
        case Aggregation.MONTH:
          timeseries = readTimeseries(data.months);
          break;
        case Aggregation.WEEK:
          timeseries = readTimeseries(data.weeks);
          break;
      }

      dataStartedAt = timeseries[0].startedAt;
      aggregation = selectedAggregation;
      aggregationSelectionLayout = selectedLayout;

      updateReferencePowerOptions();

      return;
    }

    let stringId = formatDayStringId(dayjs(dataStartedAt).startOf('month'));
    switch (selectedAggregation) {
      case Aggregation.WEEK:
        timeseries = readTimeseries(data.weeksMap[stringId]);
        break;
      case Aggregation.DAY:
        timeseries = readTimeseries(data.daysMap[stringId]);
        break;
      case Aggregation.HOUR:
        stringId = formatDayStringId(dataStartedAt);
        timeseries = readTimeseries(data.hoursMap[stringId]);
        break;
    }

    dataStartedAt = timeseries[0].startedAt;
    aggregation = selectedAggregation;
    aggregationSelectionLayout = selectedLayout;

    updateReferencePowerOptions();
  };

  const onChartClick = (timeserie: TimeSerie) => {
    const { startedAt } = timeserie;
    let stringId = formatDayStringId(startedAt);

    // TODO: remove
    console.log('ElectricityConsumption.onChartClick timeserie', timeserie);

    if (aggregationSelectionLayout === AggregationLevelSelectionLayout.YEAR) {
      switch (aggregation) {
        case Aggregation.MONTH:
          aggregation = Aggregation.WEEK;
          timeseries = readTimeseries(data.weeksMap[stringId]);
          break;
        case Aggregation.WEEK:
          stringId = formatDayStringId(dayjs(startedAt).startOf('month'));
          aggregation = Aggregation.DAY;
          timeseries = readTimeseries(data.daysMap[stringId]);
          break;
      }

      dataStartedAt = timeseries[0].startedAt;
      aggregationSelectionLayout = AggregationLevelSelectionLayout.MONTH;

      updateReferencePowerOptions();

      return;
    }

    switch (aggregation) {
      case Aggregation.WEEK:
        stringId = formatDayStringId(dayjs(startedAt).startOf('month'));
        aggregation = Aggregation.DAY;
        timeseries = readTimeseries(data.daysMap[stringId]);
        break;
      case Aggregation.DAY:
        aggregation = Aggregation.HOUR;
        timeseries = readTimeseries(data.hoursMap[stringId]);
        break;
      case Aggregation.HOUR:
        aggregation = Aggregation.MINUTES;
        timeseries = readTimeseries(data.minutesMap[stringId]);
        unit = Unit.KW;
        break;
    }

    dataStartedAt = timeseries[0].startedAt;

    if (
      ([Aggregation.HOUR, Aggregation.MINUTES] as string[]).includes(
        aggregation
      )
    ) {
      aggregationSelectionLayout = AggregationLevelSelectionLayout.DAY;
    }
    updateReferencePowerOptions();
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
      {referencePower}
      showAverageMarkline={showAverage}
      onclick={onChartClick}
    >
      <svelte:fragment slot="headerActions">
        <AggregationLevelSelection
          {aggregation}
          energyType={EnergyType.ELECTRICITY}
          layout={aggregationSelectionLayout}
          onclick={onAggregationLevelSelectionClick}
        />
      </svelte:fragment>

      <svelte:fragment slot="footer">
        <div
          class="flex flex-col-reverse items-center gap-4 py-4 lg:flex-row lg:justify-between lg:gap-0 lg:py-2"
        >
          <div class="flex flex-col items-center gap-4 lg:flex-row">
            <div class="flex flex-col items-center gap-2 md:flex-row">
              <span>Consumption</span>

              <ButtonsToggle
                name="chart-type-toggle"
                selected={type}
                onchange={onTypeChange}
                list={[
                  {
                    label: 'Exceedance',
                    value: EnergyChartType.EXCEEDANCE
                  },
                  { label: 'Measured', value: EnergyChartType.PLAIN },
                  { label: 'Repartition', value: EnergyChartType.REPARTITION }
                ]}
              />
            </div>

            {#if type === EnergyChartType.PLAIN}
              <Toggle
                id="showAverageToggle"
                label="show average mark line"
                bind:checked={showAverage}
              />
            {/if}

            {#if type === EnergyChartType.EXCEEDANCE}
              <div class="flex flex-col items-center gap-2 md:flex-row">
                <span>Reference power amount</span>

                <ButtonsToggle
                  name="reference-power-toggle"
                  selected={referencePowerAmount}
                  onchange={onReferencePowerAmountChange}
                  list={referencePowerOptions}
                />
              </div>
            {/if}
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
