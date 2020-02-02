<template>
  <the-dialog :activator="'pencil'" :header="'Edit team info'" :submitLogic="onSubmit">
    <v-text-field :rules="fieldRules" label="Name" v-model="name"></v-text-field>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    teamId: {
      type: String,
      required: true
    },
    gameId: {
      type: String,
      required: true
    },
    teamName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: this.teamName,
      fieldRules: [
        v => !!v || "Field is required",
        v => v.length <= 60 || "Field is too long"
      ]
    };
  },
  methods: {
    ...mapActions("teams", ["updateTeam"]),
    onSubmit() {
      const team = {
        teamId: this.teamId,
        gameId: this.gameId,
        name: this.name
      };
      this.updateTeam(team);
    }
  }
};
</script>
