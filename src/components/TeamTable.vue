<template>
  <v-card raised class="team-teable" v-if="team">
    <v-container>
      <v-card-title>
        <h3 class="headline">{{ team.name }}</h3>
        <v-spacer />
        <router-link class="mx-auto" :to="{ name: 'statistic', params: { team: team } }">
          <v-btn outlined fab class="mx-2" dark color="primary">
            <v-icon dark>mdi-chart-bar</v-icon>
          </v-btn>
        </router-link>
        <team-edit-dialog v-bind="propsToTeam" />
      </v-card-title>
      <v-data-table
        v-if="matches"
        :headers="headers"
        dark
        :items="matches"
        class="elevation-1 mb-6"
      ></v-data-table>
      <v-row justify="center">
        <v-col cols="1">
          <match-add-dialog v-bind="propsToMatch" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import MatchAddDialog from "@/components/MatchAddDialog";
import TeamEditDialog from "@/components/TeamEditDialog";
import { mapGetters } from "vuex";

export default {
  components: {
    MatchAddDialog,
    TeamEditDialog
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
    propsToMatch() {
      return {
        players: this.team.players,
        teamId: this.team.id,
        gameId: this.team.gameId
      };
    },
    propsToTeam() {
      return {
        teamName: this.team.name,
        teamId: this.team.id,
        gameId: this.team.gameId
      };
    },
    headers() {
      const headers = this.team.players.map(player => ({
        text: player.name,
        value: player.name.toLowerCase()
      }));
      headers.push({ text: "Date", value: "date" });
      return headers;
    }
  }
};
</script>

<style lang="scss" scoped>
.team-teable {
  margin: 40px 0;
}
</style>
