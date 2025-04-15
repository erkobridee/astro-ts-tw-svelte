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

<div class="flex flex-col md:flex-row md:items-baseline md:gap-2">
  <span class="text-base text-gray-900">{label}</span>

  <div class="flex items-baseline gap-0.5 md:gap-1.5">
    <span class="text-xl tabular-nums" style="color: {valueColor};">
      {formatNumber(value, maximumFractionDigits)}
    </span>

    {#if unit}<span class="text-sm text-gray-500">{unit}</span>{/if}
  </div>
</div>
