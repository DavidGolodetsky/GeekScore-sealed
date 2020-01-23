import db from "@/fb";

export default {
    state: {
        items: []
    },
    mutations: {
        SET_LOADED_TEAMS(state, items) {
            state.items = items
        },
        CREATE_TEAM(state, items) {
            state.items.push(items)
        },
    },
    actions: {
        loadTeams({ commit }, gameId) {
            commit('SET_LOADING', true)
            db.database().ref(`games/${gameId}/teams/`).once('value')
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
        }
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