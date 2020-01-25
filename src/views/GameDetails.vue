<template>
  <div v-if="game">
    <h1 class="d-flex justify-center mb-4">{{ game.name }}</h1>
    <v-img class="mx-auto mb-8" :src="game.image" width="400" />
    <team-add :game-id="gameId" />
    <template v-if="teams">
      <div v-for="(team, i) in teams" :key="i">
        <team-table :team-id="team.id" />
      </div>
    </template>
  </div>
</template>

<script>
import TeamTable from "@/components/TeamTable";
import TeamAdd from "@/components/TeamAdd";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GmeDetails",
  components: {
    TeamTable,
    TeamAdd
  },
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("games", { getGame: "game" }),
    ...mapGetters("teams", { getTeams: "teamsPerGame" }),
    game() {
      return this.getGame(this.gameId);
    },
    teams() {
      return this.getTeams(this.gameId);
    }
  },
  mounted() {
    this.loadTeams(this.gameId);
  },
  methods: {
    ...mapActions("teams", ["loadTeams"])
  }
};
</script>
