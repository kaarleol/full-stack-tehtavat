import { useState, useEffect } from 'react'
import personService from './services/persons'

const Persons = ({persons, searchValue, deletePerson}) => {
  return (
    <div>
      {persons.map(person => 
        person.name.toLowerCase().includes(searchValue.toLowerCase()) 
        ?
          <Person key={person.id} name={person.name} number={person.number} id={person.id} deletePerson={deletePerson} />
        :
        ''
        )}
    </div>
  )
}

const Person = ({name, number, id, deletePerson}) => {
  return (
    <p>{name} {number} <button onClick={() => deletePerson(id)}>delete</button>  </p>
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSeachValue] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSeachChange = (event) => {
    setSeachValue(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        const personId = persons.find(person => person.name === newName).id

        personService.update(personId, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id != personId ? person : response ))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(
            `${newName} was already deleted from server`
          )
          setPersons(persons.filter(person => person.id !== id))
        })
      }
    }
    else {
      personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        console.log(response)}
        )
      setNewName('')
      setNewNumber('')
    }
  }
  
  const deletePersonWithId = id => {
    const person = persons.find(person => person.id === id )
    const personName = person.name
    if (confirm(`delete ${personName}?`)){
      personService.deletePerson(id).then(
        response => {
          console.log(response)
          const newPersons = persons.filter(person => person.id != response.id)
          setPersons(newPersons)
        }
      )
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
      <Persons persons={persons} searchValue={searchValue} deletePerson={deletePersonWithId} />
    </div>
  )

}

export default App