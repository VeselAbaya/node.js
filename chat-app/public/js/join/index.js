import "babel-polyfill";

import axios from 'axios'
import {elements} from "./elements"
import {popup, logOutClicked} from "./buttons"
import {signUpHandler, joinHandler, logInHandler} from "./submitHandlers"

const displayRooms = async () => {
  const rooms = await axios.get('/rooms')
  const datalist = elements.datalist
  rooms.data.forEach(room => {
    const markup = `
      <option>${room}</option>
    `

    datalist.insertAdjacentHTML('beforeend', markup)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  displayRooms()

  // Buttons
  elements.popupLogInBtn.addEventListener('click', popup.logIn)
  elements.popupSignUpBtn.addEventListener('click', popup.signUp)
  elements.popupJoinBtn.addEventListener('click', popup.join)
  elements.logOutBtn.addEventListener('click', logOutClicked)

  // Sign Up Form
  elements.signUpForm.addEventListener('submit', signUpHandler)
  elements.signUpEmail.addEventListener('input', (event) => {
    event.target.classList.remove('form--input-error')
    event.target.parentNode.lastElementChild.style.display = 'none'
  })
  elements.signUpName.addEventListener('input', (event) => {
    event.target.classList.remove('form--input-error')
    event.target.parentNode.lastElementChild.style.display = 'none'
  })

  // Join Form
  elements.joinForm.addEventListener('submit', joinHandler)
  elements.joinName.addEventListener('input', (event) => {
    event.target.classList.remove('form--input-error')
    event.target.parentNode.lastElementChild.style.display = 'none'
  })

  // Login Form
  elements.logInForm.addEventListener('submit', logInHandler)
})