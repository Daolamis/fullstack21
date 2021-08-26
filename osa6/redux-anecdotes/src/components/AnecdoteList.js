import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterTxt = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const filtered = filterTxt
    ? anecdotes.filter(a => a.content.toUpperCase().indexOf(filterTxt.toUpperCase()) >= 0)
    : anecdotes

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return filtered.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList