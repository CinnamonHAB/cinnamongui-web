let API_BASE = 'http://cinnamonhab.makkrnic.com:3000'

export const addObject = ({commit}, object) => {
  commit('ADD_OBJECT', object)
}

export const updateObject = ({commit}, object) => {
  commit('UPDATE_OBJECT', object)
}

export const clearAll = ({commit}) => {
  commit('CLEAR_ALL')
}

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
