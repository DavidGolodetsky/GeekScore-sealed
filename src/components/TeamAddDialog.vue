<template>
  <the-dialog activator="plus" header="Add new team" button-text="New team" :submitLogic="onSubmit">
    <v-text-field :rules="fieldRules" prepend-icon="mdi-account-group" label="Name" v-model="name"></v-text-field>
    <v-select
      prepend-icon="mdi-account-multiple-plus"
      :rules="selectRules"
      :items="numberOfPlayers"
      @change="setPlayers"
      label="Number of players"
    ></v-select>
    <template v-if="players.length">
      <v-text-field
        v-for="(player, i) in players"
        v-model="player.name"
        prepend-icon="mdi-account"
        :rules="fieldRules"
        :key="i"
        :label="`Player #${i + 1}`"
      ></v-text-field>
    </template>
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
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: "",
      imageUrl: "",
      imageFile: null,
      numberOfPlayers: [2, 3, 4, 5, 6, 7, 8],
      players: [],
      fieldRules: [
        v => !!v || "Field is required",
        v => v.length <= 40 || "Field is too long"
      ],
      selectRules: [v => !!v || "Field is required"],
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
    ...mapActions("teams", ["createTeam"]),
    setPlayers(event) {
      this.players = [];
      for (let i = 0; i < event; i++) {
        let player = { name: "" };
        this.players.push(player);
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
      const team = {
        gameId: this.gameId,
        name: this.name,
        players: this.players
      };
      if (this.imageFile) {
        team.image = this.imageFile;
      }
      this.createTeam(team);
    }
  }
};
</script>
