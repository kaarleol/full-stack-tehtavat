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

const Notification = ({ message, color }) => {
  const notificationStyle={
    color: (color ? 'green' : 'red'),
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSeachValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorColor, setErrorColor] = useState(false)

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
          let name=response.name
          setPersons(persons.map(person => person.id != personId ? person : response ))
          setNewName('')
          setNewNumber('')
          setErrorColor(true)
          setErrorMessage('Updated ' + name)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorColor(false)
          setErrorMessage('Information of ' + newName + ' has already been removed from server')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else {
      personService.create(personObject)
      .then(response => {
        console.log('response:')
        console.log(response)
        let name=response.name
        console.log(name)
        setPersons(persons.concat(response))
        console.log(response)
        setErrorColor(true)
        setErrorMessage('Added ' + name)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
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
          name=response.name
          console.log(response)
          const newPersons = persons.filter(person => person.id != response.id)
          setPersons(newPersons)
          setErrorColor(true)
          setErrorMessage('Deleted ' + personName)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} color={errorColor}/>
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