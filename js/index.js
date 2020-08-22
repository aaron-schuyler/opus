// // handle logout
//   SessionAdapter
//
// //handle navigation
//   new_doc_button
//   doc_navigator_button
//
// //handle tabs
//   show_doc when tab_clicked
//   remove_tab when x_clicked

let main = document.querySelector('#main')
let controls = document.querySelector('#viewControls')
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
  let newButton = document.querySelector('.new-doc-icon')
  let edit = true
  if (e.target.classList.contains('fa-pen') && e.target.parentElement.id === 'editFolder') {
    edit = false
  } else {
    edit = true
  }
  if (popup && !popup.contains(e.target) && !newButton.contains(e.target) && edit) {
    popup.remove()
    popup = undefined
  }
  if (document.querySelector('.collection')) {
    let flag
    for (const docIcon of document.querySelectorAll('.doc-icon')) {
      if (docIcon.contains(e.target)) {
        flag = true
        break
      }
    }
    const docControls = document.querySelector('#docControls')
    if (!flag  && !docControls.contains(e.target)) {
      docControls.innerHTML = ''
    }
  }
}

document.addEventListener('click', closePopup)

session.checkSession()

const docView = document.querySelector('#docView')
docView.addEventListener('click', Doc.shoDocView)
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
