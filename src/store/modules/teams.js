import db from "@/fb";

export default {
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
            const team = state.items.find((item) => item.id === payload.teamId)
            const match = {
                [payload.winner]: true,
                date: payload.date,
            }
            team.push(match)
        },
    },
    actions: {
        loadTeams({ commit }, payload) {
            commit('SET_LOADING', true)
            db.database().ref(`games/${payload}/teams/`).once('value')
                .then((data) => {
                    const items = []
                    const obj = data.val()
                    for (let key in obj) {
                        items.push({
                            id: key,
                            gameId: obj[key].gameId,
                            players: obj[key].players,
                            name: obj[key].name,
                        })
                    }
                    commit('SET_LOADED_TEAMS', items)
                    commit('SET_LOADING', false)
                })
                .catch((e) => {
                    commit('SET_LOADING', false)
                    console.log(e)
                })
        },
        createTeam({ commit }, payload) {
            commit('SET_LOADING', true)
            db.database().ref(`games/${payload.gameId}/teams/`).push(payload)
                .then((data) => {
                    const key = data.key;
                    commit("CREATE_TEAM", { ...payload, id: key })
                    commit('SET_LOADING', false)
                })
                .catch((e) => {
                    commit('SET_LOADING', false)
                    console.log(e)
                })
        },
        createMatch({ commit }, payload) {
            commit('SET_LOADING', true)
            const match = {
                [payload.winner]: true,
                date: payload.date
            }
            db.database().ref(`games/${payload.gameId}/teams/${payload.teamId}/matches/`).push(match)
                .then((data) => {
                    const key = data.key;
                    commit("CREATE_MATCH", { ...match, id: key, teamId: payload.teamId })
                    commit('SET_LOADING', false)
                })
                .catch((e) => {
                    commit('SET_LOADING', false)
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
        }
    }
}