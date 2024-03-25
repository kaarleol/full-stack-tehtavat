require('dotenv').config()
const express = require('express')

const app = express()
const cors = require('cors')
const Person = require('./models/person')
// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// routes
// homepage
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
// get all people
app.get('/api/people', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people)
  })
})
// get one person
app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})
// delete one person
app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch((error) => next(error))
})

// create new person
app.post('/api/people', (request, response, next) => {
  const { body } = request

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  }).catch((error) => next(error))
})

// update person
app.put('/api/people/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

// get general info
app.get('/info', (request, response) => {
  Person.find({}).then((people) => {
    const personCount = people.length
    const date = new Date()

    response.send(`<p>Phonebook has info for ${personCount} people</p>
    <p>${date}</p>`)
  })
})

// Middleware after routes
app.use(errorHandler)
app.use(unknownEndpoint)

// This thing
const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
