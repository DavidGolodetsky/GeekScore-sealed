<template>
  <v-app>
    <the-header />
    <v-content>
      <v-container class="app-container">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
        <div v-if="loading" class="loader-wrap">
          <v-progress-circular :size="50" indeterminate color="amber"></v-progress-circular>
        </div>
      </v-container>
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter
  },

  data: () => ({}),
  computed: {
    ...mapGetters(["loading"]),
    ...mapGetters("user", ["user"])
  },
  watch: {
    user(value) {
      if (!value) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.loader-wrap {
  width: 100%;
  z-index: 1000;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
