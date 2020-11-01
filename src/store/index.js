import Vue from 'vue'
import Vuex from 'vuex'
import save from './modules/save'
import getList from './modules/getList'
import getRead from './modules/getRead'
import deleteRecord from './modules/deleteRecord'
import edit from './modules/edit'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    save,
    getList,
    getRead,
    deleteRecord,
    edit
  }
})
