<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BarSeriesOption } from 'echarts';
  import type { TimeSerie, Units, Aggregations } from '~/utils/timeseries';
  import type {
    ChartClick,
    TimeSerieBarClick
  } from '~/components/apache-echarts/energy-use-case/charts/common';
  import type { ChartOptions, ChartDataZoomOptions } from './BaseColumnsChart';
  import type { CallbackDataParams, EnergyChartTypes } from './types';

  import { untrack } from 'svelte';
  import { Unit, Aggregation } from '~/utils/timeseries';
  import {
    DEFAULT_MAXIMUM_FRACTION_DIGITS,
    formatDate,
    formatWeekdayHour,
    formatMonth,
    formatNumber
  } from '~/utils/format';

  import {
    COLOR_DEFAULT,
    DEFAULT_TIMESERIE_CLICK,
    DEFAULT_MARKLINE_SYMBOL
  } from '~/components/apache-echarts/energy-use-case/charts/common';

  import BaseColumnsChart from './BaseColumnsChart';
  import DisplayTotal from './DisplayTotal.svelte';
  import { EnergyChartType } from './types';

  //--------------------------------------------------------------------------//

  type ColorProp = string | string[];
  type LabelProp = string[] | string;
  type DataZoomOptionsProp = ChartDataZoomOptions | undefined;

  //---//

  type TotalValues = [number, number];

  //--------------------------------------------------------------------------//

  interface EnergyChartProps {
    type?: EnergyChartTypes;
    showAverageMarkline?: boolean;

    unit?: Units;
    aggregation?: Aggregations;

    maximumFractionDigits?: number;
    dataZoomOptions?: DataZoomOptionsProp;

    color?: ColorProp;

    timeseries?: TimeSerie[];

    labels?: LabelProp;

    onclick?: TimeSerieBarClick;

    headerActions?: Snippet;
    footer?: Snippet;
    tooltip?: Snippet<[CallbackDataParams[]]>;
  }

  let {
    type = EnergyChartType.PLAIN,
    showAverageMarkline = false,

    unit = Unit.UNDEFINED,
    aggregation = Aggregation.UNDEFINED,
    maximumFractionDigits = DEFAULT_MAXIMUM_FRACTION_DIGITS,

    dataZoomOptions,

    color = COLOR_DEFAULT,

    timeseries = [],

    labels = ['Consumption', 'Exceedance'],

    onclick = DEFAULT_TIMESERIE_CLICK,

    headerActions,
    footer,
    tooltip
  }: EnergyChartProps = $props();

  //--------------------------------------------------------------------------//

  let isDrilldownEnabled = $state<boolean>(false);

  let totalValues = $state<TotalValues>([0, NaN]);

  let chartOptions = $state<ChartOptions>({
    color: [],
    categories: [],
    series: []
    // xAxisLabelFormatter
    // tooltipFormatter
    // dataZoomLabelFormatter
    // dataZoomOptions
  });

  let tooltipElement = $state<HTMLElement>();
  let tooltipParams = $state<CallbackDataParams[] | undefined>();

  //--------------------------------------------------------------------------//

  const updateChartOptions = (
    type: EnergyChartTypes,
    showAverageMarkline: boolean,
    unit: Units,
    aggregation: Aggregations,
    maximumFractionDigits: number,
    dataZoomOptions: DataZoomOptionsProp,
    color: ColorProp,
    timeseries: TimeSerie[]
  ) => {
    isDrilldownEnabled = canDrilldown(unit, aggregation);

    const isExceedance = type === EnergyChartType.EXCEEDANCE;
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

        acc.startedAtData.push(startedAt);

        if (isRepartition || isExceedance) {
          valueTotal += value ?? 0;
          anotherValueTotal += anotherValue ?? 0;

          acc.valueData.push(value);
          acc.anotherValueData.push(anotherValue);

          return acc;
        }

        valueTotal += value ?? 0;
        acc.valueData.push(value);

        return acc;
      },
      {
        startedAtData: [],
        valueData: [],
        anotherValueData: []
      }
    );

    chartOptions = {
      color: Array.isArray(color) ? color : [color],
      categories: data.startedAtData,
      series: []
      // xAxisLabelFormatter
      // tooltipFormatter
      // dataZoomLabelFormatter
      // dataZoomOptions
    };

    if (isRepartition || isExceedance) {
      totalValues = [valueTotal, anotherValueTotal];

      const valueBarSeries: BarSeriesOption = {
        type: 'bar',
        stack: 'energy',
        name: labels[0],
        data: data.valueData
      };

      const anotherValueBarSeries: BarSeriesOption = {
        type: 'bar',
        stack: 'energy',
        name: labels[1],
        data: data.anotherValueData
      };

      chartOptions.series = [valueBarSeries, anotherValueBarSeries];
    } else {
      totalValues = [valueTotal, NaN];

      const valueBarSeries: BarSeriesOption = {
        type: 'bar',
        name: labels[0],
        data: data.valueData
      };

      chartOptions.series = [valueBarSeries];
    }

    chartOptions.series.forEach((barSeriesOption) => {
      if (showAverageMarkline) {
        let markline = barSeriesOption.markLine;

        const avgMarkline: any = {
          type: 'average',
          label: {
            fontWeight: 'bold',
            position: 'insideEndTop',
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 5,
            textBorderColor: 'white',
            textBorderWidth: 3,
            formatter: (params: any) =>
              formatNumber(params.value, maximumFractionDigits)
          }
        };

        if (markline) {
          const { symbol = DEFAULT_MARKLINE_SYMBOL, data = [] } = markline;

          barSeriesOption.markLine = {
            symbol,
            data: [...data, avgMarkline]
          };
        } else {
          barSeriesOption.markLine = {
            symbol: DEFAULT_MARKLINE_SYMBOL,
            data: [avgMarkline]
          };
        }
      }

      barSeriesOption.cursor = isDrilldownEnabled ? 'zoom-in' : 'default';
    });

    // TODO: remove
    console.log('EnergyChart.updateChartOptions', {
      type,
      showAverageMarkline,
      unit,
      aggregation,
      maximumFractionDigits,

      timeseries,

      isDrilldownEnabled,

      isExceedance,

      data
    });

    //---//

    let formatAxisLabel = formatWeekdayHour;

    switch (aggregation) {
      case Aggregation.MONTH:
        formatAxisLabel = formatMonth;
        break;
      case Aggregation.WEEK:
        formatAxisLabel = formatDate;
        break;
      case Aggregation.DAY:
        formatAxisLabel = formatDate;
        break;
    }

    chartOptions.xAxisLabelFormatter = formatAxisLabel;

    chartOptions.tooltipFormatter = (params) => {
      tooltipParams = params as CallbackDataParams[];
      return tooltipElement!;
    };

    chartOptions.dataZoomLabelFormatter = (_, value) => formatAxisLabel(value);
    chartOptions.dataZoomOptions = dataZoomOptions;
  };

  $effect(() => {
    const currentType = type;
    const currentShowAverageMarkline = showAverageMarkline;
    const currentUnit = unit;
    const currentAggregation = aggregation;
    const currentMaximumFractionDigits = maximumFractionDigits;
    const currentDataZoomOptions = dataZoomOptions;
    const currentColor = color;
    const currentTimeseries = timeseries;

    untrack(() => {
      updateChartOptions(
        currentType,
        currentShowAverageMarkline,
        currentUnit,
        currentAggregation,
        currentMaximumFractionDigits,
        currentDataZoomOptions,
        currentColor,
        currentTimeseries
      );
    });
  });

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

  const onChartClick: ChartClick = (event) => {
    if (!event.data) {
      return;
    }

    onclick(timeseries[event.dataIndex]);
  };
</script>

<div class="flex min-h-full grow flex-col gap-2">
  <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-between">
    <div class="flex justify-center gap-4 md:items-center md:justify-start">
      {#if Array.isArray(labels)}
        {#each labels as label, index (index)}
          {@const totalValue = totalValues[index]}

          {#if !isNaN(totalValue)}
            <DisplayTotal
              {label}
              value={totalValues[index]}
              valueColor={getColor(index)}
              {unit}
              {maximumFractionDigits}
            />
          {/if}
        {/each}
      {:else}
        <DisplayTotal
          label={getLabel(0)}
          value={totalValues[0]}
          valueColor={getColor(0)}
          {unit}
          {maximumFractionDigits}
        />
      {/if}
    </div>

    <div>{@render headerActions?.()}</div>
  </div>

  <div class="relative min-h-[200px] grow">
    <div class="absolute top-0 right-0 bottom-0 left-0">
      <BaseColumnsChart {chartOptions} onclick={onChartClick} />
    </div>
  </div>

  {@render footer?.()}

  {#if tooltip && tooltipParams !== undefined}
    <div style="display: none">
      <div bind:this={tooltipElement}>
        {@render tooltip(tooltipParams)}
      </div>
    </div>
  {/if}
</div>
