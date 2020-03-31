<template>
  <div>
    <the-alert v-if="error" type="error" @dismissed="onDismiss" key="singup" :text="error.message" />
    <login-form class="mt-12" signup-mode>
      <template #title>
        <h3>Sign Up</h3>
      </template>
      <template #forgot>
        <div class="text-center mb-3">
          <router-link :to="{ name: 'resetPass' }" class="link">Forgot password?</router-link>
        </div>
      </template>
      <template #redirect>
        <div class="text-center mb-3">
          <span class="mr-3">Already have account?</span>
          <router-link :to="{ name: 'signIn' }" class="link">Sign In</router-link>
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
