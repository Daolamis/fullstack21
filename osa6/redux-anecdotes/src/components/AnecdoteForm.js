import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault()
    const newAnecdote = await anecdoteService.create({      
      content: e.target.anecdote.value,
      votes: 0
    })
    dispatch(createAnecdote(newAnecdote));
    e.target.anecdote.value = '';
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote} >
        <div><input name='anecdote' type='text' /></div>
        <button type='submit'>create</button>
      </form >
    </>)
}

export default AnecdoteForm;