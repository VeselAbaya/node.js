const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const mongoose = require('./db/mongoose')
const User = require('./db/models/user')
const {RoomMessages} = require('./db/models/roomMessages')
const authenticate = require('./middleware/authenticate')

const app = express()

const port = process.env.PORT || 3030;
const staticPath = path.join(__dirname, '../dist')

const roomsNames = require('./utils/roomsNames/roomsNames')
const availableRooms = new Set()

app.use(express.static(staticPath))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

app.get('/rooms', (req, res) => {
  res.send(JSON.stringify(Array.from(availableRooms)))
})

app.get('/roomsnames/:roomName', (req, res) => {
  res.send(JSON.stringify(roomsNames.getNames(req.params.roomName)))
})

app.get('/names', (req, res) => {
  User.find({}, (err, users) => {
    res.send(users.map(user => user.name))
  })
})

app.get('/roomsMessages/', (req, res) => {
  RoomMessages.find({}, (err, docs) => {
    if (err)
      res.status(400).send(err)

    res.send(docs)
  })
})

app.post('/signup', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  user.save()
    .then(() => user.generateAuthToken())
    .then(token => {
      res.header('x-auth', token).send({user})
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

app.post('/login', (req, res) => {
  User.findByCredentials(req.body.email, req.body.password)
    .then(user => {
      if (!user)
        res.status(400).send('Email or password is incorrect')

      user.generateAuthToken()
        .then(token => {
          res.header('x-auth', token).send({user})
        })
    })
    .catch(err => {
      res.status(400).send({err})
    })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/logout', authenticate, (req, res) => {
  res.sendStatus(200)
})

module.exports = {app, availableRooms, port, roomsNames}