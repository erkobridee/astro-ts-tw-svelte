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
    formatDate,
    formatWeekdayHour,
    formatMonth,
    formatNumber
  } from '~/utils/format';

  import {
    COLOR_DEFAULT,
    DEFAULT_TIMESERIE_CLICK,
    DEFAULT_MARKLINE_SYMBOL,
    DEFAULT_MARKLINE_OPTIONS,
    buildTooltipBarItem
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
  export let showAverageMarkline: boolean = false;

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
    showAverageMarkline,
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
    showAverageMarkline: boolean,
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
          const exceedance = value - referencePower;

          if(exceedance > 0) {
            acc.valueData.push(referencePower);
            acc.anotherValueData.push(exceedance)
          } else {
            acc.valueData.push(value);
            acc.anotherValueData.push(0)
          }
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

      // if hasReferencePower is present add markLines
      // referencePower
      // referencePowerOptions
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

      hasReferencePower,
      referencePower,
      referencePowerOptions,

      data
    });

    //---//

    let formatAxisLabel = formatWeekdayHour;
    let formatTooltipHeaderFn = (timeserie: TimeSerie) =>
      formatDateTime(timeserie.startedAt);

    switch (aggregation) {
      case Aggregation.MONTH:
        formatAxisLabel = formatMonth;
        formatTooltipHeaderFn = (timeserie: TimeSerie) =>
          formatMonth(timeserie.startedAt);
        break;
      case Aggregation.WEEK:
        formatAxisLabel = formatDate;
        formatTooltipHeaderFn = (timeserie: TimeSerie) =>
          `${formatDate(timeserie.startedAt)} - ${formatDate(timeserie.endedAt)}`;
        break;
      case Aggregation.DAY:
        formatAxisLabel = formatDate;
        formatTooltipHeaderFn = (timeserie: TimeSerie) =>
          formatDate(timeserie.startedAt);
        break;
    }

    chartOptions.xAxisLabelFormatter = formatAxisLabel;

    chartOptions.tooltipFormatter = (params) => {
      const paramsArray = params as any[];

      let timeserie = timeseries[paramsArray[0].dataIndex];

      let total = 0;
      let content = '';

      content += `<div>${formatTooltipHeaderFn(timeserie)}</div>`;

      paramsArray.reverse().forEach((item) => {
        timeserie = timeseries[item.dataIndex];

        const value = item.value;

        total += value;

        content += buildTooltipBarItem({
          color: item.color,
          value: `${formatNumber(value, maximumFractionDigits)} ${unit}`
        });
      });

      if (isRepartition) {
        content += `<div style="padding-top: 5px;"><hr>`;
        content += `<span style="float:right;margin-left:20px;font-weight:600">${formatNumber(total, maximumFractionDigits)} ${unit}</span>`;
        content += `</div>`;
      }

      return content;
    };
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

<div class="flex min-h-full grow flex-col gap-2">
  <div
    class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0"
  >
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

  <div class="relative min-h-[300px] grow">
    <div class="absolute top-0 right-0 bottom-0 left-0">
      <BaseColumnsChart {chartOptions} onclick={onChartClick} />
    </div>
  </div>

  {#if $$slots.footer}
    <slot name="footer" />
  {/if}
</div>
