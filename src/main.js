import Vue from 'vue';
import App from './App';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueOffline from 'vue-offline';
import VueGtag from "vue-gtag";
import '@/globalComponents';

Vue.config.productionTip = false

Vue.use(
  VueOffline, {
  mixin: false,
  storage: false
})

Vue.use(
  VueGtag, {
  config: { id: "UA-164228749-1" }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

