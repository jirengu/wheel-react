/** step 1 */
/**
 * ## JSX与虚拟DOM
 * 引入
 * 演练地址： https://babeljs.io/repl
 * @babel/plugin-transform-react-jsx 文档： https://babeljs.io/docs/en/babel-plugin-transform-react-jsx
 * 
 * 1. 初始化环境 
 *   yarn init -y
 *   yarn add parcel-bundler
 *   touch index.html index.js
 *   touch .bablerc
 * 2. 设置.babelrc
 *   {
 *     "presets": ["env"],
 *     "plugins": [
 *        ["transform-react-jsx", {
 *            "pragma": "Jreact.createElement"
 *        }]
 *      ]
 *   }
 *  3. 执行
 *    npx parcel index.html
 */

 /*
function createElement(tag, attrs, ...children) {
  return {
    tag, 
    attrs, 
    children
  }
}

const Jreact = {
  createElement
}

let element = <div className="wrap">Hello <span className="name">Jirengu</span></div>

console.log(element)
*/



/** step 2 */
/**
 * 渲染虚拟DOM
 */

/*
function createElement(tag, attrs, ...children) {
  return {
    tag, 
    attrs, 
    children
  }
}

const Jreact = {
  createElement
}


function render(vnode, container) {
  
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

const JreactDom = {
  render
}


let name = 'jirengu'
let showName = () => console.log(`name is: ${name}`)
let styleObject = {
  color: "red",
  fontSize: "60px"
}

let jsx = (
  <div id="wrap" data-id="1" onClick={ showName } style={ styleObject }>
    Hello 
    <span className="name">hello { name } <i></i></span>
  </div>
)

JreactDom.render(jsx, document.querySelector('#app'))
*/



/**step 3 */
/**
 * 做一个时钟
 */

function createElement(tag, attrs, ...children) {
  return {
    tag, 
    attrs, 
    children
  }
}

const Jreact = {
  createElement
}


function render(vnode, container) {
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

const JreactDom = {
  render(vnode, container) {
    container.innerHTML = ''
    render(vnode, container)
  }
}



let timer = null

start()


function start() {
  timer = setInterval(() => {
    JreactDom.render((
      <div id="clock">
        <div className="time">{ new Date().toString() }</div>
        <div>
          <button onClick={ start }>start</button>
          <button onClick={ pause }>pause</button>
        </div>
      </div>
    )
    , document.querySelector('#app'))
  }, 1000)
}

function pause() {
  clearInterval(timer)
}



