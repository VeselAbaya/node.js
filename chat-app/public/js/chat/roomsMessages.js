const queryString = require('query-string')

class RoomsMessages {
  constructor () {
    this.data = JSON.parse(localStorage.getItem('messages')) || []
    this.roomName = queryString.parse(window.location.search).room.toLowerCase()
  }

  getMessages(roomName) {
    return this.data.find(room => room.name === roomName)
  }

  setMessages(roomName, messages) {
    return this.data.find(room => room.name === roomName).messages = messages
  }

  getCurrentRoom() {
    const currentRoom = this.data.find(room => room.name === this.roomName)
    if (!currentRoom) {
      this.data.push({
        name: this.roomName,
        messages: []
      })

      return this.data.find(room => room.name === this.roomName)
    }
    else {
      return currentRoom
    }
  }

  saveMessagesLocal() {
    this.data.find(room => room.name === this.roomName).messages = this.getCurrentRoom().messages

    localStorage.setItem('messages', JSON.stringify(this.data))
  }
}

export const roomsMessages = new RoomsMessages()