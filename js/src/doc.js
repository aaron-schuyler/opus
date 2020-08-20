class Doc {
  constructor(doc) {
    Object.assign(this, doc)
  }
  get docIcon() {
    const div = document.createElement('div')
    div.id = 'doc-' + this.id
    div.classList.add('doc-icon')
    div.title = this.name
    const header = document.createElement('div')
    header.classList.add('doc-icon-header')
    const name = document.createElement('h3')
    name.innerText = this.name
    header.append(name)
    const exerp = document.createElement('p')
    exerp.innerText = this.body
    div.append(header, exerp)
    div.addEventListener('click', this.openDoc.bind(this))
    return div
  }
  openDoc() {
    console.log('opening ' + this.name)
  }
}
