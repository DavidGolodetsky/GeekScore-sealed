
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
        }
    },
    actions: {
        loadGames({ commit }) {
            commit('SET_LOADING', true, { root: true })
            fb.database().ref('games').once('value')
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
        },
        createGame({ commit }, payload) {
            let imageUrl;
            let key;
            let ext;
            commit('SET_LOADING', true, { root: true })

            fb.database().ref('games').push(payload)
                .then((data) => {
                    key = data.key;
                    return key

                })
                .then(key => {
                    const filename = payload.image.name
                    ext = filename.slice(filename.lastIndexOf('.'))
                    return fb.storage().ref(`games/${key}.${ext}`).put(payload.image)
                })
                .then(() => {
                    return fb.storage().ref(`games/${key}.${ext}`).getDownloadURL()
                })
                .then((url) => {
                    imageUrl = url
                    return fb.database().ref('games').child(key).update({ imageUrl: imageUrl })
                })
                .then(() => {
                    commit("CREATE_GAME", { ...payload, imageUrl: imageUrl, id: key })
                })
                .then(() => {
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