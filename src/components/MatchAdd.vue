<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add match</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Select Winner &#9876;</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center">
              <v-radio-group row v-model="winner">
                <v-radio
                  v-for="(player, i) in players"
                  :key="i"
                  :label="player.name"
                  :value="player.name"
                ></v-radio>
              </v-radio-group>
            </v-row>
            <v-row justify="center">
              <v-date-picker v-model="date"></v-date-picker>
            </v-row>
            <small class="error" v-if="error">{{ error }}</small>
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
      dialog: false,
      winner: "",
      date: new Date().toISOString().substr(0, 10),
      error: ""
    };
  },
  methods: {
    ...mapActions({
      createMatch: "createMatch"
    }),
    onSave() {
      if (this.winner) {
        this.cookMatch();
        this.close();
      } else {
        this.error = "Please provide a winner";
      }
    },
    close() {
      this.dialog = false;
    },
    cookMatch() {
      const match = {
        [this.winner.toLowerCase()]: "WON",
        date: this.date,
        gameId: this.gameId,
        teamId: this.teamId
      };
      this.createMatch(match);
    }
  }
};
</script>
