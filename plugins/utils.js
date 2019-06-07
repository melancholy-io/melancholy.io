window.$ = (selector) => {
  const element = document.querySelector(selector)
  return element
}

window.$$ = (selector) => {
  const elements = document.querySelectorAll(selector)
  return elements
}
