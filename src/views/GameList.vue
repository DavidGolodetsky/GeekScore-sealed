<template>
  <div v-if="games">
    <v-row>
      <v-col cols="4" v-for="(game, i) in games" :key="i" class="mb-6">
        <v-card>
          <v-img class="white--text align-end" height="350" :src="game.img">
            <div class="title-wrapp">
              <v-card-title>{{ game.name }}</v-card-title>
            </div>
          </v-img>
          <v-card-actions>
            <router-link class="mx-auto" :to="`/${game.id}`">
              <v-btn color="primary">Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  data() {
    return {};
  },
  computed: {
    games() {
      return store.getters.games;
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrapp {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
