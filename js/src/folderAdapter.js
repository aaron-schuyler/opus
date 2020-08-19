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
}
