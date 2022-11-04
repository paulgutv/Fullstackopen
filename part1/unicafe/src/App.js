import { useState } from "react";

const Title = ({title}) => <h2>{title}</h2>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({text, value}) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
)
const Statistics = ({good, neutral, bad}) => {
  if( good === 0 && neutral === 0 && bad === 0) {
    return 'No feedback given'
  }

  return (
    <table>
      <StatisticLine text = 'good' value = {good}/>
      <StatisticLine text = 'neutral' value = {neutral}/>
      <StatisticLine text = 'bad' value = {bad}/>
      <StatisticLine text = 'all' value = {good + neutral + bad}/>
      <StatisticLine text = 'average' value = {(good*1 + neutral*0 + bad*-1)/(good + neutral + bad)}/>
      <StatisticLine text = 'positive' value = {good*100/(good + neutral + bad) + ' %'}/>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)
  

  return (
    <div>
      <Title title = 'give feedback' />
      <Button handleClick={incrementGood} text = 'good' />
      <Button handleClick={incrementNeutral} text = 'neutral' />
      <Button handleClick={incrementBad} text = 'bad' />
      <Title title = 'statistics' />
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>
  )
}

export default App;
