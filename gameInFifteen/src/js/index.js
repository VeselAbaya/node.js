import elements from './base'
import {clickControl,
        touchControl,
        keyControl,
        restartController,
        generateField} from './controllers'
import Timer from './models/timer'

const timer = new Timer(+localStorage.getItem('time') || 0)
const block_order = localStorage.getItem('blockOrder');

/* CONTROLLER */
window.onload = e => {
  timer.on()
  if (block_order)
    generateField(block_order.split(',').map(el => +el))
  else
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
    localStorage.setItem('time', timer.time)

    const block_order = []
    for (let block of Array.from(document.querySelectorAll('.view__block')))
      block_order.push(block.id)
    localStorage.setItem('blockOrder', block_order)
  })
}