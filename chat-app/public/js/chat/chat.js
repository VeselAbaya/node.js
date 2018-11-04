import {elements} from "./elements"
import {animateMenu} from "./animation"
import {onNewMessage, onNewLocationMessage, updateUserList, fetchMessages} from "./webSocketHandlers"
import {roomsMessages} from "./roomsMessages"

const queryString = require('query-string')

console.log('client started up')
const socket = io() // emit 'connection'

document.addEventListener('DOMContentLoaded', () => {
  fetchMessages()
  const params = queryString.parse(window.location.search)

  elements.sendLocationBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (!navigator.geolocation)
      return alert('Geolocation not supported by your browser :(')

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    }, () => {
      alert('Unable to fetch location :(')
    })
  })

  elements.sendForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const input = elements.messageInput
    if (input.value)
      socket.emit('createMessage', {
        from: params.name,
        text: input.value
      })

    input.value = ''
  })

  socket.on('connect', () => {
    socket.emit('join', {name: params.name, room: params.room.toLowerCase()}, (err) => {
      if (err) {
        alert(err)
        window.location.href = '/'
      }
    })
  })
  socket.on('newMessage', onNewMessage)
  socket.on('newLocationMessage', onNewLocationMessage)
  socket.on('updateUserList', updateUserList)

  elements.menuBtn.addEventListener('click', animateMenu)

  window.addEventListener('beforeunload', (event) => {
    roomsMessages.saveMessagesLocal()
  })
})