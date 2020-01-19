<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add game</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Game description</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field required label="Name" v-model="name"></v-text-field>
            <v-text-field required label="Image URL" v-model="image"></v-text-field>
            <p class="app-error" v-if="error">{{ error }}</p>
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
import store from "@/store/index";

export default {
  data() {
    return {
      dialog: false,
      name: "",
      image: "",
      error: ""
    };
  },
  methods: {
    onSave() {
      if (this.name && this.image) {
        const game = {
          name: this.name,
          image: this.image
        };
        store.dispatch("createGame", game);
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
