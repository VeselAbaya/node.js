require('./config/config')

const http = require('http')
const socketIO = require('socket.io')
const {app, availableRooms, port, roomsNames} = require('./routes')

const server = http.createServer(app)
const io = socketIO(server)

// const mongoose = require('./db/mongoose')

const {generateMessage, generateLocationMessage} = require('./utils/messages/message')
const {isRealString} = require('./utils/validation')

const {Users} = require('./utils/users/users')
const users = new Users();

io.on('connection', (socket) => {
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room))
      return callback('Name and room name are required')

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
    io.to(params.room).emit('updateUserList', users.getUsersList(params.room))

    // update available rooms
    if (users.getUsersList(params.room).length >= 1)
      availableRooms.add(params.room)

    // update roomsNames
    roomsNames.addName(params.room, params.name)

    socket.on('createMessage', message => {
      const user = users.getUser(socket.id)

      if (user && isRealString(message.text))
        io.to(params.room)
          .emit('newMessage', generateMessage(user.name, message.text))
    })

    socket.on('createLocationMessage', (coords) => {
      const user = users.getUser(socket.id)

      if (user) {
        io.to(params.room)
          .emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lon))
      }
    })
  })

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id)

    // update roomsNames
    roomsNames.removeName(user.room, user.name)

    if (user)
      io.to(user.room).emit('updateUserList', users.getUsersList(user.room).sort())

    if (user && users.getUsersList(user.room).length <= 0)
      availableRooms.delete(user.room)
  })
})

server.listen(port, () => {
  console.log(`Server started up on ${port}`)
})
