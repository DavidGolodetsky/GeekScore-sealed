<template>
  <div>
    <the-head title="Teams" icon="account-group" component="team-add-dialog" />
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
import TheHead from "@/components/TheHead";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TeamTable,
    TheHead
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
