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

  import { untrack } from 'svelte';

  import EnergyChart from '~/components/apache-echarts/energy-use-case/charts/EnergyChart';
  import EnergyChartTooltip from '~/components/apache-echarts/energy-use-case/charts/EnergyChart/EnergyChartTooltip.svelte';
  import AggregationLevelSelection, {
    AggregationLevelSelectionLayout
  } from '~/components/apache-echarts/energy-use-case/AggregationLevelSelection';
  import Toggle from '~/components/apache-echarts/Toggle';

  import { COLOR_GAS_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { EnergyType, Unit, Aggregation } from '~/utils/timeseries';
  import { formatDate, formatDayStringId } from '~/utils/format';

  //--------------------------------------------------------------------------//

  interface GasConsumptionProps {
    data: GasConsumptionData;
  }

  let { data }: GasConsumptionProps = $props();

  //---//

  let aggregation = $state<Aggregations>(Aggregation.MONTH);
  let aggregationSelectionLayout = $state<AggregationLevelSelectionLayouts>(
    AggregationLevelSelectionLayout.YEAR
  );

  let showAverage = $state<boolean>(false);

  let dataStartedAt = $state<string>('');
  let timeseries = $state<TimeSerie[]>([]);

  const unit = Unit.M3;

  //---//

  const updateTimeseries = (data: GasConsumptionData) => {
    aggregation = Aggregation.MONTH;
    aggregationSelectionLayout = AggregationLevelSelectionLayout.YEAR;
    timeseries = data.months;
    dataStartedAt = timeseries[0].startedAt;

    // TODO: remove
    console.log('EnergyChart.updateTimeseries ', {
      aggregation,
      aggregationSelectionLayout,
      timeseries,
      dataStartedAt
    });
  };

  $effect(() => {
    if (!data) return;

    const currentData = data;

    untrack(() => {
      updateTimeseries(currentData);
    });
  });

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
      {unit}
      {timeseries}
      {aggregation}
    >
      {#snippet headerActions()}
        <AggregationLevelSelection
          {aggregation}
          energyType={EnergyType.GAS}
          layout={aggregationSelectionLayout}
          onclick={onAggregationLevelSelectionClick}
        />
      {/snippet}

      {#snippet footer()}
        <div
          class="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0"
        >
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
      {/snippet}

      {#snippet tooltip(params)}
        {#if params !== undefined}
          {@const dataIndex = params[0]?.dataIndex}

          {#if timeseries.length > dataIndex}
            {@const currentItem = timeseries[dataIndex]}

            <EnergyChartTooltip {params} {currentItem} {aggregation} {unit} />
          {/if}
        {/if}
      {/snippet}
    </EnergyChart>
  </div>
</div>
