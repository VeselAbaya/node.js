import elements from './base'
import {clickControl, touchControl, keyControl} from './controllers'
import Timer from './models/timer'
import constants from './constants'

const timer = new Timer()

const generateField = () => {
  for (let i = 1; i !== constants.block_amount + 1; ++i) {
    const markup = `
      <div class="view__block" id="${i}" data-pos="${i}">
        <span>${i !== 16 ? i : ''}</span>
      </div>  
    `

    elements.view.insertAdjacentHTML('beforeend', markup)
  }
}

/* CONTROLLER */
window.onload = e => {
  timer.on()
  generateField()

  clickControl()
  keyControl()
  touchControl()

  elements.restart.addEventListener('click', () => {
    timer.time = 0
    restartController()
  })

  // TODO think about it
  // document.addEventListener('visibilitychange', (e) => {
  //   console.log('lol')
  //   if (!timerId) {
  //     timerId = timerOn()
  //   } else {
  //     clearInterval(timerId)
  //     timerId = null
  //   }
  // })

  window.addEventListener('blur', () => {
    timer.off()
  })

  window.addEventListener('focus', () => {
    if (!timer.work())
      timer.on()
  })

  window.addEventListener('beforeunload', (e) => {
    localStorage.setItem('time', time)
  })
}