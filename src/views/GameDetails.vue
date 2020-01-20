<template>
  <div v-if="game">
    <h1 class="title d-flex justify-center mb-4">{{ game.name }}</h1>
    <v-img class="mx-auto mb-8" :src="game.image" width="400" />
    <matches-table-add />
    <template v-if="matchesTables.length">
      <matches-table v-for="(table, i) in matchesTables" :key="i" />
    </template>
  </div>
</template>

<script>
import MatchesTable from "@/components/MatchesTable";
import MatchesTableAdd from "@/components/MatchesTableAdd";

export default {
  name: "GmeDetails",
  components: {
    MatchesTable,
    MatchesTableAdd
  },
  data() {
    return {
      gameId: this.$route.params.id,
      matchesTables: []
    };
  },
  computed: {
    game() {
      return this.$store.getters.game(this.gameId);
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrapp {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
