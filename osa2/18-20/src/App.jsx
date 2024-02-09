import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import weather from './services/weather'

const Countries = ({countries, searchValue, setSearchButton, handleLatlngChange, weather}) => {
  const filteredCountries = countries.filter(country => (country.name.common.toLowerCase().includes(searchValue.toLowerCase())))
  if (filteredCountries.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (filteredCountries.length <= 10 && filteredCountries.length > 1){
    
    return (
      <div>
        {filteredCountries.map(country => <CountryName key={country.name.common} country={country} setSearchButton={setSearchButton}/>)}
      </div>
    )
  }
  if (filteredCountries.length === 1){
    return(
      <div>
        <Country country={filteredCountries[0]} handleLatlngChange={handleLatlngChange} weather={weather}/>
      </div>
    )
  }
}

const CountryName = ({country, setSearchButton}) => {
  return(
    <div>{country.name.common}<button onClick={() => setSearchButton(country.name.common)} >show</button></div>
  )
}

const Country = ({country, handleLatlngChange, weather}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br />
        area {country.area}
      </p>
      <h2>Languages</h2>
      <Languages languages={country.languages} />
      <Flag flag={country.flags}/>
      <h1>Weather in {country.capital}</h1>
      <Weather latlng={country.capitalInfo.latlng} handleLatlngChange={handleLatlngChange} weather={weather}/>
    </div>
  )
}

const Languages = ({languages}) => {
  const languageNames = Object.values(languages)
  return(
    <ul>
    {languageNames.map(language => <li key={language}>{language}</li>)}
    </ul>
  )
}

const Flag = ({flag}) => {
  return (
    <img src={flag.png} alt={flag.alt}/>
  )
}

const Search = ({searchValue, handleSearchChange}) => {
  return (
    <div>find countries<input value={searchValue} onChange={handleSearchChange}></input></div>
  )
}

const Weather = ({weather, handleLatlngChange, latlng}) => {
  useEffect(() => {
    handleLatlngChange(latlng)
  }, [])

  console.log(weather)
  if (weather!==''){
    return(
      <div>
        <p>temperature {Math.round((weather.main.temp - 273.15) * 100) / 100} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
  else{
    return (
      <p>Something went wrong with fetching the weather</p>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState('')
  const [latlng, setLatlng] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  useEffect(() => {
    if (latlng.length > 0){
      const lat = latlng[0]
      const lon = latlng[1]

      weatherService
      .getWeather(lat, lon)
        .then(response => {
        setWeather(response)
      })
    }
  }, [latlng])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    //console.log(event.target.value)
  }

  const setSearchButton = name => {
    return(setSearch(name))
  }

  const handleLatlngChange = (latlng) => {
      setLatlng(latlng)
  }

    return (
      <div>
        <Search searchValue={search} handleSearchChange={handleSearchChange}/>
        <Countries countries={countries} searchValue={search} setSearchButton={setSearchButton} handleLatlngChange={handleLatlngChange} weather={weather}/>
      </div>
    )
  }

export default App
