import React, { useState } from 'react'

const NO_VOTES = -1;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotedIndex, setMostVotedIndex] = useState(NO_VOTES);

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    
    // using copy because points in state is not updated at this moment
    const [indexOfVote, votePoints] = copy.reduce((current, next, index) =>
      (current[1] > next ? current : [index, next]), [0, 0]);
    setMostVotedIndex(votePoints > 0 ? indexOfVote : NO_VOTES);
  }

  return (
    <div>
      {anecdotes[selected]} <br />
      has {points[selected]} points
      <div>
        <button onClick={() => vote()}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      </div>
      <h4>Anecdote with most votes</h4>
      {mostVotedIndex !== NO_VOTES ? anecdotes[mostVotedIndex] : 'No votes'}
    </div>
  )
}

export default App