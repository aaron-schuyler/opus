class Doc {
  static openDocs = []
  static selectedDoc = null
  constructor(doc) {
    Object.assign(this, doc)
  }
  get docIcon() {
    const dominator = new Dominator(Templates.docIcon(this))
    const div = dominator.domElement
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
  static search(e) {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      console.log('searching')
    }, 500)
  }
}
