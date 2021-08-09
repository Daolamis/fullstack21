import axios from "axios";
import { useEffect, useState } from "react";

const api_key = process.env.REACT_APP_API_KEY

function App() {

  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data))
  }, []);

  const handleFilterOnChange = (e) => {
    const filterTxt = e.target.value;
    setFilter(filterTxt);
    const filteredCountries = countries.filter(c => c.name.toUpperCase().indexOf(filterTxt.toUpperCase()) !== -1);
    setFilteredCountries(filteredCountries);
  }

  return (
    <div>
      Find countries: <input value={filter} onChange={handleFilterOnChange} />

      {filteredCountries.length > 10 ?
        <div>There were too many matchings countries, make more specific filter</div> :
        <Countries countries={filteredCountries} />}
    </div>
  );
}

const Countries = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    if (countries.length === 1) {
      // console.log('setting show country', countries[0])
      setShowCountry(countries[0]);
    }
  }, [countries])

  return (
    <div>
      {countries.map(c =>
        <div key={c.alpha2Code}>
          {c.name}
          <button onClick={() => setShowCountry(c)}>show</button>
        </div>
      )}
      {showCountry && <Country country={showCountry} />}
    </div>)
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // console.log('Country useEffect', `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`);
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => setWeather(response.data))
  }, [country.capital]);

  return (
    <div>
      <h3>{country.name}</h3>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h4>Languages</h4>
      <ul>
        {country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
      </ul>
      <img width='200' src={country.flag} alt='flag' />
      <Weather weather={weather} />
    </div>
  )
}

const Weather = ({ weather }) => {
  if (!weather) {
    return null; // weather data is loading or request failed..
  }

  return (
    <div>
      <h4>{`Weather in ${weather.location.name}`}</h4>
      <div><strong>temperature:</strong> {weather.current.temperature} celsius</div>
      <div><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      {weather.current.weather_icons.map((icon, i) =>
        <img key={weather.location.name + i} src={icon} alt='weather icon' />
      )}
    </div>
  )
}

export default App;
