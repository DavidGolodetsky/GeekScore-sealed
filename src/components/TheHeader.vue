<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <router-link class="logo" :to="{name: 'home'}">GeekStat</router-link>
      <v-spacer />
      <v-btn :small="$vuetify.breakpoint.smOnly" text rounded v-if="user" @click="onLogout">
        <v-icon>mdi-logout</v-icon>Log out
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["user"])
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
