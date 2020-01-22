<template>
  <div v-if="getGame">
    <h1 class="d-flex justify-center mb-4">{{ getGame.name }}</h1>
    <v-img class="mx-auto mb-8" :src="getGame.image" width="400" />
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
import { mapActions, mapGetters } from "vuex";

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
