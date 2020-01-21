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
    SET_LOADED_GAMES(state, games) {
      state.games = games
    },
    SET_LOADED_TEAMS(state, teams) {
      state.teams = teams
    },
    CREATE_GAME(state, games) {
      state.games.push(games)
    },
    CREATE_TEAM(state, teams) {
      state.teams.push(teams)
    },
    SET_LOADING(state, loading) {
      state.loading = loading
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
    loadTeams({ commit }, gameId) {
      commit('SET_LOADING', true)
      db.database().ref(`games/${gameId}/teams/`).once('value')
        .then((data) => {
          const teams = []
          const obj = data.val()
          for (let key in obj) {
            teams.push({
              id: key,
              gameId: obj[key].gameId,
              players: obj[key].players,
              name: obj[key].name,
            })
          }
          commit('SET_LOADED_TEAMS', teams)
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
      db.database().ref(`games/${payload.gameId}/teams/`).push(payload)
        .then((data) => {
          const key = data.key;
          commit("CREATE_TEAM", { ...payload, id: key })
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
    teamsPerGame(state) {
      return (gameId) => {
        return state.teams.filter((team) => {
          return team.gameId === gameId
        })
      }
    },
    team(state) {
      return (teamId) => {
        return state.teams.find((team) => {
          return team.id === teamId
        })
      }
    },
    loading(state) {
      return state.loading
    },
  }
})