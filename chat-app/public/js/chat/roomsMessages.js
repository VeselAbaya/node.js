import axios from "axios"

const queryString = require('query-string')

class RoomsMessages {
  constructor () {
    this.data = []
    axios.get('/roomsMessages')
      .then(res => {
        this.data = res.data
        console.log(this.data)
      })
      .catch(err => {})
    this.roomName = queryString.parse(window.location.search).room.toLowerCase()
  }

  getMessages(roomName) {
    return this.data.find(room => room.name === roomName)
  }

  setMessages(roomName, messages) {
    return this.data.find(room => room.name === roomName).messages = messages
  }

  getCurrentRoom() {
    return this.data.find(room => room.name === this.roomName)
  }

  saveMessagesLocal() {
    this.data.find(room => room.name === this.roomName).messages = this.getCurrentRoom().messages

    localStorage.setItem('messages', JSON.stringify(this.data))
  }
}

export const roomsMessages = new RoomsMessages()