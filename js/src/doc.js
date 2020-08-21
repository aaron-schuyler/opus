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
    const dominator = new Dominator(Templates.docControls(this.id))
    const newDocControls = dominator.domElement

    const docControls = document.querySelector("#docControls")
    docControls.innerHTML = ''
    docControls.append(newDocControls)
    this.icon.classList.toggle('border-color-gold')
  }
  deSelectDoc(e) {
    docControls.innerHTML = ''
    this.icon.classList.toggle('border-color-gold')
  }
  static search(e) {
    const previous = main.firstChild
    controlHeading.innerText = 'Search'
    clearTimeout(searchTimer)
    if (e.target.value !== '') {
      searchTimer = setTimeout(() => {
        let query = e.target.value
        docAdapter.search(query).then((json) => {
          const docNavigatorElement = Folder.generateCollectionView('searchResults')
          docNavigatorElement.firstChild.remove()
          if (json.docs.length > 0){
            for (const doc of json.docs) {
              const newDoc = new Doc(doc)
              docNavigatorElement.append(newDoc.docIcon)
            }
            main.replaceChild(docNavigatorElement, previous)
          } else {
            const empty = new Dominator(Templates.empty(`No results found for '${query}'`))
            const message = empty.domElement
            main.replaceChild(message, previous)
          }
        })
      }, 500)
    } else {
      const empty = new Dominator(Templates.empty('Search for Something.'))
      const message = empty.domElement
      main.replaceChild(message, previous)
    }
  }
  static showEmptySearch(e) {
    if (e.target.value === ''){
      if (main.firstChild.id !== 'searchResults') {
      beforeSearch.domElement = main.firstChild
      beforeSearch.controlHeading = controlHeading.innerText
      controlHeading.innerText = 'Search'
      }
      const empty = new Dominator(Templates.empty('Search for Something.'))
      const message = empty.domElement
      document.querySelector('.back i').classList.remove('disabled')
      main.replaceChild(message, main.firstChild)
    }
  }
  static hideEmptySearch(e) {
    if (e.target.value === '') {
      setTimeout(() => {
        if (main.firstChild.id === 'searchResults') {
          Folder.goBack()
        }
      }, 100)
    }
  }
}
