import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data))
  }, []);

  const handleFilterOnChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      Find countries: <input value={filter} onChange={handleFilterOnChange} />

      <Countries countries={countries} filter={filter} />
    </div>
  );
}

const Countries = ({ countries, filter }) => {
  const [showCountry, setShowCountry] = useState('');

  const filteredCountries = countries.filter(c => c.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
  if (filteredCountries.length > 10) {
    return <div>There were too many matchings countries, make more specific filter</div>
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }

  return (
    <div>
      {filteredCountries.map(c =>
        <div key={c.alpha2Code}>
          {c.name}
          <button onClick={() => setShowCountry(c.alpha2Code)}>show</button>
        </div>
      )}

      {showCountry && <Country country={countries.find(c => c.alpha2Code === showCountry)} />}
    </div>)
}

const Country = ({ country }) => {
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
    </div>
  )
}

export default App;