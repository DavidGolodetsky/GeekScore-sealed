<template>
  <div>
    <the-alert
      v-if="error"
      type="error"
      @dismissed="onDismiss"
      key="singup"
      :text="error.message"
    />
    <login-form class="mt-12" signup-mode></login-form>
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
