<script lang="ts">
  export let message = 'Hello world!';
</script>

<div class="grettings">
  <slot>{message}</slot>
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
