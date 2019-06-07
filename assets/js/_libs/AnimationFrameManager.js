'use strict'

let instance = null

export default class AnimationFrameManager {
  constructor() {
    if (instance) return instance

    this.updateFunctions = []
    this.updateFunctionsLength = 0
    this.lastUpdateFunction = null

    instance = this

    this.init()
  }

  static getInstance() {
    if (!instance) {
      instance = new AnimationFrameManager()
    }
    return instance
  }

  static add(func) {
    AnimationFrameManager.getInstance().add(func)
  }

  static remove(func) {
    AnimationFrameManager.getInstance().remove(func)
  }

  static reset() {
    AnimationFrameManager.getInstance().reset()
  }

  init() {
    this.animFunction = this.update.bind(this)
    window.requestAnimationFrame(this.animFunction)
  }

  add(func) {
    this.updateFunctions.push(func)
    this.updateFunctionsLength = this.updateFunctions.length
  }

  remove(func) {
    let f
    for (let i = 0; i < this.updateFunctionsLength; i++) {
      f = this.updateFunctions[i]
      if (f === func) {
        this.updateFunctions.splice(i, 1)
        break
      }
    }
    this.updateFunctionsLength = this.updateFunctions.length
  }

  addLast(func) {
    this.lastUpdateFunction = func
  }

  update() {
    let func
    for (let i = 0; i < this.updateFunctionsLength; i++) {
      func = this.updateFunctions[i]
      func()
    }

    if (this.lastUpdateFunction) {
      this.lastUpdateFunction()
    }

    window.requestAnimationFrame(this.animFunction)
  }

  reset() {
    for (let i = 0; i < this.updateFunctionsLength; i++) {
      delete this.updateFunctions[i]
    }
    this.updateFunctions = []
    this.updateFunctionsLength = 0
    delete this.lastUpdateFunction
  }
}
