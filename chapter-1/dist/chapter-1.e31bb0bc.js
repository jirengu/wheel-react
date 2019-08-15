// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"index.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
function createElement(tag, attrs) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children
  };
}

var Jreact = {
  createElement: createElement
};

function _render(vnode, container) {
  var node;

  if (typeof vnode === 'string') {
    node = document.createTextNode(vnode);
  }

  if (_typeof(vnode) === 'object') {
    node = document.createElement(vnode.tag);
    setAttribute(node, vnode.attrs);
    vnode.children.forEach(function (childVnode) {
      return _render(childVnode, node);
    });
  }

  container.appendChild(node);
}

function setAttribute(node, attrs) {
  if (!attrs) return;

  for (var key in attrs) {
    if (key.startsWith('on')) {
      node[key.toLocaleLowerCase()] = attrs[key];
    } else if (key === 'style') {
      Object.assign(node.style, attrs[key]);
    } else {
      node[key] = attrs[key];
    }
  }
}

var JreactDom = {
  render: function render(vnode, container) {
    container.innerHTML = '';

    _render(vnode, container);
  }
};
var timer = null;
start();

function start() {
  timer = setInterval(function () {
    JreactDom.render(Jreact.createElement("div", {
      id: "clock"
    }, Jreact.createElement("div", {
      className: "time"
    }, new Date().toString()), Jreact.createElement("div", null, Jreact.createElement("button", {
      onClick: start
    }, "start"), Jreact.createElement("button", {
      onClick: pause
    }, "pause"))), document.querySelector('#app'));
  }, 1000);
}

function pause() {
  clearInterval(timer);
}
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60691" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/chapter-1.e31bb0bc.map