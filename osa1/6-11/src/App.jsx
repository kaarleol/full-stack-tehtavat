import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value} ) => (
  <p> {text} {value} </p>
)

const Statistics = ( {good, bad, neutral}) => {
  if ((good + bad + neutral) > 0){
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={Math.round((good - bad)/(good+bad+neutral)*10)/10} />
        <StatisticLine text="positive" value={Math.round((good)/(good+bad+neutral)*100*10)/10 + ' %'} />
      </div>
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
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutral} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App