class Dominator {
  constructor(object) {
    Object.assign(this, object)
    let childObjects = []
    if (object.children){
      for (const child of object.children) {
        let childObject = new Dominatrix(child)
        childObjects.push(childObject)
      }
    }
    this.children = childObjects
  }
  get domElement() {
    const domElement = document.createElement(this.tag)
    if (this.id) domElement.id = this.id
    if (this.content) domElement.innerText = this.content
    if (this.classes) for (const cssClass of this.classes) {
      domElement.classList.add(cssClass)
    }
    if (this.children) for (const child of this.children) {
      domElement.append(child.domElement)
    }
    return domElement
  }
  addChild(object, index = -1) {
    const childObject = new Dominator(object)
    if (index === -1){
      this.children.push(childObject)
    } else {
      this.children.splice(index, 0, childObject)
    }
    return this.domElement
  }
}
