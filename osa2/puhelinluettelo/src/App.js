import React, { useEffect, useState } from "react"
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find(personObj => personObj.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.remove(person.id).then(d => {
        setPersons(persons.filter(p => p.id !== person.id));
      });
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const filterPersons = () => {
    if (filter) {
      return persons.filter(p => p.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1)
    }
    return persons
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilter={handleFilter} />
      <PersonForm newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons()} handleDelete={handleDelete} />
    </div>
  )
}

const PersonForm = ({ newName, handleNewName, newNumber, handleNewNumber, handleSubmit }) => (
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
)

const FilterForm = ({ filter, handleFilter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleFilter} />
  </div>
)

const Persons = ({ persons, handleDelete }) => (
  persons.map(p => <Person key={p.name} person={p} handleDelete={() => handleDelete(p)} />)
)
const Person = ({ person, handleDelete }) => (
  <div>
    {person.name} {person.number}
    <button onClick={handleDelete}>delete</button>
  </div>
)

export default App;