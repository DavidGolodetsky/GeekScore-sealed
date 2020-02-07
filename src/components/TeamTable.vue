<template>
  <div>
    <v-card raised class="team-teable" v-if="team">
      <v-container>
        <v-card-actions class="upper-row">
          <h3 class="app-headline">{{ team.name }}</h3>
          <v-spacer />
          <team-edit-dialog v-bind="propsToTeam" />
        </v-card-actions>
        <v-data-table
          v-if="showTable"
          :headers="headers"
          dark
          :items="rounds"
          class="elevation-1 mb-6"
        >
          <template v-slot:item.action="{ item }">
            <round-edit-dialog :item="item" v-bind="propsToRound" />
          </template>
        </v-data-table>
        <v-card-actions>
          <round-add-dialog v-bind="propsToRound" />
        </v-card-actions>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import RoundAddDialog from "@/components/RoundAddDialog";
import TeamEditDialog from "@/components/TeamEditDialog";
import RoundEditDialog from "@/components/RoundEditDialog";
import { mapGetters } from "vuex";

export default {
  components: {
    RoundAddDialog,
    TeamEditDialog,
    RoundEditDialog
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
      getRounds: "rounds"
    }),
    team() {
      return this.getTeam(this.teamId);
    },
    showTable() {
      if (this.rounds && this.rounds.length) {
        return true;
      }
      return false;
    },
    rounds() {
      const rounds = this.getRounds(this.teamId);
      if (rounds) {
        return Object.keys(rounds).map(key => {
          return rounds[key];
        });
      }
      return null;
    },
    propsToRound() {
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
.button-text {
  text-transform: uppercase;
  font-size: 12px;
  color: $secondary;
}
.upper-row {
  margin-bottom: 40px;
}
</style>
