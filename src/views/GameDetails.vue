<template>
  <div>
    <v-row justify="end">
      <v-col cols="1">
        <team-add-dialog :game-id="gameId" />
      </v-col>
    </v-row>
    <h1 class="d-flex justify-center mb-4 game-title">{{ game.name }}</h1>
    <v-img
      class="mx-auto mb-8"
      lazy-src="https://picsum.photos/id/11/100/60"
      :src="game.imageUrl"
      width="400"
    />
    <template v-if="teams">
      <div v-for="(team, i) in teams" :key="i">
        <v-lazy
          :options="{
          threshold: .5
        }"
          min-height="200"
          transition="fade-transition"
        >
          <transition-group appear name="fade-down">
            <team-table :key="team.id" :team-id="team.id" />
          </transition-group>
        </v-lazy>
      </div>
    </template>
    <go-back />
  </div>
</template>

<script>
import TeamTable from "@/components/TeamTable";
import TeamAddDialog from "@/components/TeamAddDialog";
import GoBack from "@/components/GoBack";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TeamTable,
    TeamAddDialog,
    GoBack
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
.game-title {
  color: $primary;
}
</style>