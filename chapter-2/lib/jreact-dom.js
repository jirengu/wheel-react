import Jreact from './jreact'


/**
 * 
 * @param {VNode} vnode 
 * @param {HTMLElement} container 
 */

 /** step 1 */
 /*
function _render(vnode, container) {
  let node
  if(typeof vnode === 'string') {
    node = document.createTextNode(vnode)
  }

  if(typeof vnode === 'object') {
    node = document.createElement(vnode.tag)
    setAttribute(node, vnode.attrs)
    vnode.children.forEach(childVnode => render(childVnode, node))
  }

  container.appendChild(node)
}
*/

/** step 2 */
function createDomFromVnode(vnode) {
  if(!vnode) return
  if(typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  /**step 3 */
  if(Array.isArray(vnode)) {
    let fragment = document.createDocumentFragment()
    vnode.forEach(vnodeChild=> {
      let dom = createDomFromVnode(vnodeChild)
      fragment.appendChild(dom)
    })
    return fragment
    
  }
  /** step3 end */

  if(typeof vnode === 'object') {
    if(typeof vnode.tag === 'function') {
      //console.log(vnode)
      let component = createComponent(vnode.tag, vnode.attrs)
      renderComponent(component)
      return component.$root
    } else {
      let dom = document.createElement(vnode.tag)
      setAttribute(dom, vnode.attrs)
      console.log(vnode)
      vnode.children.forEach(childVnode => _render(childVnode, dom))
      return dom
    }
  }
}

function _render(vnode, container) {
  if(!vnode) return
  let dom = createDomFromVnode(vnode)
  return container.appendChild(dom)
}

function createComponent(constructor, attrs) {
    //创建组件,设置组件属性
    let component 
    
    //如果是用class创建的
    if(constructor.prototype instanceof Jreact.Component) {
      component = new constructor(attrs)
    } else {
      component = new Jreact.Component(attrs)
      component.constructor = constructor
      component.render = function() {
        return this.constructor(attrs)
      }     
    } 
    
    return component
}

function renderComponent(component) {
  let vnode = component.render()
  console.log(vnode)
  let dom = createDomFromVnode(vnode)

  if(component.$root && component.$root.parentNode) {
    component.$root.parentNode.replaceChild(dom, component.$root)
  }
  component.$root = dom
}

/** step 2  end*/

/**
 * 
 * @param {VNode} vnode 
 * @param {HTMLElement} container 
 */
function render(vnode, container) {
  container.innerHTML = ''
  _render(vnode, container)  
}

/**
 * 
 * @param {HTMLElement} node 
 * @param {Object} attrs 
 */
function setAttribute(node, attrs) {
  if(!attrs) return

  for(let key in attrs) {
    if(key.startsWith('on')) {
      node[key.toLocaleLowerCase()] = attrs[key]
    } else if(key === 'style') {
      Object.assign(node.style, attrs[key])
    } else {
      node[key] = attrs[key]
    }
  }
}

export default{
  render,
  setAttribute,
  renderComponent
}
