const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Styling a component',
        exercises: 5,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Part = ({ part }) => <div>{part.name} {part.exercises}</div>

const Total = ({ parts }) => (
  <div>
    <strong>
      Total of {parts.reduce((sum, next) => sum + next.exercises, 0)} exercises
    </strong>
  </div>
)

export default App