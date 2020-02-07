<template>
  <div>
    <v-card class="mb-10">
      <v-img class="white--text align-end game-card" height="400" :src="game.imageUrl">
        <div class="title-wrap">
          <v-card-title class="d-flex align-center justify-space-between">
            <p>{{ game.name }}</p>
            <game-edit-dialog :game="game" />
          </v-card-title>
        </div>
      </v-img>
    </v-card>
    <div class="d-flex align-center justify-space-between">
      <h1 class="app-headline">Teams</h1>
      <team-add-dialog class="d-flex justify-end my-2" :game="game" />
    </div>
    <div v-for="(team, i) in teams" :key="i">
      <v-lazy
        :options="{
            threshold: 0.5
          }"
        min-height="200"
        transition="fade-transition"
      >
        <transition-group appear name="fade-down">
          <team-table :key="team.id" :team-id="team.id" />
        </transition-group>
      </v-lazy>
    </div>
  </div>
</template>

<script>
import TeamTable from "@/components/TeamTable";
import TeamAddDialog from "@/components/TeamAddDialog";
import GameEditDialog from "@/components/GameEditDialog";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TeamTable,
    TeamAddDialog,
    GameEditDialog
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
    ...mapGetters("user", ["user"]),
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
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss">
.title-wrap {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
