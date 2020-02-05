<template>
  <div>
    <v-card width="400" raised outlined color="cyan lighten-5" class="mx-auto mt-5">
      <v-form v-model="valid" lazy-validation ref="form" @submit.prevent="onSubmit">
        <v-card-title class="pb-10">
          <h3 v-if="signupMode">Sign Up</h3>
          <h3 v-else>Sign In</h3>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Email"
            type="email"
            prepend-icon="mdi-email"
            v-model="email"
            :rules="EmailRules"
            required
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
            required
            v-model="password"
          />
          <v-text-field
            v-if="signupMode"
            :type="showPassword ? 'text' : 'password'"
            label="Confirm password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="[comparePasswords]"
            required
            v-model="confirmPassword"
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
      <div v-if="!signupMode" class="text-center mb-3">
        <router-link :to="{name: 'resetPass'}">Forgot password?</router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    signupMode: {
      type: Boolean
    }
  },
  data() {
    return {
      valid: true,
      showPassword: false,
      password: "",
      confirmPassword: "",
      email: "",
      EmailRules: [
        v => !!v || "Field is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Field is required",
        v => v.length >= 6 || "Password is too short"
      ]
    };
  },
  methods: {
    ...mapActions("user", ["signUpUser", "signInUser"]),
    validateForm() {
      let form = this.$refs.form;
      if (form.validate()) {
        return true;
      }
    },

    onSubmit() {
      if (this.validateForm()) {
        const userInfo = {
          email: this.email,
          password: this.password
        };
        if (this.signupMode) {
          this.signUpUser(userInfo);
        } else {
          this.signInUser(userInfo);
        }
      }
    }
  },

  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords don't match"
        : true;
    }
  }
};
</script>