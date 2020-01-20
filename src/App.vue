<template>
  <v-app>
    <the-header />
    <v-content>
      <v-container>
        <router-view class="page"></router-view>
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

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter
  },

  data: () => ({}),
  created() {
    this.$store.dispatch("loadGames");
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
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
