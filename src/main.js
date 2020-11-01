import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

import axios from 'axios';

Vue.use(vuetify, {
  iconfont: 'md'
})

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
