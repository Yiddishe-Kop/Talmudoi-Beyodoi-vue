<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewbox || '0 0 24 24'"
    class="icon"
    v-html="icons[icon]"
  />
</template>

<script>
import iconSVG from "@/utils/icons.js";

export default {
  name: "Icon",
  props: ["icon", "viewbox"],
  data() {
    return {
      icons: iconSVG
    };
  }
};
</script>

<style lang="scss">
svg.icon {
  display: inline-block;
  height: 1em;
  transition: all 0.25s ease;
  .primary {
    @apply text-gray-400;
    fill: currentColor;
    transition: fill 0.25s ease-in;
  }
  .secondary {
    fill: currentColor;
    transition: fill 0.25s ease-in;
  }
}
</style>
