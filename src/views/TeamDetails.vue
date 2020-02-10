<template>
  <div>
    <the-title
      title="Rounds"
      icon="sword-cross"
      :props="propsToRound"
      component="round-add-dialog"
    />
    <v-row class="mb-8">
      <v-col cols="12">
        <v-data-table v-if="showTable" :headers="headers" dark :items="rounds" class="elevation-1">
          <template v-slot:item.action="{ item }">
            <round-edit-dialog :item="item" v-bind="propsToRound" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <chart-bars :key="statistics" :team="team" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import ChartBars from "@/components/ChartBars.vue";
import RoundEditDialog from "@/components/RoundEditDialog";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ChartBars,
    TheTitle,
    RoundEditDialog
  },
  props: {
    teamId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      statistics: 0
    };
  },
  computed: {
    ...mapGetters("teams", { getTeam: "team", getRounds: "rounds" }),
    team() {
      return this.getTeam(this.teamId);
    },
    showTable() {
      if (this.rounds && this.rounds.length) {
        return true;
      }
      return false;
    },
    propsToRound() {
      return {
        players: this.team.players,
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
        { text: "Draw", value: "draw" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "action", sortable: false }
      ];
      headers.push(...fields);
      return headers;
    },
    rounds() {
      const rounds = this.getRounds(this.teamId);
      if (rounds) {
        return Object.keys(rounds).map(key => {
          return rounds[key];
        });
      }
      return null;
    }
  },
  mounted() {
    this.backTitle(this.team.name);
  },
  methods: {
    ...mapActions(["backTitle"])
  },
  watch: {
    rounds(value, newValue) {
      if (newValue) {
        this.statistics++;
      }
    }
  }
};
</script>
