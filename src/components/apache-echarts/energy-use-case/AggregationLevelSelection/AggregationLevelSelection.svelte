<script lang="ts">
  import type { Aggregations } from '~/utils/timeseries';
  import type { AggregationLevelSelectionClick } from './types';

  import AggregationLevelButton from './AggregationLevelButton.svelte';

  import { Aggregation } from '~/utils/timeseries';

  export let aggregation: Aggregations;
  export let isYearLevel: boolean = false;
  export let showMinutes: boolean = false;
  export let onclick: AggregationLevelSelectionClick;

  const onInnerClick = (selectedAggregation: Aggregations) => (_: Event) =>
    onclick(selectedAggregation, isYearLevel);
</script>

<div class="flex-inline flex items-center gap-4">
  <ul class="flex-inline mr-2 flex items-center gap-1">
    <span class="font-semibold">Year:</span>

    <li>
      <AggregationLevelButton
        isSelected={isYearLevel && aggregation === Aggregation.MONTH}
        onclick={onInnerClick(Aggregation.MONTH)}>Months</AggregationLevelButton
      >
    </li>
    <li><span>/</span></li>
    <li>
      <AggregationLevelButton
        isSelected={isYearLevel && aggregation === Aggregation.WEEK}
        onclick={onInnerClick(Aggregation.WEEK)}>Weeks</AggregationLevelButton
      >
    </li>
  </ul>

  {#if !isYearLevel}
    <ul class="flex-inline flex items-center gap-1">
      <span class="font-semibold">Month:</span>

      <li>
        <AggregationLevelButton
          isSelected={aggregation === Aggregation.WEEK}
          onclick={onInnerClick(Aggregation.WEEK)}>Weeks</AggregationLevelButton
        >
      </li>

      <span>/</span>
      <li>
        <AggregationLevelButton
          isSelected={aggregation === Aggregation.DAY}
          onclick={onInnerClick(Aggregation.DAY)}>Days</AggregationLevelButton
        >
      </li>

      {#if !showMinutes}
        <span>/</span>
        <li>
          <AggregationLevelButton
            isSelected={aggregation === Aggregation.HOUR}
            onclick={onInnerClick(Aggregation.HOUR)}
            >Hours</AggregationLevelButton
          >
        </li>
      {/if}
    </ul>

    {#if showMinutes}
      <ul class="flex-inline flex items-center gap-1">
        <span class="font-semibold">Day:</span>

        <li>
          <AggregationLevelButton
            isSelected={aggregation === Aggregation.HOUR}
            onclick={onInnerClick(Aggregation.HOUR)}
            >Hours</AggregationLevelButton
          >
        </li>

        <span>/</span>
        <li>
          <AggregationLevelButton
            isSelected={aggregation === Aggregation.MINUTES}
            onclick={onInnerClick(Aggregation.MINUTES)}
            >Minutes</AggregationLevelButton
          >
        </li>
      </ul>
    {/if}
  {/if}
</div>
