webpackJsonp([5],{

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

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(71);


/***/ }),

/***/ 14:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            btn_modify_save: false,
            btn_create_save: false,
            btn_delete_save: false,
            add_check: true, // 防呆用，防止連按
            languages: [],
            field_ls: [//language_system
            { ls_id: 1, ls_name: '繁' }, { ls_id: 2, ls_name: '簡' }, { ls_id: 3, ls_name: '英' }, { ls_id: 4, ls_name: '日' }, { ls_id: 5, ls_name: '韓' }, { ls_id: 6, ls_name: '越' }, { ls_id: 7, ls_name: '泰' }, { ls_id: 8, ls_name: '印' }, { ls_id: 9, ls_name: '西' }],
            field_vf: [//view_field
            { vf_id: 1, vf_name: '繁' }, { vf_id: 2, vf_name: '簡' }, { vf_id: 3, vf_name: '英' }, { vf_id: 4, vf_name: '日' }, { vf_id: 5, vf_name: '韓' }, { vf_id: 6, vf_name: '越' }, { vf_id: 7, vf_name: '泰' }, { vf_id: 8, vf_name: '印' }, { vf_id: 9, vf_name: '西' }, { vf_id: 10, vf_name: '產品' }, { vf_id: 11, vf_name: '平台' }, { vf_id: 12, vf_name: '分類' }, { vf_id: 13, vf_name: '子分類' }, { vf_id: 14, vf_name: '遊戲編號' }],
            language: {},
            field_display: {
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
            page: 'list', //當前頁面
            page_list_class: {
                lp_id: 1
            },
            create_languages: [{ field_lp: [], field_lpf: [], field_lc: [], field_lsc: [], lp_id: '', lpf_id: '', lc_id: '', lsc_id: '', lt_number: '', lt_taiwan: '', lt_china: '', lt_english: '', lt_japan: '', lt_korea: '', lt_vietnam: '', lt_thailand: '', lt_india: '', lt_spain: '' }],
            // 篩選條件顯示
            start_use_view_field: false,
            open_view_field: false,
            open_advanced_search: false,
            advanced_search_height: 0, // 篩選條件縮小前的高度
            language_system_check: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            hadSlice: false,
            field_lp: [],
            field_lpf: [],
            field_lc: [],
            field_lsc: [],
            search_condition: {
                language_system: '',
                lp_id: '',
                lpf_id: '',
                lc_id: '',
                lsc_id: '',
                lt_taiwan: ''
            },
            product_check: -1,
            platform_check: false,
            class_check: false,
            subclass_check: false,
            // end
            needReset: true,
            all: '', //總頁數
            number: '', //總筆數
            limit: 10,
            cur: 1, //當前頁碼
            remove_btn: null, //是否在提示框顯示刪除相關按鈕
            remove_id: null, //要被刪除的問題id
            // 搜尋資料暫存區
            save_search_data: {},
            keyword: '',
            deltaY: 0,
            loading: true,
            composing: true //監聽搜尋框輸入
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
            self.page = 'list';
            self.loading = true; // 出現loading圖示
            if (boolean) {
                self.btn_delete_save = false;
                self.btn_create_save = false;
                self.btn_modify_save = false;
                self.needReset = true;
                self.search_condition = { language: '', lp_id: '', lpf_id: '', lc_id: '', lsc_id: '', lt_taiwan: '' };
                self.cur = 1;
                self.open_advanced_search = false;
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
                self.page_list_class.lp_id = 1;
                self.limit = 10;
                self.advanced_search_height = 0;
                self.create_languages = [];
            }
            if (self.needReset) {
                axios.post('/languages').then(function (response) {
                    self.languages = response.data;
                    self.all = Math.ceil(self.languages.length / self.limit);
                    self.number = parseInt(self.languages.length);
                    setTimeout(function () {
                        self.loading = false;
                    }, 1000);
                    // self.loading = false; // 取消loading圖示
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
                axios.get('/field-language-product').then(function (response) {
                    self.field_lp = response.data;
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //table內滾動滑鼠會變成左右移動
        onWheel: function onWheel() {
            var self = this;
            if (self.deltaY + window.event.deltaY + $(".table_overflow").width() >= $('.l_table').width()) {
                self.deltaY = $('.l_table').width() - $(".table_overflow").width();
            } else if (self.deltaY + window.event.deltaY < 0) {
                self.deltaY = 0;
            } else {
                self.deltaY = self.deltaY + window.event.deltaY;
            }
            $(".table_overflow").stop().animate({ 'scrollLeft': self.deltaY }, 10);
        },
        //切換顯示產品資料
        change_tab: function change_tab(tab) {
            var self = this;
            if (tab == 6) {
                // 廣告文宣不顯示遊戲編號的欄位
                var array = self.language_system_check;
                var index = array.indexOf(14);
                if (index > -1) {
                    array.splice(index, 1);
                    self.field_display.number = false;
                    self.hadSlice = true;
                    self.language_system_check = array;
                }
            } else {
                if (self.hadSlice) {
                    self.language_system_check.push('14');
                    self.field_display.number = true;
                    self.hadSlice = false;
                }
            }
            if (self.page_list_class.lp_id != tab) {
                self.page_list_class.lp_id = tab;
                self.cur = 1;
                axios.post('/languages', self.page_list_class).then(function (response) {
                    self.languages = response.data;
                    self.all = Math.ceil(self.languages.length / self.limit);
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //返回列表頁
        return_page_list: function return_page_list() {
            var self = this;
            self.language = [];
            self.field_lp = self.save_search_data.field_lp;
            self.field_lpf = self.save_search_data.field_lpf;
            self.field_lc = self.save_search_data.field_lc;
            self.field_lsc = self.save_search_data.field_lsc;
            self.product_check = self.save_search_data.product_check;
            self.platform_check = self.save_search_data.platform_check;
            self.class_check = self.save_search_data.class_check;
            self.subclass_check = self.save_search_data.subclass_check;
            self.search_condition = self.save_search_data.search_condition;
            self.page = 'list';
        },
        //跳頁到新增頁
        page_create: function page_create() {
            var self = this;
            self.save_search_data.field_lp = self.field_lp;
            self.save_search_data.field_lpf = self.field_lpf;
            self.save_search_data.field_lc = self.field_lc;
            self.save_search_data.field_lsc = self.field_lsc;
            self.save_search_data.product_check = self.product_check;
            self.save_search_data.platform_check = self.platform_check;
            self.save_search_data.class_check = self.class_check;
            self.save_search_data.subclass_check = self.subclass_check;
            self.save_search_data.search_condition = self.search_condition;
            self.page = 'create';
            self.btn_create_save = false;
            axios.get('/field-language-product').then(function (response) {
                self.create_languages[0].field_lp = response.data;
                self.create_languages[0].lp_id = self.create_languages[0].field_lp[0].lp_id;
                self.selectProductOption(0);
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //跳頁到修改頁
        page_modify: function page_modify(id) {
            var self = this;
            self.page = 'modify';
            self.btn_modify_save = false;
            self.save_search_data.field_lp = self.field_lp;
            self.save_search_data.field_lpf = self.field_lpf;
            self.save_search_data.field_lc = self.field_lc;
            self.save_search_data.field_lsc = self.field_lsc;
            self.save_search_data.product_check = self.product_check;
            self.save_search_data.platform_check = self.platform_check;
            self.save_search_data.class_check = self.class_check;
            self.save_search_data.subclass_check = self.subclass_check;
            self.save_search_data.search_condition = self.search_condition;
            axios.get('/languages/' + id).then(function (response) {
                self.language = response.data;
                if (self.language.lp_id) {
                    self.product_check = self.language.lp_id;
                    axios.get('/field-language-product').then(function (response) {
                        self.field_lp = response.data;
                    }).catch(function (response) {
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
                if (self.language.lpf_id) {
                    self.platform_check = self.language.lpf_id;
                    axios.get('/field-language-platform/' + self.language.lp_id).then(function (response) {
                        self.field_lpf = response.data;
                    }).catch(function (response) {
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
                if (self.language.lc_id) {
                    self.class_check = self.language.lc_id;
                    if (self.language.lpf_id) {
                        axios.get('/field-language-class/' + self.language.lpf_id).then(function (response) {
                            self.field_lc = response.data;
                        }).catch(function (response) {
                            self.prompt(response.data.result, 'failure', false);
                        });
                    } else {
                        axios.post('/field-language-class', self.language).then(function (response) {
                            self.field_lc = response.data;
                        }).catch(function (response) {
                            self.prompt(response.data.result, 'failure', false);
                        });
                    }
                }
                if (self.language.lsc_id) {
                    self.subclass_check = self.language.lsc_id;
                    axios.get('/field-language-subclass/' + self.language.lc_id).then(function (response) {
                        self.field_lsc = response.data;
                    }).catch(function (response) {
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //新增功能
        create: function create() {
            var self = this;
            var boolean = true;
            for (var i = 0; i < self.create_languages.length; i++) {
                if (self.create_languages[i].lt_taiwan == '') {
                    var string = '<div class="tip_block">' + '<p>請務必填入繁體語系</p>' + '</div>';
                    $('tbody tr').eq(i).find('input[name=lt_taiwan]').parent('.islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                    boolean = false;
                }
            }

            if (boolean) {
                axios.post('/language-create', self.create_languages).then(function (response) {
                    if (response.data.result == 'ok') {
                        self.prompt('新增成功', 'success', true);
                    } else {
                        self.btn_create_save = false;
                        self.prompt(response.data.result, 'failure', true);
                    }
                }).catch(function (response) {
                    self.btn_create_save = false;
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //修改功能
        modify: function modify() {
            var self = this;
            if (!self.product_check) {
                var string = '<div class="tip_block">' + '<p>請選擇任意產品</p>' + '</div>';
                $('.isproduct .islabel_style').append(string);
                $('.tip_block').hover(function () {
                    $(this).fadeOut(300, function () {
                        $(this).remove();
                    });
                });
            } else {
                self.btn_modify_save = true;
                self.language.lp_id = self.product_check;
                if ($('input[name=lpf_id]:checked').val()) {
                    self.language.lpf_id = $('input[name=lpf_id]:checked').val();
                } else {
                    self.language.lpf_id = '';
                }
                if ($('input[name=lc_id]:checked').val()) {
                    self.language.lc_id = $('input[name=lc_id]:checked').val();
                } else {
                    self.language.lc_id = '';
                }
                if ($('input[name=lsc_id]:checked').val()) {
                    self.language.lsc_id = $('input[name=lsc_id]:checked').val();
                } else {
                    self.language.lsc_id = '';
                }
                if ($('input[name=lt_number]').val() && self.language.lp_id != 6) {
                    self.language.lt_number = $('input[name=lt_number]').val();
                } else {
                    self.language.lt_number = '';
                }
                self.language.lt_taiwan = $('input[name=lt_taiwan]').val();
                self.language.lt_china = $('input[name=lt_china]').val();
                self.language.lt_english = $('input[name=lt_english]').val();
                self.language.lt_japan = $('input[name=lt_japan]').val();
                self.language.lt_korea = $('input[name=lt_korea]').val();
                self.language.lt_vietnam = $('input[name=lt_vietnam]').val();
                self.language.lt_thailand = $('input[name=lt_thailand]').val();
                self.language.lt_india = $('input[name=lt_india]').val();
                self.language.lt_spain = $('input[name=lt_spain]').val();
                axios.post('/language-modify', this.language).then(function (response) {
                    if (response.data.result == 'ok') {
                        // self.init(true);
                        self.language = {};
                        self.prompt('修改成功', 'success', true);
                    } else {
                        self.btn_modify_save = false;
                        self.prompt(response.data.result, 'failure', true);
                    }
                }).catch(function (response) {
                    self.btn_modify_save = false;
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //刪除功能
        remove: function remove(id, boolean) {
            var self = this;
            self.btn_delete_save = true;
            if (boolean) {
                axios.get('/language-delete/' + id).then(function (response) {
                    if (response.data.result == 'ok') {
                        // self.init(true);
                        self.prompt('刪除成功', 'success', true);
                        self.remove_btn = false;
                        self.notification('刪除成功', 'success');
                    } else {
                        self.btn_delete_save = false;
                        self.prompt(response.data.result, 'failure', true);
                        self.remove_btn = false;
                        self.notification(response.data.result, 'failure');
                    }
                }).catch(function (response) {
                    self.btn_delete_save = false;
                    self.prompt(response.data.result, 'failure', false);
                    self.remove_btn = false;
                });
            } else {
                self.remove_btn = true;
                self.remove_id = id;
                self.prompt('確定要刪除此語系翻譯？', 'question', false);
                self.btn_delete_save = false;
            }
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
                        // console.log(self.search_condition);
                        axios.post('/languages', self.search_condition).then(function (response) {
                            self.languages = response.data;
                            self.all = Math.ceil(self.languages.length / self.limit);
                            self.number = parseInt(self.languages.length);
                            self.needReset = false;
                        }).catch(function (response) {
                            self.prompt(response.data.result, 'failure', false);
                        });
                    } else {
                        self.init(true);
                    }
                }
            }, 10);
        },
        //點擊產品欄位
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
                // console.log('product_if');
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
                            self.prompt(response.data.result, 'failure', false);
                        });
                    }
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            } else {
                // console.log('product_else_if');
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
                            self.prompt(response.data.result, 'failure', false);
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
                            self.prompt(response.data.result, 'failure', false);
                        });
                    }
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //點擊平台欄位
        clickPlatformRadio: function clickPlatformRadio() {
            var self = this;
            self.search_condition.lc_id = '';
            self.search_condition.lsc_id = '';
            if ($('input[name=lpf_id]:checked').val()) {
                // console.log('platform_if');
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
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //點擊分類欄位
        clickClassRadio: function clickClassRadio() {
            var self = this;
            self.search_condition.lsc_id = '';
            if ($('input[name=lc_id]:checked').val()) {
                // console.log('class_if');
                var lc_id = $('input[name=lc_id]:checked').val();
                axios.get('/field-language-subclass/' + lc_id).then(function (response) {
                    self.field_lsc = response.data;
                    if (self.field_lsc.length > 0) {
                        self.subclass_check = true;
                    } else {
                        self.subclass_check = false;
                    }
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //新增頁面-新增一組資料欄位
        add_onemore: function add_onemore() {
            var self = this;
            self.create_languages.push({ field_lp: [], field_lpf: [], field_lc: [], field_lsc: [], lp_id: '', lpf_id: '', lc_id: '', lsc_id: '', lt_number: '', lt_taiwan: '', lt_china: '', lt_english: '', lt_japan: '', lt_korea: '', lt_vietnam: '', lt_thailand: '', lt_india: '', lt_spain: '' });
            axios.get('/field-language-product').then(function (response) {
                self.create_languages[self.create_languages.length - 1].field_lp = response.data;
                self.create_languages[self.create_languages.length - 1].lp_id = self.create_languages[self.create_languages.length - 1].field_lp[0].lp_id;
                self.selectProductOption(self.create_languages.length - 1);
                self.add_check = true;
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //新增頁面-任一產品下拉發生改變
        selectProductOption: function selectProductOption(num) {
            var self = this;
            var lp_id = self.create_languages[num].lp_id;
            //如果是廣告文宣的產品，要把遊戲編號清空
            if (lp_id == 6) {
                self.create_languages[num].lt_number = '';
            }
            axios.get('/field-language-platform/' + lp_id).then(function (response) {
                if (response.data.length > 0) {
                    self.create_languages[num].field_lpf = response.data;
                    self.create_languages[num].lpf_id = self.create_languages[num].field_lpf[0].lpf_id;
                    self.selectPlatformOption(num);
                } else {
                    self.create_languages[num].field_lpf = [];
                    self.create_languages[num].field_lc = [];
                    self.create_languages[num].field_lsc = [];
                    self.create_languages[num].lpf_id = '';
                    self.create_languages[num].lc_id = '';
                    self.create_languages[num].lsc_id = '';
                }
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //新增頁面-任一平台下拉發生改變
        selectPlatformOption: function selectPlatformOption(num) {
            var self = this;
            var lpf_id = self.create_languages[num].lpf_id;
            axios.get('/field-language-class/' + lpf_id).then(function (response) {
                if (response.data.length > 0) {
                    self.create_languages[num].field_lc = response.data;
                    self.create_languages[num].lc_id = self.create_languages[num].field_lc[0].lc_id;
                    self.selectClassOption(num);
                } else {
                    self.create_languages[num].field_lc = [];
                    self.create_languages[num].field_lsc = [];
                    self.create_languages[num].lc_id = '';
                    self.create_languages[num].lsc_id = '';
                }
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //新增頁面-任一分類下拉發生改變
        selectClassOption: function selectClassOption(num) {
            var self = this;
            var lc_id = self.create_languages[num].lc_id;
            axios.get('/field-language-subclass/' + lc_id).then(function (response) {
                if (response.data.length > 0) {
                    self.create_languages[num].field_lsc = response.data;
                    self.create_languages[num].lsc_id = self.create_languages[num].field_lsc[0].lsc_id;
                } else {
                    self.create_languages[num].field_lsc = [];
                    self.create_languages[num].lsc_id = '';
                }
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //顯示所有欄位
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
            if ($('.view_field').find('input:checked').length == 0) {
                boolean = false;
            }
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
        //顯示語系欄位
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
        //隱藏篩選條件與否
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
        //隱藏欄位顯示與否
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
        //改變顯現筆數
        sortBy: function sortBy() {
            var self = this;
            self.all = Math.ceil(self.languages.length / self.limit);
            if (self.cur > self.all) {
                self.cur = self.all;
            }
        },
        //顯示overlay
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
        }
    },
    watch: {},
    mounted: function mounted() {
        this.init();
    }
});

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

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

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

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(45)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(37),
  /* scopeId */
  "data-v-7bdef371",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\copywritingManagement\\Back\\resources\\assets\\js\\pages\\Language.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Language.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bdef371", Component.options)
  } else {
    hotAPI.reload("data-v-7bdef371", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.page === 'list') ? _c('div', {
    staticClass: "page_list"
  }, [_c('div', {
    staticClass: "prompt_body_admin"
  }, [_c('div', {
    staticClass: "prompt_box_admin"
  }, [_vm._m(0), _vm._v(" "), (_vm.remove_btn) ? _c('div', {
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
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.btn_delete_save) ? _c('button', {
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
        _vm.remove(_vm.remove_id, true)
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
    staticClass: "search_content search_taiwan"
  }, [_c('i', {
    staticClass: "fa fa-search"
  }), _vm._v(" "), _c('input', {
    class: {
      'notFound': _vm.list_languages.length == 0
    },
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
  })]), _vm._v(" "), _c('div', {
    staticClass: "search_condition"
  }, [_c('i', {
    staticClass: "fa fa-sliders"
  }), _c('p', {
    on: {
      "click": function($event) {
        _vm.flow_or_not()
      }
    }
  }, [_vm._v("篩選條件 FILTER")]), _vm._v(" "), _c('div', {
    staticClass: "flow_block"
  }, [_c('div', {
    staticClass: "islabel_style search_language"
  }, [_c('div', {
    staticClass: "search_title"
  }, [_vm._v("語系")]), _vm._v(" "), _c('div', {
    staticClass: "search_item"
  }, _vm._l((_vm.field_ls), function(field) {
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
    }), _c('span', [_vm._v(_vm._s(field.ls_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.product_check && !_vm.open_advanced_search),
      expression: "product_check && !open_advanced_search"
    }],
    staticClass: "islabel_style"
  }, [_c('div', {
    staticClass: "search_title"
  }, [_vm._v("產品")]), _vm._v(" "), _c('div', {
    staticClass: "search_item"
  }, [_c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.product_check),
      expression: "product_check"
    }],
    staticClass: "input_radio",
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
      staticClass: "input_radio",
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
    }), _c('span', [_vm._v(_vm._s(field.lp_name))])])
  })], 2)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.platform_check && !_vm.open_advanced_search),
      expression: "platform_check && !open_advanced_search"
    }],
    staticClass: "islabel_style"
  }, [_c('div', {
    staticClass: "search_title"
  }, [_vm._v("平台")]), _vm._v(" "), _c('div', {
    staticClass: "search_item"
  }, _vm._l((_vm.field_lpf), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.platform_check),
        expression: "platform_check"
      }],
      staticClass: "input_radio",
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
    }), _c('span', [_vm._v(_vm._s(field.lpf_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.class_check && !_vm.open_advanced_search),
      expression: "class_check && !open_advanced_search"
    }],
    staticClass: "islabel_style"
  }, [_c('div', {
    staticClass: "search_title"
  }, [_vm._v("分類")]), _vm._v(" "), _c('div', {
    staticClass: "search_item"
  }, _vm._l((_vm.field_lc), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.class_check),
        expression: "class_check"
      }],
      staticClass: "input_radio",
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
    }), _c('span', [_vm._v(_vm._s(field.lc_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.subclass_check && !_vm.open_advanced_search),
      expression: "subclass_check && !open_advanced_search"
    }],
    staticClass: "islabel_style"
  }, [_c('div', {
    staticClass: "search_title"
  }, [_vm._v("子分類")]), _vm._v(" "), _c('div', {
    staticClass: "search_item"
  }, _vm._l((_vm.field_lsc), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.subclass_check),
        expression: "subclass_check"
      }],
      staticClass: "input_radio",
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
    }), _c('span', [_vm._v(_vm._s(field.lsc_name))])])
  }))])])])]), _vm._v(" "), _c('div', {
    staticClass: "title_style"
  }, [_c('h1', [_vm._v("語系列表")]), _vm._v(" "), _c('button', {
    staticClass: "btn_create",
    attrs: {
      "type": "button",
      "title": "新增"
    },
    on: {
      "click": function($event) {
        _vm.page_create()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  })])]), _vm._v(" "), (_vm.list_languages.length != 0 && _vm.languages.length > _vm.limit && _vm.loading == false) ? _c('div', {
    staticClass: "page-bar"
  }, [_c('ul', [_c('li', [_c('span', [_vm._v(_vm._s(_vm.number) + "筆資料，共" + _vm._s(_vm.all) + "頁")])]), _vm._v(" "), (_vm.showFirst) ? _c('li', [_c('a', {
    on: {
      "click": function($event) {
        _vm.cur--
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-left"
  })])]) : _c('li', [_vm._m(3)]), _vm._v(" "), _vm._l((_vm.indexs), function(index) {
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
  })])]) : _c('li', [_vm._m(4)]), _vm._v(" "), _c('li', [_c('select', {
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
    staticClass: "table_block",
    class: {
      'nothing_to_show': _vm.list_languages.length == 0
    }
  }, [_c('div', {
    staticClass: "view_field_block",
    on: {
      "mouseenter": function($event) {
        _vm.show_or_not()
      },
      "mouseleave": function($event) {
        _vm.show_or_not()
      }
    }
  }, [_vm._m(5), _vm._v(" "), _c('div', {
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
  }))]), _vm._v(" "), _c('div', {
    staticClass: "table_overflow",
    attrs: {
      "onmousewheel": "return false;"
    },
    on: {
      "mousewheel": function($event) {
        _vm.onWheel()
      }
    }
  }, [_c('table', {
    staticClass: "l_table"
  }, [_c('thead', [_c('tr', [_c('th', {
    staticClass: "text_align_c"
  }, [_vm._v("功能")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.product),
      expression: "field_display.product"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("產品")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.platform),
      expression: "field_display.platform"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("平台")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.class),
      expression: "field_display.class"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("分類")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.subclass),
      expression: "field_display.subclass"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("子分類")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.number && _vm.product_check != 6),
      expression: "field_display.number && product_check!=6"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("遊戲編號")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.taiwan),
      expression: "field_display.taiwan"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("繁")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.china),
      expression: "field_display.china"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("簡")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.english),
      expression: "field_display.english"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("英")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.japan),
      expression: "field_display.japan"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("日")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.korea),
      expression: "field_display.korea"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("韓")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.vietnam),
      expression: "field_display.vietnam"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("越")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.thailand),
      expression: "field_display.thailand"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("泰")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.india),
      expression: "field_display.india"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("印")]), _vm._v(" "), _c('th', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.field_display.spain),
      expression: "field_display.spain"
    }],
    staticClass: "text_align_l"
  }, [_vm._v("西")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("時間")])])]), _vm._v(" "), _c('tbody', _vm._l((_vm.list_languages), function(data) {
    return _c('tr', [_c('td', [_c('i', {
      staticClass: "fa fa-edit",
      on: {
        "click": function($event) {
          _vm.page_modify(data.lt_id)
        }
      }
    }), _vm._v(" "), (_vm.btn_delete_save) ? _c('i', {
      staticClass: "fa fa-trash"
    }) : _c('i', {
      staticClass: "fa fa-trash",
      on: {
        "click": function($event) {
          _vm.remove(data.lt_id, false)
        }
      }
    })]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.product),
        expression: "field_display.product"
      }, {
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
      staticClass: "hover_change_color"
    }, [_vm._v(_vm._s(data.lp_name))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.platform),
        expression: "field_display.platform"
      }, {
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
      staticClass: "hover_change_color"
    }, [_vm._v(_vm._s(data.lpf_name))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.class),
        expression: "field_display.class"
      }, {
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
      staticClass: "hover_change_color"
    }, [_vm._v(_vm._s(data.lc_name))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.subclass),
        expression: "field_display.subclass"
      }, {
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
      staticClass: "hover_change_color"
    }, [_vm._v(_vm._s(data.lsc_name))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.number && _vm.product_check != 6),
        expression: "field_display.number && product_check!=6"
      }]
    }, [_vm._v(_vm._s(data.lt_number))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.taiwan),
        expression: "field_display.taiwan"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_taiwan))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.china),
        expression: "field_display.china"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_china))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.english),
        expression: "field_display.english"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_english))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.japan),
        expression: "field_display.japan"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_japan))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.korea),
        expression: "field_display.korea"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_korea))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.vietnam),
        expression: "field_display.vietnam"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_vietnam))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.thailand),
        expression: "field_display.thailand"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_thailand))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.india),
        expression: "field_display.india"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_india))]), _vm._v(" "), _c('td', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.field_display.spain),
        expression: "field_display.spain"
      }, {
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
    }, [_vm._v(_vm._s(data.lt_spain))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(data.last_update_date))])])
  }))]), _vm._v(" "), (_vm.list_languages.length == 0 && _vm.loading == false) ? _c('div', {
    staticClass: "found_nothing"
  }, [_vm._v("\n                            查無任何資料\n                        ")]) : _vm._e()])]) : _vm._e(), _vm._v(" "), (_vm.list_languages.length != 0 && _vm.languages.length > _vm.limit && _vm.loading == false) ? _c('div', {
    staticClass: "page-bar"
  }, [_c('ul', [_c('li', [_c('span', [_vm._v(_vm._s(_vm.number) + "筆資料，共" + _vm._s(_vm.all) + "頁")])]), _vm._v(" "), (_vm.showFirst) ? _c('li', [_c('a', {
    on: {
      "click": function($event) {
        _vm.cur--
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-angle-left"
  })])]) : _c('li', [_vm._m(6)]), _vm._v(" "), _vm._l((_vm.indexs), function(index) {
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
  })])]) : _c('li', [_vm._m(7)]), _vm._v(" "), _c('li', [_c('select', {
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
  }, [_vm._v("20筆/頁")])])])], 2)]) : _vm._e()])])]) : (_vm.page === 'modify') ? _c('div', {
    staticClass: "page_modify"
  }, [_vm._m(8), _vm._v(" "), _vm._m(9), _vm._v(" "), _c('div', {
    staticClass: "content_block"
  }, [_c('h3', [_vm._v("設定")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "hidden",
      "name": "lt_id"
    },
    domProps: {
      "value": _vm.language.lt_id
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.product_check),
      expression: "product_check"
    }],
    staticClass: "isproduct"
  }, [_c('div', {
    staticClass: "isproduct_title"
  }, [_vm._v("產品")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, _vm._l((_vm.field_lp), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.product_check),
        expression: "product_check"
      }],
      staticClass: "input_radio",
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
          _vm.clickProductRadio()
        },
        "change": function($event) {
          _vm.product_check = field.lp_id
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.lp_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.platform_check),
      expression: "platform_check"
    }],
    staticClass: "isplatform"
  }, [_c('div', {
    staticClass: "isplatform_title"
  }, [_vm._v("平台")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, _vm._l((_vm.field_lpf), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.platform_check),
        expression: "platform_check"
      }],
      staticClass: "input_radio",
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
          _vm.clickPlatformRadio()
        },
        "change": function($event) {
          _vm.platform_check = field.lpf_id
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.lpf_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.class_check),
      expression: "class_check"
    }],
    staticClass: "isclass"
  }, [_c('div', {
    staticClass: "isclass_title"
  }, [_vm._v("分類")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, _vm._l((_vm.field_lc), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.class_check),
        expression: "class_check"
      }],
      staticClass: "input_radio",
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
          _vm.clickClassRadio()
        },
        "change": function($event) {
          _vm.class_check = field.lc_id
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.lc_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.subclass_check),
      expression: "subclass_check"
    }],
    staticClass: "issubclass"
  }, [_c('div', {
    staticClass: "issubclass_title"
  }, [_vm._v("子分類")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, _vm._l((_vm.field_lsc), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.subclass_check),
        expression: "subclass_check"
      }],
      staticClass: "input_radio",
      attrs: {
        "type": "radio",
        "name": "lsc_id"
      },
      domProps: {
        "value": field.lsc_id,
        "checked": _vm._q(_vm.subclass_check, field.lsc_id)
      },
      on: {
        "change": function($event) {
          _vm.subclass_check = field.lsc_id
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.lsc_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.product_check != 6),
      expression: "product_check != 6"
    }],
    staticClass: "isnumber"
  }, [_c('div', {
    staticClass: "isnumber_title"
  }, [_vm._v("遊戲編號")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_number"
    },
    domProps: {
      "value": _vm.language.lt_number
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "content_block"
  }, [_c('h3', [_vm._v("各國語系")]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("繁")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_taiwan"
    },
    domProps: {
      "value": _vm.language.lt_taiwan
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("簡")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_china"
    },
    domProps: {
      "value": _vm.language.lt_china
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("英")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_english"
    },
    domProps: {
      "value": _vm.language.lt_english
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("日")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_japan"
    },
    domProps: {
      "value": _vm.language.lt_japan
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("韓")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_korea"
    },
    domProps: {
      "value": _vm.language.lt_korea
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("越")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_vietnam"
    },
    domProps: {
      "value": _vm.language.lt_vietnam
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("泰")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_thailand"
    },
    domProps: {
      "value": _vm.language.lt_thailand
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("印")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_india"
    },
    domProps: {
      "value": _vm.language.lt_india
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "islanguage"
  }, [_c('div', {
    staticClass: "islanguage_title"
  }, [_vm._v("西")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lt_spain"
    },
    domProps: {
      "value": _vm.language.lt_spain
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "modify_button"
  }, [_c('button', {
    staticClass: "btn_back",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.return_page_list()
      }
    }
  }, [_vm._v("BACK 返回")]), _vm._v(" "), (_vm.btn_modify_save) ? _c('button', {
    staticClass: "btn_save",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("SAVE 存檔")]) : _c('button', {
    staticClass: "btn_save",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.modify()
      }
    }
  }, [_vm._v("SAVE 存檔")])])]) : (_vm.page === 'create') ? _c('div', {
    staticClass: "page_create"
  }, [_vm._m(10), _vm._v(" "), _vm._m(11), _vm._v(" "), _c('div', {
    staticClass: "table_block"
  }, [_c('div', {
    staticClass: "table_overflow",
    attrs: {
      "onmousewheel": "return false;"
    },
    on: {
      "mousewheel": function($event) {
        _vm.onWheel()
      }
    }
  }, [_c('table', {
    staticClass: "l_table"
  }, [_vm._m(12), _vm._v(" "), _c('tbody', _vm._l((_vm.create_languages), function(data, key) {
    return _c('tr', [_c('td', [(_vm.add_check) ? _c('i', {
      staticClass: "fa fa-plus",
      on: {
        "click": function($event) {
          _vm.add_onemore(), _vm.add_check = false
        }
      }
    }) : _c('i', {
      staticClass: "fa fa-plus"
    }), _vm._v(" "), (key != 0) ? _c('i', {
      staticClass: "fa fa-trash",
      on: {
        "click": function($event) {
          _vm.create_languages.splice(key, 1)
        }
      }
    }) : _vm._e()]), _vm._v(" "), _c('td', {}, [_c('div', {
      staticClass: "islabel_style"
    }, [(data.field_lp.length != 0) ? _c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lp_id),
        expression: "create_languages[key].lp_id"
      }],
      attrs: {
        "name": "lp_id"
      },
      on: {
        "change": [function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val
          });
          _vm.$set(_vm.create_languages[key], "lp_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
        }, function($event) {
          _vm.selectProductOption(key)
        }]
      }
    }, _vm._l((data.field_lp), function(lp) {
      return _c('option', {
        domProps: {
          "value": lp.lp_id
        }
      }, [_vm._v(_vm._s(lp.lp_name))])
    })) : _c('select', {
      attrs: {
        "name": "lp_id",
        "disabled": "disabled"
      }
    }, [_c('option', [_vm._v("無")])])])]), _vm._v(" "), _c('td', {}, [_c('div', {
      staticClass: "islabel_style"
    }, [(data.field_lpf.length != 0) ? _c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lpf_id),
        expression: "create_languages[key].lpf_id"
      }],
      attrs: {
        "name": "lpf_id"
      },
      on: {
        "change": [function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val
          });
          _vm.$set(_vm.create_languages[key], "lpf_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
        }, function($event) {
          _vm.selectPlatformOption(key)
        }]
      }
    }, _vm._l((data.field_lpf), function(lpf) {
      return _c('option', {
        domProps: {
          "value": lpf.lpf_id
        }
      }, [_vm._v(_vm._s(lpf.lpf_name))])
    })) : _c('select', {
      attrs: {
        "name": "lpf_id",
        "disabled": "disabled"
      }
    }, [_c('option', [_vm._v("無")])])])]), _vm._v(" "), _c('td', {}, [_c('div', {
      staticClass: "islabel_style"
    }, [(data.field_lc.length != 0) ? _c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lc_id),
        expression: "create_languages[key].lc_id"
      }],
      attrs: {
        "name": "lc_id"
      },
      on: {
        "change": [function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val
          });
          _vm.$set(_vm.create_languages[key], "lc_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
        }, function($event) {
          _vm.selectClassOption(key)
        }]
      }
    }, _vm._l((data.field_lc), function(lc) {
      return _c('option', {
        domProps: {
          "value": lc.lc_id
        }
      }, [_vm._v(_vm._s(lc.lc_name))])
    })) : _c('select', {
      attrs: {
        "name": "lc_id",
        "disabled": "disabled"
      }
    }, [_c('option', [_vm._v("無")])])])]), _vm._v(" "), _c('td', {}, [_c('div', {
      staticClass: "islabel_style"
    }, [(data.field_lsc.length != 0) ? _c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lsc_id),
        expression: "create_languages[key].lsc_id"
      }],
      attrs: {
        "name": "lsc_id"
      },
      on: {
        "change": function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val
          });
          _vm.$set(_vm.create_languages[key], "lsc_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
        }
      }
    }, _vm._l((data.field_lsc), function(lsc) {
      return _c('option', {
        domProps: {
          "value": lsc.lsc_id
        }
      }, [_vm._v(_vm._s(lsc.lsc_name))])
    })) : _c('select', {
      attrs: {
        "name": "lsc_id",
        "disabled": "disabled"
      }
    }, [_c('option', [_vm._v("無")])])])]), _vm._v(" "), _c('td', [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (data.lp_id != 6),
        expression: "data.lp_id != 6"
      }],
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_number),
        expression: "create_languages[key].lt_number"
      }],
      attrs: {
        "type": "text",
        "name": "lt_number"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_number)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_number", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_taiwan),
        expression: "create_languages[key].lt_taiwan"
      }],
      attrs: {
        "type": "text",
        "name": "lt_taiwan"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_taiwan)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_taiwan", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_china),
        expression: "create_languages[key].lt_china"
      }],
      attrs: {
        "type": "text",
        "name": "lt_china"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_china)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_china", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_english),
        expression: "create_languages[key].lt_english"
      }],
      attrs: {
        "type": "text",
        "name": "lt_english"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_english)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_english", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_japan),
        expression: "create_languages[key].lt_japan"
      }],
      attrs: {
        "type": "text",
        "name": "lt_japan"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_japan)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_japan", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_korea),
        expression: "create_languages[key].lt_korea"
      }],
      attrs: {
        "type": "text",
        "name": "lt_korea"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_korea)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_korea", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_vietnam),
        expression: "create_languages[key].lt_vietnam"
      }],
      attrs: {
        "type": "text",
        "name": "lt_vietnam"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_vietnam)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_vietnam", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_thailand),
        expression: "create_languages[key].lt_thailand"
      }],
      attrs: {
        "type": "text",
        "name": "lt_thailand"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_thailand)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_thailand", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_india),
        expression: "create_languages[key].lt_india"
      }],
      attrs: {
        "type": "text",
        "name": "lt_india"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_india)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_india", $event.target.value)
        }
      }
    })])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_languages[key].lt_spain),
        expression: "create_languages[key].lt_spain"
      }],
      attrs: {
        "type": "text",
        "name": "lt_spain"
      },
      domProps: {
        "value": (_vm.create_languages[key].lt_spain)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_languages[key], "lt_spain", $event.target.value)
        }
      }
    })])])])
  }))])])]), _vm._v(" "), _c('div', {
    staticClass: "create_button"
  }, [_c('button', {
    staticClass: "btn_back",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.return_page_list()
      }
    }
  }, [_vm._v("BACK 返回")]), _vm._v(" "), (_vm.btn_create_save) ? _c('button', {
    staticClass: "btn_save",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("SAVE 存檔")]) : _c('button', {
    staticClass: "btn_save",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create()
      }
    }
  }, [_vm._v("SAVE 存檔")])])]) : _vm._e()
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
  return _c('div', {
    staticClass: "view_field_title"
  }, [_c('i', {
    staticClass: "fa fa-ellipsis-h"
  })])
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
  return _c('div', {
    staticClass: "prompt_body_admin"
  }, [_c('div', {
    staticClass: "prompt_box_admin"
  }, [_c('div', {
    staticClass: "prompt_content"
  }, [_c('div', {
    staticClass: "prompt_logo"
  }, [_c('i', {
    staticClass: "fa fa-question"
  })]), _vm._v(" "), _c('h2')]), _vm._v(" "), _c('div', {
    staticClass: "prompt_btn_group"
  }, [_c('p', [_c('span', [_vm._v("3")]), _vm._v("s後自動關閉")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page_title"
  }, [_c('h1', [_vm._v("修改語系翻譯")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "prompt_body_admin"
  }, [_c('div', {
    staticClass: "prompt_box_admin"
  }, [_c('div', {
    staticClass: "prompt_content"
  }, [_c('div', {
    staticClass: "prompt_logo"
  }, [_c('i', {
    staticClass: "fa fa-question"
  })]), _vm._v(" "), _c('h2')]), _vm._v(" "), _c('div', {
    staticClass: "prompt_btn_group"
  }, [_c('p', [_c('span', [_vm._v("3")]), _vm._v("s後自動關閉")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page_title"
  }, [_c('h1', {}, [_vm._v("新增語系翻譯")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', {}), _vm._v(" "), _c('th', {}, [_vm._v("產品")]), _vm._v(" "), _c('th', {}, [_vm._v("平台")]), _vm._v(" "), _c('th', {}, [_vm._v("分類")]), _vm._v(" "), _c('th', {}, [_vm._v("子分類")]), _vm._v(" "), _c('th', {}, [_vm._v("遊戲編號")]), _vm._v(" "), _c('th', {}, [_vm._v("繁")]), _vm._v(" "), _c('th', {}, [_vm._v("簡")]), _vm._v(" "), _c('th', {}, [_vm._v("英")]), _vm._v(" "), _c('th', {}, [_vm._v("日")]), _vm._v(" "), _c('th', {}, [_vm._v("韓")]), _vm._v(" "), _c('th', {}, [_vm._v("越")]), _vm._v(" "), _c('th', {}, [_vm._v("泰")]), _vm._v(" "), _c('th', {}, [_vm._v("印")]), _vm._v(" "), _c('th', {}, [_vm._v("西")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7bdef371", module.exports)
  }
}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("26e5ee42", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7bdef371\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Language.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7bdef371\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Language.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Language__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Language___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_Language__);
// 匯入 Language.vue 檔，不需加副檔名


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ })

},[124]);