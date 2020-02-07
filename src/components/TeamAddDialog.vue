<template>
  <the-dialog activator="plus" header="Add new team" button-text="New team" :submitLogic="onSubmit">
    <v-text-field :rules="fieldRules" prepend-icon="mdi-account-group" label="Name" v-model="name"></v-text-field>
    <v-select
      prepend-icon="mdi-account-multiple-plus"
      :rules="selectRules"
      :items="numberOfPlayers"
      @change="setPlayers"
      label="Number of players"
    ></v-select>
    <template v-if="players.length">
      <v-text-field
        v-for="(player, i) in players"
        v-model="player.name"
        prepend-icon="mdi-account"
        :rules="fieldRules"
        :key="i"
        :label="`Player #${i + 1}`"
      ></v-text-field>
    </template>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: "",
      numberOfPlayers: [2, 3, 4, 5, 6, 7, 8],
      players: [],
      fieldRules: [
        v => !!v || "Field is required",
        v => v.length <= 40 || "Field is too long"
      ],
      selectRules: [v => !!v || "Field is required"]
    };
  },
  methods: {
    ...mapActions("teams", ["createTeam"]),
    setPlayers(event) {
      this.players = [];
      for (let i = 0; i < event; i++) {
        let player = { name: "" };
        this.players.push(player);
      }
    },
    onSubmit() {
      const team = {
        gameId: this.gameId,
        name: this.name,
        players: this.players
      };
      this.createTeam(team);
    }
  }
};
</script>
