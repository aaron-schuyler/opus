class Doc {
  static openDocs = []
  static selectedDoc = null
  constructor(doc) {
    Object.assign(this, doc)
  }
  get docIcon() {
    const div = document.createElement('div')
    div.tabIndex = 0
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
    div.addEventListener('focus', this.selectDoc.bind(this))
    div.addEventListener('blur', this.deSelectDoc.bind(this))
    this.icon = div
    return div
  }
  openDoc() {
    console.log('opening ' + this.name)
  }
  selectDoc(e) {
    Doc.selectedDoc = this
    this.icon.classList.toggle('border-color-gold')
  }
  deSelectDoc(e) {
    this.icon.classList.toggle('border-color-gold')
  }
}
