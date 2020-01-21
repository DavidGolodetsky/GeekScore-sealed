<template>
  <div v-if="game">
    <h1 class="d-flex justify-center mb-4">{{ game.name }}</h1>
    <v-img class="mx-auto mb-8" :src="game.image" width="400" />
    <team-add :game-id="gameId" />
    <template v-if="teams">
      <div v-for="(team, i) in teams" :key="i">
        <team-table :team="team" />
      </div>
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
  created() {
    this.$store.dispatch("loadTeams", this.gameId);
  },
  computed: {
    game() {
      return this.$store.getters.game(this.gameId);
    },
    teams() {
      return this.$store.getters.teamsPerGame(this.gameId);
    }
  }
};
</script>
