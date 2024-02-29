const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let persons = [
    {
      id: 1,
      name: "Teppo Testihenkilö",
      number: "044-1234567"
    },
    {
      id: 2,
      name: "Tepi Testihenkilö",
      number: "045-1234567"
    },
    {
      id: 3,
      name: "Teemu Testihenkilö",
      number: "046-1234567"
    }
  ]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(persons => persons.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

  const generateId = () => {
    const max = 1000000
    return Math.floor(Math.random() * max);
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }

    if (persons.map(person => person.name).includes(body.name)) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }
  
    const person = {
      name: body.name,
      number: body.number || false,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  
  app.get('/info', (request, response) => {
    personCount = persons.length
    date = new Date()

    response.send(`<p>Phonebook has info for ${personCount} people</p>
    <p>${date}</p>`)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})