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
  getDoc(id) {
    return fetch(this.baseUrl + id, {credentials: 'include'})
      .then(res => res.json())
  }
  save(doc) {
    const exerp = doc.quill.getText(0, 40)
    const body = doc.quill.getContents()
    console.log(body)
    return fetch(this.baseUrl + doc.id, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        exerp: exerp,
        body: body
      })
    })
    .then(res => res.json())
  }
}
