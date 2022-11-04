import { useState } from "react";

const Button = ({text, handleClick}) => <button onClick={handleClick} >{text}</button>

const Title = ({title}) => <h2>{title}</h2>

const Display = ({anecdote}) => <p>{anecdote}</p>

const Votes = ({votes}) => <p>has {votes} votes</p>

const App = () =>  {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const copy = [...votes]  

  const setToValue = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const setVote = () => {    
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVoted = anecdotes[copy.indexOf(Math.max(...copy))]

  return (
    <div>
      <Title title = 'Anecdote of the day' />
      <Display anecdote = {anecdotes[selected]} />
      <Votes votes = {votes[selected]} />
      <Button text = 'vote' handleClick={setVote} />
      <Button text = 'next anecdote' handleClick={setToValue} />
      <Title title = 'Anecdote with most votes' />
      <Display anecdote = {mostVoted} />
    </div>
  )

}

export default App;
