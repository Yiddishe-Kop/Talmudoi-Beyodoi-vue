<template>
  <header>
    <router-link to="/">
      <logo />
    </router-link>
    <nav class="nav">
      <router-link class="nav__link" to="/">Home</router-link>
      <router-link class="nav__link" to="/about/">About</router-link>
      <avatar @click="handleAvatarClick" />
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Logo from "@/components/UI/Logo";
import Icon from "@/components/UI/Icon";
import Avatar from "@/components/UI/Avatar";

export default {
  name: "AppHeader",
  components: {
    Logo,
    Icon,
    Avatar
  },
  computed: {
    ...mapState({
      user: "user"
    })
  },
  methods: {
    handleAvatarClick() {
      if (this.user) {
        this.$store.state.firebase.doSignOut().then(() => {
          this.$store.state.user = null;
        });
      } else {
        this.$store.commit("openLogin");
      }
    }
  }
};
</script>

<style lang="scss">
header {
  height: 70px;
  @apply mb-12 px-6 flex justify-between items-center bg-white shadow;

  .nav {
    @apply flex items-center;
    & > * {
      @apply ml-4;
    }
    a.router-link-exact-active {
      @apply text-brand;
    }
  }
}
</style>
