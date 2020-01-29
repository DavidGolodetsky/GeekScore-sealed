<template>
  <v-footer color="primary lighten-1" padless>
    <v-layout justify-center wrap>
      <v-btn
        v-for="(item, index) in navItems"
        :key="index"
        color="white"
        :to="item.link"
        text
        rounded
        class="my-2"
      >{{ item.text }}</v-btn>
      <v-flex primary lighten-2 py-4 text-center white--text xs12>
        {{ new Date().getFullYear() }} —
        <strong>GeekScore</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["user"]),
    navItems() {
      if (this.user) {
        return [
          {
            text: "Games",
            icon: "cards",
            link: "/games"
          }
        ];
      } else {
        return [
          {
            text: "Sign up",
            icon: "account-circle ",
            link: "/signup"
          },
          {
            text: "Sign in",
            icon: "login",
            link: "/signin"
          }
        ];
      }
    }
  }
};
</script>
