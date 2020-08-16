const main = document.querySelector('#main')
const editor = document.createElement('div')
const editorWrapper = document.createElement('div')

editor.id = 'editor'
editorWrapper.append(editor)
main.append(editorWrapper)

const quill = new Quill('#editor', {
  theme: 'snow'
})

function showEditor(content = editor.innerHTML) {
  editor.innerHTML = content
  main.append(editorWrapper)
}
