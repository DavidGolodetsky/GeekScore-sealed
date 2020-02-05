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
        UPDATE_TEAM(state, payload) {
            const team = state.items.find(team => team.id === payload.teamId)
            if (payload.name) {
                team.name = payload.name
            }
        },
        DELETE_TEAM(state, payload) {
            state.items = state.items.filter(team => team.id !== payload.teamId)
        },
        DELETE_ROUND(state, payload) {
            const team = state.items.find(team => team.id === payload.teamId)
            delete team.rounds[payload.roundId]
            state.items = state.items.filter(team => team.id !== payload.teamId)
            state.items.push(team)
        },
        CREATE_ROUND(state, payload) {
            const team = state.items.find((item) => item.id === payload.teamId);
            const round = {
                [payload.id]: payload
            }
            team.rounds = { ...team.rounds, ...round }
        },
    },
    actions: {
        loadTeams({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            fb.database().ref('users').child(user).child('games')
                .child(payload)
                .child('teams')
                .once('value')
                .then((data) => {
                    const items = []
                    const obj = data.val()
                    for (let key in obj) {
                        items.push({
                            id: key,
                            gameId: obj[key].gameId,
                            gameName: obj[key].gameName,
                            players: obj[key].players,
                            rounds: obj[key].rounds,
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
        createTeam({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            fb.database().ref('users').child(user).child('games')
                .child(payload.gameId)
                .child('teams')
                .push(payload)
                .then((data) => {
                    const key = data.key;
                    commit("CREATE_TEAM", { ...payload, id: key, rounds: {} })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        updateTeam({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const updatedTeam = {
                name: payload.name
            }
            fb.database().ref('users').child(user).child('games').child(payload.gameId).child('teams').child(payload.teamId).update(updatedTeam)
                .then(() => {
                    commit("UPDATE_TEAM", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        deleteTeam({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            fb.database().ref('users').child(user).child('games').child(payload.gameId).child('teams').child(payload.teamId).remove()
                .then(() => {
                    commit("DELETE_TEAM", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })

        },
        deleteRound({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            fb.database().ref('users').child(user).child('games').child(payload.gameId).child('teams').child(payload.teamId).child('rounds').child(payload.roundId).remove()
                .then(() => {
                    commit("DELETE_ROUND", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })

        },
        createRound({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            fb.database().ref('users').child(user).child('games')
                .child(payload.gameId)
                .child('teams')
                .child(payload.teamId)
                .child('rounds')
                .push(payload)
                .then((data) => {
                    const key = data.key;
                    commit("CREATE_ROUND", { ...payload, id: key })
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
        rounds(state) {
            return (teamId) => {
                const team = state.items.find((item) => item.id === teamId)
                return team.rounds ? team.rounds : null
            }
        }
    }
}