import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ( {text, value} ) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)


const Statistics = ( {good, bad, neutral}) => {
  if ((good + bad + neutral) > 0){
    return (
      <table>
        <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + neutral + bad} />
        <StatisticsLine text="average" value={Math.round((good - bad)/(good+bad+neutral)*10)/10} />
        <StatisticsLine text="positive" value={Math.round((good)/(good+bad+neutral)*100*10)/10 + ' %'} />
        </tbody>
      </table>
      
    )
  }
  else {
    return (
      <p>No feedbacks given</p>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }


  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutral} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App