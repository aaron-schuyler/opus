class Doc {
  static openDocs = {}
  static selectedDoc = null
  static lastOpenDoc = null

  constructor(doc) {
    Object.assign(this, doc)
  }

  get docIcon() {
    const dominator = new Dominator(Templates.docIcon(this))
    dominator.event(this.openDoc.bind(this))
    dominator.event(this.deleteDoc.bind(this), 'deleteDoc')
    dominator.event(this.moveDoc.bind(this), 'moveDoc')
    const div = dominator.domElement
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
    const saved = document.createElement('div')
    saved.id = 'saved'
    saved.innerText = 'Doc saved'
    saved.classList.add('doc-saved')
    const editor = document.createElement('div')
    editor.id = 'docEditor' + this.id
    editor.style.opacity = 0
    docAdapter.getDoc(this.id)
    .then((json) => {
      main.innerHTML = ''
      main.append(name, editor)
      this.quill = new Quill('#docEditor' + this.id, {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['code'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['code-block']
          ]
        },
        theme: 'snow'
      })
      document.querySelector('.ql-toolbar').append(saved)
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
    } else {
      Doc.lastOpenDoc = null
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
        document.querySelector('#saved').style.opacity = 1
        setTimeout(() => {
          document.querySelector('#saved').style.opacity = 0
        }, 800)
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
    folderAdapter.getFolders()
      .then((json) => {
        const moveDocPopup = new Dominator(Templates.moveDoc(json.folders))
        moveDocPopup.event((e) => {
          const folderId = popup.querySelector('#selectFolder').value
          docAdapter.updateDocFolder(this.id, folderId)
          .then((json) => {
            if (json.success) {
              this.icon.remove()
            }
          })
        }, 'moveDocButton')
        if (document.querySelector('#moveDocPopup')) {
          let newPopup = moveDocPopup.domElement
          document.body.replaceChild(newPopup, popup)
          popup = newPopup
        } else {
          popup = moveDocPopup.domElement
          document.body.insertBefore(popup, main)
        }
        // popup.querySelector('#moveDocButton').addEventListener('click', (e) => {
        //   const folderId = popup.querySelector('#selectFolder').value
        //   docAdapter.updateDocFolder(this.id, folderId)
        //   .then((json) => {
        //     if (json.success) {
        //       this.icon.remove()
        //     }
        //   })
        // })
      })
  }

  static filterDocs() {
    let collection = document.querySelector('.collection')
    let children = Array.from(collection.children)
    children.forEach((child) => {
      if (!child.classList.contains('new-doc-icon')) collection.removeChild(child)
    })
    children.shift()
    let sorted = children.sort((a,b) => {
      let titleA = a.querySelector('h3').textContent
      let titleB = b.querySelector('h3').textContent
      if (titleA < titleB) return -1
      if (titleA > titleB) return 1
      return 0
    })
    console.log(sorted)
    sorted.forEach((node) => {
      collection.append(node)
    })
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
