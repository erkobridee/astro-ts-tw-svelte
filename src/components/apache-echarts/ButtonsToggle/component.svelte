<script lang="ts">
  // https://svelte.dev/tutorial/svelte/group-inputs

  import cn from '~/utils/cn';

  import {
    type ButtonsToggleProps,
    DEFAULT_BUTTON_TOGGLE_CHANGE
  } from './types';

  let {
    name,
    selected = $bindable(),
    disabled = false,
    list,
    onchange = DEFAULT_BUTTON_TOGGLE_CHANGE
  }: ButtonsToggleProps = $props();

  const lastIndex = $derived(list.length - 1);

  const baseInputRadioClass = cn(
    'px-4 py-1',
    'bg-gray-300 peer-checked:bg-blue-300 peer-disabled:opacity-50'
  );

  const innerButtonToggleChange = (event: Event) => {
    onchange((event.target as any)?.value);
  };
</script>

<div class="flex items-center">
  {#each list as item, index (item.value)}
    {@const isDisabled = item.disabled || disabled}

    <label
      class={cn('inline-flex items-center rounded-md text-gray-800', {
        'cursor-pointer': !isDisabled
      })}
    >
      <input
        class="peer hidden"
        type="radio"
        {name}
        bind:group={selected}
        value={item.value}
        disabled={isDisabled}
        oninput={innerButtonToggleChange}
      />

      <span
        class={cn(baseInputRadioClass, {
          'rounded-l-md': index === 0,
          'rounded-r-md': index === lastIndex
        })}>{item.label ?? item.value}</span
      >
    </label>
  {/each}
</div>
