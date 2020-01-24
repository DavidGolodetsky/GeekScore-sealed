<template>
  <div v-if="myGame">
    <h1 class="d-flex justify-center mb-4">{{ myGame.name }}</h1>
    <v-img class="mx-auto mb-8" :src="myGame.image" width="400" />
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
    ...mapGetters(["game", "teamsPerGame"]),
    myGame() {
      return this.game(this.gameId);
    },
    teams() {
      return this.teamsPerGame(this.gameId);
    }
  },
  mounted() {
    this.loadTeams(this.gameId);
  },
  methods: {
    ...mapActions({
      loadTeams: "loadTeams"
    })
  }
};
</script>
