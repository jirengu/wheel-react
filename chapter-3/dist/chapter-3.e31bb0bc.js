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
})({"lib/jreact-dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jreact = _interopRequireDefault(require("./jreact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 
 * @param {VNode} vnode 
 * @param {HTMLElement} container 
 */
function createDomFromVnode(vnode) {
  console.log(vnode);
  if (!vnode) return;

  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  if (Array.isArray(vnode)) {
    var fragment = document.createDocumentFragment();
    vnode.forEach(function (vnodeChild) {
      var dom = createDomFromVnode(vnodeChild);
      fragment.appendChild(dom);
    });
    return fragment;
  }

  if (_typeof(vnode) === 'object') {
    if (typeof vnode.tag === 'function') {
      //console.log(vnode)
      var component = createComponent(vnode.tag, vnode.attrs);
      renderComponent(component);
      return component.$root;
    } else {
      var _dom = document.createElement(vnode.tag);

      setAttribute(_dom, vnode.attrs);
      vnode.children.forEach(function (childVnode) {
        return _render(childVnode, _dom);
      });
      return _dom;
    }
  }
}

function _render(vnode, container) {
  if (!vnode) return;
  var dom = createDomFromVnode(vnode);
  return container.appendChild(dom);
}

function createComponent(constructor, attrs) {
  //创建组件,设置组件属性
  var component; //如果是用class创建的

  if (constructor.prototype instanceof _jreact.default.Component) {
    component = new constructor(attrs);
  } else {
    component = new _jreact.default.Component(attrs);
    component.constructor = constructor;

    component.render = function () {
      return this.constructor(attrs);
    };
  }

  return component;
}

function renderComponent(component) {
  var vnode = component.render();
  var dom = diffNode(component.$root, vnode);
  component.$root = dom;
  component.$root._component = component;
}
/**
 * 本章节更新的代码
 * @param {VNode} vnode 
 * @param {HTMLElement} container 
 */


function render(vnode, container) {
  //--
  //container.innerHTML = ''
  //-- 
  //_render(vnode, container) 
  //++
  return diff(null, vnode, container);
}

function setAttribute(node, key, value) {
  if (key.startsWith('on')) {
    node[key.toLocaleLowerCase()] = value;
  } else if (key === 'style') {
    Object.assign(node.style, value);
  } else {
    node[key] = value;
  }
}
/**
 * 本章节新增代码
 * @param {HTMLElement} dom 要对比更新的DOM
 * @param {VNode} vnode  新的vnode
 * @param {HTMLElement} container  DOM的容器
 * @returns {HTMLElement} 更新后的DOM
 */


function diff(dom, vnode, container) {
  var patchedDom = diffNode(dom, vnode);

  if (container && patchedDom && patchedDom.parentNode !== container) {
    container.appendChild(patchedDom);
  }

  return patchedDom;
}

function diffNode(dom, vnode) {
  if (!vnode) {
    return removeDom(dom);
  }

  var patchedDom = dom; //如果是文本类型的虚拟DOM，要么替换内容，要么替换元素

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    if (patchedDom && patchedDom.nodeType === 3) {
      if (patchedDom.textContent !== vnode) {
        patchedDom.textContent = vnode;
      }
    } else {
      patchedDom = document.createTextNode(vnode);
    }

    return patchedDom;
  } //如果是组件，就diff组件


  if (_typeof(vnode) === 'object' && typeof vnode.tag === 'function') {
    patchedDom = diffComponent(dom, vnode);
    return patchedDom;
  } //否则就是普通的vnode
  //看dom是不是存在，如果不存就根据vnode创建


  if (!dom) {
    patchedDom = document.createElement(vnode.tag);
  } //如果存在但标签变了，就修正标签（创建新标签的dom，把旧标签dom的孩子放到新标签dom里，旧标签替换成新标签）


  if (dom && dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase()) {
    patchedDom = document.createElement(vnode.tag);
    dom.childNodes.forEach(function (child) {
      return patchedDom.appendChild(child);
    });
    replaceDom(patchedDom, dom);
  }

  diffAttributes(patchedDom, vnode);
  diffChildren(patchedDom, vnode.children);
  return patchedDom;
}

function diffComponent(dom, vnode) {
  var component = dom ? dom._component : null;

  if (component && component.constructor === vnode.tag) {
    setComponentProps(component, vnode.attrs);
  } else {
    component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
  }

  return component.$root;
}

function setComponentProps(component, props) {
  component.props = props;
  renderComponent(component);
}

function diffChildren(patchedDom, vChildren) {
  var domChildren = patchedDom.childNodes;
  var domsHasKey = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = domChildren[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _dom2 = _step.value;

      if (_dom2.key) {
        domsHasKey[_dom2.key] = _dom2;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var vChild;
  var patchChildDom;
  var length = Math.max(domChildren.length, vChildren.length);

  for (var i = 0; i < length; i++) {
    vChild = vChildren[i];

    if (vChild.key && domsHasKey[vChild.key]) {
      patchChildDom = diffNode(domsHasKey[vChild.key], vChild);
    } else {
      patchChildDom = diffNode(domChildren[i], vChild);
    }

    if (patchChildDom.parentNode !== patchedDom) {
      patchedDom.appendChild(patchChildDom);
    }

    setOrderInContainer(patchedDom, patchChildDom, i);
  }
}

function diffAttributes(dom, vnode) {
  var old = {};
  var attrs = vnode.attrs;

  for (var i = 0; i < dom.attributes.length; i++) {
    var attr = dom.attributes[i];
    old[attr.name] = attr.value;
  }

  for (var key in old) {
    if (!(key in attrs)) {
      setAttribute(dom, key, undefined);
    }
  }

  for (var key in attrs) {
    console.log(key);

    if (old[key] !== attrs[key]) {
      setAttribute(dom, key, attrs[key]);
    }
  }
}

function removeDom(dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeChild(dom);
  }
}

function replaceDom(newDom, oldDom) {
  if (dom && dom.parentNode) {
    dom.parentNode.replaceChild(newDom, oldDom);
  }
}

function setOrderInContainer(container, dom, order) {
  if (container.childNodes[order] !== dom) {
    container.childNodes[order].insertAdjacentElement('beforebegin', dom);
  }
}

var _default = {
  render: render,
  setAttribute: setAttribute,
  renderComponent: renderComponent
};
exports.default = _default;
},{"./jreact":"lib/jreact.js"}],"lib/jreact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jreactDom = _interopRequireDefault(require("./jreact-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 
 * @param {String} tag 
 * @param {Object} attrs 
 * @param  {String|Object} children 
 */
