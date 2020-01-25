
import db from "@/fb";

export default {
    namespaced: true,
    state: {
        items: [],
    },
    mutations: {
        SET_LOADED_GAMES(state, payload) {
            state.items = payload
        },
        CREATE_GAME(state, payload) {
            state.items.push(payload)
        }
    },
    actions: {
        loadGames({ commit }) {
            commit('SET_LOADING', true, { root: true })
            db.database().ref('games').once('value')
                .then((data) => {
                    const items = []
                    const obj = data.val()
                    for (let key in obj) {
                        items.push({
                            id: key,
                            name: obj[key].name,
                            image: obj[key].image
                        })
                    }
                    commit('SET_LOADED_GAMES', items)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        createGame({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            db.database().ref('games').push(payload)
                .then((data) => {
                    const key = data.key;
                    commit("CREATE_GAME", { ...payload, id: key })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        }
    },
    getters: {
        games(state) {
            return state.items
        },
        game(state) {
            return (gameId) => {
                return state.items.find((item) => {
                    return item.id === gameId
                })
            }
        },
    }
}