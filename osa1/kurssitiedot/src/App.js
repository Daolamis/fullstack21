import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course}/>
      <Content partName={part1} exercises={exercises1}/>
      <Content partName={part2} exercises={exercises2}/>
      <Content partName={part3} exercises={exercises3}/>
      <Total exercises={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

const Header = (props) => (
  <h1>{props.courseName}</h1>
)

const Content = (props) => (
  <p>{props.partName} {props.exercises}</p>
)

const Total = (props) => (
  <p>Number of exercises {props.exercises}</p>
)
export default App