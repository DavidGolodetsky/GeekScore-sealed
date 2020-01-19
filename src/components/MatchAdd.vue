<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add match</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">And the winner is...?</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-radio-group row v-model="winner">
              <v-radio label="David" value="david"></v-radio>
              <v-radio label="Lyuba" value="lyuba"></v-radio>
            </v-radio-group>
            <v-date-picker v-model="picker"></v-date-picker>
            <small class="error" v-if="error">{{ error }}</small>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// import db from "@/fb";

export default {
  data() {
    return {
      dialog: false,
      winner: "radio-1",
      picker: new Date().toISOString().substr(0, 10),
      error: ""
    };
  },
  methods: {
    onSave() {
      if (this.winner) {
        // const match = {
        //   david: this.winner === "david" ? true : false,
        //   lyuba: this.winner === "lyuba" ? true : false,
        //   date: this.picker
        // };
        // db.collection("games")
        //   .add(match)
        //   .then(() => console.log("added"));
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
