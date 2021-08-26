import anecdoteService from '../services/anecdotes'

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

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create({ content, votes: 0 })
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const data = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'ADD_VOTE',
      data: { id: data.id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data
    })
  }
}

export default reducer