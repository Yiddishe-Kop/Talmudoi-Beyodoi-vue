<template>
  <div class="flex flex-wrap" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Grid",
  props: ["align", "justify"],
  data() {
    return {
      style: {
        alignItems: this.align,
        justifyContent: this.justify
      }
    };
  }
};
</script>

<style lang="scss">
</style>
