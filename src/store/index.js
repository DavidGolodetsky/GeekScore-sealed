import Vue from 'vue'
import Vuex from 'vuex'
import db from "@/fb";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: []
  },
  mutations: {
    SET_LOADED_GAMES(state, payload) {
      state.games = payload
    },
    CREATE_GAME(state, payload) {
      state.games.push(payload)
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
  },
  actions: {
    loadGames({ commit }) {
      commit('SET_LOADING', true)
      db.database().ref('games').once('value')
        .then((data) => {
          const games = []
          const obj = data.val()
          for (let key in obj) {
            games.push({
              id: key,
              name: obj[key].name,
              image: obj[key].image
            })
          }
          commit('SET_LOADED_GAMES', games)
          commit('SET_LOADING', false)
        })
        .catch((e) => {
          commit('SET_LOADING', false)
          console.log(e)
        })
    },
    createGame({ commit }, payload) {
      const game = {
        name: payload.name,
        image: payload.image
      }
      db.database().ref('games').push(game)
        .then((data) => {
          const key = data.key;
          commit("CREATE_GAME", { ...game, id: key })
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
  getters: {
    games(state) {
      return state.games
    },
    game(state) {
      return (gameId) => {
        return state.games.find((game) => {
          return game.id === gameId
        })
      }
    },
    loading(state) {
      return state.loading
    },
  }
})