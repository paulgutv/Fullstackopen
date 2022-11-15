const Header = ({header}) => <h2>{header}</h2>

const Part = ({part}) => part.map(b => <p key={part.indexOf(b)}>{b.name} {b.exercises}</p>)

const Content = ({parts}) => 
  <>
    <Part part={parts} />
  </>

const Total = ({sum}) => <p><strong>Number of exercises {sum}</strong></p>


const Course = ({course}) => {
  return (
    <>
      {course.map(a => {        
        return (
          <div key={a.id}>
            <Header header={a.name} />
            <Content parts={a.parts} />
            <Total sum={a.parts.reduce((a, b) => a + b.exercises, 0)} />
          </div>
        )
      })}   
    </>
  )
}

export default Course