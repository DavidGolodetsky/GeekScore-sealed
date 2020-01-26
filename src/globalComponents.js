import Vue from 'vue'

Vue.component('TheAlert',
    () => import(/* webpackChunkName: "theAlert" */  '@/components/TheAlert.vue')
)