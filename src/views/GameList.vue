<template>
  <div v-if="games">
    <the-title title="Games" icon="cards" component="game-add-dialog" />
    <cards-list :items="games">
      <template #title="{ item }">
        <router-link
          :to="{name: 'game', params: {gameId: item.id}}"
          class="card-list-name"
        >{{ item.name }}</router-link>
        <game-edit-dialog :game="item" />
      </template>
    </cards-list>
  </div>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import GameEditDialog from "@/components/GameEditDialog";
import CardsList from "@/components/CardsList";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TheTitle,
    GameEditDialog,
    CardsList
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("games", ["games"]),
    ...mapGetters("user", ["user"])
  },
  created() {
    this.loadGames();
    this.clearBackTitle();
  },
  methods: {
    ...mapActions("games", ["loadGames"]),
    ...mapActions(["clearBackTitle"])
  }
};
</script>
