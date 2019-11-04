webpackJsonp([6],{

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

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(70);


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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            btn_modify_save: false, // 修改頁面的存檔按鈕 - 防呆
            btn_create_save: false, // 新增頁面的存檔按鈕 - 防呆
            btn_delete_save: false, // 刪除的按鈕 - 防呆
            fields: [],
            field_lp: [],
            field_lpf: [],
            field_lc: [],
            field_lsc: [],
            field_item: [{ fi_id: 1, fi_name: '產品' }, { fi_id: 2, fi_name: '平台' }, { fi_id: 3, fi_name: '分類' }, { fi_id: 4, fi_name: '子分類' }],
            field: {},
            page_list_class: {
                keyword: '',
                lp_id: -1
            },
            // 各欄位項目填入名稱的區塊顯示與否
            create_item: false,
            modify_item: false,
            item_product: false,
            item_platform: false,
            item_class: false,
            item_subclass: false,
            // 篩選條件顯示
            product_check: false,
            platform_check: false,
            class_check: false,
            subclass_check: false,
            needReset: true,
            all: '', //總頁數
            number: '', //總筆數
            limit: 10, //每頁筆數
            cur: 1, //當前頁碼
            page: 'list', //當前頁面
            // 準備被刪除的分類id
            remove_btn: false,
            remove_lp_id: null,
            remove_lpf_id: null,
            remove_lc_id: null,
            remove_lsc_id: null,
            keyword: '',
            loading: true,
            composing: true //監聽搜尋框輸入
        };
    },

    computed: {
        list_fields: function list_fields() {
            var start = (this.cur - 1) * this.limit;
            return this.fields.slice(start, start + this.limit);
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
                self.btn_delete_save = false;
                self.btn_create_save = false;
                self.btn_modify_save = false;
                self.create_item = false;
                self.modify_item = false;
                self.needReset = true;
                self.product_check = false;
                self.platform_check = false;
                self.class_check = false;
                self.subclass_check = false;
                self.item_product = false;
                self.item_platform = false;
                self.item_class = false;
                self.item_subclass = false;
                self.remove_lp_id = null;
                self.remove_lpf_id = null;
                self.remove_lc_id = null;
                self.remove_lsc_id = null;
                self.fields = [];
                self.field_lp = [];
                self.field_lpf = [];
                self.field_lc = [];
                self.field_lsc = [];
                self.field = {};
                self.page_list_class = { keyword: '', lp_id: -1 };
                self.cur = 1;
                self.limit = 10;
                self.all = '';
                self.number = '';
                self.remove_btn = false;
            }
            if (self.needReset) {
                axios.post('/fields', self.page_list_class).then(function (response) {
                    self.fields = response.data;
                    self.all = Math.ceil(self.fields.length / self.limit);
                    self.number = parseInt(self.fields.length);
                    setTimeout(function () {
                        self.loading = false;
                    }, 1000);
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
                    self.keyword = $('.search_content').find('input[name=keyword]').val();
                    self.cur = 1;
                    self.page_list_class.keyword = $('.search_content').find('input[name=keyword]').val();
                    axios.post('/fields', self.page_list_class).then(function (response) {
                        self.fields = response.data;
                        self.all = Math.ceil(self.fields.length / self.limit);
                        self.number = parseInt(self.fields.length);
                    }).catch(function (response) {
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            }, 10);
        },
        //切換顯示產品資料
        change_tab: function change_tab(tab) {
            var self = this;
            if (self.page_list_class.lp_id != tab) {
                self.page_list_class.lp_id = tab;
                axios.post('/fields', self.page_list_class).then(function (response) {
                    self.fields = response.data;
                    self.all = Math.ceil(self.fields.length / self.limit);
                    self.number = parseInt(self.fields.length);
                    self.cur = 1;
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //跳頁到新增頁
        page_create: function page_create() {
            var self = this;
            self.page = 'create';
            self.btn_create_save = false;
            self.product_check = false;
            self.platform_check = false;
            self.class_check = false;
            self.subclass_check = false;
        },
        //跳頁到修改頁
        page_modify: function page_modify(lp_id, lpf_id, lc_id, lsc_id) {
            var self = this;
            self.btn_modify_save = false;
            self.field = {};
            self.field.lp_id = lp_id;
            self.field.lpf_id = lpf_id;
            self.field.lc_id = lc_id;
            self.field.lsc_id = lsc_id;
            axios.post('/field', self.field).then(function (response) {
                self.field = response.data;
                if (!lp_id) {
                    self.prompt(response.data.result, 'failure', false);
                } else if (!lpf_id) {
                    //產品欄位
                    self.page = 'modify';
                    self.modify_item = 1;
                    self.item_product = true;
                    self.item_platform = false;
                    self.item_class = false;
                    self.item_subclass = false;
                    self.product_check = lp_id;
                    self.platform_check = false;
                    self.class_check = false;
                    self.subclass_check = false;
                } else if (!lc_id) {
                    //平台欄位
                    self.page = 'modify';
                    self.modify_item = 2;
                    self.item_product = false;
                    self.item_platform = true;
                    self.item_class = false;
                    self.item_subclass = false;
                    self.product_check = lp_id;
                    self.platform_check = lpf_id;
                    self.class_check = false;
                    self.subclass_check = false;
                } else if (!lsc_id) {
                    //分類欄位
                    self.page = 'modify';
                    self.modify_item = 3;
                    self.item_product = false;
                    self.item_platform = false;
                    self.item_class = true;
                    self.item_subclass = false;
                    self.product_check = lp_id;
                    self.platform_check = lpf_id;
                    self.class_check = lc_id;
                    self.subclass_check = false;
                } else {
                    //子分類欄位
                    self.page = 'modify';
                    self.modify_item = 4;
                    self.item_product = false;
                    self.item_platform = false;
                    self.item_class = false;
                    self.item_subclass = true;
                    self.product_check = lp_id;
                    self.platform_check = lpf_id;
                    self.class_check = lc_id;
                    self.subclass_check = lsc_id;
                }
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //新增功能
        create: function create() {
            var self = this;
            if (!self.create_item) {
                var string = '<div class="tip_block">' + '<p>請選擇欄位項目</p>' + '</div>';
                $('.isfield .islabel_style').append(string);
                $('.tip_block').hover(function () {
                    $(this).fadeOut(300, function () {
                        $(this).remove();
                    });
                });
            } else if (self.create_item == 1) {
                // 新增產品
                var name = $('input[name=lp_name').val();
                if (name == '') {
                    var string = '<div class="tip_block">' + '<p>請填入產品名稱</p>' + '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else {
                    self.btn_create_save = true;
                    self.field = {};
                    self.field.fi_id = self.create_item;
                    self.field.lp_name = name;
                    axios.post('/field-create', self.field).then(function (response) {
                        if (response.data.result == 'ok') {
                            // self.init(true);
                            self.field = {};
                            self.prompt('新增成功', 'success', true);
                        } else {
                            self.btn_create_save = false;
                            self.prompt(response.data.result, 'failure', false);
                        }
                    }).catch(function (response) {
                        self.btn_create_save = false;
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            } else if (self.create_item == 2) {
                // 新增平台
                if (!$('input[name=lp_id]:checked').val()) {
                    var string = '<div class="tip_block">' + '<p>請選擇產品</p>' + '</div>';
                    $('.isproduct .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else if ($('input[name=lpf_name').val() == '') {
                    var string = '<div class="tip_block">' + '<p>請填入平台名稱</p>' + '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else {
                    self.btn_create_save = true;
                    self.field = {};
                    self.field.fi_id = self.create_item;
                    self.field.lp_id = $('input[name=lp_id]:checked').val();
                    self.field.lpf_name = $('input[name=lpf_name').val();
                    axios.post('/field-create', self.field).then(function (response) {
                        if (response.data.result == 'ok') {
                            // self.init(true);
                            self.field = {};
                            self.prompt('新增成功', 'success', true);
                        } else {
                            self.btn_create_save = false;
                            self.prompt(response.data.result, 'failure', false);
                        }
                    }).catch(function (response) {
                        self.btn_create_save = false;
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            } else if (self.create_item == 3) {
                // 新增分類
                if (!$('input[name=lp_id]:checked').val()) {
                    var string = '<div class="tip_block">' + '<p>請選擇產品</p>' + '</div>';
                    $('.isproduct .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else if (!$('input[name=lpf_id]:checked').val()) {
                    var string = '<div class="tip_block">' + '<p>請選擇平台</p>' + '</div>';
                    $('.isplatform .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else if ($('input[name=lc_name').val() == '') {
                    var string = '<div class="tip_block">' + '<p>請填入分類名稱</p>' + '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else {
                    self.btn_create_save = true;
                    self.field = {};
                    self.field.fi_id = self.create_item;
                    self.field.lp_id = $('input[name=lp_id]:checked').val();
                    self.field.lpf_id = $('input[name=lpf_id]:checked').val();
                    self.field.lc_name = $('input[name=lc_name').val();
                    axios.post('/field-create', self.field).then(function (response) {
                        if (response.data.result == 'ok') {
                            // self.init(true);
                            self.field = {};
                            self.prompt('新增成功', 'success', true);
                        } else {
                            self.btn_create_save = false;
                            self.prompt(response.data.result, 'failure', false);
                        }
                    }).catch(function (response) {
                        self.btn_create_save = false;
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            } else if (self.create_item == 4) {
                // 新增子分類
                if (!$('input[name=lp_id]:checked').val()) {
                    var string = '<div class="tip_block">' + '<p>請選擇產品</p>' + '</div>';
                    $('.isproduct .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else if (!$('input[name=lpf_id]:checked').val()) {
                    var string = '<div class="tip_block">' + '<p>請選擇平台</p>' + '</div>';
                    $('.isplatform .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else if (!$('input[name=lc_id]:checked').val()) {
                    var string = '<div class="tip_block">' + '<p>請選擇分類</p>' + '</div>';
                    $('.isclass .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else if ($('input[name=lsc_name').val() == '') {
                    var string = '<div class="tip_block">' + '<p>請填入子分類名稱</p>' + '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else {
                    self.btn_create_save = true;
                    self.field = {};
                    self.field.fi_id = self.create_item;
                    self.field.lp_id = $('input[name=lp_id]:checked').val();
                    self.field.lpf_id = $('input[name=lpf_id]:checked').val();
                    self.field.lc_id = $('input[name=lc_id]:checked').val();
                    self.field.lsc_name = $('input[name=lsc_name').val();
                    axios.post('/field-create', self.field).then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('新增成功', 'success', true);
                        } else {
                            self.btn_create_save = false;
                            self.prompt(response.data.result, 'failure', false);
                        }
                    }).catch(function (response) {
                        self.btn_create_save = false;
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            }
        },
        //修改功能
        modify: function modify() {
            var self = this;
            if (self.modify_item == 1) {
                // 修改產品
                if ($('input[name=lp_name]').val() == '') {
                    var string = '<div class="tip_block">' + '<p>產品名稱不能為空值</p>' + '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else {
                    self.btn_modify_save = true;
                    self.field.fi_id = self.modify_item;
                    self.field.lp_name = $('input[name=lp_name]').val();
                    axios.post('/field-modify', this.field).then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('修改成功', 'success', true);
                        } else {
                            self.btn_modify_save = false;
                            self.prompt(response.data.result, 'failure', false);
                        }
                    }).catch(function (response) {
                        self.btn_modify_save = false;
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            } else if (self.modify_item == 2) {
                // 修改平台
                if ($('input[name=lpf_name]').val() == '') {
                    var string = '<div class="tip_block">' + '<p>平台名稱不能為空值</p>' + '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else {
                    self.btn_modify_save = true;
                    self.field.fi_id = self.modify_item;
                    self.field.lpf_name = $('input[name=lpf_name]').val();
                    axios.post('/field-modify', this.field).then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('修改成功', 'success', true);
                        } else {
                            self.btn_modify_save = false;
                            self.prompt(response.data.result, 'failure', false);
                        }
                    }).catch(function (response) {
                        self.btn_modify_save = false;
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            } else if (self.modify_item == 3) {
                // 修改分類
                if ($('input[name=lc_name]').val() == '') {
                    var string = '<div class="tip_block">' + '<p>分類名稱不能為空值</p>' + '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else {
                    self.btn_modify_save = true;
                    self.field.fi_id = self.modify_item;
                    self.field.lc_name = $('input[name=lc_name]').val();
                    axios.post('/field-modify', this.field).then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('修改成功', 'success', true);
                        } else {
                            self.btn_modify_save = false;
                            self.prompt(response.data.result, 'failure', false);
                        }
                    }).catch(function (response) {
                        self.btn_modify_save = false;
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            } else if (self.modify_item == 4) {
                // 修改子分類
                if ($('input[name=lsc_name]').val() == '') {
                    var string = '<div class="tip_block">' + '<p>子分類名稱不能為空值</p>' + '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                } else {
                    self.btn_modify_save = true;
                    self.field.fi_id = self.modify_item;
                    self.field.lsc_name = $('input[name=lsc_name]').val();
                    axios.post('/field-modify', this.field).then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('修改成功', 'success', true);
                        } else {
                            self.btn_modify_save = false;
                            self.prompt(response.data.result, 'failure', false);
                        }
                    }).catch(function (response) {
                        self.btn_modify_save = false;
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            }
        },
        //刪除功能
        remove: function remove(lp_id, lpf_id, lc_id, lsc_id, boolean) {
            var self = this;
            self.field = {};
            self.btn_delete_save = true;
            if (boolean) {
                if (!lpf_id) {
                    self.field.fi_id = 1;
                } else if (!lc_id) {
                    self.field.fi_id = 2;
                } else if (!lsc_id) {
                    self.field.fi_id = 3;
                } else {
                    self.field.fi_id = 4;
                }
                self.field.lp_id = lp_id;
                self.field.lpf_id = lpf_id;
                self.field.lc_id = lc_id;
                self.field.lsc_id = lsc_id;
                axios.post('/field-delete/', self.field).then(function (response) {
                    if (response.data.result == 'ok') {
                        self.prompt('刪除成功', 'success', true);
                        self.remove_btn = false;
                        self.notification('刪除成功', 'success');
                    } else {
                        self.btn_delete_save = false;
                        self.prompt(response.data.result, 'failure', false);
                        self.remove_btn = false;
                        self.notification(response.data.result, 'failure');
                    }
                }).catch(function (response) {
                    self.btn_delete_save = false;
                    self.prompt(response.data.result, 'failure', false);
                });
            } else {
                self.remove_btn = true;
                self.remove_lp_id = lp_id;
                self.remove_lpf_id = lpf_id;
                self.remove_lc_id = lc_id;
                self.remove_lsc_id = lsc_id;
                self.prompt('確定要刪除此分類？', 'question', false);
                self.btn_delete_save = false;
            }
        },
        //選擇要新增的欄位項目
        clickItemRadio: function clickItemRadio() {
            var self = this;
            if ($('input[name=fi_id]:checked').val() == 1) {
                //產品
                self.item_product = true;
                self.item_platform = false;
                self.item_class = false;
                self.item_subclass = false;
                self.product_check = false;
                self.platform_check = false;
                self.class_check = false;
                self.subclass_check = false;
            } else if ($('input[name=fi_id]:checked').val() == 2) {
                //平台
                self.item_product = false;
                self.item_platform = true;
                self.item_class = false;
                self.item_subclass = false;
                self.platform_check = false;
                self.class_check = false;
                self.subclass_check = false;
                axios.get('/field-language-product').then(function (response) {
                    self.product_check = true;
                    self.field_lp = response.data;
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            } else if ($('input[name=fi_id]:checked').val() == 3) {
                //分類
                self.item_product = false;
                self.item_platform = false;
                self.item_class = true;
                self.item_subclass = false;
                self.platform_check = false;
                self.class_check = false;
                self.subclass_check = false;
                axios.get('/field-language-product').then(function (response) {
                    self.product_check = true;
                    self.field_lp = response.data;
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            } else if ($('input[name=fi_id]:checked').val() == 4) {
                //子分類
                self.item_product = false;
                self.item_platform = false;
                self.item_class = false;
                self.item_subclass = true;
                self.platform_check = false;
                self.class_check = false;
                self.subclass_check = false;
                axios.get('/field-language-product').then(function (response) {
                    self.product_check = true;
                    self.field_lp = response.data;
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //點擊產品欄位
        clickProductRadio: function clickProductRadio() {
            var self = this;
            // self.search_condition.lpf_id = '';
            // self.search_condition.lc_id = '';
            // self.search_condition.lsc_id = '';
            if (self.create_item == 3 || self.create_item == 4) {
                var lp_id = $('input[name=lp_id]:checked').val();
                axios.get('/field-language-platform/' + lp_id).then(function (response) {
                    self.field_lpf = response.data;
                    if (self.field_lpf.length > 0) {
                        self.platform_check = true;
                        self.class_check = false;
                        self.subclass_check = false;
                    }
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //點擊平台欄位
        clickPlatformRadio: function clickPlatformRadio() {
            var self = this;
            // self.search_condition.lc_id = '';
            // self.search_condition.lsc_id = '';
            if (self.create_item == 4) {
                var lpf_id = $('input[name=lpf_id]:checked').val();
                axios.get('/field-language-class/' + lpf_id).then(function (response) {
                    if (response.data.length > 0) {
                        self.field_lc = response.data;
                        self.class_check = true;
                        self.subclass_check = false;
                    } else {
                        self.prompt('該平台沒有分類，請先新增分類', 'failure', false);
                        self.create_item = 3;
                        self.class_check = false;
                        self.subclass_check = false;
                        self.item_class = true;
                        self.item_subclass = false;
                    }
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
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
        //關閉提示框
        prompt_fade_out: function prompt_fade_out() {
            $('.prompt_body_admin').fadeOut(400, function () {
                $('html').removeClass('over_hidden');
            });
            $('.overlay').fadeOut(400);
        },
        // 隱藏篩選條件與否
        flow_or_not: function flow_or_not() {
            if ($('.islabel_style').height() == 0) {
                $('.islabel_style').animate({ 'height': $('.search_item').height() }, 200);
            } else {
                $('.islabel_style').animate({ 'height': 0 }, 200);
            }
        },
        // 改變顯現筆數
        sortBy: function sortBy() {
            var self = this;
            self.all = Math.ceil(self.fields.length / self.limit);
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

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(47)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(39),
  /* scopeId */
  "data-v-cb92f69e",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\copywritingManagement\\Back\\resources\\assets\\js\\pages\\Field.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Field.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cb92f69e", Component.options)
  } else {
    hotAPI.reload("data-v-cb92f69e", Component.options)
  }
})()}

module.exports = Component.exports


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

/***/ 39:
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
        _vm.remove(_vm.remove_lp_id, _vm.remove_lpf_id, _vm.remove_lc_id, _vm.remove_lsc_id, true)
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
      'notFound': _vm.list_fields.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "keyword"
    },
    domProps: {
      "value": _vm.page_list_class.keyword
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
  })])]), _vm._v(" "), _vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "tabs"
  }, [_c('span', {
    class: {
      'active': -1 == _vm.page_list_class.lp_id
    },
    on: {
      "click": function($event) {
        _vm.change_tab(-1)
      }
    }
  }, [_vm._v("全部")]), _vm._v(" "), _vm._l((_vm.field_lp), function(product) {
    return _c('span', {
      class: {
        'active': product.lp_id == _vm.page_list_class.lp_id
      },
      on: {
        "click": function($event) {
          _vm.change_tab(product.lp_id)
        }
      }
    }, [_vm._v(_vm._s(product.lp_name))])
  }), _vm._v(" "), _c('button', {
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
  })])], 2), _vm._v(" "), (_vm.list_fields.length != 0 && _vm.fields.length > _vm.limit && _vm.loading == false) ? _c('div', {
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
  }, [_c('table', {
    staticClass: "f_table"
  }, [_vm._m(6), _vm._v(" "), _c('tbody', _vm._l((_vm.list_fields), function(data) {
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
    }, [_vm._v(_vm._s(data.lp_name))]), _vm._v(" "), _c('td', {
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
    }, [_vm._v(_vm._s(data.lpf_name))]), _vm._v(" "), _c('td', {
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
    }, [_vm._v(_vm._s(data.lc_name))]), _vm._v(" "), _c('td', {
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
    }, [_vm._v(_vm._s(data.lsc_name))]), _vm._v(" "), _c('td', [_c('i', {
      staticClass: "fa fa-edit",
      on: {
        "click": function($event) {
          _vm.page_modify(data.lp_id, data.lpf_id, data.lc_id, data.lsc_id)
        }
      }
    }), _vm._v(" "), (_vm.btn_delete_save) ? _c('i', {
      staticClass: "fa fa-trash"
    }) : _c('i', {
      staticClass: "fa fa-trash",
      on: {
        "click": function($event) {
          _vm.remove(data.lp_id, data.lpf_id, data.lc_id, data.lsc_id, false)
        }
      }
    })])])
  }))]), _vm._v(" "), (_vm.list_fields.length == 0) ? _c('div', {
    staticClass: "found_nothing"
  }, [_vm._v("\n                        查無任何資料\n                    ")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.list_fields.length != 0 && _vm.fields.length > _vm.limit && _vm.loading == false) ? _c('div', {
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
  }, [_vm._v("20筆/頁")])])])], 2)]) : _vm._e()])])]) : (_vm.page === 'modify') ? _c('div', {
    staticClass: "page_modify"
  }, [_vm._m(9), _vm._v(" "), _vm._m(10), _vm._v(" "), _c('div', {
    staticClass: "content_block"
  }, [_c('div', {
    staticClass: "isfield"
  }, [_c('label', {
    staticClass: "isfield_title"
  }, [_vm._v("欄位項目")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, _vm._l((_vm.field_item), function(field) {
    return (field.fi_id == _vm.modify_item) ? _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.modify_item),
        expression: "modify_item"
      }],
      staticClass: "input_radio",
      attrs: {
        "type": "radio",
        "name": "fi_id"
      },
      domProps: {
        "value": field.fi_id,
        "checked": _vm._q(_vm.modify_item, field.fi_id)
      },
      on: {
        "change": function($event) {
          _vm.modify_item = field.fi_id
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.fi_name))])]) : _vm._e()
  }))]), _vm._v(" "), (_vm.modify_item != 1 && _vm.product_check) ? _c('div', {
    staticClass: "isproduct"
  }, [_c('label', {
    staticClass: "isproduct_title"
  }, [_vm._v("產品")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
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
      "value": _vm.field.lp_id,
      "checked": _vm._q(_vm.product_check, _vm.field.lp_id)
    },
    on: {
      "change": function($event) {
        _vm.product_check = _vm.field.lp_id
      }
    }
  }), _c('span', [_vm._v(_vm._s(_vm.field.lp_name))])])])]) : _vm._e(), _vm._v(" "), (_vm.modify_item != 2 && _vm.platform_check) ? _c('div', {
    staticClass: "isplatform"
  }, [_c('label', {
    staticClass: "isplatform_title"
  }, [_vm._v("平台")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('label', [_c('input', {
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
      "value": _vm.field.lpf_id,
      "checked": _vm._q(_vm.platform_check, _vm.field.lpf_id)
    },
    on: {
      "change": function($event) {
        _vm.platform_check = _vm.field.lpf_id
      }
    }
  }), _c('span', [_vm._v(_vm._s(_vm.field.lpf_name))])])])]) : _vm._e(), _vm._v(" "), (_vm.modify_item != 3 && _vm.class_check) ? _c('div', {
    staticClass: "isclass"
  }, [_c('label', {
    staticClass: "isclass_title"
  }, [_vm._v("分類")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('label', [_c('input', {
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
      "value": _vm.field.lc_id,
      "checked": _vm._q(_vm.class_check, _vm.field.lc_id)
    },
    on: {
      "change": function($event) {
        _vm.class_check = _vm.field.lc_id
      }
    }
  }), _c('span', [_vm._v(_vm._s(_vm.field.lc_name))])])])]) : _vm._e(), _vm._v(" "), (_vm.item_product) ? _c('div', {
    staticClass: "isname"
  }, [_c('label', {
    staticClass: "isname_title"
  }, [_vm._v("產品名稱")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lp_name"
    },
    domProps: {
      "value": _vm.field.lp_name
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.item_platform) ? _c('div', {
    staticClass: "isname"
  }, [_c('label', {
    staticClass: "isname_title"
  }, [_vm._v("平台名稱")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lpf_name"
    },
    domProps: {
      "value": _vm.field.lpf_name
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.item_class) ? _c('div', {
    staticClass: "isname"
  }, [_c('label', {
    staticClass: "isname_title"
  }, [_vm._v("分類名稱")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lc_name"
    },
    domProps: {
      "value": _vm.field.lc_name
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.item_subclass) ? _c('div', {
    staticClass: "isname"
  }, [_c('label', {
    staticClass: "isname_title"
  }, [_vm._v("子分類名稱")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lsc_name"
    },
    domProps: {
      "value": _vm.field.lsc_name
    }
  })])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "modify_button"
  }, [_c('button', {
    staticClass: "btn_back",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.init()
      }
    }
  }, [_vm._v("返回")]), _vm._v(" "), (_vm.btn_modify_save) ? _c('button', {
    staticClass: "btn_save",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("存檔")]) : _c('button', {
    staticClass: "btn_save",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.modify()
      }
    }
  }, [_vm._v("存檔")])])]) : (_vm.page === 'create') ? _c('div', {
    staticClass: "page_create"
  }, [_vm._m(11), _vm._v(" "), _vm._m(12), _vm._v(" "), _c('div', {
    staticClass: "content_block"
  }, [_c('div', {
    staticClass: "isfield"
  }, [_c('label', {
    staticClass: "isfield_title"
  }, [_vm._v("欄位項目")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, _vm._l((_vm.field_item), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_item),
        expression: "create_item"
      }],
      staticClass: "input_radio",
      attrs: {
        "type": "radio",
        "name": "fi_id"
      },
      domProps: {
        "value": field.fi_id,
        "checked": _vm._q(_vm.create_item, field.fi_id)
      },
      on: {
        "click": function($event) {
          _vm.clickItemRadio()
        },
        "change": function($event) {
          _vm.create_item = field.fi_id
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.fi_name))])])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.product_check),
      expression: "product_check"
    }],
    staticClass: "isproduct"
  }, [_c('label', {
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
    staticClass: "isplatform "
  }, [_c('label', {
    staticClass: "isplatform_title"
  }, [_vm._v("平台：")]), _vm._v(" "), _c('div', {
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
    staticClass: "isclass "
  }, [_c('label', {
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
  }, [_c('label', {
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
  }))]), _vm._v(" "), (_vm.item_product) ? _c('div', {
    staticClass: "isname "
  }, [_c('label', {
    staticClass: "isname_title"
  }, [_vm._v("產品名稱：")]), _vm._v(" "), _vm._m(13)]) : _vm._e(), _vm._v(" "), (_vm.item_platform) ? _c('div', {
    staticClass: "isname"
  }, [_c('label', {
    staticClass: "isname_title"
  }, [_vm._v("平台名稱：")]), _vm._v(" "), _vm._m(14)]) : _vm._e(), _vm._v(" "), (_vm.item_class) ? _c('div', {
    staticClass: "isname"
  }, [_c('label', {
    staticClass: "isname_title"
  }, [_vm._v("分類名稱：")]), _vm._v(" "), _vm._m(15)]) : _vm._e(), _vm._v(" "), (_vm.item_subclass) ? _c('div', {
    staticClass: "isname"
  }, [_c('label', {
    staticClass: "isname_title"
  }, [_vm._v("子分類名稱：")]), _vm._v(" "), _vm._m(16)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "create_button"
  }, [_c('button', {
    staticClass: "btn_back",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.init()
      }
    }
  }, [_vm._v("返回")]), _vm._v(" "), (_vm.create_item && _vm.btn_create_save) ? _c('button', {
    staticClass: "btn_save",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("存檔")]) : _c('button', {
    staticClass: "btn_save",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create()
      }
    }
  }, [_vm._v("存檔")])])]) : _vm._e()
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
  }, [_c('h1', [_vm._v("語系分類管理")])])
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
  }, [_vm._v("產品")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("平台")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("分類")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("子分類")]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_vm._v("功能")])])])
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
  }, [_c('h1', [_vm._v("修改欄位")])])
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
  }, [_c('h1', [_vm._v("新增欄位")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lp_name"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lpf_name"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lc_name"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "islabel_style"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "lsc_name"
    }
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cb92f69e", module.exports)
  }
}

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("53eb2f3f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-cb92f69e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Field.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-cb92f69e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Field.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Field__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_Field__);
// 匯入 Field.vue 檔，不需加副檔名


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ })

},[123]);