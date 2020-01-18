<template>
  <div v-if="games">
    <v-row>
      <v-col cols="4" v-for="(game, i) in games" :key="i" class="mb-6">
        <v-card>
          <v-img class="white--text align-end" height="350" :src="game.img">
            <div class="title-wrapp">
              <v-card-title>{{ game.name }}</v-card-title>
            </div>
          </v-img>
          <v-card-actions>
            <!-- <router-link class="mx-auto" :to="{ path: `/${game.gameId}` }">
              <v-btn color="primary">Details</v-btn>
            </router-link>-->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      games: [
        {
          name: "7 Wonders Duel",
          rating: "8.1",
          rank: "16",
          year: "2015",
          img:
            "https://cf.geekdo-images.com/imagepage/img/K29SesN_KgIUDX0O5y71nGX_GsQ=/fit-in/900x600/filters:no_upscale()/pic3376065.jpg"
        },
        {
          name: "Star Realms",
          rating: "7.6",
          rank: "99",
          year: "2014",
          img:
            "https://cf.geekdo-images.com/imagepage/img/izgzrVEpcwRH19gkna9oIb4xS_c=/fit-in/900x600/filters:no_upscale()/pic1903816.jpg"
        },
        {
          name: "Pathfinder Adventure Card Game: Rise of the Runelords",
          rating: "7.2",
          rank: "365",
          year: "2013",
          img:
            "https://cf.geekdo-images.com/imagepage/img/vFvF6lGpK289o9IRtpQ0fLJ9THE=/fit-in/900x600/filters:no_upscale()/pic1775517.jpg"
        }
      ]
    };
    // created() {
    // methods: {
    //   fetchGames() {
    //     axios
    //       .get("https://bgg-json.azurewebsites.net/collection/davidgol")
    //       .then(res => {
    //         this.games = res.filter(g => g.owned);
    //       });
    //   }
    // }
  }
};
</script>

<style scoped lang="scss">
.title-wrapp {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
