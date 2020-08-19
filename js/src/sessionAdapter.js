class SessionAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/'
  }
  checkSession() {
    return fetch(this.baseUrl + 'check_session')
      .then(res => res.json())
      .then(json => json.loggedIn)
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
  }
}
