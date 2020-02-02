<template>
  <the-dialog :activator="'pencil'" :header="'Edit game info'" :submitLogic="onSubmit">
    <v-text-field :rules="fieldRules" label="Name" v-model="name"></v-text-field>
    <v-file-input
      class="mb-2"
      :rules="imageFile ? imageRules : []"
      accept="image/png, image/jpeg, image/bmp"
      prepend-icon="mdi-image"
      label="Image"
      @change="onFileUpload($event)"
    ></v-file-input>
    <v-img v-if="imageUrl" :src="imageUrl" height="200" contain></v-img>
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
      imageUrl: this.game.imageUrl,
      imageFile: null,
      fieldRules: [v => v.length <= 60 || "Field is too long"],
      imageRules: [
        v => (v && v.size < 2000000) || "Image size should be less than 2 MB"
      ]
    };
  },
  methods: {
    ...mapActions("games", ["updateGameImage", "updateGameInfo"]),
    onFileUpload(file) {
      if (file) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(file);
        this.imageFile = file;
      } else {
        this.imageUrl = "";
      }
    },
    onSubmit() {
      const game = {
        name: this.name,
        image: this.imageFile,
        id: this.game.id
      };
      if (game.name) {
        this.updateGameInfo(game);
      }
      if (game.image) {
        this.updateGameImage(game);
      }
    }
  }
};
</script>
