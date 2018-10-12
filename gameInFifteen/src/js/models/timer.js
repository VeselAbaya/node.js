import elements from '../base'

export default class Timer {
  constructor(time=0) {
    this.time = time
    this.timerId = null;
  }

  get getTime() {
    return this.time
  }

  set setTime(time) {
    this.time = time
    elements.timer.innerHTML = `timer ${this.formatTime(this.time)}`
  }

  static formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const formatted_min = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formatted_sec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatted_min}:${formatted_sec}`
  }

  on() {
    this.timerId = setInterval(() => {
      elements.timer.innerHTML = `timer ${Timer.formatTime(this.time)}`
      ++this.time;
    }, 1000)
  }

  off() {
    clearInterval(this.timerId)
    this.timerId = null
  }

  work() {
    return this.timerId !== null
  }
}