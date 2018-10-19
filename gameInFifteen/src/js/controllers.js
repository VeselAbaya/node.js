import elements from './base'
import constants from './constants'
import {moveBlock} from './animation'

let current_empty_pos = 16;

const arrow_code = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
}

const isNear = pos => {
  let available_poss = [pos-1, pos+1, pos-4, pos+4];

  if (pos % constants.grid_size === 0) {
    available_poss = [pos-1, pos-4, pos+4]
  }
  else if (pos % constants.grid_size === 1) {
    available_poss = [pos+1, pos-4, pos+4]
  }

  return available_poss.includes(current_empty_pos)
}

export const clickControl = () => {
  elements.view.addEventListener('click', e => {
    const block_pos = +e.target.closest('.view__block').dataset.pos
    console.log(block_pos)
    if (isNear(block_pos)) {
      const empty_block = document.querySelector(`[data-pos="${current_empty_pos}"]`)
      const block = e.target.closest('.view__block')

      empty_block.innerHTML = block.innerHTML
      block.innerHTML = ''

      const block_id = e.target.id
      block.id = empty_block.id
      empty_block.id = block_id

      console.log(empty_block)
      console.log(block)

      current_empty_pos = block_pos;
    }
  })
}

export const touchControl = () => {
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
        if (current_empty_pos % constants.grid_size !== 0) {
          const block = document.querySelector(`[data-pos="${current_empty_pos + 1}"]`)
          moveBlock(block, 'left')
        }
      } else {
        if (current_empty_pos % constants.grid_size !== 1) {
          const block = document.querySelector(`[data-pos="${current_empty_pos - 1}"]`)
          moveBlock(block, 'right')
        }
      }
    } else {
      if ( yDiff > 0 ) {
        if (current_empty_pos <= constants.grid_size * (constants.grid_size - 1)) {
          const block = document.querySelector(`[data-pos="${current_empty_pos + 4}"]`)
          moveBlock(block, 'up')
        }
      } else {
        if (current_empty_pos > constants.grid_size) {
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

export const keyControl = () => {
  document.addEventListener('keyup', e => {
    switch(e.keyCode) {
      case arrow_code.left:
        if (current_empty_pos % constants.grid_size !== 0) {
          const block = document.querySelector(`[data-pos="${current_empty_pos + 1}"]`)
          moveBlock(block, 'left')
        }
        break;
      case arrow_code.up:
        if (current_empty_pos <= constants.grid_size * (constants.grid_size - 1)) {
          const block = document.querySelector(`[data-pos="${current_empty_pos + 4}"]`)
          moveBlock(block, 'up')
        }
        break;
      case arrow_code.right:
        if (current_empty_pos % constants.grid_size !== 1) {
          const block = document.querySelector(`[data-pos="${current_empty_pos - 1}"]`)
          moveBlock(block, 'right')
        }
        break;
      case arrow_code.down:
        if (current_empty_pos > constants.grid_size) {
          const block = document.querySelector(`[data-pos="${current_empty_pos - 4}"]`)
          moveBlock(block, 'down')
        }
        break;
    }
  })
}

const makeSolvable = (ids) => {
  const idsArray = []
  for (let id of ids)
    idsArray.push(id)

  const index16 = idsArray.findIndex(el => el === 16)
  idsArray.splice(index16, 1)

  let checkSum = 0
  for (let i = 0; i !== constants.block_amount - 1; ++i) {
    for (let j = i + 1; j !== constants.block_amount; ++j) {
      if (idsArray[i] > idsArray[j])
        checkSum += 1
    }
  }

  checkSum += (index16 % constants.grid_size) + 1
  if (checkSum % 2 !== 0)
    idsArray[1] = [idsArray[0], idsArray[0] = idsArray[1]][0];

  idsArray.splice(index16, 0, 16)
  current_empty_pos = index16 + 1
  return idsArray
}

export const restartController = () => {
  const ids = new Set()
  while (ids.size !== constants.block_amount)
    ids.add(Math.floor((Math.random() * 16)) + 1)

  const idsArray = makeSolvable(ids)

  for (let i = 0; i !== constants.block_amount; ++i) {
    const id = idsArray[i]
    const block = document.querySelector(`[data-pos="${i+1}"]`)
    block.id = id
    block.innerHTML = `<span>${id !== 16 ? id : ''}</span>`
  }
}

export const generateField = (block_order) => {
  if (!block_order) {
    for (let i = 1; i !== constants.block_amount + 1; ++i) {
      const markup = `
        <div class="view__block" id="${i}" data-pos="${i}">
          <span>${i !== 16 ? i : ''}</span>
        </div>
      `

      elements.view.insertAdjacentHTML('beforeend', markup)
    }
  } else {
    for (let i = 1; i !== constants.block_amount + 1; ++i) {
      const markup = `
        <div class="view__block" id="${block_order[i-1]}" data-pos="${i}">
          <span>${block_order[i-1] !== 16 ? block_order[i-1] : (() => { 
            current_empty_pos = i
            return ''
          })()}</span>
        </div>
      `

      elements.view.insertAdjacentHTML('beforeend', markup)
    }
  }
}