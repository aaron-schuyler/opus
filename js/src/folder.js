class Folder {
  static all = []
  static folderNavigatorElement = Folder.generateCollectionView('allFolders')

  constructor(folder) {
    this.docNavigatorElement = Folder.generateCollectionView('folder-' + folder.id + '-docs')
    this.id = folder.id
    this.name = folder.name
    this.color = folder.color
    this.docCount = folder.docs

    Folder.folderNavigatorElement.append(this.folderIcon)
    Folder.all.push(this)
  }

  get folderIcon() {
    const div = document.createElement('div')
    div.id = 'folder-' + this.id
    div.classList.add('folder-icon')
    
    return div
  }
  static showAllFolders() {
    main.append(Folder.folderNavigatorElement)
  }

  static generateCollectionView(id) {
    const div = document.createElement('div')
    div.id = id
    return div
  }
}
