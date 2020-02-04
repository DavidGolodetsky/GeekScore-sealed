import fb from "@/fb";

export default {
    namespaced: true,
    state: {
        items: []
    },
    mutations: {
        CREATE_MATCH(state, payload) {
            const team = state.items.find((item) => item.id === payload.teamId);
            const match = {
                [payload.id]: payload
            }
            team.matches = { ...team.matches, ...match }
        },
    },
    actions: {
        createMatch({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            fb.database().ref('users').child(user).child('games')
                .child(payload.gameId)
                .child('teams')
                .child(payload.teamId)
                .child('matches')
                .push(payload)
                .then((data) => {
                    const key = data.key;
                    commit("CREATE_MATCH", { ...payload, id: key })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
    },
    getters: {
        matches(state) {
            return (teamId) => {
                const team = state.items.find((item) => item.id === teamId)
                return team.matches ? team.matches : null
            }
        }
    }
}