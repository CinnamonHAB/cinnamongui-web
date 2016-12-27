export const addObject = ({commit}, object) => {
  commit('ADD_OBJECT', object)
}

export const clearAll = ({commit}) => {
  commit('CLEAR_ALL')
}
