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

  static showAllFolders() {
    const h2 = document.createElement('h2')
    h2.innerText = 'Folders'
    controls.innerHTML = ''
    controls.append(h2)
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
      newIcon.classList.add('folder-icon')
      //handle new folder
      // newIcon.addEventListener('click', )
    }
    div.prepend(newIcon)

    return div
  }
}
