<script lang="ts">
  import { COLOR_DEFAULT } from './common';

  export let color: string = COLOR_DEFAULT;
</script>

<div class="flex h-full w-full items-center justify-center">
  <div
    class="h-20 w-20 animate-spin rounded-full border-4 border-t-4 border-gray-200"
    style="border-top-color: {color};"
  ></div>
</div>
