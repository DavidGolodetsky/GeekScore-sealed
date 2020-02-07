<template>
  <div>
    <the-title title="Teams" icon="account-group" :props="{game}" component="team-add-dialog" />
    <cards-list v-if="teams.length" :items="teams">
      <template #title="{ item }">
        <!-- <router-link
          :to="{name: 'game', params: {gameId: item.id}}"
          class="card-list-name"
        >{{ item.name }}</router-link>-->
        <team-edit-dialog :team="item" />
      </template>
    </cards-list>
  </div>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import TeamEditDialog from "@/components/TeamEditDialog";
import CardsList from "@/components/CardsList";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TheTitle,
    TeamEditDialog,
    CardsList
  },
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("games", { getGame: "game" }),
    ...mapGetters("teams", ["teams"]),
    ...mapGetters("user", ["user"]),
    // TODO: do I need game?
    game() {
      return this.getGame(this.gameId);
    }
  },
  created() {
    this.setTeams(this.gameId);
  },
  methods: {
    ...mapActions("teams", ["setTeams"])
  }
};
</script>

<style lang="scss">
.title-wrap {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
