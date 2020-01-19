<template>
  <div>
    <div v-if="games">
      <v-row>
        <v-col cols="4" v-for="(game, i) in games" :key="i" class="mb-6">
          <v-card>
            <v-img class="white--text align-end" height="350" :src="game.image">
              <div class="title-wrapp">
                <v-card-title>{{ game.name }}</v-card-title>
              </div>
            </v-img>
            <v-card-actions>
              <router-link class="mx-auto" :to="`/game/${game.id}`">
                <v-btn color="primary">Details</v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <game-add></game-add>
  </div>
</template>

<script>
import GameAdd from "@/components/GameAdd";
import db from "@/fb";

export default {
  components: {
    GameAdd
  },
  data() {
    return {
      games: null
    };
  },
  created() {
    db.database()
      .ref("games")
      .once("value")
      .then(data => {
        const games = [];
        const obj = data.val();
        for (let key in obj) {
          games.push({
            id: key,
            name: obj[key].name,
            image: obj[key].image
          });
        }
        this.games = games;
      });
  }
};
</script>

<style scoped lang="scss">
.title-wrapp {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
