import axios from "axios"
import {elements} from "./elements"
import {access} from "../access"

export const signUpHandler = (event) => {
  event.preventDefault()

  axios.post('/signup', {
    name: event.target[0].value,
    email: event.target[1].value,
    password: event.target[2].value
  })
    .then(res => {
      // save x-auth token to the client
      const tokens = res.data.user.tokens
      access.token = tokens[tokens.length-1].token

      elements.joinName.value = elements.signUpName.value

      elements.signUpName.value = ''
      elements.signUpEmail.value = ''
      elements.signUpPassword.value = ''

      elements.popupJoinBtn.click()

      // change "Log in" and "Sign up" button to "Log out" button
      elements.popupSignUpBtn.style.display = 'none'
      elements.popupLogInBtn.style.display = 'none'

      elements.logOutBtn.style.display = 'block'
    })
    .catch(err => {
      let validateObj
      if (err.response.data)
        validateObj = err.response.data

      if (validateObj) {
        if (validateObj.duplicateEmail) {
          elements.signUpEmailError.style.display = 'block'
          elements.signUpEmail.classList.add('form--input-error')
        }

        if (validateObj.duplicateUser) {
          elements.signUpNameError.style.display = 'block'
          elements.signUpName.classList.add('form--input-error')
        }
      }
    })
}

export const logInHandler = (event) => {
  event.preventDefault()

  const email = event.target[0].value.toLowerCase()
  const password = event.target[1].value.toLowerCase()

  localStorage.setItem('email', email)

  axios.post('/login', {email, password})
    .then(res => {
      const tokens = res.data.user.tokens
      access.token = tokens[tokens.length-1].token

      elements.logInEmail.value = ''
      elements.logInPassword.value = ''

      elements.joinName.value = res.data.user.name
      elements.popupJoinBtn.click()

      // change "Log in" and "Sign up" button to "Log out" button
      elements.popupSignUpBtn.style.display = 'none'
      elements.popupLogInBtn.style.display = 'none'

      elements.logOutBtn.style.display = 'block'
    })
    .catch(err => {
      alert(err)
    })
}

export const joinHandler = async (event) => {
  event.preventDefault()
  const name = event.target[0].value.toLowerCase()
  const roomName = event.target[1].value.toLowerCase()

  const roomExistingNames = await axios.get(`/roomsnames/${roomName}`)
  const globalExistingNames = await axios.get('/names')
  const existingNames = [...(globalExistingNames.data.map(name => name.toLowerCase())),
                         ...roomExistingNames.data]
  if (existingNames) {
    if (existingNames.includes(name)) {
      elements.joinNameError.style.display = 'block'
      elements.joinName.classList.add('form--input-error')
      return
    }
  }

  elements.joinForm.submit()
}