import Vue from 'vue';
import Router from 'vue-router';
import GameList from '@/views/GameList.vue';
import HomePage from '@/views/HomePage.vue';
import store from '@/store';
import AuthGuard from './auth-guard'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/games',
    name: 'games',
    component: GameList,
    beforeEnter: AuthGuard
  },
  {
    path: '/game/:gameId',
    name: 'game',
    props: true,
    component: () => import(/* webpackChunkName: "game" */ '../views/GameDetails.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters['user/user']) {
        next()
      } else {
        next({ name: "signIn" })
      }
      const isGame = store.getters['games/games'].find(game => game.id === to.params.gameId);
      if (isGame) {
        next()
      } else {
        next({ name: "NotFound" })
      }
    },
  },
  {
    path: "/signin",
    name: "signIn",
    component: () => import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue')
  },
  {
    path: "/signup",
    name: "signUp",
    component: () => import(/* webpackChunkName: "signUp" */ '../views/SignUp.vue')
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue')
  }
]

const router = new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    let position = { x: 0, y: 0 }
    if (savedPosition) {
      position = savedPosition
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(position)
      }, 300)
    })
  }
})

export default router
