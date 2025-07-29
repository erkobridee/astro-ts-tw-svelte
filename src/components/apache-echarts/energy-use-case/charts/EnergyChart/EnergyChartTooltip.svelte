<script lang="ts">
  import type { CallbackDataParams } from 'echarts/types/dist/shared';
  import type { TimeSerie, Units, Aggregations } from '~/utils/timeseries';

  import { Aggregation } from '~/utils/timeseries';
  import {
    DEFAULT_MAXIMUM_FRACTION_DIGITS,
    formatDateTime,
    formatDate,
    formatMonth,
    formatNumber
  } from '~/utils/format';

  //--------------------------------------------------------------------------//

  const dlContainerClass = 'flex gap-5';
  const dlContainerDdClass = 'w-full inline-flex justify-end items-baseline';

  //--------------------------------------------------------------------------//

  export let params: CallbackDataParams[];
  export let aggregation: Aggregations;
  export let currentItem: TimeSerie;
  export let unit: Units;
  export let showTotal: boolean = false;

  let formatTooltipHeaderFn = (timeserie: TimeSerie) =>
    formatDateTime(timeserie.startedAt);

  const onAggregation = (aggregation: Aggregations) => {
    switch (aggregation) {
      case Aggregation.MONTH:
        formatTooltipHeaderFn = (timeserie: TimeSerie) =>
          formatMonth(timeserie.startedAt);
        return;
      case Aggregation.WEEK:
        formatTooltipHeaderFn = (timeserie: TimeSerie) =>
          `${formatDate(timeserie.startedAt)} - ${formatDate(timeserie.endedAt)}`;
        return;
      case Aggregation.DAY:
        formatTooltipHeaderFn = (timeserie: TimeSerie) =>
          formatDate(timeserie.startedAt);
        return;
    }
  };
  $: onAggregation(aggregation);

  $: total = showTotal
    ? params.map((item) => item.value as number).reduce((a, v) => a + v, 0)
    : 0;
</script>

<div class="mb-1 inline-flex w-full justify-between gap-2">
  <span>{formatTooltipHeaderFn(currentItem)}</span>
</div>

<dl class="m-0">
  {#each params.reverse() as item, index (index)}
    {@const color = item.color}
    {@const seriesName = item.seriesName}
    {@const value = Number(item.value)}

    <div class={dlContainerClass}>
      <dt>
        {#if color}
          <span
            class="me-1 inline-block size-2.5 rounded-full"
            style="background-color:{color};"
          ></span>
        {/if}

        {#if seriesName}
          <span>{seriesName}</span>
        {/if}
      </dt>

      <dd class={dlContainerDdClass}>
        {#if isNaN(Number(value))}
          -
        {:else}
          <span class="font-semibold tabular-nums">
            {formatNumber(value, DEFAULT_MAXIMUM_FRACTION_DIGITS)}
          </span>

          <span class="ms-0.5 text-xs">
            {unit}
          </span>
        {/if}
      </dd>
    </div>
  {/each}

  {#if showTotal}
    <div class="{dlContainerClass} mt-1 border-t pt-1">
      <dt></dt>

      <dd class={dlContainerDdClass}>
        {#if isNaN(total)}
          -
        {:else}
          <span class="font-semibold tabular-nums">
            {formatNumber(total, DEFAULT_MAXIMUM_FRACTION_DIGITS)}
          </span>

          <span class="ms-0.5 text-xs">
            {unit}
          </span>
        {/if}
      </dd>
    </div>
  {/if}
</dl>
