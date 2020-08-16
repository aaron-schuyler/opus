const main = document.querySelector('#main')
const editor = document.createElement('div')
const editorWrapper = document.createElement('div')
const files = document.createElement('div')

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
  files.remove()
  editorWrapper.remove()
  showEditor({})
}

function showFileNavigator() {
  editorWrapper.remove()
  main.append(files)
  files.innerText = 'hello'
}
