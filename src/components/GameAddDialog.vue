<template>
  <the-dialog activator="plus" header="Add new game" :submitLogic="onSubmit">
    <v-text-field :rules="fieldRules" prepend-icon="mdi-cards-diamond" label="Name" v-model="name"></v-text-field>
    <v-text-field prepend-icon="mdi-image" label="Image URL" v-model="imageUrl"></v-text-field>
    <v-img v-if="imageUrl" :src="imageUrl" height="200" contain></v-img>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      imageUrl: "",
      fieldRules: [
        v => !!v || "Field is required",
        v => v.length <= 40 || "Field is too long"
      ]
    };
  },
  methods: {
    ...mapActions("games", ["createGame"]),
    onSubmit() {
      const game = {
        name: this.name
      };
      if (this.imageUrl) {
        game.imageUrl = this.imageUrl;
      }
      this.createGame(game);
    }
  }
};
</script>
