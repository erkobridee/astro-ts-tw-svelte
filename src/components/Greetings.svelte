<script lang="ts">
  export let message = 'Hello world!';
</script>

<div class="grettings">
  <slot>{message}</slot>
</div>

<style lang="postcss">
  .grettings {
    @apply italic;
  }
</style>
