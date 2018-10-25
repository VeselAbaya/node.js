import {elements} from "./elements"
import {animateMenu} from "./animation"
import {onNewMessage, onNewLocationMessage} from "./webSocketHandlers"

console.log('client started up')
const socket = io()

document.addEventListener('DOMContentLoaded', () => {
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
        from: 'User',
        text: input.value
      }, () => {
        console.log('!!!got it!!!')
      })

    input.value = ''
  })

  socket.on('newMessage', onNewMessage)

  socket.on('newLocationMessage', onNewLocationMessage)

  elements.menuBtn.addEventListener('click', animateMenu)
})