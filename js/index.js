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
let folderAdapter = new FolderAdapter
let session = new SessionAdapter

session.checkSession()


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
