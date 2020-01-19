import Vue from 'vue'
import VueRouter from 'vue-router'
import GameList from '../views/GameList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: GameList
  },
  {
    path: '/game/:id',
    name: 'game',
    component: () => import(/* webpackChunkName: "game" */ '../views/GameDetails.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
