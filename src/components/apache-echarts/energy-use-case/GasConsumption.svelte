<script lang="ts">
  import type {
    AggregationLevelSelectionClick,
    AggregationLevelSelectionLayouts
  } from '~/components/apache-echarts/energy-use-case/AggregationLevelSelection';
  import type {
    Aggregations,
    GasConsumptionData,
    TimeSerie
  } from '~/utils/timeseries';

  import dayjs from 'dayjs';

  import EnergyChart from '~/components/apache-echarts/energy-use-case/charts/EnergyChart/EnergyChart.svelte';
  import AggregationLevelSelection, {
    AggregationLevelSelectionLayout
  } from '~/components/apache-echarts/energy-use-case/AggregationLevelSelection';
  import Toggle from '~/components/apache-echarts/Toggle.svelte';

  import { COLOR_GAS_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { EnergyType, Unit, Aggregation } from '~/utils/timeseries';
  import { formatDate, formatDayStringId } from '~/utils/format';

  //--------------------------------------------------------------------------//

  export let data: GasConsumptionData;

  let aggregation: Aggregations = Aggregation.MONTH;
  let aggregationSelectionLayout: AggregationLevelSelectionLayouts =
    AggregationLevelSelectionLayout.YEAR;

  let showAverage = false;

  let dataStartedAt: string;
  let timeseries: TimeSerie[] = [];

  $: updateTimeseries(data);

  const updateTimeseries = (data: GasConsumptionData) => {
    aggregation = Aggregation.MONTH;
    aggregationSelectionLayout = AggregationLevelSelectionLayout.YEAR;
    timeseries = data.months;
    dataStartedAt = timeseries[0].startedAt;
  };

  //--------------------------------------------------------------------------//

  const onAggregationLevelSelectionClick: AggregationLevelSelectionClick = (
    selectedAggregation,
    selectedLayout
  ) => {
    if (selectedLayout === AggregationLevelSelectionLayout.YEAR) {
      switch (selectedAggregation) {
        case Aggregation.MONTH:
          timeseries = data.months;
          break;
        case Aggregation.WEEK:
          timeseries = data.weeks;
          break;
      }

      dataStartedAt = timeseries[0].startedAt;
      aggregation = selectedAggregation;
      aggregationSelectionLayout = selectedLayout;

      return;
    }

    const stringId = formatDayStringId(dayjs(dataStartedAt).startOf('month'));
    switch (selectedAggregation) {
      case Aggregation.WEEK:
        timeseries = data.weeksMap[stringId];
        break;
      case Aggregation.DAY:
        timeseries = data.daysMap[stringId];
        break;
    }

    dataStartedAt = timeseries[0].startedAt;
    aggregation = selectedAggregation;
  };

  const onChartClick = (timeserie: TimeSerie) => {
    const { startedAt } = timeserie;
    let stringId = formatDayStringId(startedAt);

    if (aggregationSelectionLayout === AggregationLevelSelectionLayout.YEAR) {
      switch (aggregation) {
        case Aggregation.MONTH:
          aggregation = Aggregation.WEEK;
          timeseries = data.weeksMap[stringId];
          break;
        case Aggregation.WEEK:
          stringId = formatDayStringId(dayjs(startedAt).startOf('month'));
          aggregation = Aggregation.DAY;
          timeseries = data.daysMap[stringId];
          break;
      }

      dataStartedAt = timeseries[0].startedAt;
      aggregationSelectionLayout = AggregationLevelSelectionLayout.MONTH;

      return;
    }

    switch (aggregation) {
      case Aggregation.WEEK:
        stringId = formatDayStringId(dayjs(startedAt).startOf('month'));
        aggregation = Aggregation.DAY;
        timeseries = data.daysMap[stringId];
        break;
      case Aggregation.DAY:
        aggregation = Aggregation.HOUR;
        timeseries = data.hoursMap[stringId];
        break;
    }

    dataStartedAt = timeseries[0].startedAt;
  };
</script>

<div class="relative grow">
  <div class="absolute top-0 right-0 bottom-0 left-0">
    <EnergyChart
      showAverageMarkline={showAverage}
      onclick={onChartClick}
      color={COLOR_GAS_CONSUMPTION}
      unit={Unit.M3}
      {timeseries}
      {aggregation}
    >
      <svelte:fragment slot="headerActions">
        <AggregationLevelSelection
          {aggregation}
          energyType={EnergyType.GAS}
          layout={aggregationSelectionLayout}
          onclick={onAggregationLevelSelectionClick}
        />
      </svelte:fragment>

      <svelte:fragment slot="footer">
        <div class="flex items-center justify-between">
          <Toggle
            id="showAverageToggle"
            label="show average mark line"
            bind:checked={showAverage}
          />
          <div class="flex items-center gap-1 text-sm">
            <span>Data started at:</span>
            <span class="font-semibold">{formatDate(dataStartedAt)}</span>
          </div>
        </div>
      </svelte:fragment>
    </EnergyChart>
  </div>
</div>
