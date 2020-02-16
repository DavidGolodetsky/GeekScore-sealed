
import fb from "@/fb";

export default {
    namespaced: true,
    state: {
        games: [],
    },
    mutations: {
        SET_LOADED_GAMES(state, payload) {
            state.games = payload
        },
        CREATE_GAME(state, payload) {
            state.games.push(payload)
        },
        UPDATE_GAME(state, payload) {
            const game = state.games.find(game => game.id === payload.id)
            if (payload.name) {
                game.name = payload.name
            }
            if (payload.imageUrl) {
                game.imageUrl = payload.imageUrl
            }
            if (payload.bggURL) {
                game.bggURL = payload.bggURL
            }
            if (payload.melodiceURL) {
                game.melodiceURL = payload.melodiceURL
            }
        },
        DELETE_GAME(state, payload) {
            state.games = state.games.filter(game => game.id !== payload)
        }
    },
    actions: {
        loadGames({ commit, rootState }) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            if (user) {
                fb.database().ref('users').child(user).child('games').once('value')
                    .then((data) => {
                        const games = []
                        const obj = data.val()
                        for (let key in obj) {
                            games.push({
                                id: key,
                                name: obj[key].name,
                                coop: obj[key].coop,
                                imageUrl: obj[key].imageUrl,
                                bggURL: obj[key].bggURL,
                                melodiceURL: obj[key].melodiceURL,
                                teams: obj[key].teams,
                            })
                        }
                        commit('SET_LOADED_GAMES', games)
                        commit('SET_LOADING', false, { root: true })
                    })
                    .catch((e) => {
                        commit('SET_LOADING', false, { root: true })
                        console.log(e)
                    })
            }
        },
        createGame({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const game = {
                ...payload,
            }
            game.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/geekstat-v.appspot.com/o/common%2Fgame.jpg?alt=media&token=033915e2-a403-499f-8c08-6edfe8462ec4'
            fb.database().ref('users').child(user).child('games').push(game)
                .then((data) => {
                    commit("CREATE_GAME", { ...game, id: data.key })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        updateGame({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const game = {
                name: payload.name,
                imageUrl: payload.imageUrl,
                melodiceURL: payload.melodiceURL,
                bggURL: payload.bggURL,
            }
            fb.database().ref('users').child(user).child('games').child(payload.id).update(game)
                .then(() => {
                    commit("UPDATE_GAME", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        deleteGame({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            fb.database().ref('users').child(user).child('games').child(payload.id).remove()
                .then(() => {
                    commit("DELETE_GAME", payload.id)
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
            return state.games
        },
        game(state) {
            return (gameId) => {
                return state.games.find((game) => {
                    return game.id === gameId
                })
            }
        },
    }
}