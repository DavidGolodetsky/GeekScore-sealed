<template>
  <the-dialog activator="plus" header="Add new game" :submitLogic="onSubmit">
    <v-text-field
      clearable
      :rules="fieldRules"
      prepend-icon="mdi-cards-diamond"
      label="Name"
      v-model="name"
    ></v-text-field>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
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
      this.createGame(game);
    }
  }
};
</script>
