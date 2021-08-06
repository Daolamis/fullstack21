import React, { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '055 335 5543' },
    { name: 'Mikko Jukola', number: '223-34444-45' },
    { name: 'Ada Hopper', number: '00440033' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find(personObj => personObj.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value);
  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
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
      {persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )

}

export default App;