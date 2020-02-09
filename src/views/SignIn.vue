<template>
  <div>
    <the-alert v-if="error" type="error" @dismissed="onDismiss" key="singin" :text="error.message"></the-alert>
    <login-form class="mt-12"></login-form>
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
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  }
};
</script>