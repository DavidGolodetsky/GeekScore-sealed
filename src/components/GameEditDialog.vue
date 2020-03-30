<template>
  <the-dialog
    activator="pencil"
    color="#fff"
    header="Edit game info"
    simple
    :submitLogic="onSubmit"
  >
    <v-text-field
      clearable
      :rules="fieldRules"
      prepend-icon="mdi-dice-multiple"
      label="Name"
      v-model="name"
    ></v-text-field>
    <v-text-field
      clearable
      :rules="linkRules"
      label="Board geek game URL"
      prepend-icon="mdi-cards"
      v-model="bggURL"
    ></v-text-field>
    <v-text-field
      clearable
      :rules="linkRules"
      label="Melodice URL"
      prepend-icon="mdi-music"
      v-model="melodiceURL"
    ></v-text-field>
    <v-text-field
      clearable
      :rules="linkRules"
      label="Rules URL"
      prepend-icon="mdi-book-open-variant"
      v-model="rulesURL"
    ></v-text-field>
    <v-text-field
      clearable
      :rules="linkRules"
      prepend-icon="mdi-image"
      label="Image URL"
      v-model="imageUrl"
    ></v-text-field>
    <v-file-input
      clearable
      class="mb-2"
      :rules="showImageRules"
      accept="image/png, image/jpeg, image/bmp"
      prepend-icon="mdi-image"
      label="Image"
      @change="onFileUpload($event)"
    ></v-file-input>
    <v-img v-if="imageUrl" :src="imageUrl" height="200" contain></v-img>
    <v-switch
      v-model="isDelete"
      label="Delete game"
      color="error"
      hide-details
    ></v-switch>
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
      imageFile: null,
      bggURL: this.game.bggURL ? this.game.bggURL : "",
      melodiceURL: this.game.melodiceURL ? this.game.melodiceURL : "",
      rulesURL: this.game.rulesURL ? this.game.rulesURL : "",
      isDelete: false,
      imageUrl: this.game.imageUrl,
      fieldRules: [v => (!!v && v.length <= 60) || "Field is too long"],
      linkRules: [
        v => {
          if (v) {
            const link = v.match(/(https?:\/\/[^\s]+)/g);
            return !!link || "Please provide a correct link";
          } else return true;
        }
      ],
      imageRules: [
        v =>
          (v ? v.size < 2000000 : true) || "Image size should be less than 2 MB"
      ]
    };
  },
  computed: {
    showImageRules() {
      return this.imageFile ? this.imageRules : [];
    }
  },
  methods: {
    ...mapActions("games", ["updateGame", "deleteGame"]),
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
        this.imageFile = null;
      }
    },
    onSubmit() {
      const game = {
        name: this.name,
        image: this.imageFile,
        id: this.game.id,
        bggURL: this.bggURL,
        melodiceURL: this.melodiceURL,
        rulesURL: this.rulesURL
      };
      if (this.isDelete) {
        this.deleteGame(game);
        return;
      }
      if (this.imageFile) {
        const imageName = this.imageFile.name;
        game.ext = imageName.slice(imageName.lastIndexOf("."));
        this.updateTeamImage(game);
      } else {
        this.updateGame(game);
      }
    }
  }
};
</script>
