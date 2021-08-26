

const reducer = (state = '', action) => {
  if (action.type === 'ADD_FILTER') {
    return action.filter;
  }
  return state;
}

export default reducer

export const addFilter = (text) => {
  return {
    type: 'ADD_FILTER',
    filter: text
  }
}