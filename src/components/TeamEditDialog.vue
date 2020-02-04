<template>
  <the-dialog :activator="'pencil'" :header="'Edit team info'" :submitLogic="onSubmit">
    <v-text-field :rules="fieldRules" label="Name" v-model="name"></v-text-field>
    <v-switch v-model="isDelete" label="Delete team" color="red" value="delete" hide-details></v-switch>
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
      isDelete: false,
      fieldRules: [
        v => !!v || "Field is required",
        v => v.length <= 60 || "Field is too long"
      ]
    };
  },
  methods: {
    ...mapActions("teams", ["updateTeam", "deleteTeam"]),
    onSubmit() {
      const team = {
        teamId: this.teamId,
        gameId: this.gameId,
        name: this.name
      };
      if (this.isDelete) {
        this.deleteTeam(team);
      } else {
        this.updateTeam(team);
      }
    }
  }
};
</script>
