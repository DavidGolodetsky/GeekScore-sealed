<template>
  <the-dialog
    activator="plus"
    header="Add new match"
    buttonText="New match"
    :submitLogic="onSubmit"
  >
    <v-row justify="center" class="mb-4">
      <v-radio-group :rules="fieldRules" row v-model="winner">
        <v-radio v-for="(player, i) in players" :key="i" :label="player.name" :value="player.name" />
      </v-radio-group>
    </v-row>
    <v-row justify="center">
      <v-date-picker :rules="fieldRules" v-model="date" />
    </v-row>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    players: {
      type: Array,
      required: true
    },
    teamId: {
      type: String,
      required: true
    },
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      winner: "",
      date: new Date().toISOString().substr(0, 10),
      fieldRules: [v => !!v || "Field is required"]
    };
  },
  methods: {
    ...mapActions("teams", ["createMatch"]),
    onSubmit() {
      const match = {
        [this.winner.toLowerCase()]: "VICTORY",
        date: this.date,
        gameId: this.gameId,
        teamId: this.teamId
      };
      this.createMatch(match);
    }
  }
};
</script>
