import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: [
      {
        name: "7 Wonders Duel",
        id: 1,
        rating: "8.1",
        rank: "16",
        year: "2015",
        img:
          "https://cf.geekdo-images.com/imagepage/img/K29SesN_KgIUDX0O5y71nGX_GsQ=/fit-in/900x600/filters:no_upscale()/pic3376065.jpg"
      },
      {
        name: "Star Realms",
        id: 2,
        rating: "7.6",
        rank: "99",
        year: "2014",
        img:
          "https://cf.geekdo-images.com/imagepage/img/izgzrVEpcwRH19gkna9oIb4xS_c=/fit-in/900x600/filters:no_upscale()/pic1903816.jpg"
      },
      {
        name: "Pathfinder Adventure Card Game: Rise of the Runelords",
        id: 3,
        rating: "7.2",
        rank: "365",
        year: "2013",
        img:
          "https://cf.geekdo-images.com/imagepage/img/vFvF6lGpK289o9IRtpQ0fLJ9THE=/fit-in/900x600/filters:no_upscale()/pic1775517.jpg"
      }
    ]
  },
  getters: {
    games(state) {
      return state.games
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
