<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add matches table</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Matches Table</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field label="Name" v-model="name"></v-text-field>
            <v-select :items="players" v-model="selectedPlayers" label="Number of players"></v-select>
            <template v-if="selectedPlayers">
              <v-text-field
                v-for="(player, i) in selectedPlayers"
                :key="i"
                :label="`Player ${player}`"
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
// import store from "@/store/index";

export default {
  data() {
    return {
      dialog: false,
      name: "",
      players: [2, 3, 4, 5, 6, 7, 8],
      selectedPlayers: "",
      player_2: "",
      player_3: "",
      player_4: "",
      player_5: "",
      player_6: "",
      player_7: "",
      player_8: "",
      error: ""
    };
  },
  methods: {
    onSave() {
      if (this.name && this.selectedPlayers) {
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
