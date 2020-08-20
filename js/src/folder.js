class Folder {
  static folderNavigatorElement = Folder.generateCollectionView('allFolders')

  constructor(folder) {
    Object.assign(this, folder)
    this.docNavigatorElement = Folder.generateCollectionView('folder-' + folder.id + '-docs')
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
    folderAdapter.getFolderById(this.id)
      .then((json) => {
        for (const doc of json.docs) {
          const newDoc = new Doc(doc)
          this.docNavigatorElement.append(newDoc.docIcon)
        }
        main.replaceChild(this.docNavigatorElement, Folder.folderNavigatorElement)
      })
  }

  static showAllFolders() {
    const newIcon = document.createElement('div')
    newIcon.classList.add('folder-icon')
    const icon = document.createElement('i')
    icon.classList.add('fa', 'fa-plus')
    const wrapper = document.createElement('div')
    wrapper.append(icon, name)
    newIcon.append(wrapper)
    //handle new folder
    // newIcon.addEventListener('click', )
    Folder.folderNavigatorElement.prepend(newIcon)
    main.append(Folder.folderNavigatorElement)
  }

  static generateCollectionView(id) {
    const div = document.createElement('div')
    div.classList.add('collection')
    div.id = id
    return div
  }
}
