import React, { useEffect, useState } from "react"
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new number`)) {
        personService.update({ ...existingPerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson));
            setNewName('');
            setNewNumber('');
            showNotification(`Changed ${updatedPerson.name} phonenumber`, false);
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${createdPerson.name}`, false);
        });
    }
  };

  const showNotification = (msg, isError) => {
    setNotification({ msg, isError });
    setTimeout(() => { setNotification(null) }, 5000);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
          showNotification(`Deleted ${person.name}`, false);
        })
        .catch(() => {
          showNotification(`Information of ${person.name} was already removed from server`, true);
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
      <Notification notification={notification} />
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

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }
  const notificationClass = notification.isError ? 'error' : 'info';
  return <div className={notificationClass}>{notification.msg}</div>
}

export default App;