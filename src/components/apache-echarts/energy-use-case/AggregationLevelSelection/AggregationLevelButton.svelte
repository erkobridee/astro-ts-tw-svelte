<script lang="ts">
  import type { AggregationLevelButtonClick } from './types';

  import cn from '~/utils/cn';

  export let isSelected: boolean = false;
  export let onclick: AggregationLevelButtonClick;

  const buttonClass = `
    rounded-md border border-slate-300
    px-2 py-1
    text-center text-sm
    transition-all shadow-sm hover:shadow-lg
    text-slate-700
    cursor-pointer
    hover:text-white hover:bg-blue-500 hover:border-blue-500 hover:bg-blue-500
    focus:text-white focus:bg-blue-500 focus:border-blue-500 focus:bg-blue-500
    active:border-blue-500 active:text-white active:bg-blue-500
    disabled:pointer-events-none disabled:shadow-none disabled:border-transparent
  `;
</script>

<button
  type="button"
  class={cn(buttonClass, $$props.class)}
  disabled={isSelected || $$props.disabled}
  on:click={onclick}
  {...$$restProps}
>
  <slot />
</button>
