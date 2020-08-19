class SessionAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/'
  }
  checkSession() {
    return fetch(this.baseUrl + 'check_session', {credentials: 'include'})
      .then(res => res.json())
      .then(handleAuthEvent)
  }
  login(loginData) {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body:  JSON.stringify(loginData)
    }
    return fetch(this.baseUrl + 'login', options)
    .then(res => res.json())
    .then(handleAuthEvent)
  }
  handleAuthEvent(json) {
    if (json.success) {
      document.querySelector('.user-form').classList.remove('hidden')

    } else {
      if (json.error) {
        const error = document.createElement('p')
        error.innerText = json.error
        document.querySelector('#loginError').append(error)
      }
    }
  }
}
