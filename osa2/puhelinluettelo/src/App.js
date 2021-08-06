import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '055 335 5543' },
    { name: 'Mikko Jukola', number: '223-34444-45' },
    { name: 'Ada Hopper', number: '00440033' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find(personObj => personObj.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value);
  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  }
  const handleFilter = (e) => {
    setFilter(e.target.value);
  }
  const filterPersons = () => {
    if (filter) {
      return persons.filter(p => p.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1)
    }
    return persons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Add a new</h3>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPersons().map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )

}

export default App;