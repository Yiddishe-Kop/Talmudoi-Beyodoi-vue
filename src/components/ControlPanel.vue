<template>
  <div class="bg-gray-700 py-3 px-10">
    <div class="flex">
      <input-group
        class="flex-1"
        size="small"
        v-model="searchQuery"
        placeholder="חפש בכל התורה כולה"
        @change="$emit('get-text', searchQuery)"
        @keyup.enter="$emit('get-text', searchQuery)"
      />
      <ui-button @click.native="$emit('get-text', searchQuery)" class="mr-1">חפש</ui-button>
    </div>
  </div>
</template>

<script>
import UiButton from "@/components/UI/UiButton";
import InputGroup from "@/components/UI/InputGroup";

export default {
  name: "ControlPanel",
  components: {
    UiButton,
    InputGroup
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
