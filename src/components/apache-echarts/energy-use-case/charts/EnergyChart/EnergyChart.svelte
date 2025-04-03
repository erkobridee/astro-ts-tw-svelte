<script lang="ts" context="module">
  export const EnergyChartType = {
    PLAIN: 'PLAIN',
    REPARTITION: 'REPARTITION'
  } as const satisfies Record<string, string>;

  export type EnergyChartTypeKeys = keyof typeof EnergyChartType;
  export type EnergyChartTypes = (typeof EnergyChartType)[EnergyChartTypeKeys];
</script>

<script lang="ts">
  import type { BarSeriesOption } from 'echarts';
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
  import {
    DEFAULT_MAXIMUM_FRACTION_DIGITS,
    formatDateTime,
    formatWeekdayHour,
    formatNumber
  } from '~/utils/format';

  import {
    COLOR_DEFAULT,
    DEFAULT_TIMESERIE_CLICK,
    DEFAULT_MARKLINE_OPTIONS
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import BaseColumnsChart from './BaseColumnsChart.svelte';
  import DisplayTotal from './DisplayTotal.svelte';

  //--------------------------------------------------------------------------//

  type ColorProp = string | string[];
  type ReferencePowerProp = ReferencePower[] | ReferencePower | undefined;
  type LabelProp = string[] | string;

  //---//

  type TotalValues = [number, number];

  //--------------------------------------------------------------------------//

  export let type: EnergyChartTypes = EnergyChartType.PLAIN;

  export let unit: Units = Unit.UNDEFINED;
  export let aggregation: Aggregations = Aggregation.UNDEFINED;
  export let maximumFractionDigits: number = DEFAULT_MAXIMUM_FRACTION_DIGITS;

  export let color: ColorProp = COLOR_DEFAULT;

  export let timeseries: TimeSerie[] = [];

  // add a mark line on the first bar series ( related to TimeSerie.value )
  export let referencePower: ReferencePowerProp = undefined;
  /** Apache ECharts Mark Line configuration */
  export let referencePowerOptions: MarkLineOptions = DEFAULT_MARKLINE_OPTIONS;

  export let labels: LabelProp = ['Consumption', 'Exceedance'];

  export let onclick: TimeSerieBarClick = DEFAULT_TIMESERIE_CLICK;

  //--------------------------------------------------------------------------//

  let isDrilldownEnabled = false;

  let totalValues: TotalValues = [0, NaN];

  let chartOptions: ChartOptions = {
    color: [],
    categories: [],
    series: []
    // xAxisLabelFormatter
    // tooltipFormatter
  };

  //--------------------------------------------------------------------------//

  $: updateChartOptions(
    type,
    unit,
    aggregation,
    maximumFractionDigits,
    color,
    timeseries,
    referencePower,
    referencePowerOptions
  );

  const updateChartOptions = (
    type: EnergyChartTypes,
    unit: Units,
    aggregation: Aggregations,
    maximumFractionDigits: number,
    color: ColorProp,
    timeseries: TimeSerie[],
    referencePower: ReferencePowerProp,
    referencePowerOptions: MarkLineOptions
  ) => {
    isDrilldownEnabled = canDrilldown(unit, aggregation);

    const hasReferencePower = !!referencePower;
    const isRepartition = type === EnergyChartType.REPARTITION;

    let valueTotal = 0;
    let anotherValueTotal = 0;

    // startedAtData -> xAxis.data
    // valueData -> series[0].data
    // anotherValueData -> series[1].data
    const data = timeseries.reduce<{
      startedAtData: string[];
      valueData: number[];
      anotherValueData: number[];
    }>(
      (acc, item) => {
        const { startedAt, value = NaN, anotherValue = NaN } = item;

        valueTotal += value ?? 0;
        anotherValueTotal += anotherValue ?? 0;

        acc.startedAtData.push(startedAt);

        if (isRepartition) {
          acc.valueData.push(value);
          acc.anotherValueData.push(anotherValue);
          return acc;
        }

        /*
        if(hasReferencePower) {
          // TODO: calculate the exceedance using the referencePower
        }
        */

        acc.valueData.push(value);

        return acc;
      },
      {
        startedAtData: [],
        valueData: [],
        anotherValueData: []
      }
    );

    chartOptions.color = Array.isArray(color) ? color : [color];
    chartOptions.categories = data.startedAtData;

    if (isRepartition || hasReferencePower) {
      totalValues = [valueTotal, anotherValueTotal];

      const valueBarSeries: BarSeriesOption = {
        type: 'bar',
        stack: 'energy',
        data: data.valueData
      };

      // if hasReferencePower is present add markLines into the valuesBarSeries
      // referencePower
      // referencePowerOptions

      const anotherValueBarSeries: BarSeriesOption = {
        type: 'bar',
        stack: 'energy',
        data: data.anotherValueData
      };

      chartOptions.series = [valueBarSeries, anotherValueBarSeries];
    } else {
      totalValues = [valueTotal, NaN];

      const valueBarSeries: BarSeriesOption = {
        type: 'bar',
        data: data.valueData
      };

      chartOptions.series = [valueBarSeries];
    }

    // TODO: remove
    console.log('EnergyChart.updateChartOptions', {
      type,
      unit,
      aggregation,
      maximumFractionDigits,

      timeseries,

      isDrilldownEnabled,

      hasReferencePower,
      referencePower,
      referencePowerOptions,

      data
    });

    if (
      (
        [Aggregation.DAY, Aggregation.HOUR, Aggregation.MINUTES] as string[]
      ).includes(aggregation)
    ) {
      chartOptions.xAxisLabelFormatter = formatWeekdayHour;
      chartOptions.tooltipFormatter = (params) => {
        const paramsArray = params as any[];

        let timeserie = timeseries[paramsArray[0].dataIndex];

        let content = '';

        content += `<div>${formatDateTime(timeserie.startedAt)}</div>`;

        paramsArray.forEach((item) => {
          timeserie = timeseries[item.dataIndex];

          content += `
            <div>
              <span style="display:inline-block;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>
              <span style="float:right;margin-left:20px;font-weight:600">${formatNumber(item.value, maximumFractionDigits)} ${unit}</span>
            </div>
          `;
        });
        return content;
      };
    }

    // TODO: define the formatters for others aggregations
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

    <div><slot name="headerActions" /></div>
  </div>

  <div class="relative grow">
    <div class="absolute top-0 right-0 bottom-0 left-0">
      <BaseColumnsChart {chartOptions} onclick={onChartClick} />
    </div>
  </div>

  {#if $$slots.footer}
    <slot name="footer" />
  {/if}
</div>
