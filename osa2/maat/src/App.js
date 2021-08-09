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
  const filteredCountries = countries.filter(c => c.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
  if (filteredCountries.length > 10) {
    return <div>There were too many matchings countrues, make more specific filter</div>
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }

  return filteredCountries.map((c) => <div key={c.alpha2Cod}>{c.name}</div>)
}

const Country = ({ country }) => {
  return (
    <div>
      <h3>{country.name}</h3>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h4>Languages</h4>
      <ul>
        {country.languages.map(c => <li>{c.name}</li>)}
      </ul>
      <img width='200' src={country.flag} />
    </div>
  )
}

export default App;
