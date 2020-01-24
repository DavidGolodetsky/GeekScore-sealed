<template>
  <v-card raised class="team-teable" v-if="myTeam">
    <v-container>
      <v-card-title>
        <h3 class="headline">{{ myTeam.name }}</h3>
      </v-card-title>
      <v-data-table
        v-if="myTeam.matches.length"
        :headers="headers"
        fixed-header
        dark
        height="400"
        hide-default-footer
        :items="myTeam.matches"
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
    ...mapGetters(["team"]),
    myTeam() {
      return this.team(this.teamId);
    },
    propsToPass() {
      if (this.myTeam) {
        return {
          players: this.myTeam.players,
          teamId: this.myTeam.id,
          gameId: this.myTeam.gameId
        };
      }
      return false;
    },
    headers() {
      if (this.myTeam) {
        const headers = this.myTeam.players.map(player => ({
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
