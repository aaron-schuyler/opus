const main = document.querySelector('#main')
const editor = document.createElement('div')
const editorWrapper = document.createElement('div')
const files = document.createElement('div')

const fakeFiles = [
  {
    title: 'Lorum Ipsum',
    body: 'Lorum Ipsum Sit Dolor, Lorum Ipsum Sit Dolor: A Lorum Ipsum Story, Lorum Ipsum Sit Dolor, Lorum Ipsum Sit Dolor: A Lorum Ipsum Story.',
    collection: 1
  },
  {
    title: 'Lorum Ipsum 2',
    body: 'Lorum Ipsum Sit Dolor, A Lorum Ipsum Story...',
    collection: 1
  },
  {
    title: 'Lorum Ipsum 3',
    body: 'Lorum Ipsum Sit Dolor, A Lorum Ipsum Story...',
    collection: 1
  },
  {
    title: 'Lorum Ipsum 4',
    body: 'Lorum Ipsum Sit Dolor, A Lorum Ipsum Story...',
    collection: 1
  },
  {
    title: 'Lorum Ipsum 5',
    body: 'Lorum Ipsum Sit Dolor, A Lorum Ipsum Story...',
    collection: 1
  }
]

files.classList.add('files')

editor.id = 'editor'
editorWrapper.append(editor)
main.append(editorWrapper)

const quill = new Quill('#editor', {
  theme: 'snow'
})

function showEditor(content = quill.getContents()) {
  files.remove()
  quill.setContents(content)
  main.append(editorWrapper)
}

function newFile() {
  save() // use .then to call show editor
  editorWrapper.remove()
  showEditor({})
}

function showFileNavigator() {
  editorWrapper.remove()
  main.append(files)
  for (file of fakeFiles) {
    let fileCard = document.createElement('div')
    let title = document.createElement('h3')
    let body = document.createElement('p')
    let fade = document.createElement('span')
    fileCard.append(title, body, fade)

    fileCard.classList.add('file')

    title.innerText = file.title
    body.innerText = file.body

    files.append(fileCard)
  }
}

function save() {

}

//showFileNavigator()
