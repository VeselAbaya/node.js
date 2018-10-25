import {elements} from "./elements"

export const animateMenu = () => {
  elements.container.style.transition = '.5s'
  elements.menuBtn.style.transition = '.5s'
  elements.usersIcon.style.transition = '.25s'
  if (elements.container.style.transform === 'translateX(-13em)' || !elements.container.style.transform) {
    elements.container.style.transform = 'translateX(0)'
    elements.menuBtn.style.transform = 'translateX(14.9em)'
    elements.usersIcon.style.color = '#fff'
  }
  else {
    elements.container.style.transform = 'translateX(-13em)'
    elements.menuBtn.style.transform = 'translateX(17.5em)'
    elements.usersIcon.style.color = '#000'
  }
}