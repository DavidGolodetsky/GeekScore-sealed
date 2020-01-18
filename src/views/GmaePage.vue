<template>
  <div v-if="game">
    <v-img class="mx-auto mb-8" :src="game.image" width="400" />
    <h1 class="title">{{ game.name }}</h1>
    <p>Rating: {{ game.bggRating | round }}</p>
    <p>Release year: {{ game.yearPublished }}</p>
  </div>
</template>

<script>
import { axios } from "axios";

export default {
  data() {
    return {
      game: ""
    };
  },
  created() {
    this.game = axios.get(
      `https://bgg-json.azurewebsites.net/thing/${params.game}`
    );
  }
};
</script>

<style scoped lang="scss">
.title-wrapp {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
