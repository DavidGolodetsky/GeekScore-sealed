<template>
  <the-dialog activator="plus" header="Add new round" :submitLogic="onSubmit">
    <v-radio-group class="mb-4" :rules="fieldRules" v-model="result">
      <v-radio
        v-for="(player, i) in players"
        :key="i"
        :label="player.name"
        :value="player.name"
      ></v-radio>
      <v-radio label="Draw" value="draw"></v-radio>
    </v-radio-group>
    <v-row justify="center">
      <v-menu
        v-model="datepicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            :rules="fieldRules"
            label="Date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="datepicker = false"
        ></v-date-picker>
      </v-menu>
    </v-row>
    <v-row>
      <v-textarea
        label="Comment"
        v-model="comment"
        auto-grow
        filled
        clearable
        prepend-icon="mdi-comment"
      ></v-textarea>
    </v-row>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    players: {
      type: Array,
      required: true
    },
    teamId: {
      type: String,
      required: true
    },
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      datepicker: false,
      comment: "",
      result: null,
      date: new Date().toISOString().substr(0, 10),
      fieldRules: [v => !!v || "Field is required"]
    };
  },
  methods: {
    ...mapActions("teams", ["createRound"]),
    onSubmit() {
      const round = this.cookRound();
      this.createRound(round);
    },
    cookRound() {
      const round = {
        date: this.date,
        gameId: this.gameId,
        teamId: this.teamId,
        comment: this.comment
      };
      if (this.result === "draw") {
        round.draw = "DRAW";
      } else {
        round[this.result.toLowerCase()] = "VICTORY";
      }
      return round;
    }
  }
};
</script>
