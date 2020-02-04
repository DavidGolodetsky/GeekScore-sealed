<template>
  <the-dialog activator="pencil" header="Edit match info" simple :submitLogic="onSubmit">
    <v-row justify="center" class="mb-4">
      <v-radio-group :rules="fieldRules" row v-model="winner">
        <v-radio v-for="(player, i) in players" :key="i" :label="player.name" :value="player.name" />
      </v-radio-group>
    </v-row>
    <v-row justify="center">
      <v-date-picker :rules="fieldRules" v-model="date" />
    </v-row>
    <v-switch v-model="isDelete" label="Delete game" color="red" value="delete" hide-details></v-switch>
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
    },
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDelete: false,
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
