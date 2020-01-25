<template>
  <div id="app" class="bg-gray-200">
    <app-header />
    <main>
      <transition name="page" mode="out-in" appear>
        <router-view />
      </transition>
    </main>

    <Modal
      :is-open="modal.isOpen"
      :title="modal.title"
      :action1="modal.action1"
      :action2="modal.action2"
      @action1="modal.handleAction1"
      @close="$store.commit('closeModal')"
    >
      <component :is="$store.state.modal.component" />
    </Modal>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import Modal from "@/components/Modal";
import Login from "@/components/Login";
import { mapState } from "vuex";

export default {
  name: "Default",
  components: {
    AppHeader,
    Modal,
    Login
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(["modal"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

main {
  max-width: 860px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  &.full-width {
    max-width: 100vw;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
