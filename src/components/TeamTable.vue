<template>
  <v-card raised class="team-teable" v-if="team">
    <v-container>
      <v-card-title>
        <h3 class="headline">{{ team.name }}</h3>
      </v-card-title>
      <v-data-table
        v-if="team.matches"
        :headers="headers"
        fixed-header
        dark
        height="400"
        hide-default-footer
        :items="team.matches"
        class="elevation-1 mb-6"
      ></v-data-table>
      <match-add :players="team.players" />
    </v-container>
  </v-card>
</template>

<script>
import MatchAdd from "@/components/MatchAdd";

export default {
  components: {
    MatchAdd
  },
  props: {
    team: {
      required: true,
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
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
