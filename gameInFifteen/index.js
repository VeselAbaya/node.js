const block_amount = 16
let current_empty_pos = 16

const isNear = pos => {
  const available_poss = [pos-1, pos+1, pos-4, pos+4]
  return available_poss.includes(current_empty_pos)
}

window.onload = e => {
  const view = document.querySelector('.view');
  for (let i = 1; i !== block_amount + 1; ++i) {
    const markup = `
      <div class="view__block" id="${i}" data-pos="${i}">
        ${i !== 16 ? i : ''}
      </div>  
    `

    view.insertAdjacentHTML('beforeend', markup)
  }

  view.addEventListener('click', e => {
    const block_pos = +e.target.dataset.pos
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