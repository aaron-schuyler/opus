class DocAdapter {
  constructor() {
    this.baseUrl = BASE_URL + '/docs/'
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
  newDoc(id) {
    return fetch(this.baseUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        name: 'untitled',
        folder_id: id,
        exerp: '',
        body: ''
      })
    })
    .then(res => res.json())
  }
  updateDocFolder(docId, folderId) {
    return fetch(this.baseUrl + docId, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        folder_id: folderId
      })
    })
    .then(res => res.json())
  }
  save(doc) {

    return fetch(this.baseUrl + doc.id, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        name: doc.name,
        exerp: doc.exerp,
        body: doc.body
      })
    })
    .then(res => res.json())
  }
}
