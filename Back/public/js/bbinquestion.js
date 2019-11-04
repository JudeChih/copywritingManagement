webpackJsonp([9],{

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

/***/ 10:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            btn_modify_class_save: false, // 防呆用，防止連按
            btn_create_class_save: false, // 防呆用，防止連按
            btn_delete_class_save: false, // 防呆用，防止連按
            btn_modify_save: false, // 防呆用，防止連按
            btn_create_save: false, // 防呆用，防止連按
            btn_delete_save: false, // 防呆用，防止連按
            add_check: true, // 防呆用，防止連按
            questions: [],
            question_field: [],
            question: {
                qa_id: null,
                qa_type: 1,
                qc_id: '',
                qa_content: ''
            },
            question_class: {},
            search_condition: {
                qc_id: '',
                qa_type: 1,
                qa_content: ''
            },
            create_questions: [{ qc_id: '', qa_type: 1, qa_content: '' }],
            remove_btn: null, //是否在提示框顯示刪除相關按鈕
            remove_id: null, //要被刪除的問題id
            page: 'list', //當前頁面
            check: 'null', //所選qc_id
            needReset: true,
            all: '', //總頁數
            number: '', //總筆數
            limit: 10,
            cur: 1, //當前頁碼
            field_class: false,
            create_class_block: false,
            delete_class_block: false,
            keyword: '',
            loading: true,
            composing: true //監聽搜尋框輸入
        };
    },

    computed: {
        list_questions: function list_questions() {
            var start = (this.cur - 1) * this.limit;
            return this.questions.slice(start, start + this.limit);
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
                self.search_condition = { qc_id: '', qa_type: 1, qa_content: '' };
                self.check = 'null';
                self.cur = 1;
                self.btn_delete_save = false;
                self.btn_delete_class_save = false;
                self.limit = 10;
                self.create_questions = [{ qc_id: '', qa_type: 1, qa_content: '' }];
            }
            if (self.needReset) {
                axios.get('/questions/BBIN').then(function (response) {
                    self.questions = response.data;
                    self.all = Math.ceil(self.questions.length / self.limit);
                    self.number = self.questions.length;
                    setTimeout(function () {
                        self.loading = false;
                    }, 1000);
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
                axios.get('/field-question/BBIN').then(function (response) {
                    self.question_field = response.data;
                }).catch(function (response) {
                    self.prompt(response.data.result, 'failure', false);
                });
            } else {
                self.loading = false;
            }
        },
        //跳頁到新增頁
        page_create: function page_create() {
            var self = this;
            self.page = 'create';
            self.btn_create_save = false;
            self.create_questions[0].qa_type = 1;
            axios.get('/field-question/BBIN').then(function (response) {
                self.question_field = response.data;
                self.create_questions[0].qc_id = self.question_field[0].qc_id;
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //新增頁面-新增一組資料欄位
        add_onemore: function add_onemore() {
            var self = this;
            self.create_questions.push({ qc_id: '', qa_type: 1, qa_content: '' });
            self.create_questions[self.create_questions.length - 1].qc_id = self.question_field[0].qc_id;
            setTimeout(function () {
                self.add_check = true;
            }, 1000);
        },
        //跳頁到修改頁
        page_modify: function page_modify(id) {
            var self = this;
            self.page = 'modify';
            self.btn_modify_save = false;
            axios.get('/question/' + id).then(function (response) {
                self.question = response.data;
                self.check = self.question.qc_id;
            }).catch(function (response) {
                self.prompt(response.data.result, 'failure', false);
            });
            $('input[name=qc_id]').each(function () {
                if ($(this).prop('value') == self.question.qc_id) {
                    $(this).prop('ckecked', true);
                }
            });
        },
        //新增功能
        create: function create() {
            var self = this;
            var boolean = true;
            for (var i = 0; i < self.create_questions.length; i++) {
                if (self.create_questions[i].qa_content == '') {
                    var string = '<div class="tip_block">' + '<p>請填入問題內容</p>' + '</div>';
                    $('tbody tr').eq(i).find('input[name=qa_content]').parent('.islabel_style').append(string);
                    $('.tip_block').hover(function () {
                        $(this).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                    boolean = false;
                }
            }
            if (boolean) {
                axios.post('/question-create', self.create_questions).then(function (response) {
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

            $('.isclass').find('input[name=qc_id]').each(function () {
                if ($(this).prop('checked')) {
                    self.question.qc_id = $(this).prop('value');
                }
            });
            self.question.qa_id = $('input[name=qa_id]').val();
            self.question.qa_content = $('textarea[name=qa_content]').val();

            if (self.question.qc_id == '') {
                var string = '<div class="tip_block">' + '<p>請選擇分類</p>' + '</div>';
                $('.islabel_style').append(string);
                $('.tip_block').hover(function () {
                    $(this).fadeOut(300, function () {
                        $(this).remove();
                    });
                });
            } else if (self.question.qa_content == '') {
                var string = '<div class="tip_block">' + '<p>請填寫問題內容</p>' + '</div>';
                $('.istextarea_style').append(string);
                $('.tip_block').hover(function () {
                    $(this).fadeOut(300, function () {
                        $(this).remove();
                    });
                });
            } else {
                self.btn_modify_save = true;
                axios.post('/question-modify', this.question).then(function (response) {
                    if (response.data.result == 'ok') {
                        self.question = { qa_id: null, qc_id: '', qa_type: 1, qa_content: '' };
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
                axios.get('/question-delete/' + id).then(function (response) {
                    if (response.data.result == 'ok') {
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
                self.prompt('確定要刪除此問題？', 'question', false);
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
                    self.cur = 1;
                    self.keyword = $('.search_content').find('input[name=qa_content]').val();
                    $('.search_class').find('input[name=qc_id]').each(function () {
                        if ($(this).prop('checked')) {
                            if ($(this).prop('value') == 'null') {
                                self.search_condition.qc_id = null;
                            } else {
                                self.search_condition.qc_id = $(this).prop('value');
                            }
                        }
                    });
                    self.search_condition.qa_content = $('.search_content').find('input[name=qa_content]').val();

                    axios.post('/questions/BBIN', self.search_condition).then(function (response) {
                        self.questions = response.data;
                        self.all = Math.ceil(self.questions.length / self.limit);
                        self.number = self.questions.length;
                        self.needReset = false;
                        // setTimeout(function(){
                        //     self.loading = false;
                        // },1000)
                    }).catch(function (response) {
                        self.prompt(response.data.result, 'failure', false);
                    });
                }
            }, 10);
        },
        //隱藏問題分類欄位修改頁
        modify_class_block_display: function modify_class_block_display() {
            self.btn_delete_class_save == false;
            self.btn_modify_class_save == false;
            self.btn_create_class_save == false;
            $('.field_class_item.active').removeClass('active');
        },
        //顯示問題分類欄位修改頁
        modify_class_block: function modify_class_block(id) {
            var self = this;
            $('.modify_block').find('input[name=qc_id]').each(function () {
                if ($(this).val() == id) {
                    $(this).parent('.modify_block').find('input[name=qc_name]').val($(this).parent('.modify_block').siblings().find('span').text());
                    $(this).parent('.modify_block').css('background-color', $(this).parent('.modify_block').siblings().css('background-color'));
                    $(this).parents('.field_class_item').siblings().removeClass('active');
                    $(this).parents('.field_class_item').addClass('active');
                }
            });
        },
        //刪除分類欄位
        delete_class: function delete_class(id) {
            var self = this;
            self.question_class.fi_id = 5; //問題分類欄位
            self.question_class.qc_id = $('.field_class_item.active .modify_block').find('input[name=qc_id]').val();
            self.btn_delete_class_save = true;
            axios.post('/field-delete', this.question_class).then(function (response) {
                if (response.data.result == 'ok') {
                    self.btn_delete_class_save = false;
                    self.create_class_block = false;
                    self.modify_class_block_display();
                    self.prompt('刪除成功', 'success', false);
                    axios.get('/field-question').then(function (response) {
                        self.question_field = response.data;
                    }).catch(function (response) {
                        self.prompt(response.data.result, 'failure', false);
                    });
                } else {
                    self.btn_delete_class_save = false;
                    self.prompt(response.data.result, 'failure', false);
                }
            }).catch(function (response) {
                self.btn_delete_class_save = false;
                self.prompt(response.data.result, 'failure', false);
            });
        },
        //修改分類欄位
        modify_class: function modify_class() {
            var self = this;
            if ($('.field_class_item.active .modify_block').find('input[name=qc_name]').val() == '') {
                var string = '<div class="tip_block">' + '<p>分類名稱不能空白</p>' + '</div>';
                $('.field_class_item.active .modify_block').append(string);
                $('.field_class_item.active .modify_block .tip_block').hover(function () {
                    $(this).fadeOut(300, function () {
                        $(this).remove();
                    });
                });
            } else {
                self.btn_modify_class_save = true;
                self.question_class.fi_id = 5; //問題分類欄位
                self.question_class.qc_id = $('.field_class_item.active .modify_block').find('input[name=qc_id]').val();
                self.question_class.qc_name = $('.field_class_item.active .modify_block').find('input[name=qc_name]').val();
                axios.post('/field-modify', this.question_class).then(function (response) {
                    self.btn_modify_class_save = false;
                    if (response.data.result == 'ok') {
                        self.create_class_block = false;
                        self.modify_class_block_display();
                        self.prompt('修改成功', 'success', false);
                        axios.get('/field-question/BBIN').then(function (response) {
                            self.question_field = response.data;
                        }).catch(function (response) {
                            self.prompt(response.data.result, 'failure', false);
                        });
                    } else {
                        self.prompt(response.data.result, 'failure', false);
                    }
                }).catch(function (response) {
                    self.btn_modify_class_save = false;
                    self.prompt(response.data.result, 'failure', false);
                });
            }
        },
        //新增分類欄位
        create_class: function create_class() {
            var self = this;
            if ($('input[name=qc_name]').val() == '') {
                var string = '<div class="tip_block">' + '<p>分類名稱不能空白</p>' + '</div>';
                $('.create_block').append(string);
                $('.create_block .tip_block').hover(function () {
                    $(this).fadeOut(300, function () {
                        $(this).remove();
                    });
                });
            } else {
                self.btn_create_class_save == true;
                self.question_class.fi_id = 5; //問題分類欄位
                self.question_class.qc_name = $('input[name=qc_name]').val();
                self.question_class.qa_type = 1; //BBIN分類
                axios.post('/field-create', this.question_class).then(function (response) {
                    self.create_class_block = false;
                    self.btn_create_class_save == false;
                    if (response.data.result == 'ok') {
                        self.prompt('新增成功', 'success', false);
                        axios.get('/field-question').then(function (response) {
                            self.question_field = response.data;
                        }).catch(function (response) {
                            self.prompt(response.data.result, 'failure', false);
                        });
                    } else {
                        self.prompt(response.data.result, 'failure', false);
                    }
                }).catch(function (response) {
                    self.btn_create_class_save == false;
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
        //頁碼點擊事件
        pageClick: function pageClick(data) {
            if (data != this.cur) {
                this.cur = data;
            }
        },
        //隱藏篩選條件與否
        flow_or_not: function flow_or_not() {
            if ($('.islabel_style').height() == 0) {
                $('.islabel_style').animate({ 'height': $('.search_item').height() }, 200);
            } else {
                $('.islabel_style').animate({ 'height': 0 }, 200);
            }
        },
        //改變顯現筆數
        sortBy: function sortBy() {
            var self = this;
            self.all = Math.ceil(self.questions.length / self.limit);
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
        }
    },
    watch: {},
    mounted: function mounted() {
        this.init();
    }
});

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(68);


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

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(48)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(40),
  /* scopeId */
  "data-v-dee1c338",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\copywritingManagement\\Back\\resources\\assets\\js\\pages\\BBINQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BBINQuestion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dee1c338", Component.options)
  } else {
    hotAPI.reload("data-v-dee1c338", Component.options)
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

/***/ 40:
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
    staticClass: "search_content"
  }, [_c('i', {
    staticClass: "fa fa-search"
  }), _vm._v(" "), _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.list_questions.length == 0
    },
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
    staticClass: "search_class islabel_style"
  }, [_c('div', {
    staticClass: "search_title"
  }, [_vm._v("分類")]), _vm._v(" "), _c('div', {
    staticClass: "search_item"
  }, [_c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.check),
      expression: "check"
    }],
    staticClass: "input_radio",
    attrs: {
      "type": "radio",
      "name": "qc_id",
      "value": "null"
    },
    domProps: {
      "checked": _vm._q(_vm.check, "null")
    },
    on: {
      "click": function($event) {
        _vm.search()
      },
      "change": function($event) {
        _vm.check = "null"
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
      staticClass: "input_radio",
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
          _vm.search()
        },
        "change": function($event) {
          _vm.check = field.qc_id
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.qc_name))])])
  })], 2)])])]), _vm._v(" "), _c('div', {
    staticClass: "title_style"
  }, [_c('h1', [_vm._v("問題列表")]), _vm._v(" "), _c('button', {
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
  })])]), _vm._v(" "), (_vm.list_questions.length != 0 && _vm.questions.length > _vm.limit && _vm.loading == false) ? _c('div', {
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
    staticClass: "table_block"
  }, [_c('table', {
    staticClass: "q_table"
  }, [_vm._m(5), _vm._v(" "), _c('tbody', _vm._l((_vm.list_questions), function(data) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(data.last_update_date))]), _vm._v(" "), _c('td', {
      staticClass: "qc_name text_align_c"
    }, [_vm._v(_vm._s(data.qc_name))]), _vm._v(" "), _c('td', {
      staticClass: "qa_content"
    }, [_c('p', {
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
    }, [_vm._v(_vm._s(data.qa_content))]), _vm._v(" "), _c('i', {
      staticClass: "fa fa-edit",
      on: {
        "click": function($event) {
          _vm.page_modify(data.qa_id)
        }
      }
    }), _vm._v(" "), (_vm.btn_delete_save) ? _c('i', {
      staticClass: "fa fa-trash"
    }) : _c('i', {
      staticClass: "fa fa-trash",
      on: {
        "click": function($event) {
          _vm.remove(data.qa_id, false)
        }
      }
    })])])
  }))]), _vm._v(" "), (_vm.list_questions.length == 0) ? _c('div', {
    staticClass: "found_nothing"
  }, [_vm._v("\n                        查無任何資料\n                    ")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.list_questions.length != 0 && _vm.questions.length > _vm.limit && _vm.loading == false) ? _c('div', {
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
  }, [_vm._m(8), _vm._v(" "), (_vm.field_class) ? _c('div', {
    staticClass: "field_class_wrapper"
  }, [_c('i', {
    staticClass: "fa fa-times close_fc",
    on: {
      "click": function($event) {
        _vm.field_class = false, _vm.create_class_block = false, _vm.show_overlay(false)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "field_class_header"
  }, [_c('h1', [_vm._v("分類列表")]), _vm._v(" "), _c('button', {
    staticClass: "btn_create",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create_class_block = true
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field_class_body"
  }, [(_vm.create_class_block) ? _c('div', {
    staticClass: "field_class_item"
  }, [_c('div', {
    staticClass: "create_block"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "qc_name"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn_group"
  }, [(_vm.btn_create_class_save) ? _c('button', {
    staticClass: "btn_create_save",
    attrs: {
      "type": "button"
    }
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]) : _c('button', {
    staticClass: "btn_create_save",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create_class()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn_create_back",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create_class_block = false
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-times"
  })])])])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.question_field), function(field) {
    return _c('div', {
      staticClass: "field_class_item"
    }, [_c('div', {
      staticClass: "item_block color_block"
    }, [_c('span', [_vm._v(_vm._s(field.qc_name))]), _vm._v(" "), _c('i', {
      staticClass: "fa fa-edit",
      on: {
        "click": function($event) {
          _vm.modify_class_block(field.qc_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "modify_block"
    }, [_c('input', {
      attrs: {
        "type": "hidden",
        "name": "qc_id"
      },
      domProps: {
        "value": field.qc_id
      }
    }), _vm._v(" "), _c('input', {
      attrs: {
        "type": "text",
        "name": "qc_name"
      },
      domProps: {
        "value": field.qc_name
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "btn_group"
    }, [(_vm.btn_modify_class_save) ? _c('button', {
      staticClass: "btn_modify_save",
      attrs: {
        "type": "button"
      }
    }, [_c('i', {
      staticClass: "fa fa-check"
    })]) : _c('button', {
      staticClass: "btn_modify_save",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.modify_class()
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-check"
    })]), _vm._v(" "), _c('button', {
      staticClass: "btn_modify_back",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.modify_class_block_display()
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times"
    })]), _vm._v(" "), (_vm.btn_delete_class_save) ? _c('button', {
      staticClass: "btn_delete_save",
      attrs: {
        "type": "button"
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })]) : _c('button', {
      staticClass: "btn_delete_save",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.delete_class(field.qc_id)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])])])])
  })], 2)]) : _vm._e(), _vm._v(" "), _vm._m(9), _vm._v(" "), _c('div', {
    staticClass: "content_block"
  }, [_c('input', {
    attrs: {
      "type": "hidden",
      "name": "qa_id"
    },
    domProps: {
      "value": _vm.question.qa_id
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "isclass"
  }, [_c('div', {
    staticClass: "isclass_title"
  }, [_vm._v("分類")]), _vm._v(" "), _c('div', {
    staticClass: "islabel_style"
  }, [_vm._l((_vm.question_field), function(field) {
    return _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.check),
        expression: "check"
      }],
      staticClass: "input_radio",
      attrs: {
        "type": "radio",
        "name": "qc_id"
      },
      domProps: {
        "value": field.qc_id,
        "checked": _vm._q(_vm.check, field.qc_id)
      },
      on: {
        "change": function($event) {
          _vm.check = field.qc_id
        }
      }
    }), _c('span', [_vm._v(_vm._s(field.qc_name))])])
  }), _vm._v(" "), _c('button', {
    staticClass: "btn_edit",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.field_class = true, _vm.show_overlay(true)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  }, [_vm._v("編輯分類")])])], 2)]), _vm._v(" "), _c('div', {
    staticClass: "iscontent"
  }, [_c('div', {
    staticClass: "iscontent_title"
  }, [_vm._v("問題內容")]), _vm._v(" "), _c('div', {
    staticClass: "istextarea_style",
    attrs: {
      "data-toggle": "tooltip",
      "title": "請輸入問題內容"
    }
  }, [_c('textarea', {
    attrs: {
      "name": "qa_content"
    }
  }, [_vm._v(_vm._s(_vm.question.qa_content))])])])]), _vm._v(" "), _c('div', {
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
  }, [_vm._m(10), _vm._v(" "), (_vm.field_class) ? _c('div', {
    staticClass: "field_class_wrapper"
  }, [_c('i', {
    staticClass: "fa fa-times close_fc",
    on: {
      "click": function($event) {
        _vm.field_class = false, _vm.create_class_block = false, _vm.show_overlay(false)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "field_class_header"
  }, [_c('h1', [_vm._v("分類列表")]), _vm._v(" "), _c('button', {
    staticClass: "btn_create",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create_class_block = true
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field_class_body"
  }, [(_vm.create_class_block) ? _c('div', {
    staticClass: "field_class_item"
  }, [_c('div', {
    staticClass: "create_block"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "qc_name"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn_group"
  }, [(_vm.btn_create_class_save) ? _c('button', {
    staticClass: "btn_create_save",
    attrs: {
      "type": "button"
    }
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]) : _c('button', {
    staticClass: "btn_create_save",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create_class()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-check"
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn_create_back",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.create_class_block = false
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-times"
  })])])])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.question_field), function(field) {
    return _c('div', {
      staticClass: "field_class_item"
    }, [_c('div', {
      staticClass: "item_block color_block"
    }, [_c('span', [_vm._v(_vm._s(field.qc_name))]), _vm._v(" "), _c('i', {
      staticClass: "fa fa-edit",
      on: {
        "click": function($event) {
          _vm.modify_class_block(field.qc_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "modify_block"
    }, [_c('input', {
      attrs: {
        "type": "hidden",
        "name": "qc_id"
      },
      domProps: {
        "value": field.qc_id
      }
    }), _vm._v(" "), _c('input', {
      attrs: {
        "type": "text",
        "name": "qc_name"
      },
      domProps: {
        "value": field.qc_name
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "btn_group"
    }, [(_vm.btn_modify_class_save) ? _c('button', {
      staticClass: "btn_modify_save",
      attrs: {
        "type": "button"
      }
    }, [_c('i', {
      staticClass: "fa fa-check"
    })]) : _c('button', {
      staticClass: "btn_modify_save",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.modify_class()
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-check"
    })]), _vm._v(" "), _c('button', {
      staticClass: "btn_modify_back",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.modify_class_block_display()
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times"
    })]), _vm._v(" "), (_vm.btn_delete_class_save) ? _c('button', {
      staticClass: "btn_delete_save",
      attrs: {
        "type": "button"
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })]) : _c('button', {
      staticClass: "btn_delete_save",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.delete_class(field.qc_id)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])])])])
  })], 2)]) : _vm._e(), _vm._v(" "), _vm._m(11), _vm._v(" "), _c('div', {
    staticClass: "table_block"
  }, [_c('table', {
    staticClass: "q_table"
  }, [_c('thead', [_c('tr', [_c('th', {}), _vm._v(" "), _c('th', {}, [_vm._v("分類")]), _vm._v(" "), _c('th', {}, [_vm._v("\n                            問題內容\n                            "), _c('button', {
    staticClass: "btn_edit",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.field_class = true, _vm.show_overlay(true)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  }, [_vm._v("編輯分類")])])])])]), _vm._v(" "), _c('tbody', _vm._l((_vm.create_questions), function(data, key) {
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
          _vm.create_questions.splice(key, 1)
        }
      }
    }) : _vm._e()]), _vm._v(" "), _c('td', {}, [_c('div', {
      staticClass: "islabel_style"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_questions[key].qc_id),
        expression: "create_questions[key].qc_id"
      }],
      attrs: {
        "name": "qc_id"
      },
      on: {
        "change": function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val
          });
          _vm.$set(_vm.create_questions[key], "qc_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
        }
      }
    }, _vm._l((_vm.question_field), function(qc) {
      return _c('option', {
        domProps: {
          "value": qc.qc_id
        }
      }, [_vm._v(_vm._s(qc.qc_name))])
    }))])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "islabel_style"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.create_questions[key].qa_content),
        expression: "create_questions[key].qa_content"
      }],
      attrs: {
        "type": "text",
        "name": "qa_content"
      },
      domProps: {
        "value": (_vm.create_questions[key].qa_content)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.create_questions[key], "qa_content", $event.target.value)
        }
      }
    })])])])
  }))])]), _vm._v(" "), _c('div', {
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
  return _c('thead', [_c('tr', [_c('th', {
    staticClass: "text_align_l"
  }, [_c('p', [_vm._v("時間")])]), _vm._v(" "), _c('th', {
    staticClass: "text_align_c"
  }, [_c('p', [_vm._v("分類")])]), _vm._v(" "), _c('th', {
    staticClass: "text_align_l"
  }, [_c('p', [_vm._v("問題")])])])])
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
  }, [_c('h1', [_vm._v("修改問題")])])
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
  }, [_c('h1', [_vm._v("新增問題")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-dee1c338", module.exports)
  }
}

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("55e11bfe", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-dee1c338\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BBINQuestion.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-dee1c338\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BBINQuestion.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_BBINQuestion__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_BBINQuestion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_BBINQuestion__);
// 匯入 Question.vue 檔，不需加副檔名


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ })

},[121]);