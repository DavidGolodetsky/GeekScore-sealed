<template>
  <the-dialog activator="pencil" header="Edit round info" simple :submitLogic="onSubmit">
    <v-switch v-model="isDelete" label="Delete round" color="red" value="delete" hide-details></v-switch>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDelete: false
    };
  },
  methods: {
    ...mapActions("teams", ["deleteRound"]),
    onSubmit() {
      const round = {
        gameId: this.item.gameId,
        teamId: this.item.teamId,
        roundId: this.item.id
      };
      if (this.isDelete) {
        this.deleteRound(round);
      }
    }
  }
};
</script>
