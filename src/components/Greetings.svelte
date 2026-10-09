<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    message?: string;
    children?: Snippet;
  }

  const { message = 'Hello world!', children }: Props = $props();
</script>

<div class="grettings">
  {#if children}
    {@render children()}
  {:else}
    {message}
  {/if}
</div>

<style lang="postcss">
  /*
    https://tailwindcss.com/docs/functions-and-directives#reference-directive
  */
  @reference "tailwindcss";

  .grettings {
    @apply p-2 italic;
  }
</style>
