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
  lastDevice: {},
  selectedDevice: null,
  floorplan: {}
}

const getters = {
  objects: state => state.objects,
  lastObject: state => state.lastObject,
  lastUpdatedObject: state => state.lastUpdatedObject,

  devices: state => state.devices,
  lastDevice: state => state.lastDevice,
  selectedDevice: state => state.selectedDevice,
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

  SET_SELECTED_DEVICE (state, device) {
    console.log('setting selected device')
    state.selectedDevice = device
  },

  SET_FLOORPLAN (state, floorplan) {
    state.floorplan = floorplan
  },

  ADD_DEVICE (state, device) {
    state.floorplan.problem.device_definitions.push(device)
    state.lastDevice = device
  },

  REMOVE_DEVICE (state, device) {
    var elementIndex = state.floorplan.problem.device_definitions.indexOf(device)
    if (elementIndex < 0) {
      console.error('device not found in local cache')
      return
    }

    state.floorplan.problem.device_definitions.splice(elementIndex, 1)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
