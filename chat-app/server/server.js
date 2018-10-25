const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const {generateMessage, generateLocationMessage} = require('./utils/message')

const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, '../dist')

app.use(express.static(staticPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  // Say hay to the user
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'))
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Someone connected.'))


  socket.on('createMessage', (message, callback) => {
    console.log('Create message', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    console.log('Create location message')
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lon))
  })
})

server.listen(port, () => {
  console.log(`Server started up on ${port}`)
})
