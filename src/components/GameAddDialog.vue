<template>
  <the-dialog activator="plus" header="Add new game" :submitLogic="onSubmit">
    <v-text-field :rules="fieldRules" prepend-icon="mdi-cards-diamond" label="Name" v-model="name"></v-text-field>
    <v-file-input
      class="mb-2"
      :rules="showImageRules"
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
  data() {
    return {
      name: "",
      imageUrl: "",
      imageFile: null,
      fieldRules: [
        v => !!v || "Field is required",
        v => v.length <= 40 || "Field is too long"
      ],
      imageRules: [
        v => v.size < 2000000 || "Image size should be less than 2 MB"
      ]
    };
  },
  computed: {
    showImageRules() {
      return this.imageFile ? this.imageRules : [];
    }
  },
  methods: {
    ...mapActions("games", ["createGame"]),
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
        name: this.name
      };
      if (this.imageFile) {
        game.image = this.imageFile;
      }
      this.createGame(game);
    }
  }
};
</script>
