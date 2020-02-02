<template>
  <div class="switcher">
    <button
      @click="select(0)"
      :class="{active: selectedOption == 0}"
      class="option"
      ref="option1"
    >{{option1}}</button>
    <button
      @click="select(1)"
      :class="{active: selectedOption == 1}"
      class="option"
      ref="option2"
    >{{option2}}</button>
    <span class="switcher-mark" :style="markStyle"></span>
  </div>
</template>

<script>
export default {
  name: "Switcher",
  props: ["option1", "option2"],
  data() {
    return {
      selectedOption: 0,
      widths: [0, 0]
    };
  },
  methods: {
    select(option) {
      this.selectedOption = option;
      this.$emit("switch", option);
    }
  },
  computed: {
    markStyle() {
      return `
        width: ${this.widths[this.selectedOption]}px;
        left: ${this.selectedOption === 0 ? 0 : this.widths[0]}px;
      `;
    }
  },
  mounted() {
    this.widths = [
      this.$refs.option1.offsetWidth,
      this.$refs.option2.offsetWidth
    ];
  }
};
</script>

<style lang="scss">
.switcher {
  box-shadow: inset 0 0 0 1px hsla(0, 0%, 100%, 0.3);
  @apply relative inline-block bg-gray-100 rounded-full border-gray-400 border mt-2 mb-6;
  button.option {
    padding: 6px 16px;
    z-index: 1;
    @apply relative text-gray-600 rounded-full;
    &.active {
      @apply text-gray-800;
    }
    &:hover:not(.active) {
      @apply bg-gray-200 text-gray-800;
    }
  }
  span.switcher-mark {
    position: absolute;
    top: 0;
    bottom: 0;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 24px;
    transition: all 0.3s;
    z-index: 0;
    @apply border-2 border-blue-700;
  }
}
</style>
