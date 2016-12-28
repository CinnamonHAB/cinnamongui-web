import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions.js'

Vue.use(Vuex)

const state = {
  objects: {},
  activeObject: {},
  lastObject: {}
}

const getters = {
  objects: state => state.objects,
  lastObject: state => state.lastObject
}

var counter = 1

const mutations = {
  ADD_OBJECT (state, object) {
    if (object.id == null) {
      do {
        object.id = counter
        counter++
      } while (state.objects[object.id] != null)
    }

    state.objects[object.id] = object
    state.activeObject = object
    state.lastObject = object
  },

  UPDATE_OBJECT (state, object) {
    state.objects[object.id] = object
  },

  CLEAR_ALL (state) {
    state.objects = {}
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
