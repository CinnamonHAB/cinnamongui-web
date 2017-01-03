let API_BASE = 'http://localhost:3000'

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
