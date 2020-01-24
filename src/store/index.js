import Vue from 'vue'
import Vuex from 'vuex'
import games from "./modules/games"
import teams from "./modules/teams"


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    games,
    teams
  },
  state: {
    loading: true,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
  },
  actions: {
  },
  getters: {
    loading(state) {
      return state.loading
    },
  }
})