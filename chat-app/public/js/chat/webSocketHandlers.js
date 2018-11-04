import {elements} from "./elements"
import {roomsMessages} from "./roomsMessages"

const moment = require('moment')

const thisRoom = roomsMessages.getCurrentRoom()

const scrollToBottom = () => {
  // Selectors
  const messages = elements.messages
  const newMessage = elements.messagesList.lastElementChild
  const lastMessage = newMessage.previousElementSibling

  // Heights
  const clientHeight = messages.clientHeight
  const scrollTop = messages.scrollTop
  const scrollHeight = messages.scrollHeight
  const newMessageHeight = newMessage.clientHeight
  let lastMessageHeight;
  if (lastMessage)
    lastMessageHeight = lastMessage.clientHeight

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
    messages.scrollTop = scrollHeight
}

const genMessageHTML = (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  return `
        <li class="message">
          <div class="message__title">
            <h4>${message.from}</h4>
            <span>${formattedTime}</span>
          </div>
          <div class="message__body">
            <p>${message.text}</p>
          </div>
        </li>
      `
}

const genLocationMessageHTML = (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  return `
        <li class="message">
          <div class="message__title">
            <h4>${message.from}</h4>
            <span>${formattedTime}</span>
          </div>
          <div class="message__body">
            <a target="_blank" href="${message.url}">My current location</a>
          </div>
        </li>
      `
}

export const onNewMessage = (message) => {
  thisRoom.messages.push(message)

  const markup = genMessageHTML(message)
  elements.messagesList.insertAdjacentHTML('beforeend', markup)
  scrollToBottom()
}

export const onNewLocationMessage = (message) => {
  thisRoom.messages.push(message)

  const markup = genLocationMessageHTML(message)
  elements.messagesList.insertAdjacentHTML('beforeend', markup)
  scrollToBottom()
}

export const updateUserList = (users) => {
  elements.usersList.innerHTML = ''

  users.forEach(user => {
    const markup = `
      <li>
        ${user}
      </li>
    `

    elements.usersList.insertAdjacentHTML('beforeend', markup)
  })
}

export const fetchMessages = () => {
  console.log(thisRoom)
  thisRoom.messages.forEach(message => {
      if (message.text) {
        const markup = genMessageHTML(message)
        elements.messagesList.insertAdjacentHTML('beforeend', markup)
        scrollToBottom()
      }
      else if(message.url) {
        const markup = genLocationMessageHTML(message)
        elements.messagesList.insertAdjacentHTML('beforeend', markup)
        scrollToBottom()
      }
    })
}