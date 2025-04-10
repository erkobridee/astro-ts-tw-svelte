<script lang="ts">
  import {
    DEFAULT_MAXIMUM_FRACTION_DIGITS,
    formatNumber
  } from '~/utils/format';

  import { LABEL_COLOR } from '~/components/apache-echarts/energy-use-case/charts/common';

  export let label: string;
  export let value: number;
  export let valueColor: string = LABEL_COLOR;
  export let unit: string | undefined;
  export let maximumFractionDigits: number = DEFAULT_MAXIMUM_FRACTION_DIGITS;
</script>

<div class="flex flex-col md:flex-row md:items-center md:gap-2">
  <span>{label}</span>

  <div class="text-sm font-semibold" style="color: {valueColor};">
    <span class="text-sm tabular-nums"
      >{formatNumber(value, maximumFractionDigits)}</span
    >

    {#if unit}<span>{unit}</span>{/if}
  </div>
</div>
