<template>
  <div v-if="game">
    <h1 class="title d-flex justify-center mb-4">{{ game.name }}</h1>
    <v-img class="mx-auto mb-8" :src="game.image" width="400" />
    <match-add></match-add>
    <!-- <matches-table></matches-table> -->
  </div>
</template>

<script>
import store from "@/store/index";
// import MatchesTable from "../components/MatchesTable";
import MatchAdd from "../components/MatchAdd";

export default {
  name: "GmeDetails",
  components: {
    MatchAdd
    // MatchesTable
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
