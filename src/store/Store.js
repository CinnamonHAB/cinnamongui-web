import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions.js'

Vue.use(Vuex)

const state = {
  objects: [],
  activeObject: {},
  lastObject: {}
}

const getters = {
  lastObject: state => state.lastObject
}

const mutations = {
  ADD_OBJECT (state, object) {
    state.objects.push(object)
    state.activeObject = object
    state.lastObject = object
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
