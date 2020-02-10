<template>
  <the-dialog
    activator="pencil"
    color="#fff"
    header="Edit game info"
    simple
    :submitLogic="onSubmit"
  >
    <v-text-field clearable :rules="fieldRules" label="Name" v-model="name"></v-text-field>
    <v-text-field clearable prepend-icon="mdi-image" label="Image URL" v-model="imageUrl"></v-text-field>
    <v-img v-if="imageUrl" :src="imageUrl" height="200" contain></v-img>
    <v-switch v-model="isDelete" label="Delete game" color="red" value="delete" hide-details></v-switch>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: this.game.name,
      isDelete: false,
      imageUrl: this.game.imageUrl,
      imageFile: null,
      fieldRules: [v => v.length <= 60 || "Field is too long"]
    };
  },
  methods: {
    ...mapActions("games", ["updateGame", "deleteGame"]),
    onSubmit() {
      const game = {
        name: this.name,
        imageUrl: this.imageUrl,
        id: this.game.id
      };
      if (this.isDelete) {
        this.deleteGame(game);
        return;
      }
      this.updateGame(game);
    }
  }
};
</script>
