<template>
  <header class="px-6 py-2 flex justify-between items-center bg-gray-800 shadow">
    <router-link to="/">
      <logo />
    </router-link>

    <nav class="nav">
      <router-link class="nav__link" to="/">Home</router-link>
      <router-link class="nav__link" to="/about/">About</router-link>
      <avatar @click="handleAvatarClick" />
      <transition name="slideUp">
        <popover @close="showPopover = false" v-if="showPopover" :style="`top: 75px; left: 16px;`">
          <img v-if="userImage" :src="userImage" class="w-20 h-20 mx-auto mb-2 rounded-full" />
          <h2 class="text-gray-800 text-2xl font-bold">{{$store.state.user.displayName}}</h2>
          <h4 class="text-gray-600">{{$store.state.user.email}}</h4>
          <button
            @click="signOut"
            class="mt-4 py-1 px-4 rounded bg-gray-200 hover:bg-gray-300"
          >Sign Out</button>
        </popover>
      </transition>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Logo from "@/components/UI/Logo";
import Icon from "@/components/UI/Icon";
import Avatar from "@/components/UI/Avatar";
import Popover from "@/components/UI/Popover";

export default {
  name: "AppHeader",
  components: {
    Logo,
    Icon,
    Avatar,
    Popover
  },
  data() {
    return {
      showPopover: false
    };
  },
  computed: {
    ...mapState({
      user: "user"
    }),
    userImage() {
      try {
        return this.$store.state.user.photoURL;
      } catch (_) {
        return false; // default image
      }
    }
  },
  methods: {
    handleAvatarClick() {
      if (this.user) {
        this.showPopover = !this.showPopover;
      } else {
        this.$store.commit("openLogin");
      }
    },
    signOut() {
      this.$store.state.firebase.doSignOut().then(() => {
        this.$store.state.user = null;
      });
      this.showPopover = false;
    }
  }
};
</script>

<style lang="scss">
header {
  .nav {
    @apply flex items-center;
    & > * {
      @apply ml-4;
    }
    a.router-link-exact-active {
      @apply text-gray-100;
    }
  }
}
</style>
