<template>
  <div v-if="games">
    <the-head title="Games" icon="cards" component="game-add-dialog" />
    <div>
      <v-row>
        <v-col sm="6" md="4" cols="12" v-for="(game, i) in games" :key="i" class="mb-6">
          <v-lazy
            :options="{
          threshold: .5
        }"
            min-height="200"
            transition="fade-transition"
          >
            <transition-group appear name="fade-down">
              <v-card :key="game.id" raised class="mx-auto">
                <v-img
                  class="white--text align-end game-card"
                  lazy-src="#939123"
                  height="350"
                  :src="game.imageUrl"
                >
                  <div class="title-wrap">
                    <v-card-title class="d-flex align-center justify-space-between">
                      <router-link
                        class="game-name"
                        :to="{name: 'game', params: {gameId: game.id}}"
                      >{{ game.name }}</router-link>
                      <game-edit-dialog :game="game" />
                    </v-card-title>
                  </div>
                </v-img>
              </v-card>
            </transition-group>
          </v-lazy>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TheHead from "@/components/TheHead";
import GameEditDialog from "@/components/GameEditDialog";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TheHead,
    GameEditDialog
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

<style scoped lang="scss">
.title-wrap {
  background-color: rgba(0, 0, 0, 0.7);
}

.game-name {
  transition: 0.3s;
  color: #fff;
  &:hover {
    transition: 0.3s;
    color: $secondary;
  }
}
</style>
