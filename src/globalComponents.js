import Vue from 'vue'

Vue.component('AppAlert',
    () => import(/* webpackChunkName: "appAlert" */  '@/components/AppAlert.vue')
)