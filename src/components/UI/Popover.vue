<template>
  <div class="popover absolute rounded-lg shadow-lg bg-white p-6">
    <slot />
    <key-press :key-code="27" @pressed="$emit('close')" />
  </div>
</template>

<script>
import KeyPress from "@/components/UI/KeyPress";

export default {
  name: "Popover",
  components: { KeyPress }
};
</script>

<style>
</style>
