
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
                                imageUrl: obj[key].imageUrl,
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
            if (payload.image) {
                let imageUrl;
                let key;
                let ext;

                fb.database().ref('users').child(user).child('games').push(payload)
                    .then((data) => {
                        key = data.key;
                        return key
                    })
                    .then(key => {
                        const filename = payload.image.name
                        ext = filename.slice(filename.lastIndexOf('.'))
                        return fb.storage().ref('users').child(user).child('games').child(`${key}.${ext}`).put(payload.image)
                    })
                    .then(() => {
                        return fb.storage().ref('users').child(user).child('games').child(`${key}.${ext}`).getDownloadURL()
                    })
                    .then((url) => {
                        imageUrl = url
                        return fb.database().ref('users').child(user).child('games').child(key).update({ imageUrl })
                    })
                    .then(() => {
                        commit("CREATE_GAME", { ...payload, imageUrl, id: key })
                        commit('SET_LOADING', false, { root: true })
                    })
                    .catch((e) => {
                        commit('SET_LOADING', false, { root: true })
                        console.log(e)
                    })
            } else {
                const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/geekstat-v.appspot.com/o/common%2Fgame.jpg?alt=media&token=033915e2-a403-499f-8c08-6edfe8462ec4'
                const game = {
                    ...payload,
                    imageUrl
                }
                fb.database().ref('users').child(user).child('games').push(game)
                    .then((data) => {
                        commit("CREATE_GAME", { ...game, id: data.key })
                        commit('SET_LOADING', false, { root: true })
                    })
                    .catch((e) => {
                        commit('SET_LOADING', false, { root: true })
                        console.log(e)
                    })
            }
        },
        updateGameInfo({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const info = {
                name: payload.name
            }
            fb.database().ref('users').child(user).child('games').child(payload.id).update(info)
                .then(() => {
                    commit("UPDATE_GAME", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        updateGameImage({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            const pictureName = payload.id + 1;
            let imageUrl
            fb.storage().ref('users').child(user).child('games').child(`${pictureName}.${ext}`).put(payload.image)
                .then(() => {
                    return fb.storage().ref('users').child(user).child('games').child(`${pictureName}.${ext}`).getDownloadURL()
                })
                .then((url) => {
                    imageUrl = url
                    return fb.database().ref('users').child(user).child('games').child(payload.id).update({ imageUrl })
                })
                .then(() => {
                    commit("UPDATE_GAME", { ...payload, imageUrl })
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
            fb.database().ref('users').child(user).child('games').child(payload).remove()
                .then(() => {
                    commit("DELETE_GAME", payload)
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