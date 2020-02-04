
import fb from "@/fb";

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
        },
        UPDATE_GAME(state, payload) {
            const game = state.items.find(game => game.id === payload.id)
            if (payload.name) {
                game.name = payload.name
            }
            if (payload.imageUrl) {
                game.imageUrl = payload.imageUrl
            }
        },
        DELETE_GAME(state, payload) {
            state.items = state.items.filter(game => game.id !== payload)
        }
    },
    actions: {
        loadGames({ commit, rootState }) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            if (user) {
                fb.database().ref('users').child(user).child('games').once('value')
                    .then((data) => {
                        const items = []
                        const obj = data.val()
                        for (let key in obj) {
                            items.push({
                                id: key,
                                name: obj[key].name,
                                imageUrl: obj[key].imageUrl
                            })
                        }
                        commit('SET_LOADED_GAMES', items)
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
            let imageUrl;
            let key;
            let ext;
            const user = rootState.user.user.id
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
                })
                .then(() => {
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
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