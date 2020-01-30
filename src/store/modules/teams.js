import fb from "@/fb";

export default {
    namespaced: true,
    state: {
        items: []
    },
    mutations: {
        SET_LOADED_TEAMS(state, payload) {
            state.items = payload
        },
        CREATE_TEAM(state, payload) {
            state.items.push(payload)
        },
        CREATE_MATCH(state, payload) {
            const team = state.items.find((item) => item.id === payload.teamId);
            const match = {
                [payload.id]: payload
            }
            team.matches = { ...team.matches, ...match }
        },
    },
    actions: {
        loadTeams({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            fb.database().ref(`games/${payload}/teams/`).once('value')
                .then((data) => {
                    const items = []
                    const obj = data.val()
                    for (let key in obj) {
                        items.push({
                            id: key,
                            gameId: obj[key].gameId,
                            players: obj[key].players,
                            matches: obj[key].matches,
                            name: obj[key].name,
                        })
                    }
                    commit('SET_LOADED_TEAMS', items)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        createTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            fb.database().ref(`games/${payload.gameId}/teams/`).push(payload)
                .then((data) => {
                    const key = data.key;
                    commit("CREATE_TEAM", { ...payload, id: key, matches: {} })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        createMatch({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            fb.database().ref(`games/${payload.gameId}/teams/${payload.teamId}/matches/`).push(payload)
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
        teamsPerGame(state) {
            return (gameId) => {
                return state.items.filter((item) => {
                    return item.gameId === gameId
                })
            }
        },
        team(state) {
            return (teamId) => {
                return state.items.find((item) => {
                    return item.id === teamId
                })
            }
        },
        matches(state) {
            return (teamId) => {
                const team = state.items.find((item) => item.id === teamId)
                return team.matches ? team.matches : null
            }
        }
    }
}