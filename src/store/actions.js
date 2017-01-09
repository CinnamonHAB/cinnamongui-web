let API_BASE = 'http://localhost:3000'

export const fetchFloorplan = ({$http}, {commit}) => {
  return $http.get(API_BASE + '/floorplans').then((response) => {
    if (response.body.length === 0) {
      return Promise.reject('No floorplans')
    }

    var fpId = response.body[0].id

    return $http.get(API_BASE + '/floorplans/' + fpId).then((response) => {
      var floorplan = response.body
      commit('SET_FLOORPLAN', floorplan)
      return floorplan
    })
  })
}

export const selectDevice = ({commit, getters}, id) => {
  var deviceDefinition = getters.floorplan.problem.device_definitions.filter(function (dd) {
    return dd.id === id
  })[0]

  commit('SET_SELECTED_DEVICE', deviceDefinition)
}

export const deselectDevice = ({commit}) => {
  commit('SET_SELECTED_DEVICE', null)
}

export const addDevice = function ({ $resource }, {commit, getters}, device) {
  var floorplan = getters.floorplan

  var resource = $resource(API_BASE + '/floorplans/' + floorplan.id + '/problems/_/device_definitions')
  return resource.save({}, {device_definition: device}).then(function (resp) {
    var dev = resp.body
    commit('ADD_DEVICE', dev)
  })
}

export const updateDevice = function ({ $resource }, {commit, getters}, device) {
  var floorplan = getters.floorplan

  var resource = $resource(API_BASE + '/floorplans/' + floorplan.id + '/problems/_/device_definitions{/id}')
  return resource.update({id: device.id}, {device_definition: device}).then(function (resp) {
    // var dev = resp.body
    // commit('ADD_DEVICE', dev)
  })
}

export const deleteDevice = function ({ $resource }, { commit, getters }, device) {
  var floorplan = getters.floorplan

  var resource = $resource(API_BASE + '/floorplans/' + floorplan.id + '/problems/_/device_definitions{/id}')
  return resource.remove({id: device.id}).then(function (resp) {
    commit('REMOVE_DEVICE', device)
  })
}

export const deleteAllDevices = function ({ $resource }, { commit, getters }) {
  var floorplan = getters.floorplan

  var resource = $resource(API_BASE + '/floorplans/' + floorplan.id + '/problems/_/device_definitions{/id}')
  return resource.remove({id: '*'}).then(function (resp) {
    commit('REMOVE_ALL_DEVICES')
  })
}

export const setOpacityFilter = function ({ commit }, filter) {
  commit('SET_OPACITY_FILTER', filter)
}

export const canvasRedraw = function ({ commit }) {
  commit('CANVAS_REDRAW')
}

export const fetchLinkDefinitions = ({ $http, $resource }, {commit}) => {
  return $http.get(API_BASE + '/floorplans').then((response) => {
    if (response.body.length === 0) {
      return Promise.reject('No floorplans')
    }

    var fpId = response.body[0].id

    var linkDefinitionResource = $resource(API_BASE + '/floorplans/' + fpId + '/problems/_/link_definitions')

    return linkDefinitionResource.get().then((response) => {
      console.log(response)
      var linkDefinitions = response.body
      commit('SET_LINK_DEFINITIONS', linkDefinitions)
      return linkDefinitions
    })
  })
}

export const deleteLinkDefinition = ({ $resource }, { commit, getters }, linkDefinition) => {
  var floorplan = getters.floorplan
  var resource = $resource(API_BASE + '/floorplans/' + floorplan.id + '/problems/_/link_definitions{/id}')
  return resource.remove({id: linkDefinition.id}).then(function (resp) {
    commit('REMOVE_LINK_DEFINITION', linkDefinition)
  })
}
