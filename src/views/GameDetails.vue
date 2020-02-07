<template>
  <div>
    <the-title title="Teams" icon="account-group" :props="{game}" component="team-add-dialog" />
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
import TheTitle from "@/components/TheTitle";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TeamTable,
    TheTitle
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
  beforeUpdate() {
    this.backTitle(this.game.name);
  },
  methods: {
    ...mapActions("teams", ["loadTeams"]),
    ...mapActions(["backTitle"])
  }
};
</script>

<style lang="scss">
.title-wrap {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
