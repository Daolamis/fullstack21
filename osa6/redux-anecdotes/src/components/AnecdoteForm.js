import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    props.createAnecdote(e.target.anecdote.value);
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

const mapDispatchToProps = {
  createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)