const Header = ( {name} ) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Part = ({id, name, exercises}) => {
    return (
      <p>
          {name} {exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map( part => <Part key={part.id} name={part.name} exercises={part.exercises} /> )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    let sum = 0
  
    return (
      <h2>Total of {parts.reduce((i, {exercises}) => (i + exercises), sum)} exercises</h2>
    )
  }
  
  const Course = ( {course} ) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course