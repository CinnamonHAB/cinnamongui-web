export const addObject = ({commit}, object) => {
  commit('ADD_OBJECT', object)
}

export const updateObject = ({commit}, object) => {
  commit('UPDATE_OBJECT', object)
}

export const clearAll = ({commit}) => {
  commit('CLEAR_ALL')
}
