console.log('client started up')
const socket = io()

socket.on('connect', () => {
  console.log('Connected to server')
})

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    socket.emit('createMessage', {
      from: 'User',
      text: document.querySelector('#message-text').value
    }, () => {

    })

    document.querySelector('#message-text').value = ''
  })

  socket.on('newMessage', (message) => {
    const markup = `
        <li>
          FROM: ${message.from}<br>
          TEXT: ${message.text}<br>
        </li>
      `

    document.querySelector('#messages').insertAdjacentHTML('beforeend', markup)
  })
})