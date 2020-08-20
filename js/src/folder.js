class Folder {
  static folderNavigatorElement = Folder.generateCollectionView('allFolders')

  constructor(folder) {
    Object.assign(this, folder)
    Folder.folderNavigatorElement.append(this.folderIcon)
  }

  get folderIcon() {
    const div = document.createElement('div')
    div.id = 'folder-' + this.id
    div.classList.add('folder-icon', 'folder-color-' + this.color)
    div.title = this.name
    const icon = document.createElement('i')
    icon.classList.add('fa', 'fa-folder')
    const name = document.createElement('span')
    name.innerText = this.name
    name.classList.add('folder-name')
    const wrapper = document.createElement('div')
    wrapper.append(icon, name)
    div.append(wrapper)
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
        controls.innerHTML = ''
        controls.append(this.controls)
        main.replaceChild(docNavigatorElement, Folder.folderNavigatorElement)
      })
  }

  static controls(name) {
    const foldersControls = document.createElement('div')
    foldersControls.classList.add('controls')
    const h2 = document.createElement('h2')
    h2.innerText = name || 'Folders'
    const title = document.createElement('div')
    title.classList.add('control')
    title.append(h2)
    const input = document.createElement('input')
    input.placeholder = 'Search Docs...'
    const search = document.createElement('div')
    search.classList.add('control')
    search.append(input)
    const docControls = document.createElement('div')
    docControls.classList.add('control')
    docControls.id = 'docControls'
    foldersControls.append(title, search)
    return foldersControls
  }

  get controls() {
    const foldersControls = Folder.controls(this.name)
    return foldersControls
  }

  static showAllFolders() {
    controls.innerHTML = ''
    controls.append(Folder.controls())
    main.replaceChild(Folder.folderNavigatorElement, main.firstChild)
  }

  static generateCollectionView(id, folderId) {
    const div = document.createElement('div')
    div.classList.add('collection')
    div.id = id
    const newIcon = document.createElement('div')
    const icon = document.createElement('i')
    icon.classList.add('fa', 'fa-plus')
    const wrapper = document.createElement('div')
    wrapper.append(icon, name)
    newIcon.append(wrapper)
    if (folderId) {
      newIcon.classList.add('folder-icon', 'new-doc-icon')
      //handle new doc
      // newIcon.addEventListener('click', )
    } else {
      newIcon.classList.add('folder-icon', 'new-doc-icon')
      //handle new folder
      // newIcon.addEventListener('click', )
    }
    div.prepend(newIcon)

    return div
  }
}
