const Persons = ({ persons, handleDelete }) => (
    persons.map(p => <Person key={p.name} person={p} handleDelete={() => handleDelete(p)} />)
)
const Person = ({ person, handleDelete }) => (
    <div>
        {person.name} {person.number}
        <button onClick={handleDelete}>delete</button>
    </div>
);

export default Persons;