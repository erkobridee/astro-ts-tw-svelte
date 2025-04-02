<script lang="ts">
   

  import type {
    ReferencePower,
    TimeSerie,
    Units,
    Aggregations
  } from '~/utils/timeseries';
  import type {
    ChartClick,
    TimeSerieBarClick,
    MarkLineOptions
  } from '~/components/apache-echarts/energy-use-case/charts/common';
  import type { ChartOptions } from './BaseColumnsChart.svelte';

  import { Unit, Aggregation } from '~/utils/timeseries';
  import { DEFAULT_MAXIMUM_FRACTION_DIGITS } from '~/utils/format';

  import {
    COLOR_DEFAULT,
    DEFAULT_TIMESERIE_CLICK,
    DEFAULT_MARKLINE_OPTIONS
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import BaseColumnsChart from './BaseColumnsChart.svelte';
  import DisplayTotal from './DisplayTotal.svelte';

  //--------------------------------------------------------------------------//

  type ReferencePowerProp = ReferencePower[] | ReferencePower | undefined;
  type LabelProps = string[] | string;

  type TotalValues = [number, number];

  //--------------------------------------------------------------------------//

  export let unit: Units = Unit.UNDEFINED;
  export let aggregation: Aggregations = Aggregation.UNDEFINED;
  export let maximumFractionDigits: number = DEFAULT_MAXIMUM_FRACTION_DIGITS;

  export let color: string | string[] = COLOR_DEFAULT;

  export let timeseries: TimeSerie[] = [];

  // add a mark line on the first bar series ( related to TimeSerie.value )
  export let referencePower: ReferencePowerProp = undefined;
  /** Apache ECharts Mark Line configuration */
  export let referencePowerOptions: MarkLineOptions = DEFAULT_MARKLINE_OPTIONS;

  export let labels: LabelProps = ['Consumption', 'Exceedance'];

  export let onclick: TimeSerieBarClick = DEFAULT_TIMESERIE_CLICK;

  //--------------------------------------------------------------------------//

  let isDrilldownEnabled = false;

  let totalValues: TotalValues = [0, NaN];

  let chartOptions: ChartOptions = {
    categories: [],
    series: []

    // xAxisLabelFormatter
    // tooltipFormatter
  };

  //--------------------------------------------------------------------------//

  $: updateChartOptions(
    unit,
    aggregation,
    //maximumFractionDigits,
    timeseries,
    referencePower,
    referencePowerOptions
  );

  const updateChartOptions = (
    unit: Units,
    aggregation: Aggregations,
    //maximumFractionDigits: number,
    timeseries: TimeSerie[],
    referencePower: ReferencePowerProp,
    referencePowerOptions: MarkLineOptions
  ) => {
    isDrilldownEnabled = canDrilldown(unit, aggregation);

    // TODO: remove
    console.log('EnergyChart.updateChartOptions', {
      unit,
      aggregation,
      //maximumFractionDigits,

      timeseries,

      isDrilldownEnabled,

      referencePower,
      referencePowerOptions
    });

    // TODO: define the code logic
  };

  //--------------------------------------------------------------------------//

  const canDrilldown = (unit: string, aggregation: string) => {
    switch (unit) {
      case Unit.M3:
        return !(
          [
            Aggregation.HOUR,
            Aggregation.MINUTES,
            Aggregation.UNDEFINED
          ] as string[]
        ).includes(aggregation);
      case Unit.KW:
      case Unit.KWH:
        return !(
          [Aggregation.MINUTES, Aggregation.UNDEFINED] as string[]
        ).includes(aggregation);
      default:
        return false;
    }
  };

  const getLabel = (index = 0): string =>
    Array.isArray(labels) ? (labels[index] ?? '') : labels;

  const getColor = (index = 0): string => {
    let labelColor = COLOR_DEFAULT;
    if (color) {
      labelColor = Array.isArray(color)
        ? (color[index] ?? COLOR_DEFAULT)
        : index === 0
          ? color
          : COLOR_DEFAULT;
    }
    return labelColor;
  };

  //--------------------------------------------------------------------------//

  // TODO: review
  const onChartClick: ChartClick = (event) => {
    console.log('EnergyChart.onChartClick', {
      isDrilldownEnabled,
      event
    });

    if (!event.data) {
      return;
    }

    onclick(timeseries[event.dataIndex]);
  };
</script>

<div class="flex h-full grow flex-col gap-2">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      {#if timeseries.length > 0}
        <DisplayTotal
          label={getLabel(0)}
          value={totalValues[0]}
          valueColor={getColor(0)}
          {unit}
          {maximumFractionDigits}
        />

        {#if totalValues[1]}
          <DisplayTotal
            label={getLabel(1)}
            value={totalValues[1]}
            valueColor={getColor(1)}
            {unit}
            {maximumFractionDigits}
          />
        {/if}
      {/if}
    </div>

    <div><slot /></div>
  </div>

  <div class="relative grow">
    <div class="absolute top-0 right-0 bottom-0 left-0 bg-amber-50">
      <BaseColumnsChart
        {chartOptions}
        onclick={onChartClick}
        color={getColor(0)}
      />
    </div>
  </div>
</div>
