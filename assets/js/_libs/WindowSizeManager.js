'use strict'

import sleep from 'Utils/sleep'

let instance = null

export default class WindowSizeManager {
  constructor() {
    if (instance) return instance

    this.width = 0
    this.height = 0
    this.halfWidth = 0
    this.halfHeight = 0

    this.functions = []
    this.functionsLength = 0

    this.isWaiting = false

    instance = this

    this.init()
  }

  static getInstance() {
    if (!instance) {
      instance = new WindowSizeManager()
    }
    return instance
  }

  static add(callback, isFire = true) {
    WindowSizeManager.getInstance().add(callback, isFire)
  }

  static remove(callback) {
    WindowSizeManager.getInstance().remove(callback)
  }

  static get width() {
    return WindowSizeManager.getInstance().width
  }

  static get height() {
    return WindowSizeManager.getInstance().height
  }

  init() {
    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize()
  }

  add(callback, isFire) {
    this.functions.push(callback)
    this.functionsLength = this.functions.length

    if (isFire) {
      callback(this.width, this.height, this.halfWidth, this.halfHeight)
    }
  }

  remove(callback) {
    let f
    for (let i = 0; i < this.functionsLength; i++) {
      f = this.functions[i]
      if (f === callback) {
        this.functions.splice(i, 1)
        break
      }
    }
    this.functionsLength = this.functions.length
  }

  async onResize() {
    if (this.isWaiting) return

    this.isWaiting = true
    await sleep(0.1)
    this.isWaiting = false

    const windowWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : window.innerWidth
    const windowHeight = window.innerHeight

    this.width = windowWidth
    this.height = windowHeight
    this.halfWidth = this.width / 2
    this.halfHeight = this.height / 2

    let func
    for (let i = 0; i < this.functionsLength; i++) {
      func = this.functions[i]
      func(this.width, this.height, this.halfWidth, this.halfHeight)
    }
  }
}
