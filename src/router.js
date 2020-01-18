import Vue from "vue";
import Router from 'vue-router';
import GameList from "./views/GameList";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: GameList
        },
        {
            path: "/:id",
            name: "game",
            component: () => import(/* webpackChunkName: "game" */"./views/GamePage")
        },
    ]
})