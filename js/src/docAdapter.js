class DocAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/docs/'
  }
  search(query) {
    return fetch(this.baseUrl + 'search/' + query, {
      credentials: 'include'
    })
    .then(res => res.json())
  }
  delete(id) {
    return fetch(this.baseUrl + id, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.json())
  }

}
