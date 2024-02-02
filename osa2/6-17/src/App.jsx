import { useState } from 'react'

const Persons = ({persons, searchValue}) => {
  return (
    <div>
      {persons.map(person => 
        person.name.toLowerCase().includes(searchValue.toLowerCase()) 
        ?
        <Person key={person.name} name={person.name} number={person.number}/> 
        :
        ''
        )}
    </div>
  )
}

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const NewPersonForm = ({addNewPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <div>
      <h3>Add a new</h3>
      <form onSubmit={addNewPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      </div>
  )
}

const Filter = ({handleSearchChange, searchValue}) => {
  return(
    <div>filter shown with: <input value={searchValue} onChange={handleSearchChange}></input></div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSeachValue] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSeachChange = (event) => {
    console.log(event.target.value)
    setSeachValue(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSeachChange} searchValue={searchValue}/>
      <NewPersonForm 
        addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchValue={searchValue} />
    </div>
  )

}

export default App