class Folder {
  static folderNavigatorElement = Folder.generateCollectionView('allFolders')

  constructor(folder) {
    Object.assign(this, folder)
    Folder.folderNavigatorElement.append(this.folderIcon)
  }

  get folderIcon() {
    const icon = new Dominator(Templates.folderIcon(this))
    const div = icon.domElement
    div.querySelector('#deleteFolder').addEventListener('click', this.deleteFolder.bind(this))
    div.querySelector('#editFolder').addEventListener('click', this.editFolder.bind(this))
    div.addEventListener('click', this.goToFolder.bind(this))
    this.icon = div
    return div
  }

  deleteFolder() {
    folderAdapter.deleteFolder(this.id)
    .then((json) => {
      if (json.success) {
        this.icon.remove()
      }
    })
  }

  editFolder(e) {
    e.preventDefault()
    e.stopPropagation()
    Folder.newFolder(e)
    const oldButton = popup.querySelector('button')
    const button = oldButton.cloneNode()
    popup.replaceChild(button, oldButton)
    button.innerText = 'Update Folder'
    popup.querySelector('input').value = this.name
    const select = popup.querySelector('select')
    select.value = this.color
    select.classList.remove('red')
    select.classList.add(this.color)
    button.addEventListener('click', this.updateFolder.bind(this))
  }

  updateFolder(e) {
    folderAdapter.updateFolder(this)
  }

  goToFolder(e) {
    let folderControls
    document.querySelector('#filter').remove()
    if (this.icon) folderControls = this.icon.querySelector('.folder-controls')
    if (folderControls && !folderControls.contains(e.target)){
      const docNavigatorElement = Folder.generateCollectionView('folder-' + this.id + '-docs', this.id)
      folderAdapter.getFolderById(this.id)
        .then((json) => {
          for (const doc of json.docs) {
            const newDoc = new Doc(doc)
            docNavigatorElement.append(newDoc.docIcon)
          }
          backFunction = Folder.showAllFolders
          controlHeading.innerText = json.name
          document.querySelector('.back i').classList.remove('disabled')
          let controls = document.querySelector('.controls')
          let filter = document.createElement('div')
          filter.id = 'filterDocs'
          filter.classList.add('.control')
          let sortButton = document.createElement('button')
          sortButton.addEventListener('click', Doc.filterDocs)
          sortButton.innerText = 'A-Z'
          filter.append(sortButton)
          controls.append(filter)
          main.replaceChild(docNavigatorElement, Folder.folderNavigatorElement)
        })
    }
  }

  static controls() {
    const controls = new Dominator(Templates.navigatorControls({name: 'Folders'}))
    const foldersControls = controls.domElement
    const search = foldersControls.querySelector('.search input')
    search.addEventListener('keyup', Doc.search)
    search.addEventListener('blur', Doc.hideEmptySearch)
    search.addEventListener('focus', Doc.showEmptySearch)
    foldersControls.querySelector('.back').addEventListener('click', Folder.goBack)
    controlHeading = foldersControls.querySelector('h2')
    foldersControls.querySelector('#all').addEventListener('click', Folder.filter)
    foldersControls.querySelector('#red').addEventListener('click', Folder.filter)
    foldersControls.querySelector('#blue').addEventListener('click', Folder.filter)
    foldersControls.querySelector('#green').addEventListener('click', Folder.filter)
    foldersControls.querySelector('#pink').addEventListener('click', Folder.filter)
    return foldersControls
  }

  static showAllFolders() {
    backFunction = false
    controls.innerHTML = ''
    controls.append(Folder.controls())
    main.innerHTML = ''
    main.append(Folder.folderNavigatorElement)
    document.querySelector('.back i').classList.add('disabled')
    document.querySelector('#all').classList.add('active')
    if (Doc.lastOpenDoc) docView.addEventListener('click', Doc.lastOpenDoc.openDoc.bind(Doc.lastOpenDoc))
  }

  static filter(e) {
    const color = e.target.id
    const folderIcons = document.querySelectorAll('.folder-icon')
    const buttons = document.querySelectorAll('#filter button')
    for (const button of buttons) {
      if (button.id === color) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    }
    for (const folder of folderIcons) {
      if (color === 'all') {
        folder.classList.remove('hidden')
      } else if (folder.classList.contains('folder-color-' + color)) {
        folder.classList.remove('hidden')
      } else if (!folder.classList.contains('new-doc-icon')){
        folder.classList.add('hidden')
      }
    }
  }

  static newFolder(e) {
    e.preventDefault()
    e.stopPropagation()
    const newFolderPopup = new Dominator(Templates.newFolderPopup())
    if (document.querySelector('#newFolderPopup')) {
      let newPopup = newFolderPopup.domElement
      document.body.replaceChild(newPopup, popup)
      popup = newPopup
    } else {
      popup = newFolderPopup.domElement
      document.body.insertBefore(popup, main)
    }
    const selectColor = popup.querySelector('select')
    selectColor.classList.add(selectColor.value)
    selectColor.addEventListener('focus', (e) => {
      let lastColor = selectColor.value
      selectColor.addEventListener('change', (e) => {
        selectColor.classList.remove(lastColor)
        lastColor = selectColor.value
        selectColor.classList.add(selectColor.value)
      })
    })
    popup.querySelector('button').addEventListener('click', folderAdapter.createFolder.bind(folderAdapter))
  }

  static goBack() {
    if (backFunction) {
      if (main.firstChild.id === 'searchResults'){
        main.replaceChild(beforeSearch.domElement, main.firstChild)
        controlHeading.innerText = beforeSearch.controlHeading
      } else {
        backFunction()
      }
    } else {
      Folder.showAllFolders()
    }
  }

  static generateCollectionView(id, folderId) {
    const collection = new Dominator(Templates.collection(id))
    const domElement = collection.domElement
    const newIcon = domElement.querySelector('.new-doc-icon')
    if (folderId) {
      newIcon.addEventListener('click', (e) => {
        docAdapter.newDoc(folderId)
        .then((json) => {
          if (json.success) {
            const newDoc = new Doc(json.doc)
            newDoc.openDoc()
          }
        })
      })
    } else {
      newIcon.addEventListener('click', Folder.newFolder)
    }
    return domElement
  }
}
