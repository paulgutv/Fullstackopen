import axios from "axios"
import { useState, useEffect } from "react"

const api_key = process.env.REACT_APP_API_KEY

const Find = ({handleFind, newCountry}) => (
<div>
  find countries <input onChange={handleFind} value={newCountry}></input>
</div>
)

const DetailResult = ({filtering}) => {
  const [newWeather, setWeather] = useState('')
  const [newIcon, setIcon] = useState('')
  const [newWind, setWind] = useState('')

  const lat = filtering[0].capitalInfo.latlng[0]
  const lon = filtering[0].capitalInfo.latlng[1]

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response=>{
        return (
          setWeather((response.data.main.temp - 273.15).toFixed(2)),
          setWind(response.data.wind.speed),
          setIcon(response.data.weather[0].icon)
          )
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log(newWeather)

  return (
    <>
      <h1>{filtering[0].name.common}</h1>
      <p>capital {filtering[0].capital}</p>
      <p>area {filtering[0].area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(filtering[0].languages).map(a => <li key={a}>{a}</li>)}
      </ul>
      <img src={filtering[0].flags.png} alt={`${filtering[0].name.common}'s flag`}/>
      <h2>Weather in {filtering[0].capital}</h2>
      <p><strong>temperature:</strong> {newWeather} Celcius</p>
      <img src= {`http://openweathermap.org/img/wn/${newIcon}@2x.png`} alt={`${filtering[0].capital}'s weather icon`} />
      <p><strong>wind:</strong> {newWind} m/s</p>
    </>
  )
}

const Result = ({newCountry, newAll, setNewCountry}) => {

  const filtering = newAll.filter(a => a.name.common.toLowerCase().includes(newCountry.toLowerCase()))

  const showCountry = (event) => {
    setNewCountry(event.target.id)
  }

  if(newCountry.length === 0) {
    return <p>Introduce a name</p>
  } else if(filtering.length === 1) {
    return (
      <>
        <DetailResult filtering={filtering}/>
      </>
    )
  } else if(filtering.length <= 10){
    return filtering.map(a => {
      return <p key={a.name.common}>{a.name.common} <button id={a.name.common} onClick={showCountry}>show</button></p>
    })
  } else if(filtering.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
} 

const App = () => {
  const [newAll, setNewAll] = useState([])
  const [newCountry, setNewCountry] = useState('')

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(response=>setNewAll(response.data))
  },[])

  
  
  const handleFind = (event) => {
    setNewCountry(event.target.value)
  }

  return (
    <>
      <Find handleFind={handleFind} newCountry={newCountry} />
      <Result newCountry={newCountry} newAll={newAll} setNewCountry={setNewCountry}/>
    </>
  )
}

export default App;
