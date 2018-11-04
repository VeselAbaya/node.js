import axios from 'axios'
import {elements} from "./elements"
import {access} from "../access"

const signUp = () => {
  elements.formsWrapper.style.top = `${-2*462.5}px`
  elements.forms.style.height = '600px'
}

const logIn = () => {
  elements.forms.style.height = '462.5px'
  elements.formsWrapper.style.top = `${-462.5}px`
}

const join = () => {
  elements.forms.style.height = '462.5px'
  elements.formsWrapper.style.top = 0
}

export const popup = {
  signUp, logIn, join
}

export const logOutClicked = () => {
  // logout
  // post request with token - then on server find user by token and delete it from
  // tokens array, so that user can never get access to private routes
  axios({
    url: '/logout',
    method: 'post',
    headers: {'x-auth': access.token}
  })
    .then(res => {
      access.token = ''

      // change UI
      elements.joinName.value = ''
      elements.logOutBtn.style.display = 'none'
      elements.popupLogInBtn.style.display = 'block'
      elements.popupSignUpBtn.style.display = 'block'
    })
    .catch(err => {
      alert(err)
    })
}
