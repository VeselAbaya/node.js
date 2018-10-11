const block_amount = 16
const grid_size = 4
let current_empty_pos = 16
const arrow_code = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
}
const animation_duration = 0.1 // in seconds

const isNear = pos => {
  const available_poss = [pos-1, pos+1, pos-4, pos+4]
  return available_poss.includes(current_empty_pos)
}

// direction is [up, down, left, right]
const animate = (block, direction) => {
  block.style.animation = `${direction} ${animation_duration}s`
  setTimeout(() => {
    block.style.animation = '';
  }, animation_duration * 1000)
}
const moveBlock = (block, direction) => {
  animate(block.firstElementChild, direction)
  setTimeout(() => {
    block.click()
  }, animation_duration * 1000);
}

const clickControl = (view) => {
  view.addEventListener('click', e => {
    const block_pos = +e.target.closest('.view__block').dataset.pos
    if (isNear(block_pos)) {
      const empty_block = document.querySelector(`[data-pos="${current_empty_pos}"]`)
      const block = e.target
      empty_block.innerHTML = block.innerHTML
      block.innerHTML = ''


      const block_id = e.target.id
      block.id = empty_block.id
      empty_block.id = block_id

      current_empty_pos = block_pos;
    }
  })
}
const touchControl = () => {
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return evt.touches
  }

  function handleTouchStart(evt) {
    xDown = getTouches(evt)[0].clientX;
    yDown = getTouches(evt)[0].clientY;
  }

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
        if (current_empty_pos % grid_size !== 0) {
          const block = document.querySelector(`[data-pos="${current_empty_pos + 1}"]`)
          moveBlock(block, 'left')
        }
      } else {
        if (current_empty_pos % grid_size !== 1) {
          const block = document.querySelector(`[data-pos="${current_empty_pos - 1}"]`)
          moveBlock(block, 'right')
        }
      }
    } else {
      if ( yDiff > 0 ) {
        if (current_empty_pos <= grid_size * (grid_size - 1)) {
          const block = document.querySelector(`[data-pos="${current_empty_pos + 4}"]`)
          moveBlock(block, 'up')
        }
      } else {
        if (current_empty_pos > grid_size) {
          const block = document.querySelector(`[data-pos="${current_empty_pos - 4}"]`)
          moveBlock(block, 'down')
        }
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}
const keyControl = () => {
  document.addEventListener('keyup', e => {
    switch(e.keyCode) {
      case arrow_code.left:
        if (current_empty_pos % grid_size !== 0) {
          const block = document.querySelector(`[data-pos="${current_empty_pos + 1}"]`)
          moveBlock(block, 'left')
        }
      break;
      case arrow_code.up:
        if (current_empty_pos <= grid_size * (grid_size - 1)) {
          const block = document.querySelector(`[data-pos="${current_empty_pos + 4}"]`)
          moveBlock(block, 'up')
        }
      break;
      case arrow_code.right:
        if (current_empty_pos % grid_size !== 1) {
          const block = document.querySelector(`[data-pos="${current_empty_pos - 1}"]`)
          moveBlock(block, 'right')
        }
      break;
      case arrow_code.down:
        if (current_empty_pos > grid_size) {
          const block = document.querySelector(`[data-pos="${current_empty_pos - 4}"]`)
          moveBlock(block, 'down')
        }
      break;
    }
  })
}
const restart = () => {
  document.querySelector('.content__panel--timer').innerHTML = 'timer 00:00'
  time = 0

  for (let i = 0; i !== 1000; ++i) {
    const e = Math.ceil((Math.random() * 100) % 4)
    switch(e) {
      case 0:
        if (current_empty_pos % grid_size !== 0)
          document.querySelector(`[data-pos="${current_empty_pos+1}"]`).click()
        break;
      case 1:
        if (current_empty_pos <= grid_size * (grid_size - 1))
          document.querySelector(`[data-pos="${current_empty_pos+4}"]`).click()
        break;
      case 2:
        if (current_empty_pos % grid_size !== 1)
          document.querySelector(`[data-pos="${current_empty_pos-1}"]`).click()
        break;
      case 3:
        if (current_empty_pos > grid_size)
          document.querySelector(`[data-pos="${current_empty_pos-4}"]`).click()
        break;
    }
  }
}

const formatTime = (minutes, seconds) => {
  const formatted_min = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formatted_sec = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formatted_min}:${formatted_sec}`
}
const timerOn = () => {
  return setInterval(() => {
    const timer = document.querySelector('.content__panel--timer')
    timer.innerHTML = `timer ${formatTime(Math.floor(time / 60), time % 60)}`
    ++time;
  }, 1000)
}

let time = localStorage.getItem('time') || 0; // in seconds
let timerId = timerOn()

window.onload = e => {
  document.querySelector('.content__panel--timer').innerHTML =
    `timer ${formatTime(Math.floor(time / 60), time % 60)}`
  const view = document.querySelector('.view');
  for (let i = 1; i !== block_amount + 1; ++i) {
    const markup = `
      <div class="view__block" id="${i}" data-pos="${i}">
        <span>${i !== 16 ? i : ''}</span>
      </div>  
    `

    view.insertAdjacentHTML('beforeend', markup)
  }

  clickControl(view)
  keyControl()
  touchControl()
  document.querySelector('.content__panel--restart').addEventListener('click', restart)

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
    clearInterval(timerId)
    timerId = null
  })

  window.addEventListener('focus', () => {
    if (!timerId)
      timerId = timerOn()
  })

  window.addEventListener('beforeunload', (e) => {
    localStorage.setItem('time', time)
  })
}