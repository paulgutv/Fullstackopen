import { useState, useEffect } from "react";
import './index.css'

import contactService from './services/contacts'

const SuccessNotification = ({message}) => {
  if (message === null || message === '') {
    return null
  }
  return <div className="success">{message}</div>
}

const ErrorNotification = ({message}) => {
  if (message === null || message === '') {
    return null
  }
  return <div className="error">{message}</div>
}


const Persons = ({newFilter, persons, setPersons, setErrorMessage}) => {

  const handleDelete = (event) => {
    const name = persons.filter(a => a.id === Number(event.target.id))[0].name
    if (window.confirm(`Delete ${name} ?`)) {
      contactService
      .deleted(event.target.id)
      .catch(error => {
        setErrorMessage(`Information of ${name} has already been removed from server`)
        setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
      })
      setPersons(persons.filter(n => n.id !== Number(event.target.id)))
    }
  }

  if(newFilter.length === 0) {
    return persons.map(a => <p key={a.name}>{a.name} {a.number} <button id={a.id} onClick={handleDelete}>delete</button></p>)
  } else {
    const filtered = persons.filter(a => a.name.toLowerCase().includes(newFilter.toLowerCase()))
    return filtered.map(a => <p key={a.name}>{a.name} {a.number} <button id={a.id} onClick={handleDelete}>delete</button></p>)
  }
}

const Filter = ({handleFilter, newFilter}) => (
  <div>
    filter shown with <input onChange={handleFilter} value={newFilter} />
  </div>
)

const PersonForm = ({addContact, handleContact, newName, handleNumber, newNumber}) => (
  <form onSubmit={addContact}>
    <div>
      name: <input onChange={handleContact} value={newName} />
    </div>
    <div>
      number: <input onChange={handleNumber} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(()=> {
    contactService
    .getAll()
    .then(getContacts => setPersons(getContacts))
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if (persons.map(a => a.name).includes(newName) === false) {
      const contactObject = {
        name: newName,
        number: newNumber
      }
      contactService
      .create(contactObject)
      .then(createContact => setPersons(persons.concat(createContact)))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(`Added ${newName}`)
      setTimeout(()=> {
        setSuccessMessage(null)
      }, 5000)
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contactObject = {
          name: newName,
          number: newNumber
        }
        const id = persons.filter(a => a.name === newName)[0].id
        contactService
        .update(id, contactObject)
        .then(updateContact => setPersons(persons.map(a => a.name !== newName ? a : updateContact)))
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(()=> {
          setErrorMessage(null)
        }, 5000)
          setPersons(persons.filter(a => a.name !== newName))
        })       
        if(errorMessage !== '' && errorMessage !== null) {
          setSuccessMessage(`${newName}'s number has been updated`)
          setTimeout(()=> {
          setSuccessMessage(null)
        }, 5000)
        }
        setNewName('')
        setNewNumber('')        
      }
    }
  }

  const handleContact = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter handleFilter={handleFilter} newFilter={newFilter} />
      <h3>Add a new</h3>
      <PersonForm addContact={addContact} handleContact={handleContact} newName={newName} handleNumber={handleNumber} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons newFilter={newFilter} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App;
