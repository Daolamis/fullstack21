import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterTxt = useSelector(state => state.filter)
  const dispatch = useDispatch()
  let notificationTimeout = useRef()

  const filtered = filterTxt
    ? anecdotes.filter(a => a.content.toUpperCase().indexOf(filterTxt.toUpperCase()) >= 0)
    : anecdotes

  const vote = (anecdote) => {
    clearTimeout(notificationTimeout.current)
    dispatch(addVote(anecdote.id));
    dispatch(showNotification(`you voted '${anecdote.content}'`))
    notificationTimeout.current = setTimeout(() => dispatch(hideNotification()), 5000)
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