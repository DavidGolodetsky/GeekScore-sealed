<template>
  <div>
    <v-row justify="end">
      <v-col cols="1">
        <game-add-dialog />
      </v-col>
    </v-row>
    <div v-if="games">
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
              <v-card :key="game.id">
                <v-img
                  class="white--text align-end"
                  lazy-src="https://picsum.photos/id/307/5760/3840"
                  height="350"
                  :src="game.imageUrl"
                >
                  <div class="title-wrapp">
                    <v-card-title>{{ game.name }}</v-card-title>
                  </div>
                </v-img>
                <v-card-actions>
                  <game-edit-dialog />
                  <v-spacer />
                  <router-link class="mx-auto" :to="{name: 'game', params: {gameId: game.id}}">
                    <v-btn outlined fab class="mx-2" dark color="primary">
                      <v-icon dark>mdi-information-variant</v-icon>
                    </v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
            </transition-group>
          </v-lazy>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import GameAddDialog from "@/components/GameAddDialog";
import GameEditDialog from "@/components/GameEditDialog";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    GameAddDialog,
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
  },
  methods: {
    ...mapActions("games", ["loadGames"])
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrapp {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
