
import db from "@/fb";

export default {
    state: {
        items: [],
    },
    mutations: {
        SET_LOADED_GAMES(state, items) {
            state.items = items
        },
        CREATE_GAME(state, items) {
            state.items.push(items)
        }
    },
    actions: {
        loadGames({ commit }) {
            commit('SET_LOADING', true)
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