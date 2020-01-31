<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add game</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Game description</span>
        </v-card-title>
        <v-form v-model="valid" lazy-validation ref="form" @submit.prevent="onSubmit">
          <v-card-text>
            <v-container>
              <v-text-field :rules="fieldRules" required label="Name" v-model="name"></v-text-field>
              <v-file-input
                class="mb-2"
                :rules="imageRules"
                required
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-image"
                label="Image"
                @change="onFileUpload($event)"
              ></v-file-input>
              <v-img v-if="imageUrl" :src="imageUrl" height="200" contain></v-img>
              <p class="app-error" v-if="error">{{ error }}</p>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn color="blue darken-1" text type="submit" :disabled="!valid">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  propps: {},
  data() {
    return {
      dialog: false,
      name: "",
      error: "",
      imageUrl: "",
      valid: true,
      imageFile: null,
      fieldRules: [
        v => !!v || "Field is required",
        v => v.length <= 40 || "Field must be less than 20 characters"
      ],
      imageRules: [
        v => !!v || "Field is required",
        v => (v && v.size < 2000000) || "Image size should be less than 2 MB!"
      ]
    };
  },
  methods: {
    ...mapActions("games", ["createGame"]),
    validateForm() {
      let form = this.$refs.form;
      if (form.validate()) {
        return true;
      }
    },
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
      if (this.validateForm()) {
        const game = {
          name: this.name,
          image: this.imageFile
        };
        this.createGame(game);
        this.close();
      }
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>
