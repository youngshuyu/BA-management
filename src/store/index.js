import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menuData: []
  },
  mutations,
  actions: {},
  modules: {},
  getters: {}
})
export default store
