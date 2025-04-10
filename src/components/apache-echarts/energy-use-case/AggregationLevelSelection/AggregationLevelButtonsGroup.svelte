<script lang="ts">
  import type { AggregationLevelButtonsGroupItem } from './types';

  import AggregationLevelButton from './AggregationLevelButton.svelte';

  export let label: string;
  export let list: AggregationLevelButtonsGroupItem[];
</script>

{#if list.length > 0}
  <ul class="flex-inline flex items-center gap-1">
    <span class="font-semibold">{label}</span>

    {#each list as item, index (index)}
      {#if index > 0}<span>/</span>{/if}

      <li>
        <AggregationLevelButton
          isSelected={item.isSelected}
          onclick={item.onclick}>{item.label}</AggregationLevelButton
        >
      </li>
    {/each}
  </ul>
{/if}
