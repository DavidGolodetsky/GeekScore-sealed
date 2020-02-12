<template>
  <div>
    <the-title
      title="Rounds"
      icon="sword-cross"
      class="mb-4"
      :props="propsToRound"
      component="round-add-dialog"
    />
    <div v-if="showTable">
      <v-tabs v-model="tab" background-color="primary " centered dark icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Table
          <v-icon>mdi-table-large</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Statistics
          <v-icon>mdi-chart-bar</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-data-table :headers="headers" dark :items="rounds" class="elevation-1">
            <template v-slot:item.action="{ item }">
              <round-edit-dialog :item="item" />
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <chart-bars :key="statistics" :team="team" />
        </v-tab-item>
      </v-tabs-items>
    </div>
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
      statistics: 0,
      tab: null
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
          return { ...rounds[key], id: key };
        });
      }
      return [];
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
