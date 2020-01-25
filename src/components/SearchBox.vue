<template>
  <div class="search-box" :class="[type]">
    <input-group
      v-for="(field, key) in query"
      :key="key"
      :name="key"
      :size="type == 'grid' ? 'large' : 'medium'"
      v-model="query[key]"
      placeholder="Ezras Torah"
      :validation="validation[key]"
    />
    <ui-button
      @click.native="handleSubmit"
      icon="arrowRight"
      cta
      classes="uppercase font-semibold tracking-wider"
    >search</ui-button>
  </div>
</template>

<script>
import InputGroup from "@/components/UI/InputGroup";
import UiButton from "@/components/UI/UiButton";

export default {
  name: "SearchBox",
  components: { InputGroup, UiButton },
  props: {
    initialQuery: Object,
    type: {
      type: String,
      default: "grid",
      validator: function(value) {
        return ["grid", "row"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      query: {
        where: undefined,
        guests: undefined,
        checkin: undefined,
        checkout: undefined
      },
      validation: {
        where: "",
        guests: "",
        checkin: "",
        checkout: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      for (let key in this.query) {
        if (!this.query[key]) {
          this.validation[key] = "error";
          return;
        } else {
          this.validation[key] = "";
        }
      }
      this.$emit("getapts", this.query);
    }
  },
  created() {
    for (let key in this.initialQuery) {
      this.query[key] = this.initialQuery[key];
    }
  }
};
</script>

<style lang="scss">
.search-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 8px;
  margin: 20vh auto 0;
  max-width: 760px;
  @apply bg-gray-80 relative px-6 pt-4 pb-8 rounded-lg shadow-xl;
  &.row {
    grid-template-columns: repeat(auto-fill, 1fr);
    margin: 12px 0;
    max-width: 100vw;
    @apply bg-white py-4 mb-12;
  }
  button {
    position: absolute;
    right: 24px;
    bottom: -20px;
    &:hover {
      svg {
        transform: translateX(4px);
      }
    }
  }
}
</style>
