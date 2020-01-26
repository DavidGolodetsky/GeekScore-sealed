import Vue from 'vue'
import Vuex from 'vuex'
import games from "./modules/games"
import teams from "./modules/teams"
import user from "./modules/user"


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    games,
    teams,
    user
  },
  state: {
    loading: true,
    error: null,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  actions: {
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})