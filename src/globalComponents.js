import Vue from 'vue'

Vue.component('TheAlert',
    () => import(/* webpackChunkName: "theAlert" */  '@/components/TheAlert.vue')
)

Vue.component(
    'TheDialog',
    () => import(/* webpackChunkName: "theDialog" */  '@/components/TheDialog.vue')
)