<template>
  <div class="flex justify-between items-center bg-gray-700 py-3 px-4 w-3/4">
    <h2 v-if="title" class="ml-2 font-bold text-xl text-gray-200">{{title}}</h2>

    <div class="flex justify-center">
      <input-group
        class="flex-1"
        size="small"
        style="max-width: 400px;"
        v-model="searchQuery"
        placeholder="חפש בכל התורה כולה"
        @change="$emit('get-text', searchQuery)"
        @keyup.enter="$emit('get-text', searchQuery)"
      />
      <ui-button @click.native="$emit('get-text', searchQuery)" class="mr-1">חפש</ui-button>
    </div>
    <div class="actions flex">
      <icon
        v-if="prev"
        @click.native="$emit('get-text', prev)"
        class="text-4xl py-1 ml-2 cursor-pointer transform rotate-180"
        icon="arrowCircleRight"
      />
      <icon
        v-if="next"
        @click.native="$emit('get-text', next)"
        class="text-4xl py-1 cursor-pointer"
        icon="arrowCircleRight"
      />
    </div>
  </div>
</template>

<script>
import UiButton from "@/components/UI/UiButton";
import InputGroup from "@/components/UI/InputGroup";
import Icon from "@/components/UI/Icon";

export default {
  name: "ControlPanel",
  props: ["title", "next", "prev"],
  components: {
    UiButton,
    InputGroup,
    Icon
  },
  data() {
    return {
      searchQuery: "sukkah 23a"
    };
  },
  created() {
    this.$emit("get-text", this.searchQuery);
  }
};
</script>

<style>
</style>
