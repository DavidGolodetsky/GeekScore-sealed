<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <router-link class="logo" :to="{name: 'home'}">GeekStat</router-link>
      <v-spacer />
      <v-btn
        v-for="(item, index) in getNavItems"
        :key="index"
        :small="$vuetify.breakpoint.smOnly"
        :to="item.link"
        text
        rounded
      >
        <v-icon left>mdi-{{item.icon}}</v-icon>
        {{item.text}}
      </v-btn>
      <v-btn :small="$vuetify.breakpoint.smOnly" text rounded v-if="user" @click="onLogout">
        <v-icon>mdi-logout</v-icon>Log out
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["user"]),
    getNavItems() {
      let navItems = [
        {
          text: "Sign up",
          icon: "account-circle ",
          link: "/user/signup"
        },
        {
          text: "Sign in",
          icon: "login",
          link: "/user/signin"
        }
      ];
      if (this.user) {
        navItems = [
          {
            text: "Games",
            icon: "cards",
            link: "/games"
          }
        ];
      }
      return navItems;
    }
  },
  methods: {
    ...mapActions("user", ["logout"]),
    onLogout() {
      this.logout();
    }
  }
};
</script>

<style scoped lang="scss">
.logo {
  color: $accent;
  font-size: 18px;
  font-weight: 600;
}
</style>
