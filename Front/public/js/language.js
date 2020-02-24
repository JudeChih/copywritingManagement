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

/***/ 12:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            languages: [], // 全部資料
            language: {}, // 單一筆資料
            search_condition: {}, // 查詢關鍵字
            field_lp: [], // 產品欄位
            field_lpf: [], // 平台欄位
            field_lc: [], // 分類欄位
            field_lsc: [], // 子分類欄位
            field_ls: [// language_system
            { ls_id: 1, ls_name: '繁' }, { ls_id: 2, ls_name: '簡' }, { ls_id: 3, ls_name: '英' }, { ls_id: 4, ls_name: '日' }, { ls_id: 5, ls_name: '韓' }, { ls_id: 6, ls_name: '越' }, { ls_id: 7, ls_name: '泰' }, { ls_id: 8, ls_name: '印' }, { ls_id: 9, ls_name: '西' }],
            field_vf: [// view_field
            { vf_id: 1, vf_name: '繁' }, { vf_id: 2, vf_name: '簡' }, { vf_id: 3, vf_name: '英' }, { vf_id: 4, vf_name: '日' }, { vf_id: 5, vf_name: '韓' }, { vf_id: 6, vf_name: '越' }, { vf_id: 7, vf_name: '泰' }, { vf_id: 8, vf_name: '印' }, { vf_id: 9, vf_name: '西' }, { vf_id: 10, vf_name: '產品' }, { vf_id: 11, vf_name: '平台' }, { vf_id: 12, vf_name: '分類' }, { vf_id: 13, vf_name: '子分類' }, { vf_id: 14, vf_name: '遊戲編號' }],
            field_display: { // 欄位顯示狀態
                product: true,
                platform: true,
                class: true,
                subclass: true,
                number: true,
                taiwan: true,
                china: true,
                english: true,
                japan: true,
                korea: true,
                vietnam: true,
                thailand: true,
                india: true,
                spain: true
            },
            page: 'list', // 當前頁面
            // page_list_class: {
            //     lp_id: 1
            // },
            start_use_view_field: false, // 篩選條件顯示
            open_view_field: false, // 打開顯示欄位區塊
            open_advanced_search: true, // 打開進階查詢(篩選條件)區塊
            language_system_check: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            hadSlice: false,
            product_check: -1, // 選擇產品
            platform_check: false, // 選擇平台
            class_check: false, // 選擇分類
            subclass_check: false, // 選擇子分類
            needReset: true, // 是否需要重新載入資料
            all: '', // 總頁數
            limit: 15, // 每頁顯示筆數
            cur: 1, // 當前頁碼
            keyword: '', // 關鍵字查詢
            loading: true, // loading的顯示與否
            composing: true // 監聽搜尋框輸入
        };
    },

    computed: {
        list_languages: function list_languages() {
            var start = (this.cur - 1) * this.limit;
            return this.languages.slice(start, start + this.limit);
        },
        indexs: function indexs() {
            var left = 1;
            var right = this.all;
            var ar = [];
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
        showLast: function showLast() {
            // 顯示分頁的下一頁按鈕
            if (this.cur == this.all) {
                return false;
            } else if (this.all == 0) {
                return false;
            }
            return true;
        },
        showFirst: function showFirst() {
            // 顯示分頁的上一頁按鈕
            if (this.cur == 1) {
                return false;
            } else if (this.all == 0) {
                return false;
            }
            return true;
        }
    },
    methods: {
        // 跳頁到列表頁
        init: function init(boolean) {
            var self = this;
            self.loading = true;
            self.page = 'list';
            if (boolean) {
                self.needReset = true;
                self.search_condition = {};
                self.cur = 1;
                self.open_advanced_search = true;
                self.product_check = -1;
                self.platform_check = false;
                self.class_check = false;
                self.subclass_check = false;
                self.languages = [];
                self.field_lp = [];
                self.field_lpf = [];
                self.field_lc = [];
                self.field_lsc = [];
                self.language = {};
                // self.page_list_class.lp_id = 1;
            }
            if (self.needReset) {
                axios.post('/languages', self.search_condition).then(function (response) {
                    self.languages = response.data;
                    self.all = Math.ceil(self.languages.length / self.limit);
                    $('td').hover(function () {
                        $(this).addClass('in');
                    }, function () {
                        $(this).removeClass('in');
                    });
                    setTimeout(function () {
                        self.loading = false;
                    }, 1000);
                }).catch(function (response) {
                    self.prompt('有Bug快解決，立刻馬上！');
                });
                axios.get('/field-language-product').then(function (response) {
                    self.field_lp = response.data;
                }).catch(function (response) {
                    self.prompt('有Bug快解決，立刻馬上！');
                });
            }
        },
        // 複製語系
        copyLanguage: function copyLanguage(content, id, lang) {
            if (content) {
                this.$copyText(content).then(function (e) {
                    $('input[name=lt_id][value=' + id + ']').siblings('td.' + lang).find('span').removeClass('none');
                    setTimeout(function () {
                        $('input[name=lt_id][value=' + id + ']').siblings('td.' + lang).find('span').addClass('none');
                    }, 1000);
                }, function (e) {
                    self.prompt('複製出了問題！');
                });
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
            var self = this;
            setTimeout(function () {
                if (self.composing) {
                    self.keyword = $('.search_taiwan').find('input[name=lt_taiwan]').val();
                    self.cur = 1;
                    self.search_condition.lt_taiwan = $('.search_taiwan').find('input[name=lt_taiwan]').val();
                    if ($('input[name=lp_id]:checked').val()) {
                        self.search_condition.lp_id = $('input[name=lp_id]:checked').val();
                    }
                    if ($('input[name=lpf_id]:checked').val()) {
                        self.search_condition.lpf_id = $('input[name=lpf_id]:checked').val();
                    }
                    if ($('input[name=lc_id]:checked').val()) {
                        self.search_condition.lc_id = $('input[name=lc_id]:checked').val();
                    }
                    if ($('input[name=lsc_id]:checked').val()) {
                        self.search_condition.lsc_id = $('input[name=lsc_id]:checked').val();
                    }
                    if (self.search_condition.lt_taiwan.replace(/\s+/g, "") != '' || self.search_condition.lp_id != '') {
                        axios.post('/languages', self.search_condition).then(function (response) {
                            self.languages = response.data;
                            self.all = Math.ceil(self.languages.length / self.limit);
                            self.needReset = false;
                        }).catch(function (response) {
                            self.prompt('有Bug快解決，立刻馬上！');
                        });
                    } else {
                        self.init(true);
                    }
                }
            }, 10);
        },
        // 點擊產品欄位
        clickProductRadio: function clickProductRadio() {
            var self = this;
            self.search_condition.lpf_id = '';
            self.search_condition.lc_id = '';
            self.search_condition.lsc_id = '';
            if ($('input[name=lp_id]:checked').val() == -1) {
                self.platform_check = false;
                self.class_check = false;
                self.subclass_check = false;
            } else if (!$('input[name=lp_id]:checked').val()) {
                axios.get('/field-language-platform/1').then(function (response) {
                    self.field_lpf = response.data;
                    if (self.field_lpf.length > 0) {
                        self.platform_check = true;
                        self.class_check = false;
                        self.subclass_check = false;
                    } else {
                        self.platform_check = false;
                        axios.post('/field-language-class', self.search_condition).then(function (response) {
                            self.field_lc = response.data;
                            if (self.field_lc.length > 0) {
                                self.class_check = true;
                            } else {
                                self.class_check = false;
                            }
                        }).catch(function (response) {
                            self.prompt('有Bug快解決，立刻馬上！');
                        });
                    }
                }).catch(function (response) {
                    self.prompt('有Bug快解決，立刻馬上！');
                });
            } else {
                self.search_condition.lpf_id = '';
                self.search_condition.lc_id = '';
                self.search_condition.lsc_id = '';
                var lp_id = $('input[name=lp_id]:checked').val();
                axios.get('/field-language-platform/' + lp_id).then(function (response) {
                    self.field_lpf = response.data;
                    if (self.field_lpf.length > 0) {
                        self.platform_check = true;
                        self.class_check = false;
                        self.subclass_check = false;
                    } else if (self.page == 'list') {
                        self.platform_check = false;
                        axios.post('/field-language-class', self.search_condition).then(function (response) {
                            self.field_lc = response.data;
                            if (self.field_lc.length > 0) {
                                self.class_check = true;
                            } else {
                                self.class_check = false;
                            }
                        }).catch(function (response) {
                            self.prompt('有Bug快解決，立刻馬上！');
                        });
                    } else if (self.page == 'modify' || self.page == 'create') {
                        self.platform_check = false;
                        var data = {};
                        data.lp_id = $('input[name=lp_id]:checked').val();
                        axios.post('/field-language-class', data).then(function (response) {
                            self.field_lc = response.data;
                            if (self.field_lc.length > 0) {
                                self.class_check = true;
                            } else {
                                self.class_check = false;
                            }
                        }).catch(function (response) {
                            self.prompt('有Bug快解決，立刻馬上！');
                        });
                    }
                }).catch(function (response) {
                    self.prompt('有Bug快解決，立刻馬上！');
                });
            }
        },
        // 點擊平台欄位
        clickPlatformRadio: function clickPlatformRadio() {
            var self = this;
            self.search_condition.lc_id = '';
            self.search_condition.lsc_id = '';
            if ($('input[name=lpf_id]:checked').val()) {
                var lpf_id = $('input[name=lpf_id]:checked').val();
                axios.get('/field-language-class/' + lpf_id).then(function (response) {
                    self.field_lc = response.data;
                    if (self.field_lc.length > 0) {
                        self.class_check = true;
                        self.subclass_check = false;
                    } else {
                        self.class_check = false;
                        self.subclass_check = false;
                    }
                }).catch(function (response) {
                    self.prompt('有Bug快解決，立刻馬上！');
                });
            }
        },
        // 點擊分類欄位
        clickClassRadio: function clickClassRadio() {
            var self = this;
            self.search_condition.lsc_id = '';
            if ($('input[name=lc_id]:checked').val()) {
                var lc_id = $('input[name=lc_id]:checked').val();
                axios.get('/field-language-subclass/' + lc_id).then(function (response) {
                    self.field_lsc = response.data;
                    if (self.field_lsc.length > 0) {
                        self.subclass_check = true;
                    } else {
                        self.subclass_check = false;
                    }
                }).catch(function (response) {
                    self.prompt('有Bug快解決，立刻馬上！');
                });
            }
        },
        // 顯示所有欄位
        changeViewField: function changeViewField() {
            var self = this;
            var boolean = true;
            self.field_display.taiwan = false;
            self.field_display.china = false;
            self.field_display.english = false;
            self.field_display.japan = false;
            self.field_display.korea = false;
            self.field_display.vietnam = false;
            self.field_display.thailand = false;
            self.field_display.india = false;
            self.field_display.spain = false;
            self.field_display.product = false;
            self.field_display.platform = false;
            self.field_display.class = false;
            self.field_display.subclass = false;
            self.field_display.number = false;
            $('.view_field').find('input:checked').each(function () {
                if ($(this).prop('value') == 1) {
                    self.field_display.taiwan = true;
                    boolean = false;
                } else if ($(this).prop('value') == 2) {
                    self.field_display.china = true;
                    boolean = false;
                } else if ($(this).prop('value') == 3) {
                    self.field_display.english = true;
                    boolean = false;
                } else if ($(this).prop('value') == 4) {
                    self.field_display.japan = true;
                    boolean = false;
                } else if ($(this).prop('value') == 5) {
                    self.field_display.korea = true;
                    boolean = false;
                } else if ($(this).prop('value') == 6) {
                    self.field_display.vietnam = true;
                    boolean = false;
                } else if ($(this).prop('value') == 7) {
                    self.field_display.thailand = true;
                    boolean = false;
                } else if ($(this).prop('value') == 8) {
                    self.field_display.india = true;
                    boolean = false;
                } else if ($(this).prop('value') == 9) {
                    self.field_display.spain = true;
                    boolean = false;
                } else if ($(this).prop('value') == 10) {
                    self.field_display.product = true;
                    boolean = false;
                } else if ($(this).prop('value') == 11) {
                    self.field_display.platform = true;
                    boolean = false;
                } else if ($(this).prop('value') == 12) {
                    self.field_display.class = true;
                    boolean = false;
                } else if ($(this).prop('value') == 13) {
                    self.field_display.subclass = true;
                    boolean = false;
                } else if ($(this).prop('value') == 14) {
                    self.field_display.number = true;
                    boolean = false;
                }
            });
            if (boolean) {
                self.field_display.taiwan = true;
                self.field_display.china = true;
                self.field_display.english = true;
                self.field_display.japan = true;
                self.field_display.korea = true;
                self.field_display.vietnam = true;
                self.field_display.thailand = true;
                self.field_display.india = true;
                self.field_display.spain = true;
                self.field_display.product = true;
                self.field_display.platform = true;
                self.field_display.class = true;
                self.field_display.subclass = true;
                self.field_display.number = true;
            }
        },
        // 顯示語系欄位
        changeLanguageSystem: function changeLanguageSystem() {
            var self = this;
            var boolean = true;
            self.field_display.taiwan = false;
            self.field_display.china = false;
            self.field_display.english = false;
            self.field_display.japan = false;
            self.field_display.korea = false;
            self.field_display.vietnam = false;
            self.field_display.thailand = false;
            self.field_display.india = false;
            self.field_display.spain = false;
            $('.search_language').find('input:checked').each(function () {
                if ($(this).prop('value') == 1) {
                    self.field_display.taiwan = true;
                    boolean = false;
                } else if ($(this).prop('value') == 2) {
                    self.field_display.china = true;
                    boolean = false;
                } else if ($(this).prop('value') == 3) {
                    self.field_display.english = true;
                    boolean = false;
                } else if ($(this).prop('value') == 4) {
                    self.field_display.japan = true;
                    boolean = false;
                } else if ($(this).prop('value') == 5) {
                    self.field_display.korea = true;
                    boolean = false;
                } else if ($(this).prop('value') == 6) {
                    self.field_display.vietnam = true;
                    boolean = false;
                } else if ($(this).prop('value') == 7) {
                    self.field_display.thailand = true;
                    boolean = false;
                } else if ($(this).prop('value') == 8) {
                    self.field_display.india = true;
                    boolean = false;
                } else if ($(this).prop('value') == 9) {
                    self.field_display.spain = true;
                    boolean = false;
                }
            });
            if (boolean) {
                self.field_display.taiwan = true;
                self.field_display.china = true;
                self.field_display.english = true;
                self.field_display.japan = true;
                self.field_display.korea = true;
                self.field_display.vietnam = true;
                self.field_display.thailand = true;
                self.field_display.india = true;
                self.field_display.spain = true;
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
        // 彈出提示框
        prompt: function prompt(string) {
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_body_admin h2').text(string);
            $('.prompt_body_admin').fadeIn(400);
            $('html').addClass('over_hidden');
        },
        // 改變select裡的option
        change_select_option: function change_select_option(string) {
            $('.pages-wrap select option').eq(string - 1).prop('selected', true);
        },
        // 回到最上面
        goTop: function goTop() {
            $('html,body').animate({ 'scrollTop': 0 }, 250);
        },
        // 頁碼點擊事件
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

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "", ""]);

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

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(26)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(22),
  /* scopeId */
  "data-v-1cffdcdb",
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Toby_huang\\projects\\copywritingManagement\\Front\\resources\\assets\\js\\pages\\Language.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Language.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1cffdcdb", Component.options)
  } else {
    hotAPI.reload("data-v-1cffdcdb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.page === 'list') ? _c('div', {
    staticClass: "container-main lang-style"
  }, [_c('div', {
    staticClass: "container-filter"
  }, [_c('div', {
    staticClass: "lang-filter-condition"
  }, [(_vm.open_advanced_search) ? _c('span', {
    staticClass: "arrow arrow-down",
    attrs: {
      "aria-hidden": "true"
    },
    on: {
      "click": function($event) {
        _vm.open_advanced_search = false
      }
    }
  }) : _c('span', {
    staticClass: "arrow arrow-up",
    attrs: {
      "aria-hidden": "true"
    },
    on: {
      "click": function($event) {
        _vm.open_advanced_search = true
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "input-group search_taiwan",
    class: {
      'no-search': _vm.list_languages.length == 0
    }
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "lt_taiwan"
    },
    domProps: {
      "value": _vm.search_condition.lt_taiwan
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
  }), _vm._v(" "), (_vm.list_languages.length == 0) ? _c('span', {
    staticClass: "input-group-btn"
  }, [_c('button', {
    staticClass: "btn btn-default btn_clearcontent",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.init(true)
      }
    }
  })]) : _vm._e()]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.product_check && !_vm.open_advanced_search),
      expression: "product_check && !open_advanced_search"
    }],
    staticClass: "filter-wrap lang-style search_language"
  }, [_c('h3', [_vm._v("語系：")]), _vm._v(" "), _c('div', {
    staticClass: "filter-label"
  }, _vm._l((_vm.field_ls), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.language_system_check),
        expression: "language_system_check"
      }],
      attrs: {
        "type": "checkbox",
        "name": "language_system"
      },
      domProps: {
        "value": field.ls_id,
        "checked": Array.isArray(_vm.language_system_check) ? _vm._i(_vm.language_system_check, field.ls_id) > -1 : (_vm.language_system_check)
      },
      on: {
        "click": function($event) {
          _vm.changeLanguageSystem()
        },
        "change": function($event) {
          var $$a = _vm.language_system_check,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = field.ls_id,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.language_system_check = $$a.concat([$$v]))
            } else {
              $$i > -1 && (_vm.language_system_check = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.language_system_check = $$c
          }
        }
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(field.ls_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.product_check && !_vm.open_advanced_search),
      expression: "product_check && !open_advanced_search"
    }],
    staticClass: "filter-wrap lang-style"
  }, [_c('h3', [_vm._v("產品：")]), _vm._v(" "), _c('div', {
    staticClass: "filter-label"
  }, [_c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.product_check),
      expression: "product_check"
    }],
    attrs: {
      "type": "radio",
      "name": "lp_id"
    },
    domProps: {
      "value": -1,
      "checked": _vm._q(_vm.product_check, -1)
    },
    on: {
      "click": function($event) {
        _vm.search(), _vm.clickProductRadio()
      },
      "change": function($event) {
        _vm.product_check = -1
      }
    }
  }), _c('span', [_vm._v("全部")])]), _vm._v(" "), _vm._l((_vm.field_lp), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.product_check),
        expression: "product_check"
      }],
      attrs: {
        "type": "radio",
        "name": "lp_id"
      },
      domProps: {
        "value": field.lp_id,
        "checked": _vm._q(_vm.product_check, field.lp_id)
      },
      on: {
        "click": function($event) {
          _vm.search(), _vm.clickProductRadio()
        },
        "change": function($event) {
          _vm.product_check = field.lp_id
        }
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(field.lp_name))])])
  })], 2)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.platform_check && !_vm.open_advanced_search),
      expression: "platform_check && !open_advanced_search"
    }],
    staticClass: "filter-wrap lang-style"
  }, [_c('h3', [_vm._v("平台：")]), _vm._v(" "), _c('div', {
    staticClass: "filter-label"
  }, _vm._l((_vm.field_lpf), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.platform_check),
        expression: "platform_check"
      }],
      attrs: {
        "type": "radio",
        "name": "lpf_id"
      },
      domProps: {
        "value": field.lpf_id,
        "checked": _vm._q(_vm.platform_check, field.lpf_id)
      },
      on: {
        "click": function($event) {
          _vm.search(), _vm.clickPlatformRadio()
        },
        "change": function($event) {
          _vm.platform_check = field.lpf_id
        }
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(field.lpf_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.class_check && !_vm.open_advanced_search),
      expression: "class_check && !open_advanced_search"
    }],
    staticClass: "filter-wrap lang-style"
  }, [_c('h3', [_vm._v("分類：")]), _vm._v(" "), _c('div', {
    staticClass: "filter-label"
  }, _vm._l((_vm.field_lc), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.class_check),
        expression: "class_check"
      }],
      attrs: {
        "type": "radio",
        "name": "lc_id"
      },
      domProps: {
        "value": field.lc_id,
        "checked": _vm._q(_vm.class_check, field.lc_id)
      },
      on: {
        "click": function($event) {
          _vm.search(), _vm.clickClassRadio()
        },
        "change": function($event) {
          _vm.class_check = field.lc_id
        }
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(field.lc_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.subclass_check && !_vm.open_advanced_search),
      expression: "subclass_check && !open_advanced_search"
    }],
    staticClass: "filter-wrap lang-style"
  }, [_c('h3', [_vm._v("子分類：")]), _vm._v(" "), _c('div', {
    staticClass: "filter-label"
  }, _vm._l((_vm.field_lsc), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.subclass_check),
        expression: "subclass_check"
      }],
      attrs: {
        "type": "radio",
        "name": "lsc_id"
      },
      domProps: {
        "value": field.lsc_id,
        "checked": _vm._q(_vm.subclass_check, field.lsc_id)
      },
      on: {
        "click": function($event) {
          _vm.search()
        },
        "change": function($event) {
          _vm.subclass_check = field.lsc_id
        }
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(field.lsc_name))])])
  }))])]), _vm._v(" "), _vm._m(0), _vm._v(" "), (_vm.loading) ? _c('div', {
    staticClass: "loading_block"
  }) : _vm._e(), _vm._v(" "), (_vm.loading == false) ? _c('div', {
    staticClass: "container-list lang-list-wrap"
  }, [_c('div', {
    staticClass: "lang-list"
  }, [(_vm.list_languages.length != 0) ? _c('table', {
    staticClass: "lang-table"
  }, [_c('thead', [_c('div', {
    staticClass: "view_field_block",
    on: {
      "mouseenter": function($event) {
        _vm.show_or_not()
      },
      "mouseleave": function($event) {
        _vm.show_or_not()
      }
    }
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.open_view_field),
      expression: "open_view_field"
    }],
    staticClass: "view_field islabel_style"
  }, _vm._l((_vm.field_vf), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.language_system_check),
        expression: "language_system_check"
      }],
      staticClass: "input_radio",
      attrs: {
        "type": "checkbox",
        "name": "language_system"
      },
      domProps: {
        "value": field.vf_id,
        "checked": Array.isArray(_vm.language_system_check) ? _vm._i(_vm.language_system_check, field.vf_id) > -1 : (_vm.language_system_check)
      },
      on: {
        "click": function($event) {
          _vm.changeViewField()
        },
        "change": function($event) {
          var $$a = _vm.language_system_check,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = field.vf_id,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.language_system_check = $$a.concat([$$v]))
            } else {
              $$i > -1 && (_vm.language_system_check = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.language_system_check = $$c
          }
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.vf_name))])])
  }))]), _vm._v(" "), _c('tr', [(_vm.field_display.product) ? _c('th', {}, [_vm._v("產品")]) : _vm._e(), _vm._v(" "), (_vm.field_display.platform) ? _c('th', {
    staticClass: "t_platform_style"
  }, [_vm._v("平台")]) : _vm._e(), _vm._v(" "), (_vm.field_display.class) ? _c('th', {
    staticClass: "t_class_style"
  }, [_vm._v("分類")]) : _vm._e(), _vm._v(" "), (_vm.field_display.subclass) ? _c('th', {
    staticClass: "t_subclass_style"
  }, [_vm._v("子分類")]) : _vm._e(), _vm._v(" "), (_vm.field_display.number && _vm.product_check != 6) ? _c('th', {
    staticClass: "t_number_style"
  }, [_vm._v("遊戲編號")]) : _vm._e(), _vm._v(" "), (_vm.field_display.taiwan) ? _c('th', {}, [_vm._v("繁")]) : _vm._e(), _vm._v(" "), (_vm.field_display.china) ? _c('th', {}, [_vm._v("簡")]) : _vm._e(), _vm._v(" "), (_vm.field_display.english) ? _c('th', {}, [_vm._v("英")]) : _vm._e(), _vm._v(" "), (_vm.field_display.japan) ? _c('th', {}, [_vm._v("日")]) : _vm._e(), _vm._v(" "), (_vm.field_display.korea) ? _c('th', {}, [_vm._v("韓")]) : _vm._e(), _vm._v(" "), (_vm.field_display.vietnam) ? _c('th', {}, [_vm._v("越")]) : _vm._e(), _vm._v(" "), (_vm.field_display.thailand) ? _c('th', {}, [_vm._v("泰")]) : _vm._e(), _vm._v(" "), (_vm.field_display.india) ? _c('th', {}, [_vm._v("印")]) : _vm._e(), _vm._v(" "), (_vm.field_display.spain) ? _c('th', {}, [_vm._v("西")]) : _vm._e()])]), _vm._v(" "), _c('tbody', _vm._l((_vm.list_languages), function(data) {
    return _c('tr', [(_vm.field_display.product) ? _c('td', {
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
    }, [_vm._v(_vm._s(data.lp_name))]) : _vm._e(), _vm._v(" "), (_vm.field_display.platform) ? _c('td', {
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
      staticClass: "t_platform_style"
    }, [_vm._v(_vm._s(data.lpf_name))]) : _vm._e(), _vm._v(" "), (_vm.field_display.class) ? _c('td', {
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
      staticClass: "t_class_style"
    }, [_vm._v(_vm._s(data.lc_name))]) : _vm._e(), _vm._v(" "), (_vm.field_display.subclass) ? _c('td', {
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
      staticClass: "t_subclass_style"
    }, [_vm._v(_vm._s(data.lsc_name))]) : _vm._e(), _vm._v(" "), (_vm.field_display.number && _vm.product_check != 6) ? _c('td', {
      staticClass: "t_number_style"
    }, [_vm._v(_vm._s(data.lt_number))]) : _vm._e(), _vm._v(" "), (_vm.field_display.taiwan) ? _c('td', {
      staticClass: "taiwan tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_taiwan, data.lt_id, 'taiwan')
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
    }, [_vm._v(_vm._s(data.lt_taiwan))])]) : _vm._e(), _vm._v(" "), (_vm.field_display.china) ? _c('td', {
      staticClass: "china tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_china, data.lt_id, 'china')
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
    }, [_vm._v(_vm._s(data.lt_china))])]) : _vm._e(), _vm._v(" "), (_vm.field_display.english) ? _c('td', {
      staticClass: "english tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_english, data.lt_id, 'english')
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
    }, [_vm._v(_vm._s(data.lt_english))])]) : _vm._e(), _vm._v(" "), (_vm.field_display.japan) ? _c('td', {
      staticClass: "japan tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_japan, data.lt_id, 'japan')
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
    }, [_vm._v(_vm._s(data.lt_japan))])]) : _vm._e(), _vm._v(" "), (_vm.field_display.korea) ? _c('td', {
      staticClass: "korea tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_korea, data.lt_id, 'korea')
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
    }, [_vm._v(_vm._s(data.lt_korea))])]) : _vm._e(), _vm._v(" "), (_vm.field_display.vietnam) ? _c('td', {
      staticClass: "vietnam tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_vietnam, data.lt_id, 'vietnam')
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
    }, [_vm._v(_vm._s(data.lt_vietnam))])]) : _vm._e(), _vm._v(" "), (_vm.field_display.thailand) ? _c('td', {
      staticClass: "thailand tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_thailand, data.lt_id, 'thailand')
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
    }, [_vm._v(_vm._s(data.lt_thailand))])]) : _vm._e(), _vm._v(" "), (_vm.field_display.india) ? _c('td', {
      staticClass: "india tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_india, data.lt_id, 'india')
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
    }, [_vm._v(_vm._s(data.lt_india))])]) : _vm._e(), _vm._v(" "), (_vm.field_display.spain) ? _c('td', {
      staticClass: "spain tip-block",
      on: {
        "dblclick": function($event) {
          _vm.copyLanguage(data.lt_spain, data.lt_id, 'spain')
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
    }, [_vm._v(_vm._s(data.lt_spain))])]) : _vm._e(), _vm._v(" "), _c('input', {
      attrs: {
        "type": "hidden",
        "name": "lt_id"
      },
      domProps: {
        "value": data.lt_id
      }
    })])
  }))]) : _vm._e(), _vm._v(" "), (_vm.list_languages.length == 0) ? _c('div', {
    staticClass: "found-nothing-wrap"
  }, [_vm._m(2)]) : _vm._e()]), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.languages.length > 10),
      expression: "languages.length > 10"
    }],
    staticClass: "btn-top",
    on: {
      "click": function($event) {
        _vm.goTop()
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "container-bottom"
  }), _vm._v(" "), (_vm.languages.length > 10 && _vm.loading == false) ? _c('div', {
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
  }, [_vm._v("LAST")])]) : _vm._e()]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-top"
  }, [_c('h1', [_vm._v("語系翻譯")]), _vm._v(" "), _c('span', {
    staticClass: "container-tips"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "view_field_title"
  }, [_c('i', {
    staticClass: "fa fa-ellipsis-h",
    attrs: {
      "aria-hidden": "true"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('hgroup', [_c('h2', [_vm._v("查無資料")]), _vm._v(" "), _c('h3', [_vm._v("There is no matching data for your query.")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1cffdcdb", module.exports)
  }
}

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("0638afc4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1cffdcdb\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Language.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1cffdcdb\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Language.vue");
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

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Language__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Language___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_Language__);
// 匯入 Language.vue 檔，不需加副檔名


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);


/***/ })

},[96]);