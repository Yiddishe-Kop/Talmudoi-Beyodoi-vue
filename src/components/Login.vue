<template>
  <div class="login">
    <div class="tabs">
      <span :class="{active: action == 'login'}" @click="action = 'login'">Login</span>
      |
      <span :class="{active: action == 'signup'}" @click="action = 'signup'">Signup</span>
    </div>

    <input-group
      v-for="(field, key) in fields"
      :key="key"
      :name="key"
      v-model="fields[key]"
      :placeholder="key"
    />

    <transition name="fade">
      <ui-button v-if="action == 'login'" @click.native="signUp" cta>Sign Up</ui-button>
      <ui-button v-else @click.native="login" cta>Login</ui-button>
    </transition>

    <p>or</p>
    <ui-button
      @click.native="loginWithGoogle"
      iconBefore="google"
      viewbox="0 0 48 48"
      class="google"
    >
      Login with
      <b>Google</b>
    </ui-button>
  </div>
</template>

 <script>
import InputGroup from "@/components/UI/InputGroup";
import UiButton from "@/components/UI/UiButton";

export default {
  name: "Login",
  components: { UiButton, InputGroup },
  data() {
    return {
      action: "login",
      fields: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signUp() {
      this.$store.state.firebase
        .doCreateUserWithEmailAndPassword(
          this.fields.email,
          this.fields.password
        )
        .then(
          res => {
            this.$store.commit("closeModal");
            console.log(`Successfuly signed up: ${res.user.displayName}`);
          },
          err => {
            console.log(`Oops. ${err.message}`);
          }
        );
    },
    login() {
      this.$store.state.firebase
        .doSignInWithEmailAndPassword(this.fields.email, this.fields.password)
        .then(
          res => {
            this.$store.commit("closeModal");
            console.log({ res });
            console.log(`Successfuly signed in: ${res.user.displayName}`);
          },
          err => {
            console.log(`Oops. ${err.message}`);
          }
        );
    },
    loginWithGoogle() {
      this.$store.state.firebase
        .doSignInWithGoogle(this.$store.state.firebase.googleProvider)
        .then(
          res => {
            console.log({ res });
            console.log(`Successfuly signed in: ${res.user.displayName}`);
            this.$store.commit("closeModal");
          },
          err => {
            console.log(`Oops. ${err.message}`);
          }
        );
    }
  }
};
</script>

<style lang="scss">
.login {
  .tabs {
    @apply cursor-pointer;
    .active {
      @apply text-brand;
    }
  }

  button {
    margin: auto;
    &.google {
      background-color: transparent;
      border: 2px solid #1976d2;
      @apply text-gray-800;
      svg {
        @apply text-xl;
      }
      b {
        @apply px-2;
      }
    }
  }
}
</style>
