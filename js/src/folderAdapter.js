class FolderAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/folders/'
  }

  getFolders() {
    return fetch(this.baseUrl, {credentials: 'include'})
      .then(res => res.json())
      .then(json => {
        for (const folder of json.folders) {
          new Folder(folder)
        }
      })
  }
  getFolderById(id) {
    return fetch(this.baseUrl + id, {credentials: 'include'})
      .then(res => res.json())
  }
  createFolder(e) {
    const name = popup.querySelector('input[name="name"]').value
    const color = popup.querySelector('select[name="color"]').value
    fetch(this.baseUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        color: color
      })
    })
    .then(res => res.json())
    .then((json) => {
      if (json.success){
        new Folder(json.folder)
        popup.remove()
      }
    })
  }
}
