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
);

export default PersonForm;