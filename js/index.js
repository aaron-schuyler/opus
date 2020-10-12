let main = document.querySelector('#main')
let controls = document.querySelector('#viewControls')
const BASE_URL = 'https://aaronschuyler-opus-api.herokuapp.com'
let docAdapter = new DocAdapter
let folderAdapter = new FolderAdapter
let session = new SessionAdapter

let saveTimer
let searchTimer

let beforeSearch = {}

let backFunction = false
let controlHeading

let popup

function closePopup(e) {
  if (popup && !popup.contains(e.target)) {
    popup.remove()
    popup = undefined
  }
}

document.addEventListener('click', closePopup)

session.checkSession()

const docView = document.querySelector('#docView')
const folderView = document.querySelector('#folderView')
folderView.addEventListener('click', Folder.showAllFolders)

const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  e.stopPropagation()
  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value
  }
  session.login(loginData)
})
