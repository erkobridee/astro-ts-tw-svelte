<script lang="ts" context="module">
  export const ToggleLayout = {
    DEFAULT: 'default',
    LABELS: 'labels'
  } as const satisfies Record<string, string>;

  export type ToggleLayoutKeys = keyof typeof ToggleLayout;
  export type ToggleLayouts = (typeof ToggleLayout)[ToggleLayoutKeys];
</script>

<script lang="ts">
  export let id = 'toggle';
  export let layout: ToggleLayouts = ToggleLayout.DEFAULT;

  export let checked: boolean;

  export let label: string | string[] = '';

  const getLabel = (index = 0) => {
    if (Array.isArray(label)) {
      return label[index] ?? '';
    }

    return index === 0 ? label : '';
  };
</script>

{#if layout === ToggleLayout.LABELS}
  {@const leftLabel = getLabel(0)}
  {@const rightLabel = getLabel(1)}
  <label
    for={id}
    class="inline-flex cursor-pointer items-center rounded-md text-gray-800"
  >
    <input {id} type="checkbox" class="peer hidden" bind:checked />

    <span class="rounded-l-md bg-blue-300 px-4 py-1 peer-checked:bg-gray-300"
      >{leftLabel}</span
    >
    <span class="rounded-r-md bg-gray-300 px-4 py-1 peer-checked:bg-blue-300"
      >{rightLabel}</span
    >
  </label>
{/if}

{#if layout === ToggleLayout.DEFAULT}
  {@const leftLabel = getLabel(0)}
  {@const rightLabel = getLabel(1)}
  {@const hasLeftLabel = leftLabel && rightLabel}

  <label class="inline-flex cursor-pointer items-center">
    <input {id} type="checkbox" value="" class="peer sr-only" bind:checked />

    {#if hasLeftLabel}
      <span class="mr-3 text-sm text-gray-900 dark:text-gray-300"
        >{leftLabel}</span
      >
    {/if}

    <div
      class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-500 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-500 dark:peer-focus:ring-blue-800"
    ></div>

    <span class="ms-3 text-sm text-gray-900 dark:text-gray-300"
      >{hasLeftLabel ? rightLabel : leftLabel}</span
    >
  </label>
{/if}
