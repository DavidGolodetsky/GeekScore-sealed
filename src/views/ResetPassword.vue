<template>
  <div>
    <the-alert v-if="error" type="error" @dismissed="onDismiss" key="singin" :text="error.message"></the-alert>
    <div v-if="resettedPassword">
      <p class="mb-5">Check your email for a new password</p>
      <the-go-back />
    </div>
    <v-card v-else width="400" raised outlined color="cyan lighten-5" class="mx-auto mt-5">
      <v-form v-model="valid" lazy-validation ref="form" @submit.prevent="onSubmit">
        <v-card-title class="pb-10">
          <h3>Reset Password</h3>
        </v-card-title>
        <v-card-text>
          <v-text-field
            clearable
            label="Email"
            type="email"
            prepend-icon="mdi-email"
            v-model="email"
            :rules="EmailRules"
            required
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row>
            <v-col align="right">
              <v-btn color="success" type="submit" :disabled="!valid">Submit</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    signupMode: {
      type: Boolean
    }
  },
  data() {
    return {
      valid: true,
      email: "",
      resetted: false,
      EmailRules: [
        v => !!v || "Field is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    ...mapActions(["clearError"]),
    ...mapActions("user", ["resetPassword"]),
    onDismiss() {
      this.clearError();
    },
    validateForm() {
      let form = this.$refs.form;
      if (form.validate()) {
        return true;
      }
    },
    onSubmit() {
      if (this.validateForm()) {
        this.resetPassword(this.email);
      }
    }
  },
  computed: {
    ...mapGetters(["error"]),
    ...mapGetters("user", ["resettedPassword"]),
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords don't match"
        : true;
    }
  }
};
</script>
