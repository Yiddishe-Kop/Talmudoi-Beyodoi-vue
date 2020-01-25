import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import firebase from '@/firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    user: null,
    firebase: firebase,

    modal: {
      isOpen: false,
      title: "",
      component: "Login",
      action1: "",
      action2: "",
      handleAction1: () => ""
    },
  },


  getters: {
    isLoggedIn: state => state.user !== null,
  },


  mutations: {
    ...vuexfireMutations,
    UPDATE_USER(state, user) {
      state.user = user
    },
    closeModal(state) {
      state.modal.isOpen = false;
    },
    openLogin(state) {
      state.modal = {
        isOpen: true,
        title: "Login / Registration",
        component: "Login",
        action1: "OK",
        action2: "Cancel",
        handleAction1: () => state.modal.isOpen = false
      }
    },
  },


  actions: {
    loginWithGoogle(context) {
      context.state.firebase
        .doSignInWithGoogle(context.state.firebase.googleProvider)
        .then(
          res => {
            context.state.firebase.analytics.logEvent('login', {
              method: 'google'
            })
          },
          err => {
            console.log(`Oops. ${err.message}`);
          }
        );
    },
  }
})
