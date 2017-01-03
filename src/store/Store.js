import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions.js'

Vue.use(Vuex)

const state = {
  objects: {},
  activeObject: {},
  lastObject: {},
  lastUpdatedObject: {},

  devices: {},
  floorplan: {}
}

const getters = {
  objects: state => state.objects,
  lastObject: state => state.lastObject,
  lastUpdatedObject: state => state.lastUpdatedObject,

  devices: state => state.devices,
  floorplan: state => state.floorplan
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
    state.lastUpdatedObject = object
  },

  CLEAR_ALL (state) {
    state.objects = {}
    state.activeObject = null
    state.lastObject = null
  },

  SET_FLOORPLAN (state, floorplan) {
    state.floorplan = floorplan
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
