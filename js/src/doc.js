class Doc {
  static openDocs = {}
  static selectedDoc = null
  static lastOpenDoc = null

  constructor(doc) {
    Object.assign(this, doc)
  }

  get docIcon() {
    const dominator = new Dominator(Templates.docIcon(this))
    const div = dominator.domElement
    div.addEventListener('click', this.openDoc.bind(this))
    div.querySelector('#deleteDoc').addEventListener('click', this.deleteDoc.bind(this))
    div.querySelector('#moveDoc').addEventListener('click', this.moveDoc.bind(this))
    this.icon = div
    return div
  }
  openDoc() {
    Doc.openDocs[this.id] = this
    Doc.lastOpenDoc = this
    Doc.renderTabs(this.id)
    const name = document.createElement('input')
    name.id = 'docName'
    name.value = this.name
    name.classList.add('doc-name')
    name.addEventListener('keyup', this.saveDoc.bind(this))
    const editor = document.createElement('div')
    editor.id = 'docEditor' + this.id
    editor.style.opacity = 0
    docAdapter.getDoc(this.id)
    .then((json) => {
      main.innerHTML = ''
      main.append(name, editor)
      this.quill = new Quill('#docEditor' + this.id, {
        theme: 'snow'
      })
      this.quill.setContents(json.body)
      editor.style.opacity = 1
      this.quill.on('text-change', this.saveDoc.bind(this))
    })
  }
  closeDoc(e) {
    clearTimeout(saveTimer)
    docAdapter.save(this)
    const tabs = document.querySelectorAll('.tab')
    let nextDoc
    for (const [i, tab] of tabs.entries()){
      if (tab.dataset.docId == this.id) {
        if (tabs[i - 1]) {
          nextDoc = tabs[i - 1].dataset.docId
        } else if (tabs[i + 1]) {
          nextDoc = tabs[i + 1].dataset.docId
        }
        break
      }
    }
    delete Doc.openDocs[this.id]
    if (nextDoc) {
      Doc.openDocs[nextDoc].openDoc()
      Doc.renderTabs()
    } else {
      this.lastOpenDoc = null
      Folder.showAllFolders()
    }
  }
  saveDoc() {
    const name = document.querySelector('#docName').value
    this.name = name
    this.exerp = this.quill.getText(0, 200)
    this.body = this.quill.getContents()
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      docAdapter.save(this)
      .then(() => {
        document.querySelector(`.tab[data-doc-id="${this.id}"] span`).innerText = this.name
      })
    }, 5000)
  }
  deleteDoc(e) {
    e.preventDefault()
    e.stopPropagation()
    docAdapter.delete(this.id)
    .then((json) => {
      if (json.success) {
        this.icon.remove()
        delete Doc.openDocs[this.id]
      }
    })
  }


  shareDoc() {

  }
  moveDoc(e) {
    e.preventDefault()
    e.stopPropagation()
    // list all folders in dropdown
    // select folder
    // update doc
    // remove doc from dom
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
  static renderTabs(openDocId) {
    controls.innerHTML = ''
    const tabsDominator = new Dominator(Templates.tabs())
    const tabs = tabsDominator.domElement
    for (const id in Doc.openDocs) {
      const tabDominator = new Dominator(Templates.tab(Doc.openDocs[id]))
      const tab = tabDominator.domElement
      if (openDocId == id) {
        tab.classList.add('open-doc')
      }
      tab.querySelector('span').addEventListener('click', Doc.openDocs[id].openDoc.bind(Doc.openDocs[id]))
      tab.querySelector('button').addEventListener('click', Doc.openDocs[id].closeDoc.bind(Doc.openDocs[id]))
      tab.dataset.docId = id
      tabs.append(tab)
    }
    controls.append(tabs)
  }
}
