function setItem (e) {
  localStorage.setItem('name', `${e}`)
}
function getItem () {
  return localStorage.getItem('name')
}
export { setItem, getItem }
