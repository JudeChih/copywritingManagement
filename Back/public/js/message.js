webpackJsonp([4],{

/***/ 0:
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

/***/ 1:
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

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(72);


/***/ }),

/***/ 15:
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
            messages: [],
            search_condition: {
                keyword: '',
                mb_status: null
            },
            page: 'list', //當前頁面
            page_list_class: {
                lp_id: 1
            },
            needReset: true,
            all: null, //總頁數
            number: null, //總筆數
            limit: 10,
            cur: 1, //當前頁碼
            status_check: 0, //針對所選狀態做顯示，0:全部  1:未處理  2:已處理
            resolve_btn: null, //是否在提示框顯示解決相關按鈕
            btn_resolve_save: false,
            resolve_id: null,
            resolve_name: null,
            keyword: '',
            loading: true,
            composing: true //監聽搜尋框輸入
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
            if (this.all >= 11) {
                if (this.cur > 5 && this.cur < this.all - 4) {
                    left = this.cur - 5;
                    right = this.cur + 4;
                } else {
                    if (this.cur <= 5) {
                        left = 1;
                        right = 10;
                    } else {
                        right = this.all;
                        left = this.all - 9;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
        showLast: function showLast() {
            if (this.cur == this.all) {
                return false;
            } else if (this.all == 0) {
                return false;
            }
            return true;
        },
        showFirst: function showFirst() {
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
                self.needReset = true;
                self.search_condition = { keyword: '', mb_status: null };
                self.cur = 1;
                self.limit = 10;
                self.messages = [];
                self.btn_resolve_save = false;
                self.resolve_id = null;
                self.resolve_btn = null;
                self.resolve_name = null;
            }
            if (self.needReset) {
                axios.get('/messages').then(function (response) {
                    self.messages = response.data;
                    self.all = Math.ceil(self.messages.length / self.limit);
                    self.number = parseInt(self.messages.length);
                    setTimeout(function () {
                        self.loading = false;
                    }, 1000);
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //針對所選狀態做顯示
        show_status: function show_status() {
            var self = this;
            self.search_condition.mb_status = parseInt(self.status_check);
            if (self.search_condition.mb_status == 0) {
                self.search_condition.mb_status = null;
            }
            axios.post('/messages', this.search_condition).then(function (response) {
                self.cur = 1;
                self.messages = response.data;
                self.all = Math.ceil(self.messages.length / self.limit);
                self.needReset = false;
                self.number = parseInt(self.messages.length);
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //監聽搜尋框 注音輸入開始
        listen_input_start: function listen_input_start() {
            var self = this;
            self.composing = false;
        },
        //監聽搜尋框 注音輸入結束
        listen_input_end: function listen_input_end() {
            var self = this;
            self.composing = true;
        },
        //查詢功能
        search: function search() {
            var self = this;
            setTimeout(function () {
                if (self.composing) {
                    self.cur = 1;
                    self.keyword = $('.search_content').find('input[name=keyword]').val();
                    self.search_condition.keyword = $('.search_content').find('input[name=keyword]').val();
                    axios.post('/messages', self.search_condition).then(function (response) {
                        self.messages = response.data;
                        self.all = Math.ceil(self.messages.length / self.limit);
                        self.needReset = false;
                        self.number = parseInt(self.messages.length);
                    }).catch(function (response) {
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            }, 10);
        },
        //解決功能
        resolve: function resolve(id, name, boolean) {
            var self = this;
            if (boolean) {
                axios.get('/message-solve/' + id).then(function (response) {
                    if (response.data.result == 'ok') {
                        self.resolve_btn = false;
                        self.prompt('解決成功', 'success', true);
                        self.notification('解決成功', 'success');
                    } else {
                        self.resolve_btn = false;
                        self.prompt(response.data.result, 'failure', true);
                        self.notification(response.data.result, 'failure');
                    }
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            } else {
                self.resolve_btn = true;
                self.resolve_id = id;
                self.prompt('確定已經解決' + name + '這個留言問題？', 'question', false);
                self.btn_resolve_save = false;
            }
        },
        //彈出提示框
        prompt: function prompt(string, type, boolean) {
            //string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
            var self = this;
            $('.overlay').fadeIn(400);
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_body_admin h2').text(string);
            if (type == 'question') {
                $('.prompt_logo').removeClass('failure');
                $('.prompt_logo').removeClass('success');
                $('.prompt_logo i').removeClass('fa-times');
                $('.prompt_logo i').removeClass('fa-check');
                $('.prompt_logo i').addClass('fa-question');
                $('.prompt_logo').addClass('question');
            } else if (type == 'success') {
                $('.prompt_logo').removeClass('failure');
                $('.prompt_logo').removeClass('question');
                $('.prompt_logo i').removeClass('fa-times');
                $('.prompt_logo i').removeClass('fa-question');
                $('.prompt_logo i').addClass('fa-check');
                $('.prompt_logo').addClass('success');
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.prompt_fade_out();
                                self.init(true);
                            } else {
                                $('.prompt_body_admin').fadeOut(400);
                                $('.overlay').fadeOut(400);
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            } else if (type == 'failure') {
                $('.prompt_logo').removeClass('success');
                $('.prompt_logo').removeClass('question');
                $('.prompt_logo i').removeClass('fa-check');
                $('.prompt_logo i').removeClass('fa-question');
                $('.prompt_logo i').addClass('fa-times');
                $('.prompt_logo').addClass('failure');
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.prompt_fade_out();
                                self.init(true);
                            } else {
                                $('.prompt_body_admin').fadeOut(400);
                                $('.overlay').fadeOut(400);
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
            $('.prompt_body_admin').fadeIn(400);
            $('html').addClass('over_hidden');
        },
        //推撥提示框
        notification: function notification(string, type) {
            if (type == 'success') {
                $('.remove_wrapper').find('i').removeClass('fa-times');
                $('.remove_wrapper').find('i').addClass('fa-check');
                $('.remove_wrapper').removeClass('failure');
                $('.remove_wrapper').addClass('success');
                $('.remove_wrapper span').text(string);
                $('.remove_wrapper').fadeIn(400);
                $('.remove_wrapper').hover(function () {
                    $(this).fadeOut(400);
                });
                setTimeout(function () {
                    $('.remove_wrapper').fadeOut(400);
                }, 5000);
            } else if (type == 'failure') {
                $('.remove_wrapper').find('i').addClass('fa-times');
                $('.remove_wrapper').find('i').removeClass('fa-check');
                $('.remove_wrapper').addClass('failure');
                $('.remove_wrapper').removeClass('success');
                $('.remove_wrapper span').text(string);
                $('.remove_wrapper').fadeIn(400);
                $('.remove_wrapper').hover(function () {
                    $(this).fadeOut(400);
                });
                setTimeout(function () {
                    $('.remove_wrapper').fadeOut(400);
                }, 5000);
            }
        },
        // 隱藏篩選條件與否
        flow_or_not: function flow_or_not() {
            var self = this;
            if (!self.product_check) {
                self.product_check = true;
            }
            if ($('.flow_block').height() == 0) {
                $('.flow_block').animate({ 'height': self.advanced_search_height }, 200, function () {
                    $('.flow_block').css('height', 'auto');
                });
            } else {
                self.advanced_search_height = $('.flow_block').height();
                $('.flow_block').animate({ 'height': 0 }, 200);
            }
        },
        // 隱藏欄位顯示與否
        show_or_not: function show_or_not() {
            var self = this;
            if (self.open_view_field) {
                self.open_view_field = false;
            } else {
                self.open_view_field = true;
            }
            if (self.start_use_view_field) {
                self.start_use_view_field = false;
            } else {
                self.start_use_view_field = true;
            }
        },
        //關閉提示框
        prompt_fade_out: function prompt_fade_out() {
            $('.prompt_body_admin').fadeOut(400, function () {
                $('html').removeClass('over_hidden');
            });
            $('.overlay').fadeOut(400);
        },
        // 改變顯現筆數
        sortBy: function sortBy() {
            var self = this;
            self.all = Math.ceil(self.messages.length / self.limit);
            if (self.cur > self.all) {
                self.cur = self.all;
            }
        },
        // 顯示overlay
        show_overlay: function show_overlay(boolean) {
            if (boolean) {
                $('html').scrollLeft(0);
                $('html').scrollTop(0);
                $('.overlay').fadeIn(400);
                $('html').addClass('over_hidden');
            } else {
                $('.overlay').fadeOut(400);
                $('html').removeClass('over_hidden');
            }
        },
        //頁碼點擊事件
        pageClick: function pageClick(data) {
            if (data != this.cur) {
                this.cur = data;
            }
        },
        //重置資料
        cancel: function cancel() {}
    },
    watch: {},
    mounted: function mounted() {
        this.init();
    }
});

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),

/***/ 2:
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

var listToStyles = __webpack_require__(3)

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

/***/ 3:
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

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(42)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(34),
  /* scopeId */
  "data-v-47a8ed04",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\copywritingManagement\\Back\\resources\\assets\\js\\pages\\Message.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Message.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47a8ed04", Component.options)
  } else {
    hotAPI.reload("data-v-47a8ed04", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.page === 'list') ? _c('div', {
    staticClass: "page_list"
  }, [_c('div', {
    staticClass: "prompt_body_admin"
  }, [_c('div', {
    staticClass: "prompt_box_admin"
  }, [_vm._m(0), _vm._v(" "), (_vm.resolve_btn) ? _c('div', {
    staticClass: "prompt_btn_group"
  }, [_c('button', {
    staticClass: "btn_no",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.prompt_fade_out()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.btn_resolve_save) ? _c('button', {
    staticClass: "btn_yes",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("確認")]) : _c('button', {
    staticClass: "btn_yes",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.resolve(_vm.resolve_id, _vm.resolve_name, true)
      }
    }
  }, [_vm._v("確認")])]) : _c('div', {
    staticClass: "prompt_btn_group"
  }, [_vm._m(1)])])]), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "content_block"
  }, [_c('div', {
    staticClass: "content list"
  }, [_c('div', {
    staticClass: "search_block"
  }, [_c('div', {
    staticClass: "search_content"
  }, [_c('i', {
    staticClass: "fa fa-search"
  }), _vm._v(" "), _c('input', {
    class: {
      'notFound': _vm.list_messages.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "keyword"
    },
    domProps: {
      "value": _vm.search_condition.keyword
    },
    on: {
      "input": function($event) {
        _vm.search()
      },
      "compositionstart": function($event) {
        _vm.listen_input_start()
      },
      "compositionend": function($event) {
        _vm.listen_input_end()
      }
    }
  }), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.status_check),
      expression: "status_check"
    }],
    attrs: {
      "name": "mb_status"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.status_check = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, function($event) {
        _vm.show_status()
      }]
    }
  }, [_c('option', {
    attrs: {
      "value": "0"
    }
  }, [_vm._v("全部")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "1"
    }
  }, [_vm._v("未處理")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "2"
    }
  }, [_vm._v("已處理")])])])]), _vm._v(" "), _vm._m(3), _vm._v(" "), (_vm.list_messages.length != 0 && _vm.messages.length > _vm.limit && _vm.loading == false) ? _c('div', {
    staticClass: "page-bar"
  }, [_c('ul', [_c('li', [_c('span', [_vm._v(_vm._s(_vm.number) + "筆資料，共" + _vm._s(_vm.all) + "頁")])]), _vm._v(" "), (_vm.showFirst) ? _c('li', [_c('a', {
    on: {
      "click": function($event) {
        _vm.cur--
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-left"
  })])]) : _c('li', [_vm._m(4)]), _vm._v(" "), _vm._l((_vm.indexs), function(index) {
    return _c('li', {
      class: {
        'active': _vm.cur == index
      }
    }, [_c('a', {
      on: {
        "click": function($event) {
          _vm.pageClick(index)
        }
      }
    }, [_vm._v(_vm._s(index))])])
  }), _vm._v(" "), (_vm.showLast) ? _c('li', [_c('a', {
    on: {
      "click": function($event) {
        _vm.cur++
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })])]) : _c('li', [_vm._m(5)]), _vm._v(" "), _c('li', [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.limit),
      expression: "limit"
    }],
    attrs: {
      "name": "sortBy"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.limit = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.sortBy]
    }
  }, [_c('option', {
    domProps: {
      "value": 10
    }
  }, [_vm._v("10筆/頁")]), _vm._v(" "), _c('option', {
    domProps: {
      "value": 15
    }
  }, [_vm._v("15筆/頁")]), _vm._v(" "), _c('option', {
    domProps: {
      "value": 20
    }
  }, [_vm._v("20筆/頁")])])])], 2)]) : _vm._e(), _vm._v(" "), (_vm.loading) ? _c('div', {
    staticClass: "loading_block"
  }) : _vm._e(), _vm._v(" "), (_vm.loading == false) ? _c('div', {
    staticClass: "table_block"
  }, [(_vm.list_messages.length != 0) ? _c('table', {
    staticClass: "m_table"
  }, [_vm._m(6), _vm._v(" "), _c('tbody', _vm._l((_vm.list_messages), function(data) {
    return _c('tr', [_c('td', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.keyword,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }]
    }, [_vm._v(_vm._s(data.mb_name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(data.mb_ip))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(data.mb_time))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.keyword,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }]
    }, [_vm._v(_vm._s(data.mb_content))]), _vm._v(" "), _c('td', [(data.mb_status == 1) ? _c('span', {
      staticClass: "btn_status",
      on: {
        "click": function($event) {
          _vm.resolve(data.mb_id, data.mb_name, false)
        }
      }
    }, [_vm._v("未處理")]) : _c('span', [_vm._v("已處理")])])])
  }))]) : _vm._e(), _vm._v(" "), (_vm.list_messages.length == 0) ? _c('div', {
    staticClass: "found_nothing"
  }, [_vm._v("\n                        查無任何資料\n                    ")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.list_messages.length != 0 && _vm.messages.length > _vm.limit && _vm.loading == false) ? _c('div', {
    staticClass: "page-bar"
  }, [_c('ul', [_c('li', [_c('span', [_vm._v(_vm._s(_vm.number) + "筆資料，共" + _vm._s(_vm.all) + "頁")])]), _vm._v(" "), (_vm.showFirst) ? _c('li', [_c('a', {
    on: {
      "click": function($event) {
        _vm.cur--
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-left"
  })])]) : _c('li', [_vm._m(7)]), _vm._v(" "), _vm._l((_vm.indexs), function(index) {
    return _c('li', {
      class: {
        'active': _vm.cur == index
      }
    }, [_c('a', {
      on: {
        "click": function($event) {
          _vm.pageClick(index)
        }
      }
    }, [_vm._v(_vm._s(index))])])
  }), _vm._v(" "), (_vm.showLast) ? _c('li', [_c('a', {
    on: {
      "click": function($event) {
        _vm.cur++
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })])]) : _c('li', [_vm._m(8)]), _vm._v(" "), _c('li', [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.limit),
      expression: "limit"
    }],
    attrs: {
      "name": "sortBy"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.limit = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.sortBy]
    }
  }, [_c('option', {
    domProps: {
      "value": 10
    }
  }, [_vm._v("10筆/頁")]), _vm._v(" "), _c('option', {
    domProps: {
      "value": 15
    }
  }, [_vm._v("15筆/頁")]), _vm._v(" "), _c('option', {
    domProps: {
      "value": 20
    }
  }, [_vm._v("20筆/頁")])])])], 2)]) : _vm._e()])])]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "prompt_content"
  }, [_c('div', {
    staticClass: "prompt_logo"
  }, [_c('i', {
    staticClass: "fa fa-question"
  })]), _vm._v(" "), _c('h2')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('span', [_vm._v("3")]), _vm._v("s後自動關閉")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "remove_wrapper"
  }, [_c('i', {
    staticClass: "fa"
  }), _c('span')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "title_style"
  }, [_c('h1', [_vm._v("留言板列表")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "disabled",
    attrs: {
      "disabled": ""
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-left"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "disabled",
    attrs: {
      "disabled": ""
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("名字")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("IP")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("時間")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("內容")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("狀態")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "disabled",
    attrs: {
      "disabled": ""
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-left"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "disabled",
    attrs: {
      "disabled": ""
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-47a8ed04", module.exports)
  }
}

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("04ba682e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-47a8ed04\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Message.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-47a8ed04\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Message.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Message__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Message___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_Message__);
// 匯入 Message.vue 檔，不需加副檔名


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ })

},[125]);