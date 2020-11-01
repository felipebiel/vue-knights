import Vue from 'vue'
import Vuex from 'vuex'
import save from './modules/save'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    save,
  }
})
