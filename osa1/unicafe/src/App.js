import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const value = good - bad;
  const avarage = value / all || 0;
  const positive = good / all * 100 || 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)} >good</button>
      <button onClick={() => setNeutral(neutral + 1)} >neutral</button>
      <button onClick={() => setBad(bad + 1)} >bad</button>
      <h2>statistics</h2>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad}  <br />
      avarage {avarage} <br />
      positive {positive} %
    </div>
  )
}

export default App