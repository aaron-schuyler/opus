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
let folderAdapter = new FolderAdapter
let session = new SessionAdapter

let saveTimer
let searchTimer

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
