<template>
  <div>
    <v-card raised class="team-teable" v-if="team">
      <v-container>
        <v-card-actions class="upper-row">
          <h3 class="headline">{{ team.name }}</h3>
          <v-spacer />
          <team-edit-dialog v-bind="propsToTeam" />
        </v-card-actions>
        <v-data-table
          v-if="showTable"
          :headers="headers"
          dark
          :items="matches"
          class="elevation-1 mb-6"
        >
          <template v-slot:item.action="{ item }">
            <match-edit-dialog :item="item" v-bind="propsToMatch" />
          </template>
        </v-data-table>
        <v-card-actions>
          <router-link v-if="showTable" :to="{ name: 'statistic', params: { team: team } }">
            <v-btn fab class="mx-2" dark color="primary">
              <v-icon dark>mdi-chart-bar</v-icon>
            </v-btn>
            <span class="button-text">Statistics</span>
          </router-link>
          <v-spacer></v-spacer>
          <match-add-dialog v-bind="propsToMatch" />
        </v-card-actions>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import MatchAddDialog from "@/components/MatchAddDialog";
import TeamEditDialog from "@/components/TeamEditDialog";
import MatchEditDialog from "@/components/MatchEditDialog";
import { mapGetters } from "vuex";

export default {
  components: {
    MatchAddDialog,
    TeamEditDialog,
    MatchEditDialog
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
    showTable() {
      if (this.matches && this.matches.length) {
        return true;
      }
      return false;
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
      const fields = [
        { text: "Date", value: "date" },
        { text: "Actions", value: "action", sortable: false }
      ];
      headers.push(...fields);
      return headers;
    }
  }
};
</script>

<style lang="scss" scoped>
.team-teable {
  margin: 40px 0;
}
.headline {
  color: $primary;
}
.button-text {
  text-transform: uppercase;
  font-size: 12px;
  color: $primary;
}
.upper-row {
  margin-bottom: 40px;
}
</style>
