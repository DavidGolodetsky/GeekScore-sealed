import Vue from 'vue'

Vue.component('TheAlert',
    () => import(/* webpackChunkName: "theAlert" */  '@/components/TheAlert.vue')
)

Vue.component(
    'TheDialog',
    () => import(/* webpackChunkName: "theDialog" */  '@/components/TheDialog.vue')
)

Vue.component(
    'TheGoBack',
    () => import(/* webpackChunkName: "theGoBack" */  '@/components/TheGoBack.vue')
)