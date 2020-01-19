<template>
  <div v-if="game">
    <v-img class="mx-auto mb-8" :src="game.img" width="400" />
    <h1 class="title">{{ game.name }}</h1>
    <p>Rating: {{ game.rating }}</p>
    <p>Rank: {{ game.rank }}</p>
    <p>Release year: {{ game.year }}</p>
    <matches-table></matches-table>
  </div>
</template>

<script>
import store from "@/store/index";
import MatchesTable from "../components/MatchesTable";

export default {
  name: "GmeDetails",
  components: {
    MatchesTable
  },
  data() {
    return {
      gameId: this.$route.params.id,
      game: ""
    };
  },
  created() {
    this.getGame();
  },
  methods: {
    getGame() {
      this.game = store.getters.game(this.gameId);
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrapp {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
