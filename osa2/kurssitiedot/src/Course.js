
const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ name }) => <h3>{name}</h3>
  
  const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)
  
  const Part = ({ part }) => <div>{part.name} {part.exercises}</div>
  
  const Total = ({ parts }) => (
    <div>
      <strong>
        Total of {parts.reduce((sum, next) => sum + next.exercises, 0)} exercises
      </strong>
    </div>
  )

  export default Course