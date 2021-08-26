import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  let notificationTimeout = useRef()

  const vote = (anecdote) => {
    clearTimeout(notificationTimeout.current)
    dispatch(addVote(anecdote.id));
    dispatch(showNotification(`you voted '${anecdote.content}'`))
    notificationTimeout.current = setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return anecdotes.map(anecdote =>
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