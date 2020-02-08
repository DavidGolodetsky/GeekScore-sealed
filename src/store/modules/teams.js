import fb from "@/fb";

export default {
    namespaced: true,
    state: {
        teams: []
    },
    mutations: {
        SET_TEAMS(state, payload) {
            state.teams = payload
        },
        CREATE_TEAM(state, payload) {
            state.teams.push(payload)
        },
        UPDATE_TEAM(state, payload) {
            const team = state.teams.find(team => team.id === payload.teamId)
            if (payload.name) {
                team.name = payload.name
            }
        },
        DELETE_TEAM(state, payload) {
            state.teams = state.teams.filter(team => team.id !== payload.teamId)
        },
        DELETE_ROUND(state, payload) {
            state.teams = state.teams.map(team => {
                const round = team.rounds[payload.roundId];
                if (round) delete team.rounds[payload.roundId];
                return { ...team }
            })
        },
        CREATE_ROUND(state, payload) {
            const team = state.teams.find((team) => team.id === payload.teamId);
            const round = {
                [payload.id]: payload
            }
            team.rounds = { ...team.rounds, ...round }
        },
    },
    actions: {
        setTeams({ commit, rootGetters }, payload) {
            const game = rootGetters['games/game'](payload)
            if (game.teams) {
                const teams = game.teams
                const filteredTeams = Object.keys(teams).map(key => {
                    return { ...teams[key], id: key }
                })
                commit("SET_TEAMS", filteredTeams)
            }
        },
        createTeam({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            if (payload.image) {
                let imageUrl;
                let key;
                let ext;
                fb.database().ref('users').child(user).child('games')
                    .child(payload.gameId)
                    .child('teams')
                    .push(payload)
                    .then((data) => {
                        key = data.key;
                        return key
                    })
                    .then(key => {
                        const filename = payload.image.name
                        ext = filename.slice(filename.lastIndexOf('.'))
                        return fb.storage().ref('users').child(user).child('teams').child(`${key}.${ext}`).put(payload.image)
                    })
                    .then(() => {
                        return fb.storage().ref('users').child(user).child('teams').child(`${key}.${ext}`).getDownloadURL()
                    })
                    .then((url) => {
                        imageUrl = url
                        return fb.database().ref('users').child(user).child('games').child(payload.gameId)
                            .child('teams').child(key).update({ imageUrl })
                    })
                    .then(() => {
                        commit("CREATE_TEAM", { ...payload, imageUrl, id: key })
                        commit('SET_LOADING', false, { root: true })
                    })
                    .catch((e) => {
                        commit('SET_LOADING', false, { root: true })
                        console.log(e)
                    })
            }
            else {
                const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/geekstat-v.appspot.com/o/common%2Fteam.jpg?alt=media&token=09c8ec54-cccf-4b40-a35b-84dbdaecdce2'
                const team = {
                    ...payload,
                    rounds: {},
                    imageUrl
                }
                fb.database().ref('users').child(user).child('games')
                    .child(payload.gameId)
                    .child('teams')
                    .push(team)
                    .then((data) => {
                        const key = data.key;
                        commit("CREATE_TEAM", { ...team, id: key })
                        commit('SET_LOADING', false, { root: true })
                    })
                    .catch((e) => {
                        commit('SET_LOADING', false, { root: true })
                        console.log(e)
                    })
            }
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
        teams(state) {
            return state.teams
        },
        team(state) {
            return (teamId) => {
                return state.teams.find((team) => {
                    return team.id === teamId
                })
            }
        },
        rounds(state) {
            return (teamId) => {
                const team = state.teams.find((team) => team.id === teamId)
                return team.rounds ? team.rounds : null
            }
        }
    }
}