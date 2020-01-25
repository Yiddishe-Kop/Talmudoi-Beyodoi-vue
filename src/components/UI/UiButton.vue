<template>
  <button :class="[classes, {cta: cta}]">
    <Icon v-if="iconBefore" :icon="iconBefore" :viewbox="viewbox" />
    <slot />
    <Icon v-if="icon" :icon="icon" :viewbox="viewbox" />
  </button>
</template>

<script>
import Icon from "@/components/UI/Icon";
export default {
  name: "UiButton",
  props: {
    icon: String,
    iconBefore: String,
    cta: Boolean,
    classes: String,
    viewbox: String
  },
  components: { Icon }
};
</script>

<style lang="scss" scoped>
button {
  @apply flex items-center py-2 px-4 bg-gray-700 text-gray-100 rounded;
  &.cta {
    @apply bg-brand;
  }
  svg {
    margin-inline-start: 6px;
  }
  svg:first-child {
    margin-inline-start: 0px;
    margin-inline-end: 6px;
  }
}
</style>
