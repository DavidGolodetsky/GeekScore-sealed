import Vue from 'vue'
import Vuex from 'vuex'
import db from "@/fb";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: [],
    teams: [],
    loading: true,
  },
  mutations: {
    SET_LOADED_GAMES(state, payload) {
      state.games = payload
    },
    CREATE_GAME(state, payload) {
      state.games.push(payload)
    },
    CREATE_TEAM(state, payload) {
      state.teams.push(payload)
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
      commit('SET_LOADING', true)
      db.database().ref('games').push(payload)
        .then((data) => {
          const key = data.key;
          commit("CREATE_GAME", { ...payload, id: key })
          commit('SET_LOADING', false)
        })
        .catch((e) => {
          commit('SET_LOADING', false)
          console.log(e)
        })
    },
    createTeam({ commit }, payload) {
      commit('SET_LOADING', true)
      const team = {
        name: payload.name,
        players: payload.players
      }
      console.log(payload.gameId)
      db.database().ref(`games/${payload.gameId}/teams/`).push(team)
        .then((data) => {
          const key = data.key;
          commit("CREATE_TEAM", { ...team, id: key })
          commit('SET_LOADING', false)
        })
        .catch((e) => {
          commit('SET_LOADING', false)
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
    teams(state) {
      return state.teams
    },
    loading(state) {
      return state.loading
    },
  }
})