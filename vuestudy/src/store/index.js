import Vue from 'vue'
import Vuex from 'vuex'
import User from './models/user'
import Auth from './models/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    User
  }
})
