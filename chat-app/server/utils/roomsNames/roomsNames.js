const queryString = require('query-string')

class RoomsNames {
  constructor () {
    this.data = []
  }

  getNames(roomName) {
    const room = this.data.find(room => room.name === roomName.toLowerCase())
    if (room)
      return room.names
  }

  addName(roomName, name) {
    roomName = roomName.toLowerCase()
    name = name.toLowerCase()

    const roomNames = this.data.find(room => room.name === roomName)
    if (!roomNames) {
      this.data.push({
        name: roomName,
        names: []
      })
    }

    this.data.find(room => room.name === roomName).names.push(name)
  }

  removeName(roomName, name) {
    roomName = roomName.toLowerCase()
    name = name.toLowerCase()

    const roomNames = this.data.find(room => room.name === roomName)
    if (roomNames) {
      const index = roomNames.names.findIndex(userName => userName === name)
      roomNames.names.splice(index, 1)
    }
  }
}

const roomsNames = new RoomsNames()
module.exports = roomsNames