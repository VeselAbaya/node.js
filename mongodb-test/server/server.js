const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('./db/mongoose')
const User = require('./db/models/user')
const Todo = require('./db/models/todo')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })

  todo.save().then(doc => {
    res.send(doc)
  }).catch(err => {
    res.status(400).send(err)
  })
})

app.listen(port, () => {
  console.log(`Todo server started on port ${port}`)
})

module.exports = app