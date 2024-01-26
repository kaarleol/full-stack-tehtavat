import { useState } from 'react'

const Button = ( {text, handleClick} ) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    '0 If it hurts, do it more often.',
    '1 Adding manpower to a late software project makes it later!',
    '2 The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    '3 Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    '4 Premature optimization is the root of all evil.',
    '5 Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    '6 Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    '7 The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  //console.log("Selected:" + selected)

  const handleSelected = () => {
    const rn = (Math.floor(Math.random() * anecdotes.length))
    setSelected(rn)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = votes.findIndex((element) => element == Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button text="Vote" handleClick={handleVote} />
      <Button text="Next anecdote" handleClick={handleSelected} />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p>


    </div>
  )
}

export default App