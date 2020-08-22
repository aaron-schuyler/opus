class Folder {
  static folderNavigatorElement = Folder.generateCollectionView('allFolders')

  constructor(folder) {
    Object.assign(this, folder)
    Folder.folderNavigatorElement.append(this.folderIcon)
  }

  get folderIcon() {
    const icon = new Dominator(Templates.folderIcon(this))
    const div = icon.domElement
    div.addEventListener('click', this.goToFolder.bind(this))
    return div
  }

  goToFolder() {
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
        main.replaceChild(docNavigatorElement, Folder.folderNavigatorElement)
      })
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
    return foldersControls
  }

  static showAllFolders() {
    backFunction = false
    controls.innerHTML = ''
    controls.append(Folder.controls())
    main.innerHTML = ''
    main.append(Folder.folderNavigatorElement)
    document.querySelector('.back i').classList.add('disabled')
  }

  static newFolder() {
    const newFolderPopup = new Dominator(Templates.newFolderPopup())
    if (document.querySelector('#newFolderPopup')) {
      document.body.replaceChild(popup, popup)
    } else {
      popup = newFolderPopup.domElement
      document.body.insertBefore(popup, main)
    }
    const selectColor = popup.querySelector('select')
    selectColor.classList.add(selectColor.value)
    let lastColor = selectColor.value
    selectColor.addEventListener('change', (e) => {
      selectColor.classList.remove(lastColor)
      lastColor = selectColor.value
      selectColor.classList.add(selectColor.value)
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
      //handle new doc
      //newIcon.addEventListener('click', )
    } else {
      //handle new folder
      newIcon.addEventListener('click', Folder.newFolder)
    }
    return domElement
  }
}
