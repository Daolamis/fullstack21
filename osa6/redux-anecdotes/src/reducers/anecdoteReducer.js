const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const anecdote = state.find(a => a.id === action.data.id)
      const tmpState = state.map(a => a.id !== action.data.id ? a : { ...anecdote, votes: a.votes + 1 })
      return tmpState.sort((e1, e2) => e2.votes - e1.votes)
    case 'NEW_ANECDOTE':
      return [...state, { ...action.data }]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      break;
  }
  return state
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default reducer