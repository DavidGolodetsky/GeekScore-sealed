<template>
  <div>
    <app-alert v-if="error" type="error" @dismissed="onDismiss" key="singup" :text="error.message"></app-alert>
    <login-form class="mt-12" signup-mode></login-form>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["clearError"]),
    onDismiss() {
      this.clearError();
    }
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters(["error"])
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  }
};
</script>