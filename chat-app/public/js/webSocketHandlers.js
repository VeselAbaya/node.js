import {elements} from "./elements"
const moment = require('moment')

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

export const onNewMessage = (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const markup = `
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

  elements.messagesList.insertAdjacentHTML('beforeend', markup)

  scrollToBottom()
}

export const onNewLocationMessage = (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const markup = `
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

  elements.messagesList.insertAdjacentHTML('beforeend', markup)

  scrollToBottom()
}