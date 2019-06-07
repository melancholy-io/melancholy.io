'use strict'

import UAParser from 'ua-parser-js'

let instance = null

export default class UserEnv {
  constructor() {
    if (instance) return instance

    this._uaParser = new UAParser()
    this._isDesktop = null
    this._isTablet = null
    this._isMobile = null
    this._isIos = null
    this._isAndroid = null
    this._isIE = null
    this._isEdge = null
    this._device = null

    instance = this
  }

  static getInstance() {
    if (!instance) {
      instance = new UserEnv()
    }
    return instance
  }

  static get isDesktop() {
    return UserEnv.getInstance().isDesktop
  }
  static get isTablet() {
    return UserEnv.getInstance().isTablet
  }
  static get isMobile() {
    return UserEnv.getInstance().isMobile
  }
  static get isIos() {
    return UserEnv.getInstance().isIos
  }
  static get isAndroid() {
    return UserEnv.getInstance().isAndroid
  }
  static get isIE() {
    return UserEnv.getInstance().isIE
  }
  static get isEdge() {
    return UserEnv.getInstance().isEdge
  }
  static get device() {
    return UserEnv.getInstance().device
  }

  get isDesktop() {
    if (this._isDesktop) return this._isDesktop

    const device = this._uaParser.getDevice()
    this._isDesktop = device.type === undefined
    return this._isDesktop
  }
  get isTablet() {
    if (this._isTablet) return this._isTablet

    const device = this._uaParser.getDevice()
    this._isTablet = device.type === 'tablet'
    return this._isTablet
  }
  get isMobile() {
    if (this._isMobile) return this._isMobile

    const device = this._uaParser.getDevice()
    this._isMobile = device.type === 'mobile'
    return this._isMobile
  }
  get isIos() {
    if (this._isIos) return this._isIos

    const os = this._uaParser.getOS()
    this._isIos = os.name.toLowerCase().includes('ios')
    return this._isIos
  }
  get isAndroid() {
    if (this._isAndroid) return this._isAndroid

    const os = this._uaParser.getOS()
    this._isAndroid = os.name.toLowerCase().includes('android')
    return this._isAndroid
  }
  get isIE() {
    if (this._isIE) return this._isIE

    const browser = this._uaParser.getBrowser()
    this._isIE = browser.name.toLowerCase().includes('ie')
    return this._isIE
  }
  get isEdge() {
    if (this._isEdge) return this._isEdge

    const browser = this._uaParser.getBrowser()
    this._isEdge = browser.name.toLowerCase().includes('edge')
    return this._isEdge
  }
  get device() {
    if (this._device) return this._device

    if (UserEnv.isDesktop) this._device = 'desktop'
    else if (UserEnv.isTablet) this._device = 'tablet'
    else if (UserEnv.isMobile) this._device = 'mobile'

    return this._device
  }
}
