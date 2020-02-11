<template>
  <div class="mb-3" @mouseenter="hover = true" @mouseleave="hover = false">
    <h2
      class="cursor-pointer relative font-bold text-right leading-snug text-lg rounded-t select-none hover:bg-gray-300 px-2 py-1"
      :class="{'bg-blue-200 hover:bg-blue-200 text-blue-700': !collapsed, 'bg-gray-200': collapsed}"
      @click="collapsed = !collapsed"
    >
      {{ title }}
      <transition name="slideUp">
        <icon
          v-show="hover"
          @click.native="$emit('open-link')"
          class="absolute left-0 ml-2 text-2xl"
          icon="arrowCircleRight"
        />
      </transition>
    </h2>
    <div
      class="text px-4 text-sm border-b bg-gray-200 border-gray-500"
      :style="contentStyle"
      ref="content"
    >
      <div class="list">
        <p
          v-for="(text, i) in commentary"
          :key="text.id"
          :dir="text.he.length ? 'rtl' : 'ltr'"
          :class="{'border-b' : i < commentary.length - 1}"
          class="border-gray-400"
          v-html="text.he.length ? text.he : text.en"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/UI/Icon";

export default {
  name: "Commentary",
  props: ["title", "commentary"],
  components: { Icon },
  data() {
    return {
      collapsed: true,
      hover: false
    };
  },
  computed: {
    contentStyle() {
      if (this.collapsed) {
        return `
          max-height: 0;
        `;
      } else {
        return `
          max-height: ${this.$refs.content.scrollHeight + 12}px;
          padding-top: 6px;
          padding-bottom: 6px;
        `;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  overflow: hidden;
  transition: all 0.2s ease-out;
}
</style>
