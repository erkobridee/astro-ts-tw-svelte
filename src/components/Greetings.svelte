<script lang="ts">
  export let message = 'Hello world!';
</script>

<div class="italic">
  <slot>{message}</slot>
</div>
