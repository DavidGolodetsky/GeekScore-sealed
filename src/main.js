import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import router from './router';
import store from './store'
import '@/globalComponents'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')


const shouldSW = 'serviceWorker' in navigator
const prod = process.env.NODE_ENV === 'production'
if (shouldSW && prod) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('Service worker have been register!')
  })
}