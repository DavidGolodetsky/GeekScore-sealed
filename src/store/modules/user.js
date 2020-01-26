import * as firebase from "firebase";


export default {
    namespaced: true,
    state: {
        user: null,
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
    },
    actions: {
        logout({ commit }) {
            firebase.auth().signOut()
            commit('SET_USER', null)
        },
        signUpUser({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            commit('CLEAR_ERROR', null, { root: true })
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('SET_LOADING', false, { root: true })
                        if (user.user) {
                            const newUser = {
                                id: user.user.uid,
                            }
                            commit('SET_USER', newUser)
                        }
                    }
                )
                .catch(
                    error => {
                        commit('SET_LOADING', false, { root: true })
                        commit('SET_ERROR', error, { root: true })
                    }
                )
        },
        signInUser({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            commit('CLEAR_ERROR', null, { root: true })
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('SET_LOADING', false, { root: true })
                        if (user.user) {
                            const loggedUser = {
                                id: user.user.uid,
                            }
                            commit('SET_USER', loggedUser)
                        }
                    }
                )
                .catch(
                    error => {
                        commit('SET_LOADING', false, { root: true })
                        commit('SET_ERROR', error, { root: true })
                    }
                )
        },
    },
    getters: {
        user(state) {
            return state.user
        },
    }
}