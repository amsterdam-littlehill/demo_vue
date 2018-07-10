import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import getters from './getters'
import test from './modules/test'

Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    app,
    tagsView,
    permission,
    test
  },
  // strict: debug,
  getters
})

export default store
