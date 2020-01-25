<template>
  <v-card raised class="team-teable" v-if="team">
    <v-container>
      <v-card-title>
        <h3 class="headline">{{ team.name }}</h3>
      </v-card-title>
      <v-data-table
        v-if="matches"
        :headers="headers"
        dark
        :items="matches"
        class="elevation-1 mb-6"
      ></v-data-table>
      <match-add v-bind="propsToPass" />
    </v-container>
  </v-card>
</template>

<script>
import MatchAdd from "@/components/MatchAdd";
import { mapGetters } from "vuex";

export default {
  components: {
    MatchAdd
  },
  props: {
    teamId: {
      required: true,
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("teams", {
      getTeam: "team",
      getMatches: "matches"
    }),
    team() {
      return this.getTeam(this.teamId);
    },
    matches() {
      const matches = this.getMatches(this.teamId);
      if (matches) {
        return Object.keys(matches).map(key => {
          return matches[key];
        });
      }
      return null;
    },
    propsToPass() {
      if (this.team) {
        return {
          players: this.team.players,
          teamId: this.team.id,
          gameId: this.team.gameId
        };
      }
      return false;
    },
    headers() {
      if (this.team) {
        const headers = this.team.players.map(player => ({
          text: player.name,
          value: player.name.toLowerCase()
        }));
        headers.push({ text: "Date", value: "date" });
        return headers;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.team-teable {
  margin: 40px 0;
}
</style>
