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
  objects: state => state.objects,
  lastObject: state => state.lastObject
}

const mutations = {
  ADD_OBJECT (state, object) {
    state.objects.push(object)
    state.activeObject = object
    state.lastObject = object
  },

  CLEAR_ALL (state) {
    state.objects.length = 0
    state.activeObject = null
    state.lastObject = null
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
