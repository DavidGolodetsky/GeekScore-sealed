<template>
  <div>
    <game-add-dialog />
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
              <v-card :key="i">
                <v-img class="white--text align-end" height="350" :src="game.imageUrl">
                  <div class="title-wrapp">
                    <v-card-title>{{ game.name }}</v-card-title>
                  </div>
                </v-img>
                <v-card-actions>
                  <router-link class="mx-auto" :to="{name: 'game', params: {gameId: game.id}}">
                    <v-btn color="primary">Details</v-btn>
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
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    GameAddDialog
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
