/**
 * 
 * @param {String} tag 
 * @param {Object} attrs 
 * @param  {String|Object} children 
 */
function createElement(tag, attrs, ...children) {
  return {
    tag, 
    attrs, 
    children
  }
}

class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }

  setState(state) {
    Object.assign(this.state, state)
    JreactDom.renderComponent(this)
  }
}


export default { createElement, Component }
