<template>
  <div>
    <div v-if="game">
      <h1 class="d-flex justify-center mb-4">{{ game.name }}</h1>
      <v-img class="mx-auto mb-8" :src="game.imageUrl" width="400" />
      <team-add-dialog :game-id="gameId" />
      <template v-if="teams">
        <v-lazy
          :options="{
          threshold: .5
        }"
          min-height="200"
          transition="fade-transition"
        >
          <transition-group appear name="fade-down">
            <team-table v-for="(team, i) in teams" :key="i" :team-id="team.id" />
          </transition-group>
        </v-lazy>
      </template>
    </div>
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
