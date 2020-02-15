<template>
  <div>
    <v-card
      width="400"
      raised
      outlined
      dark
      color="primary"
      class="mx-auto mt-5"
    >
      <v-form
        v-model="valid"
        lazy-validation
        ref="form"
        @submit.prevent="onSubmit"
      >
        <v-card-title>
          <h3 v-if="signupMode">Sign Up</h3>
          <h3 v-else>Sign In</h3>
        </v-card-title>
        <v-card-text>
          <div id="firebaseui-auth-container"></div>
          <div id="loader">Loading...</div>
          <div class="d-md-flex d-none or-wrapper">
            <span class="or">OR</span>
          </div>
          <v-text-field
            clearable
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
          <v-btn
            class="py-2"
            color="secondary"
            width="100%"
            type="submit"
            :disabled="!valid"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-form>
      <div v-if="!signupMode" class="text-center mb-3">
        <router-link :to="{ name: 'resetPass' }">Forgot password?</router-link>
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

<style scoped lang="scss">
.or-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0 30px 0;
}
.or {
  width: 53px;
  height: 53px;
  font-weight: 700;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    background-color: #fff;
    height: 1px;
    width: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
