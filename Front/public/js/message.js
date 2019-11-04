webpackJsonp([2],{

/***/ 1:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            btn_create_save: false, //防呆按鈕
            // list_messages:[], //當頁要顯示的資料
            message: {}, //單一筆資料
            messages: [], //所有資料
            page: 'list', //當前頁面
            all: '', //總頁數
            limit: 10, //每頁顯示筆數
            cur: 1, //當前頁碼
            loading: true //loading的顯示與否
        };
    },

    computed: {
        list_messages: function list_messages() {
            var start = (this.cur - 1) * this.limit;
            return this.messages.slice(start, start + this.limit);
        },
        indexs: function indexs() {
            var left = 1;
            var right = this.all;
            var ar = [];
            //    if(this.all>= 11){
            //    if(this.cur > 5 && this.cur < this.all-4){
            //           left = this.cur - 5;
            //           right = this.cur + 4;
            //    }else{
            //        if(this.cur<=5){
            //            left = 1;
            //            right = 10;
            //        }else{
            //            right = this.all;
            //            left = this.all -9;
            //        }
            //    }
            // }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
        showLast: function showLast() {
            //顯示分頁的下一頁按鈕
            if (this.cur == this.all) {
                return false;
            } else if (this.all == 0) {
                return false;
            }
            return true;
        },
        showFirst: function showFirst() {
            //顯示分頁的上一頁按鈕
            if (this.cur == 1) {
                return false;
            } else if (this.all == 0) {
                return false;
            }
            return true;
        }
    },
    methods: {
        //跳頁到列表頁
        init: function init(boolean) {
            var self = this;
            self.loading = true;
            self.page = 'list';
            if (boolean) {
                self.cur = 1;
                self.messages = [];
            }
            axios.get('/messages').then(function (response) {
                self.messages = response.data;
                self.all = Math.ceil(self.messages.length / self.limit);
                // self.loadMore();
                setTimeout(function () {
                    self.loading = false;
                }, 1000);
            }).catch(function (response) {
                self.prompt('有Bug快解決，立刻馬上！');
            });
        },
        //跳頁到新增頁
        page_create: function page_create() {
            var self = this;
            self.page = 'create';
            self.btn_create_save = false;
        },
        //新增功能
        create: function create() {
            var self = this;
            self.message.mb_name = $('input[name=mb_name]').val();
            self.message.mb_content = $('textarea[name=mb_content]').val();
            if (self.message.mb_name == '') {
                self.prompt('請填寫大名');
            } else if (self.message.mb_content == '') {
                self.prompt('請填寫內容');
            } else if (self.message.mb_name.length > 50) {
                self.prompt('請填寫大名字數不可超過50字');
            } else {
                self.btn_create_save = true;
                axios.post('/message-create', self.message).then(function (response) {
                    if (response.data.result == 'ok') {
                        self.init(true);
                        self.message = {};
                        self.prompt('新增成功');
                    } else {
                        self.btn_create_save = false;
                        self.prompt(response.data.result);
                    }
                }).catch(function (response) {
                    self.btn_create_save = false;
                    self.prompt(response.data.result);
                });
            }
        },
        //加載數據
        loadMore: function loadMore() {
            var _this = this;

            var self = this;
            self.busy = true;
            self.cur = self.cur + 1;
            var start = (this.cur - 1) * this.limit;
            setTimeout(function () {
                if (self.messages.length < self.cur * _this.limit) {
                    self.busy = true;
                } else {
                    self.busy = false;
                }
                self.list_messages = _this.messages.slice(0, start + _this.limit);
            }, 500);
        },
        //檢查是否為近幾天比較新的留言
        new_or_not: function new_or_not(date) {
            var date1 = new Date(date);
            var dd = new Date() - date1;
            if (dd < 7 * 24 * 60 * 60 * 1000) {
                //要小於7天才會顯示New icon
                return true;
            } else {
                return false;
            }
        },
        //彈出提示框
        prompt: function prompt(string) {
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_body_admin h2').text(string);
            $('.prompt_body_admin').fadeIn(400);
            $('html').addClass('over_hidden');
        },
        //改變select裡的option
        change_select_option: function change_select_option(string) {
            $('.pages-wrap select option').eq(string - 1).prop('selected', true);
        },
        //回到最上面
        goTop: function goTop() {
            $('html,body').animate({ 'scrollTop': 0 }, 250);
        },
        //頁碼點擊事件
        pageClick: function pageClick() {
            var data;
            $('.pages-wrap select option').each(function () {
                if ($(this).prop('selected')) {
                    data = $(this).val();
                }
            });
            if (data != this.cur) {
                this.cur = data;
            }
        }
    },
    watch: {},
    mounted: function mounted() {
        this.init();
    }
});

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n\n", ""]);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(27)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(23),
  /* scopeId */
  "data-v-33f2cad4",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\copywritingManagement\\Front\\resources\\assets\\js\\pages\\Message.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Message.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33f2cad4", Component.options)
  } else {
    hotAPI.reload("data-v-33f2cad4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.page === 'list') ? _c('div', {
    staticClass: "container-main"
  }, [_c('div', {
    staticClass: "container-top"
  }, [_vm._m(0), _vm._v(" "), _c('button', {
    staticClass: "btn-style btn-create",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.page_create()
      }
    }
  }, [_vm._v("新增留言")])]), _vm._v(" "), (_vm.loading) ? _c('div', {
    staticClass: "loading_block"
  }) : _vm._e(), _vm._v(" "), (_vm.loading == false) ? _c('div', {
    staticClass: "container-list message-list-wrap"
  }, [(_vm.list_messages.length != 0) ? _c('div', {
    staticClass: "message-list"
  }, _vm._l((_vm.list_messages), function(data) {
    return _c('div', {
      staticClass: "message-block"
    }, [_c('div', {
      staticClass: "message-name"
    }, [(_vm.new_or_not(data.mb_time)) ? _c('i', {
      staticClass: "new"
    }) : _vm._e(), _vm._v(" "), _c('h4', [_vm._v(_vm._s(data.mb_name))]), _c('span', [_vm._v(_vm._s(data.mb_time))])]), _vm._v(" "), _c('div', {
      staticClass: "message-content"
    }, [_c('div', [_vm._v(_vm._s(data.mb_content))])])])
  })) : _vm._e(), _vm._v(" "), (_vm.list_messages.length == 0) ? _c('div', {
    staticClass: "message-list-nodata"
  }, [_vm._v("\n                查無任何資料\n            ")]) : _vm._e(), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.messages.length > 10),
      expression: "messages.length > 10"
    }],
    staticClass: "btn-top",
    on: {
      "click": function($event) {
        _vm.goTop()
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "container-bottom"
  }), _vm._v(" "), (_vm.messages.length > _vm.limit && _vm.loading == false) ? _c('div', {
    staticClass: "pages-wrap"
  }, [_c('a', {
    staticClass: "first",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        _vm.cur = 1, _vm.change_select_option(1)
      }
    }
  }, [_vm._v("FIRST")]), _vm._v(" "), (_vm.showFirst) ? _c('a', {
    staticClass: "prev",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        _vm.cur--, _vm.change_select_option(_vm.cur)
      }
    }
  }) : _c('a', {
    staticClass: "prev",
    attrs: {
      "href": "javascript:void(0)"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "select"
  }, [_c('select', {
    on: {
      "change": function($event) {
        _vm.pageClick()
      }
    }
  }, _vm._l((_vm.indexs), function(index) {
    return _c('option', {
      domProps: {
        "value": index
      }
    }, [_vm._v(_vm._s(index))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "at"
  }, [_vm._v(_vm._s(_vm.cur) + " / " + _vm._s(_vm.all))]), _vm._v(" "), (_vm.showLast) ? _c('a', {
    staticClass: "next",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        _vm.cur++, _vm.change_select_option(_vm.cur)
      }
    }
  }) : _c('a', {
    staticClass: "next",
    attrs: {
      "href": "javascript:void(0)"
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "last",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        _vm.cur = _vm.all, _vm.change_select_option(_vm.all)
      }
    }
  }, [_vm._v("LAST")])]) : _vm._e()]) : (_vm.page === 'create') ? _c('div', [_c('div', {
    staticClass: "container-main"
  }, [_vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "container-bottom"
  }), _vm._v(" "), _c('div', {
    staticClass: "message-btn-row"
  }, [_c('button', {
    staticClass: "btn-style btn-back",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.init(true)
      }
    }
  }, [_vm._v("回上一頁")]), _vm._v(" "), (_vm.btn_create_save) ? _c('button', {
    staticClass: "btn-style btn-save",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("送出留言")]) : _c('button', {
    staticClass: "btn-style btn-save",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create()
      }
    }
  }, [_vm._v("送出留言")])])])]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-title"
  }, [_c('h1', [_vm._v("留言板")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-top"
  }, [_c('h1', [_vm._v("新增留言")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message-form"
  }, [_c('div', {
    staticClass: "isip form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("IP：")]), _vm._v(" "), _c('div', {}, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "mb_id",
      "value": "192.168.160.XXX",
      "disabled": ""
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "isname form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("名字：")]), _vm._v(" "), _c('div', {}, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "mb_name",
      "placeholder": "留言者大名"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "iscontent form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("內容：")]), _vm._v(" "), _c('div', {
    attrs: {
      "title": "請輸入內容"
    }
  }, [_c('textarea', {
    staticClass: "form-control",
    attrs: {
      "name": "mb_content",
      "placeholder": "輸入留言內容"
    }
  })])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-33f2cad4", module.exports)
  }
}

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("3c9fef68", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-33f2cad4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Message.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-33f2cad4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Message.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(4)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Message__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Message___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_Message__);
// 匯入 Message.vue 檔，不需加副檔名


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(50);


/***/ })

},[97]);