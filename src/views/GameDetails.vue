<template>
  <div v-if="game">
    <h1 class="title d-flex justify-center mb-4">{{ game.name }}</h1>
    <v-img class="mx-auto mb-8" :src="game.image" width="400" />
    <team-add :game-id="gameId" />
    <template v-if="teams.length">
      <team-table v-for="(table, i) in teams" :key="i" />
    </template>
  </div>
</template>

<script>
import TeamTable from "@/components/TeamTable";
import TeamAdd from "@/components/TeamAdd";

export default {
  name: "GmeDetails",
  components: {
    TeamTable,
    TeamAdd
  },
  data() {
    return {
      gameId: this.$route.params.id
    };
  },
  computed: {
    game() {
      return this.$store.getters.game(this.gameId);
    },
    teams() {
      return this.$store.getters.teams;
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrapp {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
