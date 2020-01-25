<template>
  <div class="avatar" @click="$emit('click')">
    <img v-if="userImage" :src="userImage" />
    <icon v-else icon="userCircle" />
  </div>
</template>

<script>
import Icon from "@/components/UI/Icon";

export default {
  name: "Avatar",
  props: ["img"],
  components: {
    Icon
  },
  computed: {
    userImage() {
      try {
        return this.$store.state.user.photoURL;
      } catch (_) {
        return false; // default image
      }
    }
  }
};
</script>

<style lang='scss'>
.avatar {
  cursor: pointer;
  img {
    width: 44px;
    border-radius: 50%;
    border: 2px solid var(--grey);
    @apply bg-gray-200;
  }
  .icon {
    @apply cursor-pointer;
    font-size: 32px;
  }
}
</style>
