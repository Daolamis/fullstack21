import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const Header = (props) => (
  <h1>{props.courseName}</h1>
)

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
)

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part part={part} />)}
  </div>
)

const Total = (props) => (
  <p>Number of exercises {props.parts.reduce((sum, val) => sum + val.exercises, 0)}</p>
)
export default App