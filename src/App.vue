<template>
  <v-app>
    <the-header />
    <v-content>
      <v-container>
        <router-view class="page"></router-view>
      </v-container>
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter
  },

  data: () => ({})
};
</script>
