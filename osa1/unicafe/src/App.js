import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({text, handleClick}) => (<button onClick={() => handleClick()} >{text}</button>)

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return <div><h2>statistics</h2>No feedback given</div>
  }

  const all = good + neutral + bad;
  const value = good - bad;
  const avarage = value / all || 0;
  const positive = good / all * 100 || 0;
  return <div>
    <h2>statistics</h2>
    <StatisticsLine text='good' value={good}/>
    <StatisticsLine text='neutral' value={neutral}/>
    <StatisticsLine text='bad' value={bad}/>
    <StatisticsLine text='avarage' value={avarage}/>
    <StatisticsLine text='positive' value={positive}/>
  </div>
}

const StatisticsLine = ({text, value}) => <div>{text} {value}</div>

export default App