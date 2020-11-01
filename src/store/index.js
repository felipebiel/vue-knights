import Vue from 'vue'
import Vuex from 'vuex'
import save from './modules/save'
import getList from './modules/getList'
import getRead from './modules/getRead'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    save,
    getList,
    getRead
  }
})
