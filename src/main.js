// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import VueSweetalert2 from 'vue-sweetalert2';
  
Vue.use(VueSweetalert2);

import axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
