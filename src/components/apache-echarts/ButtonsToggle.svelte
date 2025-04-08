<script lang="ts" context="module">
  // https://v4.svelte.dev/tutorial/group-inputs

  export interface ButtonToggle {
    label: string;
    value: string;
    disabled?: boolean;
  }

  export type ButtonToggleChange = (_value: string) => void;

  const DEFAULT_BUTTON_TOGGLE_CHANGE = () => undefined;
</script>

<script lang="ts">
  import cn from '~/utils/cn';

  export let name: string;
  export let selected: string;
  export let disabled: boolean = false;
  export let list: ButtonToggle[];

  export let onchange: ButtonToggleChange = DEFAULT_BUTTON_TOGGLE_CHANGE;

  $: lastIndex = list.length - 1;

  const baseInputRadioClass =
    'bg-gray-300 px-4 py-1 peer-checked:bg-blue-300 peer-disabled:opacity-50';

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
        on:input={innerButtonToggleChange}
      />

      <span
        class={cn(baseInputRadioClass, {
          'rounded-l-md': index === 0,
          'rounded-r-md': index === lastIndex
        })}>{item.label}</span
      >
    </label>
  {/each}
</div>
