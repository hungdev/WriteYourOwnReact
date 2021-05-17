import { SupportedSyntheticEvents } from "./constants"


export class FiberNode {
  el: HTMLElement | Node

  tag: string
  parent: FiberNode
  props: Props

  children: FiberNode[] = []

  constructor(el: Node | HTMLElement, props?: Props) {
    this.el = el
    this.setProps(props || {})
    this.tag = el.nodeName
  }

  setProps(newProps: Props) {
    this.props = { ...newProps }
    Object.assign(this.el, this.props)
    Object.keys(this.props)
      .filter((propName) => SupportedSyntheticEvents.has(propName))
      .forEach((prop) => {
        const eventName = prop.slice(2).toLowerCase()
        this.el.addEventListener(eventName, this.props[prop] as EventHandler)
      })
  }

  appendFiberChild(child: FiberNode) {
    this.children.push(child)
    this.el.appendChild(child.el)
    child.parent = this
  }

  remove() {
    this.el["remove"]()
  }
}
