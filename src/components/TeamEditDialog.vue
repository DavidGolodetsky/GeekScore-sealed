<template>
  <the-dialog
    activator="pencil"
    color="#fff"
    header="Edit team info"
    simple
    :submitLogic="onSubmit"
  >
    <v-text-field :rules="fieldRules" label="Name" v-model="name"></v-text-field>
    <v-switch v-model="isDelete" label="Delete team" color="red" value="delete" hide-details></v-switch>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: this.team.name,
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
        teamId: this.team.id,
        gameId: this.team.gameId,
        name: this.team.name
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
