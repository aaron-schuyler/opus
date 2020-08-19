// //on page load we should check the user's credentials
//   if user_logged_in
//     remove_login_form
//     show_folders
//
// // handle login form
//   SessionAdapter
//
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

let session = new SessionAdapter

session.checkSession().then(console.log)

const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  e.stopPropagation()
  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value
  }
  session.login(loginData)
    .then(console.log)
})
