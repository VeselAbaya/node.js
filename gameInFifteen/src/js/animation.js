/* ANIMATION */
// direction is [up, down, left, right]
const animation_duration = 0.1 // in seconds

const animate = (block, direction) => {
  block.style.animation = `${direction} ${animation_duration}s`
  setTimeout(() => {
    block.style.animation = '';
  }, animation_duration * 1000)
}

export const moveBlock = (block, direction) => {
  animate(block.firstElementChild, direction)
  setTimeout(() => {
    block.click()
  }, animation_duration * 1000);
}