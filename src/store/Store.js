import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions.js'

Vue.use(Vuex)

var store

const state = {
  devices: {},
  lastDevice: {},
  selectedDevice: null,
  floorplan: {},

  opacityFilter: null,

  canvasRedraw: false
}

const getters = {
  devices: state => state.devices,
  lastDevice: state => state.lastDevice,
  selectedDevice: state => state.selectedDevice,
  floorplan: state => state.floorplan,
  domain: state => state.floorplan.domain,
  opacityFilter: state => state.opacityFilter,

  canvasRedraw: state => state.canvasRedraw
}

const mutations = {

  SET_SELECTED_DEVICE (state, device) {
    state.selectedDevice = device
    store.commit('CANVAS_REDRAW')
  },

  SET_FLOORPLAN (state, floorplan) {
    state.floorplan = floorplan
    store.commit('CANVAS_REDRAW')
  },

  ADD_DEVICE (state, device) {
    state.floorplan.problem.device_definitions.push(device)
    state.lastDevice = device
    store.commit('CANVAS_REDRAW')
  },

  REMOVE_DEVICE (state, device) {
    var elementIndex = state.floorplan.problem.device_definitions.indexOf(device)
    if (elementIndex < 0) {
      console.error('device not found in local cache')
      return
    }

    state.floorplan.problem.device_definitions.splice(elementIndex, 1)
    store.commit('CANVAS_REDRAW')
  },

  REMOVE_ALL_DEVICES (state) {
    state.floorplan.problem.device_definitions = []
    store.commit('CANVAS_REDRAW')
  },

  SET_OPACITY_FILTER (state, filter) {
    state.opacityFilter = filter
    store.commit('CANVAS_REDRAW')
  },

  CANVAS_REDRAW (state) {
    state.canvasRedraw = !state.canvasRedraw
  }
}

store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