function createElement(tag, attrs) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children,
    key: attrs ? attrs.key ? attrs.key : null : null
  };
}

var Component =
/*#__PURE__*/
function () {
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.state = {};
    this.props = props;
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(state) {
      Object.assign(this.state, state);

      _jreactDom.default.renderComponent(this);
    }
  }]);

  return Component;
}();

var _default = {
  createElement: createElement,
  Component: Component
};
exports.default = _default;
},{"./jreact-dom":"lib/jreact-dom.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _jreact = _interopRequireDefault(require("./lib/jreact.js"));

var _jreactDom = _interopRequireDefault(require("./lib/jreact-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var App =
/*#__PURE__*/
function (_Jreact$Component) {
  _inherits(App, _Jreact$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      name: '饥人谷',
      courses: ['从入门到工作', '前端精进', '全栈'],
      styleObj: {
        color: 'red',
        fontWeight: 'bold'
      }
    };
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return _jreact.default.createElement("div", {
        className: "container"
      }, _jreact.default.createElement("h1", null, "\u6B22\u8FCE\u6765\u5230", _jreact.default.createElement("span", {
        className: "name",
        style: this.state.styleObj
      }, this.state.name), "\u5B66\u4E60\u524D\u7AEF"), _jreact.default.createElement("p", null, "aaa"), _jreact.default.createElement("p", null, "bbb"), _jreact.default.createElement("div", {
        className: "action"
      }, _jreact.default.createElement("button", {
        onClick: this.modifyName.bind(this)
      }, "\u4FEE\u6539\u540D\u5B57"), _jreact.default.createElement("button", {
        onClick: this.setStyle.bind(this)
      }, "\u6837\u5F0F")));
    }
  }, {
    key: "modifyName",
    value: function modifyName() {
      var newName = window.prompt('输入标题', '写代码啦');
      this.setState({
        name: newName
      });
    }
  }, {
    key: "setStyle",
    value: function setStyle() {
      this.setState({
        styleObj: {
          color: 'blue'
        }
      });
    }
  }]);

  return App;
}(_jreact.default.Component);

window.JreactDOM = _jreactDom.default;

_jreactDom.default.render(_jreact.default.createElement(App, null), document.querySelector('#app'));
},{"./lib/jreact.js":"lib/jreact.js","./lib/jreact-dom":"lib/jreact-dom.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56047" + '/');

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
//# sourceMappingURL=/chapter-3.e31bb0bc.map