<template>
  <div class="input-group">
    <label :for="name">{{name}}</label>
    <input
      @input="$emit('input', $event.target.value)"
      :value="value"
      type="text"
      :id="name"
      :placeholder="placeholder"
      :class="[size, validation]"
    />
  </div>
</template>

<script>
export default {
  name: "InputGroup",
  props: {
    name: String,
    placeholder: String,
    value: String,
    validation: {
      type: String,
      default: "",
      validator: function(value) {
        return ["", "error", "info", "warning"].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: "medium",
      validator: function(value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      }
    }
  }
};
</script>

<style lang="scss">
.input-group {
  @apply mb-2;
  label {
    @apply block mb-1 font-semibold text-sm uppercase text-gray-800;
  }
  input {
    width: 100%;
    min-width: 240px;
    @apply text-gray-900 rounded border-2 border-solid border-gray-400;
    &::placeholder {
      @apply text-gray-400;
    }
    &:focus {
      @apply border-brand;
    }
    &.small {
      @apply text-sm p-2;
    }
    &.medium {
      @apply p-2 text-base;
    }
    &.large {
      @apply p-3 text-lg;
    }
    // validation
    &.error {
      @apply border-red-800;
    }
    &.info {
      @apply border-blue-600;
    }
    &.warning {
      @apply border-yellow-600;
    }
  }
}
</style>
