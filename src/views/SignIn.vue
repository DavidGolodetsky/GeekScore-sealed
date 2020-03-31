<template>
  <div>
    <the-alert v-if="error" type="error" @dismissed="onDismiss" key="singin" :text="error.message" />
    <login-form class="mt-12">
      <template #title>
        <h3>Sign In</h3>
      </template>
      <template #forgot>
        <div class="text-center mb-3">
          <router-link :to="{ name: 'resetPass' }" class="link">Forgot password?</router-link>
        </div>
      </template>
      <template #redirect>
        <div class="text-center mb-3">
          <span class="mr-3">Don't have account yet?</span>
          <router-link :to="{ name: 'signUp' }" class="link">Sign Up</router-link>
        </div>
      </template>
    </login-form>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["clearError", "clearBackTitle"]),
    onDismiss() {
      this.clearError();
    }
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters(["error"])
  },
  created() {
    this.clearBackTitle();
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push("/games");
      }
    }
  }
};
</script>
