<script lang="ts">
  import type { AggregationLevelSelectionClick } from '~/components/apache-echarts/energy-use-case/AggregationLevelSelection';
  import type {
    Aggregations,
    GasConsumptionData,
    TimeSerie
  } from '~/utils/timeseries';

  import EnergyChart from '~/components/apache-echarts/energy-use-case/charts/EnergyChart/EnergyChart.svelte';
  import AggregationLevelSelection from '~/components/apache-echarts/energy-use-case/AggregationLevelSelection';
  import Toggle from '~/components/apache-echarts/Toggle.svelte';

  import { COLOR_GAS_CONSUMPTION } from '~/components/apache-echarts/energy-use-case/charts/common';

  import { Unit, Aggregation } from '~/utils/timeseries';
  import { formatDate } from '~/utils/format';

  //--------------------------------------------------------------------------//

  export let data: GasConsumptionData;

  let aggregation: Aggregations = Aggregation.MONTH;

  let isYearLevel = false;
  let showAverage = false;

  let dataStartedAt: string;
  let timeseries: TimeSerie[] = [];

  $: updateTimeseries(data);

  const updateTimeseries = (data: GasConsumptionData) => {
    aggregation = Aggregation.MONTH;
    isYearLevel = true;
    timeseries = data.months;
    dataStartedAt = formatDate(timeseries[0].startedAt);
  };

  //--------------------------------------------------------------------------//

  const onAggregationLevelSelectionClick: AggregationLevelSelectionClick = (
    selectedAggregation,
    isYearLevelClick
  ) => {
    // TODO: remove
    console.log({ selectedAggregation, isYearLevelClick });

    if (isYearLevelClick) {
      switch (selectedAggregation) {
        case Aggregation.MONTH:
          timeseries = data.months;
          break;
        case Aggregation.WEEK:
          timeseries = data.weeks;
          break;
      }

      dataStartedAt = formatDate(timeseries[0].startedAt);
      aggregation = selectedAggregation;
      isYearLevel = isYearLevelClick;

      return;
    }

    // TODO: define the code logic to select the items below the year level
  };

  const onChartClick = (timeserie: TimeSerie) => {
    console.log('GasConsumption.onChartClick timeserie:', timeserie);
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
          {isYearLevel}
          {aggregation}
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
            <span class="font-semibold">{dataStartedAt}</span>
          </div>
        </div>
      </svelte:fragment>
    </EnergyChart>
  </div>
</div>
