webpackJsonp([3],{

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

/***/ 3:
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

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_BBINQuestion__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_BBINQuestion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_BBINQuestion__);
// 匯入 Question.vue 檔，不需加副檔名


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 4:
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

var listToStyles = __webpack_require__(5)

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

/***/ 5:
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

/***/ 55:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            bbin: {
                busy: false // 無限加載的開關
            },
            questions: [], // 全部BBIN提問資料
            question_field: [], // 問題分類欄位
            question: {}, // 單一筆BBIN提問資料
            search_condition: {}, // 搜尋關鍵字
            page: 'list', // 當前頁面
            check: 0, // 所選qc_id
            needReset: true, // 是否需要重新載入資料
            all: '', // 總頁數
            limit: 10, // 每頁顯示筆數
            cur: 1, // 當前頁碼

            list_questions: [], // 當頁要顯示的資料
            downloadQuestions: [], // 所選的BBIN提問id陣列
            checked_question: [],
            down_ques: [],
            show_clear_btn: false, // 顯示清除搜尋關鍵字按鈕
            keyword: '', // 關鍵字查詢
            loading: true, // loading的顯示與否
            composing: true, // 監聽搜尋框輸入
            loading_finish: false
            // }
        };
    },

    computed: {},
    methods: {
        // 跳頁到列表頁
        init: function init(boolean) {
            var self = this;
            self.loading = true;
            self.loading_finish = false;
            self.page = 'list';
            if (boolean) {
                self.needReset = true;
                self.search_condition = {};
                self.check = '';
                self.cur = 1;
                // 取消選擇問題
                $('.qa_content').removeClass('dom_none');
                $('.qa_input').addClass('dom_none');
                self.downloadQuestions = [];
            }
            if (self.needReset) {
                // 取BBIN提問資料
                axios.get('/questions/BBIN').then(function (response) {

                    self.questions = response.data;
                    self.all = Math.ceil(self.questions.length / self.limit);
                    self.loadMoreTwo();
                    setTimeout(function () {
                        self.loading = false;
                        self.loading_finish = true;
                    }, 1000);
                }).catch(function (response) {
                    self.prompt(response.data.result);
                });
                // 取BBIN提問的分類欄位資料
                axios.get('/field-question/BBIN').then(function (response) {
                    self.question_field = response.data;
                }).catch(function (response) {
                    self.prompt(response.data.result);
                });
            }
        },
        // 加載數據
        loadMoreTwo: function loadMoreTwo() {
            var self = this;
            if (self.questions.length > 0) {
                self.bbin.busy = false;
                self.cur = self.cur + 1;
                var start = (this.cur - 1) * self.limit;
                setTimeout(function () {
                    $('.qa_content').removeClass('dom_none');
                    $('.qa_input').addClass('dom_none');
                    setTimeout(function () {
                        if (self.questions.length > self.cur * self.limit) {
                            self.bbin.busy = false;
                        } else {
                            self.bbin.busy = true;
                        }
                        self.list_questions = self.questions.slice(0, start + self.limit);
                        setTimeout(function () {
                            for (var i = 0; i < self.checked_question.length; i++) {
                                var qa_id = self.checked_question[i].qa_id;
                                var qa_content = self.checked_question[i].qa_content;
                                $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_input').find('input').val(qa_content);
                                $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_content').addClass('dom_none');
                                $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_input').removeClass('dom_none');
                            }
                        }, 200);
                    }, 100);
                }, 50);
            } else {
                self.list_questions = [];
            }
        },
        // 複製語系
        copyQuestion: function copyQuestion(content, id) {
            var self = this;
            if (content) {
                this.$copyText(content).then(function (e) {
                    $('input[name=qa_id][value=' + id + ']').parent('.qa_checkbox').siblings('td.qa_content').find('span').removeClass('none');
                    setTimeout(function () {
                        $('input[name=qa_id][value=' + id + ']').parent('.qa_checkbox').siblings('td.qa_content').find('span').addClass('none');
                    }, 1000);
                }, function (e) {
                    self.prompt('複製出了問題！');
                });
            }
        },
        // 選擇問題
        selectQuestion: function selectQuestion(qa_id) {
            var self = this;
            if ($('.qa_checkbox input[value=' + qa_id + ']').prop('checked')) {
                $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_content').addClass('dom_none');
                $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_input').removeClass('dom_none');
                $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_input').find('input').val($('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_content').find('p').text());
                self.changeSelectQuestion(qa_id, true);
            } else {
                if (self.check != -1) {
                    $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_content').removeClass('dom_none');
                    $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_input').addClass('dom_none');
                }
                self.changeSelectQuestion(qa_id, false);
            }
        },
        // 下載問題
        download: function download() {
            var self = this;
            var data = [];
            var boolean = true;
            var class_leng = $('.class_name').length;
            data = self.checked_question;
            var class_json = [];
            for (var i = 0; i < class_leng; i++) {
                var aaa = {};
                aaa.name = $('.class_name').eq(i).text();
                aaa.data = [];
                class_json.push(aaa);
            }
            for (var j = 0; j < data.length; j++) {
                for (var k = 0; k < class_json.length; k++) {
                    if (data[j].qa_content == '') {
                        boolean = false;
                    }
                    if (data[j].qc_name == class_json[k].name) {
                        class_json[k].data.push(data[j]);
                    }
                }
            }
            var resultdata = [];
            for (var l = 0; l < class_json.length; l++) {
                for (var m = 0; m < class_json[l].data.length; m++) {
                    resultdata.push(class_json[l].data[m]);
                }
            }
            if (self.checked_question.length > 0) {
                if (boolean) {
                    $('.download_questions').find('input[name=dq_data]').val(JSON.stringify(resultdata));
                    $('.download_questions').find('input[name=_token]').val($('head').find('meta[name=csrf-token]').prop('content'));
                    $('.download_questions').submit();
                } else {
                    self.prompt('問題不能為空');
                }
            }
        },
        // 監聽搜尋框 注音輸入開始
        listen_input_start: function listen_input_start() {
            var self = this;
            self.composing = false;
        },
        // 監聽搜尋框 注音輸入結束
        listen_input_end: function listen_input_end() {
            var self = this;
            self.composing = true;
        },
        // 查詢功能
        search: function search() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var self = this;
            setTimeout(function () {
                if (self.composing) {
                    self.keyword = $('.search_content').find('input[name=qa_content]').val();
                    self.cur = 1;
                    // 按下清除關鍵字按鈕
                    if (id == 'clear') {
                        $('.search_content').find('input[name=qa_content]').val('');
                    }
                    if ($('.search_class').find('input[name=qc_id]:checked').val() == 0) {
                        self.search_condition.qc_id = '';
                        self.search_condition.qa_content = $('.search_content').find('input[name=qa_content]').val();
                        if (self.search_condition.qa_content != '') {
                            self.show_clear_btn = true;
                        } else {
                            self.show_clear_btn = false;
                        }
                        axios.post('/questions/BBIN', self.search_condition).then(function (response) {
                            self.questions = response.data;
                            self.all = Math.ceil(self.questions.length / self.limit);
                            self.needReset = false;
                            self.loadMoreTwo();
                        }).catch(function (response) {
                            self.prompt(response.data.result);
                        });
                    } else if ($('.search_class').find('input[name=qc_id]:checked').val() == -1) {} else {
                        $('.search_class').find('input[name=qc_id]').each(function () {
                            if ($(this).prop('checked')) {
                                self.search_condition.qc_id = $(this).prop('value');
                            }
                        });
                        self.search_condition.qa_content = $('.search_content').find('input[name=qa_content]').val();
                        if (self.search_condition.qa_content != '') {
                            self.show_clear_btn = true;
                        } else {
                            self.show_clear_btn = false;
                        }
                        axios.post('/questions/BBIN', self.search_condition).then(function (response) {
                            self.questions = response.data;
                            self.all = Math.ceil(self.questions.length / self.limit);
                            self.needReset = false;
                            self.loadMoreTwo();
                        }).catch(function (response) {
                            self.prompt(response.data.result);
                        });
                    }
                }
            }, 10);
        },
        // 修改所選的問題資料的json
        changeSelectQuestion: function changeSelectQuestion(qa_id, boolean) {
            var self = this;
            var data = {};
            var ques = [];
            var new_q = true;
            if (boolean) {
                data.qa_id = qa_id;
                data.qa_content = $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qa_input').find('input').val();
                data.qc_name = $('.qa_checkbox input[value=' + qa_id + ']').parent('.qa_checkbox').siblings('.qc_name').find('input').val();
                ques = self.checked_question;
                for (var i = 0; i < ques.length; i++) {
                    if (ques[i].qa_id == qa_id) {
                        ques[i].qa_content = data.qa_content;
                        new_q = false;
                    }
                }
                if (new_q) {
                    ques.push(data);
                }
                self.checked_question = ques;
            } else {
                ques = self.checked_question;
                for (var i = 0; i < ques.length; i++) {
                    if (ques[i].qa_id == qa_id) {
                        ques.splice(i, 1);
                    }
                }
                self.checked_question = ques;
            }
        },
        // 清除所選BBIN提問
        clearQuestions: function clearQuestions() {
            var self = this;
            self.downloadQuestions = [];
            self.checked_question = [];
            $('.qa_content').removeClass('dom_none');
            $('.qa_input').addClass('dom_none');
        },
        // 彈出提示框
        prompt: function prompt(string) {
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_body_admin h2').text(string);
            $('.prompt_body_admin').fadeIn(400);
            $('html').addClass('over_hidden');
        },
        // 回到最上面
        goTop: function goTop() {
            $('html,body').animate({ 'scrollTop': 0 }, 250);
        }
    },
    watch: {},
    mounted: function mounted() {
        this.init();
    }
});

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "", ""]);

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(77)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(75),
  /* scopeId */
  "data-v-7ae942ce",
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Toby_huang\\projects\\copywritingManagement\\Front\\resources\\assets\\js\\pages\\BBINQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BBINQuestion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ae942ce", Component.options)
  } else {
    hotAPI.reload("data-v-7ae942ce", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-main"
  }, [_c('div', {
    staticClass: "container-filter"
  }, [_c('div', {
    staticClass: "input-group search_content",
    class: {
      'no-search': _vm.list_questions.length == 0 && _vm.check != -1
    }
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "qa_content"
    },
    domProps: {
      "value": _vm.search_condition.qa_content
    },
    on: {
      "input": function($event) {
        _vm.search(-2)
      },
      "compositionstart": function($event) {
        _vm.listen_input_start()
      },
      "compositionend": function($event) {
        _vm.listen_input_end()
      }
    }
  }), _vm._v(" "), (_vm.list_questions.length == 0 && _vm.check != -1) ? _c('span', {
    staticClass: "input-group-btn"
  }, [_c('button', {
    staticClass: "btn btn-default btn_clearcontent",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.search('clear')
      }
    }
  })]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "filter-wrap search_class"
  }, [_c('h3', [_vm._v("分類：")]), _vm._v(" "), _c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.check),
      expression: "check"
    }],
    attrs: {
      "type": "radio",
      "name": "qc_id"
    },
    domProps: {
      "value": 0,
      "checked": _vm._q(_vm.check, 0)
    },
    on: {
      "click": function($event) {
        _vm.search(0)
      },
      "change": function($event) {
        _vm.check = 0
      }
    }
  }), _c('span', [_vm._v("全部")])]), _vm._v(" "), _vm._l((_vm.question_field), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.check),
        expression: "check"
      }],
      attrs: {
        "type": "radio",
        "name": "qc_id"
      },
      domProps: {
        "value": field.qc_id,
        "checked": _vm._q(_vm.check, field.qc_id)
      },
      on: {
        "click": function($event) {
          _vm.search(field.qc_id)
        },
        "change": function($event) {
          _vm.check = field.qc_id
        }
      }
    }), _c('span', {
      staticClass: "class_name"
    }, [_vm._v(_vm._s(field.qc_name))])])
  }), _vm._v(" "), _c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.check),
      expression: "check"
    }],
    attrs: {
      "type": "radio",
      "name": "qc_id"
    },
    domProps: {
      "value": -1,
      "checked": _vm._q(_vm.check, -1)
    },
    on: {
      "click": function($event) {
        _vm.search(-1)
      },
      "change": function($event) {
        _vm.check = -1
      }
    }
  }), _c('span', [_vm._v("已選問題")])])], 2), _vm._v(" "), _c('form', {
    staticClass: "none download_questions",
    attrs: {
      "action": "/questions-download",
      "method": "post"
    }
  }, [_c('input', {
    attrs: {
      "type": "hidden",
      "name": "_token"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "hidden",
      "name": "dq_data"
    }
  }), _vm._v(" "), (_vm.downloadQuestions.length > 0) ? _c('button', {
    staticClass: "btn_download",
    attrs: {
      "type": "button",
      "title": "下載所選的BBIN提問"
    },
    on: {
      "click": function($event) {
        _vm.download()
      }
    }
  }) : _vm._e()])]), _vm._v(" "), _vm._m(0), _vm._v(" "), (_vm.loading == false) ? _c('div', {
    staticClass: "container-list question-list-wrap"
  }, [_c('div', {
    staticClass: "question-list"
  }, [_c('table', {
    staticClass: "question-table"
  }, [_c('thead', [_c('tr', [_c('th', {
    staticClass: "qa_checkbox"
  }, [_c('button', {
    staticClass: "btn-style btn_clean",
    attrs: {
      "type": "button",
      "title": "清除所選BBIN提問"
    },
    on: {
      "click": function($event) {
        _vm.clearQuestions()
      }
    }
  }, [_vm._v("清除")])]), _vm._v(" "), _c('th', {
    staticClass: "qc_name"
  }, [_vm._v("分類")]), _vm._v(" "), _c('th', {}, [_vm._v("問題")])])]), _vm._v(" "), (_vm.check == -1) ? _c('tbody', _vm._l((_vm.checked_question), function(data) {
    return _c('tr', [_c('td', {
      staticClass: "qa_checkbox"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.downloadQuestions),
        expression: "downloadQuestions"
      }],
      attrs: {
        "type": "checkbox",
        "name": "qa_id"
      },
      domProps: {
        "value": data.qa_id,
        "checked": Array.isArray(_vm.downloadQuestions) ? _vm._i(_vm.downloadQuestions, data.qa_id) > -1 : (_vm.downloadQuestions)
      },
      on: {
        "click": function($event) {
          _vm.selectQuestion(data.qa_id)
        },
        "change": function($event) {
          var $$a = _vm.downloadQuestions,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = data.qa_id,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.downloadQuestions = $$a.concat([$$v]))
            } else {
              $$i > -1 && (_vm.downloadQuestions = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.downloadQuestions = $$c
          }
        }
      }
    }), _c('span')]), _vm._v(" "), _c('td', {
      staticClass: "qc_name"
    }, [_vm._v(_vm._s(data.qc_name)), _c('input', {
      attrs: {
        "type": "hidden",
        "name": "qc_name"
      },
      domProps: {
        "value": data.qc_name
      }
    })]), _vm._v(" "), _c('td', {
      staticClass: "qa_input"
    }, [_c('input', {
      staticClass: "form-control",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": data.qa_content
      },
      on: {
        "input": function($event) {
          _vm.changeSelectQuestion(data.qa_id, true)
        }
      }
    })])])
  })) : _c('tbody', _vm._l((_vm.list_questions), function(data) {
    return _c('tr', [_c('td', {
      staticClass: "qa_checkbox"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.downloadQuestions),
        expression: "downloadQuestions"
      }],
      attrs: {
        "type": "checkbox",
        "name": "qa_id"
      },
      domProps: {
        "value": data.qa_id,
        "checked": Array.isArray(_vm.downloadQuestions) ? _vm._i(_vm.downloadQuestions, data.qa_id) > -1 : (_vm.downloadQuestions)
      },
      on: {
        "click": function($event) {
          _vm.selectQuestion(data.qa_id)
        },
        "change": function($event) {
          var $$a = _vm.downloadQuestions,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = data.qa_id,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.downloadQuestions = $$a.concat([$$v]))
            } else {
              $$i > -1 && (_vm.downloadQuestions = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.downloadQuestions = $$c
          }
        }
      }
    }), _vm._v(" "), _c('span')]), _vm._v(" "), _c('td', {
      staticClass: "qc_name"
    }, [_vm._v(_vm._s(data.qc_name)), _c('input', {
      attrs: {
        "type": "hidden",
        "name": "qc_name"
      },
      domProps: {
        "value": data.qc_name
      }
    })]), _vm._v(" "), _c('td', {
      staticClass: "qa_content tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyQuestion(data.qa_content, data.qa_id)
        }
      }
    }, [_c('span', {
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
      }],
      staticClass: "none tip-block-show"
    }, [_vm._v(_vm._s(data.qa_content))])]), _vm._v(" "), _c('td', {
      staticClass: "qa_input dom_none"
    }, [_c('input', {
      staticClass: "form-control",
      attrs: {
        "type": "text"
      },
      on: {
        "input": function($event) {
          _vm.changeSelectQuestion(data.qa_id, true)
        }
      }
    })])])
  }))]), _vm._v(" "), (_vm.list_questions.length == 0 && _vm.check != -1) ? _c('div', {
    staticClass: "found-nothing-wrap"
  }, [_vm._m(1)]) : (_vm.checked_question.length == 0 && _vm.check == -1) ? _c('div', {
    staticClass: "found-nothing-wrap"
  }, [_vm._m(2)]) : _vm._e()]), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.questions.length > 10),
      expression: "questions.length > 10"
    }],
    staticClass: "btn-top",
    on: {
      "click": function($event) {
        _vm.goTop()
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "infinite-scroll",
      rawName: "v-infinite-scroll",
      value: (_vm.loadMoreTwo),
      expression: "loadMoreTwo"
    }],
    attrs: {
      "infinite-scroll-disabled": "bbin.busy",
      "infinite-scroll-distance": "10"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "container-bottom"
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-top"
  }, [_c('h1', [_vm._v("BBIN提問")]), _vm._v(" "), _c('span', {
    staticClass: "container-tips"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('hgroup', [_c('h2', [_vm._v("查無資料")]), _vm._v(" "), _c('h3', [_vm._v("There is no matching data for your query.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('hgroup', [_c('h2', [_vm._v("暫無勾選任一BBIN提問")]), _vm._v(" "), _c('h3')])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7ae942ce", module.exports)
  }
}

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("1c4c909a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7ae942ce\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BBINQuestion.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7ae942ce\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BBINQuestion.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(32);


/***/ })

},[80]);