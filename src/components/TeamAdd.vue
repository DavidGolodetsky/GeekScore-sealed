<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add team</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Team Table</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field label="Name" v-model="name"></v-text-field>
            <v-select :items="numberOfPlayers" @change="setPlayers" label="Number of players"></v-select>
            <template v-if="players.length">
              <v-text-field
                v-for="(player, i) in players"
                v-model="player.name"
                :key="i"
                :label="`Player #${i+1}`"
              ></v-text-field>
            </template>
            <p class="app-error" v-if="error">{{ error }}</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
      dialog: false,
      name: "",
      numberOfPlayers: [2, 3, 4, 5, 6, 7, 8],
      players: [],
      error: ""
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
    onSave() {
      // TODO:add validation
      if (this.name && this.players.length) {
        const team = {
          gameId: this.gameId,
          name: this.name,
          players: this.players
        };
        this.createTeam(team);
        this.close();
      } else {
        this.error = "Please provide a winner";
      }
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>
