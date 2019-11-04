<style scoped>

</style>

<template>
	<!-- 問題列表 -->
	<div v-if="page === 'list'" class="page_list">
        <div class="prompt_body_admin">
            <div class="prompt_box_admin">
                <div class="prompt_content">
                    <div class="prompt_logo">
                        <i class="fa fa-question"></i>
                    </div>
                    <h2></h2>
                </div>
                <div class="prompt_btn_group" v-if="remove_btn">
                    <button type="button" class="btn_no" @click="prompt_fade_out()">取消</button>
                    <button type="button" class="btn_yes" v-if="btn_delete_save">確認</button>
                    <button type="button" class="btn_yes" @click="remove(remove_id,true)" v-else="btn_delete_save">確認</button>
                </div>
                <div class="prompt_btn_group" v-else="remove_btn">
                    <p><span>3</span>s後自動關閉</p>
                </div>
            </div>
        </div>
        <div class="remove_wrapper">
            <i class="fa"></i><span></span>
        </div>
		<div class="content_block">
		    <div class="content list">
		    	<div class="search_block">
                    <div class="search_content">
                        <i class="fa fa-search"></i>
                        <input type="text" class="search_input" placeholder="輸入關鍵字查詢" name="qa_content" @input="search()" @compositionstart="listen_input_start()"
         @compositionend="listen_input_end()" :value=search_condition.qa_content v-bind:class="{ 'notFound': list_questions.length == 0}">
                    </div>
                    <!-- <button type="button" class="btn_clear" @click="init(true)">清除</button> -->
		    		<div class="search_condition">
                        <i class="fa fa-sliders"></i><p @click="flow_or_not()">篩選條件 FILTER</p>
                        <div class="search_class islabel_style">
                            <div class="search_title">分類</div>
                            <div class="search_item">
                                <label>
                                    <input type="radio" class="input_radio" name="qc_id" value="null" @click="search()" v-model="check"><span>全部</span>
                                </label>
                                <label v-for="field in question_field">
                                    <input type="radio" class="input_radio" name="qc_id" :value=field.qc_id @click="search()" v-model="check"><span>{{field.qc_name}}</span>
                                </label>
                            </div>
                        </div>
                    </div>
		    	</div>
                <div class="title_style">
                    <h1>問題列表</h1>
                    <button type="button" title="新增" class="btn_create" @click="page_create()"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="page-bar" v-if="list_questions.length != 0 && questions.length > limit && loading == false">
                    <ul>
                        <li><span>{{number}}筆資料，共{{all}}頁</span></li>
                        <li v-if="showFirst"><a v-on:click="cur--"><i class="fa fa-angle-left"></i></a></li>
                        <li v-else="showFirst"><a class="disabled" disabled><i class="fa fa-angle-left"></i></a></li>
                        <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
                            <a v-on:click="pageClick(index)">{{ index }}</a>
                        </li>
                        <li v-if="showLast"><a v-on:click="cur++"><i class="fa fa-angle-right"></i></a></li>
                        <li v-else="showLast"><a class="disabled" disabled><i class="fa fa-angle-right"></i></a></li>
                        <li>
                            <select name="sortBy" v-model="limit" v-on:change="sortBy">
                                <option :value=10>10筆/頁</option>
                                <option :value=15>15筆/頁</option>
                                <option :value=20>20筆/頁</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div class="loading_block" v-if="loading"></div>
                <div class="table_block" v-if="loading == false">
    		        <table class="q_table">
    					<thead>
    						<tr>
                                <th class="text_align_l">
                                    <p>時間</p>
                                </th>
    							<th class="text_align_c">
                                    <p>分類</p>
                                </th>
    							<th class="text_align_l">
                                    <p>問題</p>
                                </th>
    						</tr>
    					</thead>
    					<tbody>
    						<tr v-for="data in list_questions">
                                <td>{{data.last_update_date}}</td>
    							<td class="qc_name text_align_c">{{data.qc_name}}</td>
    							<td class="qa_content">
                                    <p v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.qa_content}}</p>
                                    <i class="fa fa-edit" @click="page_modify(data.qa_id)"></i>
                                    <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                    <i class="fa fa-trash" @click="remove(data.qa_id,false)" v-else="btn_delete_save"></i>
                                </td>
    						</tr>
    					</tbody>
    				</table>
                    <div class="found_nothing" v-if="list_questions.length == 0">
                        查無任何資料
                    </div>
                </div>
				<div class="page-bar" v-if="list_questions.length != 0 && questions.length > limit && loading == false">
                    <ul>
                        <li><span>{{number}}筆資料，共{{all}}頁</span></li>
                        <li v-if="showFirst"><a v-on:click="cur--"><i class="fa fa-angle-left"></i></a></li>
                        <li v-else="showFirst"><a class="disabled" disabled><i class="fa fa-angle-left"></i></a></li>
                        <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
                            <a v-on:click="pageClick(index)">{{ index }}</a>
                        </li>
                        <li v-if="showLast"><a v-on:click="cur++"><i class="fa fa-angle-right"></i></a></li>
                        <li v-else="showLast"><a class="disabled" disabled><i class="fa fa-angle-right"></i></a></li>
                        <li>
                            <select name="sortBy" v-model="limit" v-on:change="sortBy">
                                <option :value=10>10筆/頁</option>
                                <option :value=15>15筆/頁</option>
                                <option :value=20>20筆/頁</option>
                            </select>
                        </li>
                    </ul>
                </div>
		    </div>
		</div>
	</div>
	<!-- 修改問題 -->
	<div v-else-if="page === 'modify'" class="page_modify">
        <div class="prompt_body_admin">
            <div class="prompt_box_admin">
                <div class="prompt_content">
                    <div class="prompt_logo">
                        <i class="fa fa-question"></i>
                    </div>
                    <h2></h2>
                </div>
                <div class="prompt_btn_group">
                    <p><span>3</span>s後自動關閉</p>
                </div>
            </div>
        </div>
        <!-- 問題分類欄位列表 -->
        <div v-if="field_class" class="field_class_wrapper">
            <i class="fa fa-times close_fc" @click="field_class = false,create_class_block=false,show_overlay(false)"></i>
            <div class="field_class_header">
                <h1>分類列表</h1>
                <button type="button" class="btn_create" @click="create_class_block = true"><i class="fa fa-plus"></i></button>
            </div>
            <div class="field_class_body">
                <div class="field_class_item" v-if="create_class_block">
                    <div class="create_block">
                        <input type="text" name="qc_name">
                        <div class="btn_group">
                            <button type="button" class="btn_create_save" v-if="btn_create_class_save"><i class="fa fa-check"></i></button>
                            <button type="button" class="btn_create_save" @click="create_class()" v-else="btn_create_class_save"><i class="fa fa-check"></i></button>
                            <button type="button" class="btn_create_back" @click="create_class_block = false"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div class="field_class_item" v-for="field in question_field">
                    <div class="item_block color_block">
                        <span>{{field.qc_name}}</span>
                        <i class="fa fa-edit" @click="modify_class_block(field.qc_id)"></i>
                    </div>
                    <div class="modify_block">
                        <input type="hidden" name="qc_id" :value=field.qc_id>
                        <input type="text" name="qc_name" :value=field.qc_name>
                        <div class="btn_group">
                            <button type="button" class="btn_modify_save" v-if="btn_modify_class_save"><i class="fa fa-check"></i></button>
                            <button type="button" class="btn_modify_save" @click="modify_class()" v-else="btn_modify_class_save"><i class="fa fa-check"></i></button>
                            <button type="button" class="btn_modify_back" @click="modify_class_block_display()"><i class="fa fa-times"></i></button>
                            <button type="button" class="btn_delete_save" v-if="btn_delete_class_save"><i class="fa fa-trash"></i></button>
                            <button type="button" class="btn_delete_save" @click="delete_class(field.qc_id)" v-else="btn_delete_class_save"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div class="page_title">
		     <h1>修改問題</h1>
		</div>
		<div class="content_block">
			<input type="hidden" name="qa_id" :value=question.qa_id>
	        <div class="isclass">
                <div class="isclass_title">分類</div>
                <div class="islabel_style">
                    <label v-for="field in question_field">
                        <input type="radio" class="input_radio" name="qc_id" :value=field.qc_id v-model="check"><span>{{field.qc_name}}</span>
                    </label>
                    <button class="btn_edit" type="button" @click="field_class = true,show_overlay(true)"><i class="fa fa-pencil">編輯分類</i></button>
                </div>
            </div>
            <div class="iscontent">
                <div class="iscontent_title">問題內容</div>
                <div class="istextarea_style" data-toggle="tooltip" title="請輸入問題內容">
                    <textarea name="qa_content">{{question.qa_content}}</textarea>
                </div>
            </div>
	    </div>
		<div class="modify_button">
			<button type="button" class="btn_back" @click="init()">BACK 返回</button>
			<button type="button" class="btn_save" v-if="btn_modify_save">SAVE 存檔</button>
            <button type="button" class="btn_save" @click="modify()" v-else="btn_modify_save">SAVE 存檔</button>
		</div>
	</div>
	<!-- 新增問題 -->
	<div v-else-if="page === 'create'" class="page_create">
        <div class="prompt_body_admin">
            <div class="prompt_box_admin">
                <div class="prompt_content">
                    <div class="prompt_logo">
                        <i class="fa fa-question"></i>
                    </div>
                    <h2></h2>
                </div>
                <div class="prompt_btn_group">
                    <p><span>3</span>s後自動關閉</p>
                </div>
            </div>
        </div>
        <!-- 問題分類欄位列表 -->
        <div v-if="field_class" class="field_class_wrapper">
            <i class="fa fa-times close_fc" @click="field_class = false,create_class_block=false,show_overlay(false)"></i>
            <div class="field_class_header">
                <h1>分類列表</h1>
                <button type="button" class="btn_create" @click="create_class_block = true"><i class="fa fa-plus"></i></button>
            </div>
            <div class="field_class_body">
                <div class="field_class_item" v-if="create_class_block">
                    <div class="create_block">
                        <input type="text" name="qc_name">
                        <div class="btn_group">
                            <button type="button" class="btn_create_save" v-if="btn_create_class_save"><i class="fa fa-check"></i></button>
                            <button type="button" class="btn_create_save" @click="create_class()" v-else="btn_create_class_save"><i class="fa fa-check"></i></button>
                            <button type="button" class="btn_create_back" @click="create_class_block = false"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div class="field_class_item" v-for="field in question_field">
                    <div class="item_block color_block">
                        <span>{{field.qc_name}}</span>
                        <i class="fa fa-edit" @click="modify_class_block(field.qc_id)"></i>
                    </div>
                    <div class="modify_block">
                        <input type="hidden" name="qc_id" :value=field.qc_id>
                        <input type="text" name="qc_name" :value=field.qc_name>
                        <div class="btn_group">
                            <button type="button" class="btn_modify_save" v-if="btn_modify_class_save"><i class="fa fa-check"></i></button>
                            <button type="button" class="btn_modify_save" @click="modify_class()" v-else="btn_modify_class_save"><i class="fa fa-check"></i></button>
                            <button type="button" class="btn_modify_back" @click="modify_class_block_display()"><i class="fa fa-times"></i></button>
                            <button type="button" class="btn_delete_save" v-if="btn_delete_class_save"><i class="fa fa-trash"></i></button>
                            <button type="button" class="btn_delete_save" @click="delete_class(field.qc_id)" v-else="btn_delete_class_save"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div class="page_title">
            <h1>新增問題</h1>
		</div>
        <div class="table_block">
            <table class="q_table">
                <thead>
                    <tr>
                        <th class=""></th>
                        <th class="">分類</th>
                        <th class="">
                            問題內容
                            <button class="btn_edit" type="button" @click="field_class = true,show_overlay(true)"><i class="fa fa-pencil">編輯分類</i></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data,key) in create_questions">
                        <td>
                            <i class="fa fa-plus" @click="add_onemore(),add_check = false" v-if="add_check"></i>
                            <i class="fa fa-plus" v-else="add_check"></i>
                            <i class="fa fa-trash" v-if="key != 0" @click="create_questions.splice(key,1)"></i>
                        </td>
                        <td class="">
                            <div class="islabel_style">
                                <select name="qc_id" v-model="create_questions[key].qc_id">
                                    <option v-for="qc in question_field" :value=qc.qc_id>{{qc.qc_name}}</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div class="islabel_style">
                                <input class="" type="text" name="qa_content" v-model="create_questions[key].qa_content">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
		<div class="create_button">
			<button type="button" class="btn_back" @click="init()">BACK 返回</button>
            <button type="button" class="btn_save" v-if="btn_create_save">SAVE 存檔</button>
            <button type="button" class="btn_save" @click="create()" v-else="btn_create_save">SAVE 存檔</button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
        return {
            btn_modify_class_save: false,// 防呆用，防止連按
            btn_create_class_save: false,// 防呆用，防止連按
            btn_delete_class_save: false,// 防呆用，防止連按
            btn_modify_save: false,// 防呆用，防止連按
            btn_create_save: false,// 防呆用，防止連按
            btn_delete_save: false,// 防呆用，防止連按
            add_check:true, // 防呆用，防止連按
            questions: [],
            question_field: [],
            question: {
                qa_id: null,
                qa_type: 2,
                qc_id: '',
                qa_content: ''
            },
            question_class:{},
            search_condition: {
            	qc_id: '',
                qa_type: 2,
            	qa_content: ''
            },
            create_questions:[
                {qc_id:'',qa_type: 2,qa_content:''}
            ],
            remove_btn: null, //是否在提示框顯示刪除相關按鈕
            remove_id:null, //要被刪除的問題id
            page: 'list', //當前頁面
            check: 'null', //所選qc_id
            needReset: true,
            all: '', //總頁數
            number: '', //總筆數
            limit:10,
        	cur: 1, //當前頁碼
            field_class:false,
            create_class_block:false,
            delete_class_block:false,
            keyword:'',
            loading:true,
            composing:true, //監聽搜尋框輸入
        }
    },
    computed: {
    	list_questions: function(){
    		var start = (this.cur - 1) * this.limit;
    		return this.questions.slice(start, start+this.limit);
    	},
        indexs: function(){
          	var left = 1;
          	var right = this.all;
          	var ar = [];
          	if(this.all>= 11){
            	if(this.cur > 5 && this.cur < this.all-4){
                    left = this.cur - 5;
                    right = this.cur + 4;
            	}else{
                	if(this.cur<=5){
	                    left = 1;
	                    right = 10;
	                }else{
	                    right = this.all;
	                    left = this.all -9;
	                }
            	}
         	}
        	while (left <= right){
	            ar.push(left);
	            left ++;
        	}
        	return ar;
       	},
       	showLast: function(){
            if(this.cur == this.all){
                return false;
            }else if(this.all == 0){
                return false;
            }
            return true;
       	},
       	showFirst: function(){
            if(this.cur == 1){
                return false;
            }else if(this.all == 0){
                return false;
            }
           	return true;
       	}
   	},
    methods: {
    	//跳頁到列表頁
        init: function (boolean) {
            let self = this;
            self.loading = true;
            self.page = 'list';
            if(boolean){
            	self.needReset = true;
            	self.search_condition = {qc_id: '',qa_type: 2,qa_content: ''};
            	self.check = 'null';
            	self.cur = 1;
                self.btn_delete_save = false;
                self.btn_delete_class_save = false;
                self.limit = 10;
                self.create_questions = [{qc_id:'',qa_type:2,qa_content:''}];
            }
            if(self.needReset){
            	axios.get('/questions/BBOS')
	                .then(function (response) {
	                    self.questions  = response.data;
	                    self.all = Math.ceil(self.questions.length / self.limit);
                        self.number = self.questions.length;
                        setTimeout(function(){
                            self.loading = false;
                        },1000)
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result,'failure',false);
	                });
	            axios.get('/field-question/BBOS')
	                .then(function (response) {
	                    self.question_field  = response.data;
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result,'failure',false);
	                });
	        }else{
                self.loading = false;
            }
        },
        //跳頁到新增頁
        page_create: function() {
        	let self = this;
        	self.page = 'create';
            self.btn_create_save = false;
            self.create_questions[0].qa_type = 2;
            axios.get('/field-question/BBOS')
                .then(function (response) {
                    self.question_field  = response.data;
                    self.create_questions[0].qc_id = self.question_field[0].qc_id;
                })
                .catch(function (response) {
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //新增頁面-新增一組資料欄位
        add_onemore:function(){
            let self = this;
            self.create_questions.push({qc_id:'',qa_type:2,qa_content:''});
            self.create_questions[self.create_questions.length -1].qc_id = self.question_field[0].qc_id;
            setTimeout(function(){
                self.add_check = true;
            }, 1000);
        },
        //跳頁到修改頁
        page_modify: function(id) {
        	let self = this;
        	self.page = 'modify';
            self.btn_modify_save = false;
        	axios.get('/question/'+id)
                .then(function (response) {
                    self.question = response.data;
                    self.check = self.question.qc_id;
                })
                .catch(function (response) {
                    self.prompt(response.data.result,'failure',false);
                });
            $('input[name=qc_id]').each(function(){
            	if($(this).prop('value') == self.question.qc_id){
            		$(this).prop('ckecked',true);
            	}
            })
        },
        //新增功能
        create: function () {
        	let self = this;
            var boolean = true;
            for(var i = 0 ; i < self.create_questions.length ; i++){
                if(self.create_questions[i].qa_content == ''){
                    var string ='<div class="tip_block">'+
                                '<p>請填入問題內容</p>'+
                            '</div>';
                    $('tbody tr').eq(i).find('input[name=qa_content]').parent('.islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
                    boolean = false;
                }
            }
            if(boolean){
                axios.post('/question-create', self.create_questions)
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('新增成功','success',true);
                        }else{
                            self.btn_create_save = false;
                            self.prompt(response.data.result,'failure',true);
                        }
                    })
                    .catch(function (response) {
                        self.btn_create_save = false;
                        self.prompt(response.data.result,'failure',false);
                    });
            }
        },
        //修改功能
        modify: function () {
            let self = this;

			$('.isclass').find('input[name=qc_id]').each(function(){
        		if($(this).prop('checked')){
        			self.question.qc_id = $(this).prop('value');
        		}
        	})
        	self.question.qa_id = $('input[name=qa_id]').val();
        	self.question.qa_content = $('textarea[name=qa_content]').val();

            if(self.question.qc_id == ''){
                var string ='<div class="tip_block">'+
                                '<p>請選擇分類</p>'+
                            '</div>';
                $('.islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
        	}else if(self.question.qa_content == ''){
                var string ='<div class="tip_block">'+
                                '<p>請填寫問題內容</p>'+
                            '</div>';
                $('.istextarea_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
        	}else{
                self.btn_modify_save = true;
	            axios.post('/question-modify', this.question)
	                .then(function (response) {
	                    if (response.data.result == 'ok') {
	                        self.question = {qa_id:null, qc_id: '', qa_type: 2, qa_content:''};
	                        self.prompt('修改成功','success',true);
	                    }else{
                            self.btn_modify_save = false;
	                    	self.prompt(response.data.result,'failure',true);
	                    }
	                })
	                .catch(function (response) {
                        self.btn_modify_save = false;
	                    self.prompt(response.data.result,'failure',false);
	                });
            }
        },
        //刪除功能
        remove: function (id,boolean) {
            let self = this;
            self.btn_delete_save = true;
            if(boolean){
                axios.get('/question-delete/' + id)
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('刪除成功','success',true);
                            self.remove_btn = false;
                            self.notification('刪除成功','success');

                        }else{
                            self.btn_delete_save = false;
                            self.prompt(response.data.result,'failure',true);
                            self.remove_btn = false;
                            self.notification(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_delete_save = false;
                        self.prompt(response.data.result,'failure',false);
                        self.remove_btn = false;
                    });
            }else{
                self.remove_btn = true;
                self.remove_id = id;
                self.prompt('確定要刪除此問題？','question',false);
                self.btn_delete_save = false;
            }
        },
        //監聽搜尋框 注音輸入開始
        listen_input_start:function(){
            let self = this;
            self.composing = false;
        },
        //監聽搜尋框 注音輸入結束
        listen_input_end:function(){
            let self = this;
            self.composing = true;
        },
        //查詢功能
        search: function () {
        	let self = this;
            setTimeout(function(){
                if(self.composing){
                    self.cur = 1;
                    self.keyword = $('.search_content').find('input[name=qa_content]').val();
                    $('.search_class').find('input[name=qc_id]').each(function(){
                        if($(this).prop('checked')){
                            if($(this).prop('value') == 'null'){
                                self.search_condition.qc_id = null;
                            }else{
                                self.search_condition.qc_id = $(this).prop('value');
                            }
                        }
                    })
                    self.search_condition.qa_content = $('.search_content').find('input[name=qa_content]').val();

                    axios.post('/questions/BBOS', self.search_condition)
                        .then(function (response) {
                            self.questions = response.data;
                            self.all = Math.ceil(self.questions.length / self.limit);
                            self.number = self.questions.length;
                            self.needReset = false
                            // setTimeout(function(){
                            //     self.loading = false;
                            // },1000)
                        })
                        .catch(function (response) {
                            self.prompt(response.data.result,'failure',false);
                        });
                }
            },10)
        },
        //隱藏問題分類欄位修改頁
        modify_class_block_display:function(){
            self.btn_delete_class_save == false;
            self.btn_modify_class_save == false;
            self.btn_create_class_save == false;
            $('.field_class_item.active').removeClass('active');
        },
        //顯示問題分類欄位修改頁
        modify_class_block:function(id){
            let self = this;
            $('.modify_block').find('input[name=qc_id]').each(function(){
                if($(this).val() == id){
                    $(this).parent('.modify_block').find('input[name=qc_name]').val($(this).parent('.modify_block').siblings().find('span').text())
                    $(this).parent('.modify_block').css('background-color',$(this).parent('.modify_block').siblings().css('background-color'));
                    $(this).parents('.field_class_item').siblings().removeClass('active');
                    $(this).parents('.field_class_item').addClass('active');
                }
            })
        },
        //刪除分類欄位
        delete_class:function(id){
            let self = this;
            self.question_class.fi_id = 5; //問題分類欄位
            self.question_class.qc_id = $('.field_class_item.active .modify_block').find('input[name=qc_id]').val();
            self.btn_delete_class_save = true;
            axios.post('/field-delete',this.question_class)
                .then(function (response) {
                    if (response.data.result == 'ok') {
                        self.btn_delete_class_save = false;
                        self.create_class_block = false;
                        self.modify_class_block_display();
                        self.prompt('刪除成功','success',false);
                        axios.get('/field-question')
                            .then(function (response) {
                                self.question_field  = response.data;
                            })
                            .catch(function (response) {
                                self.prompt(response.data.result,'failure',false);
                            });
                    }else{
                        self.btn_delete_class_save = false;
                        self.prompt(response.data.result,'failure',false);
                    }
                })
                .catch(function (response) {
                    self.btn_delete_class_save = false;
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //修改分類欄位
        modify_class:function(){
            let self = this;
            if($('.field_class_item.active .modify_block').find('input[name=qc_name]').val() == ''){
                var string ='<div class="tip_block">'+
                                '<p>分類名稱不能空白</p>'+
                            '</div>';
                $('.field_class_item.active .modify_block').append(string);
                $('.field_class_item.active .modify_block .tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
            }else{
                self.btn_modify_class_save = true;
                self.question_class.fi_id = 5; //問題分類欄位
                self.question_class.qc_id = $('.field_class_item.active .modify_block').find('input[name=qc_id]').val();
                self.question_class.qc_name = $('.field_class_item.active .modify_block').find('input[name=qc_name]').val();
                axios.post('/field-modify', this.question_class)
                    .then(function (response) {
                        self.btn_modify_class_save = false;
                        if (response.data.result == 'ok') {
                            self.create_class_block = false;
                            self.modify_class_block_display();
                            self.prompt('修改成功','success',false);
                            axios.get('/field-question')
                                .then(function (response) {
                                    self.question_field  = response.data;
                                })
                                .catch(function (response) {
                                    self.prompt(response.data.result,'failure',false);
                                });
                        }else{
                            self.prompt(response.data.result,'failure',false);
                        }
                    })
                    .catch(function (response) {
                        self.btn_modify_class_save = false;
                        self.prompt(response.data.result,'failure',false);
                    });
            }
        },
        //新增分類欄位
        create_class:function(){
            let self = this;
            if($('input[name=qc_name]').val() == ''){
                var string ='<div class="tip_block">'+
                                '<p>分類名稱不能空白</p>'+
                            '</div>';
                $('.create_block').append(string);
                $('.create_block .tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
            }else{
                self.btn_create_class_save == true;
                self.question_class.fi_id = 5; //問題分類欄位
                self.question_class.qc_name = $('input[name=qc_name]').val();
                self.question_class.qa_type = 2; //BBOS分類
                axios.post('/field-create', this.question_class)
                    .then(function (response) {
                        self.create_class_block = false;
                        self.btn_create_class_save == false;
                        if (response.data.result == 'ok') {
                            self.prompt('新增成功','success',false);
                            axios.get('/field-question')
                                .then(function (response) {
                                    self.question_field  = response.data;

                                })
                                .catch(function (response) {
                                    self.prompt(response.data.result,'failure',false);
                                });
                        }else{
                            self.prompt(response.data.result,'failure',false);
                        }
                    })
                    .catch(function (response) {
                        self.btn_create_class_save == false;
                        self.prompt(response.data.result,'failure',false);
                    });
            }
        },
        //彈出提示框
        prompt:function(string,type,boolean){//string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
            let self = this;
            $('.overlay').fadeIn(400);
        	$('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_body_admin h2').text(string);
            if(type == 'question'){
                $('.prompt_logo').removeClass('failure');
                $('.prompt_logo').removeClass('success');
                $('.prompt_logo i').removeClass('fa-times');
                $('.prompt_logo i').removeClass('fa-check');
                $('.prompt_logo i').addClass('fa-question');
                $('.prompt_logo').addClass('question');
            }else if(type == 'success'){
                $('.prompt_logo').removeClass('failure');
                $('.prompt_logo').removeClass('question');
                $('.prompt_logo i').removeClass('fa-times');
                $('.prompt_logo i').removeClass('fa-question');
                $('.prompt_logo i').addClass('fa-check');
                $('.prompt_logo').addClass('success');
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function(){
                    $('.prompt_btn_group span').text(n-1);
                    setTimeout(function(){
                        $('.prompt_btn_group span').text(n-2);
                        setTimeout(function(){
                            if(boolean){
                                self.prompt_fade_out();
                                self.init(true);
                            }else{
                                $('.prompt_body_admin').fadeOut(400);
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }else if(type == 'failure'){
                $('.prompt_logo').removeClass('success');
                $('.prompt_logo').removeClass('question');
                $('.prompt_logo i').removeClass('fa-check');
                $('.prompt_logo i').removeClass('fa-question');
                $('.prompt_logo i').addClass('fa-times');
                $('.prompt_logo').addClass('failure');
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function(){
                    $('.prompt_btn_group span').text(n-1);
                    setTimeout(function(){
                        $('.prompt_btn_group span').text(n-2);
                        setTimeout(function(){
                            if(boolean){
                                self.prompt_fade_out();
                                self.init(true);
                            }else{
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
        notification:function(string,type){
            if(type == 'success'){
                $('.remove_wrapper').find('i').removeClass('fa-times');
                $('.remove_wrapper').find('i').addClass('fa-check');
                $('.remove_wrapper').removeClass('failure');
                $('.remove_wrapper').addClass('success');
                $('.remove_wrapper span').text(string);
                $('.remove_wrapper').fadeIn(400);
                $('.remove_wrapper').hover(function(){
                    $(this).fadeOut(400)
                })
                setTimeout(function(){
                   $('.remove_wrapper').fadeOut(400);
                }, 5000);
            }else if(type == 'failure'){
                $('.remove_wrapper').find('i').addClass('fa-times');
                $('.remove_wrapper').find('i').removeClass('fa-check');
                $('.remove_wrapper').addClass('failure');
                $('.remove_wrapper').removeClass('success');
                $('.remove_wrapper span').text(string);
                $('.remove_wrapper').fadeIn(400);
                $('.remove_wrapper').hover(function(){
                    $(this).fadeOut(400)
                })
                setTimeout(function(){
                   $('.remove_wrapper').fadeOut(400);
                }, 5000);
            }
        },
        //關閉提示框
        prompt_fade_out:function(){
            $('.prompt_body_admin').fadeOut(400,function(){
                $('html').removeClass('over_hidden');
            });
            $('.overlay').fadeOut(400);
        },
        //頁碼點擊事件
        pageClick: function(data){
            if(data != this.cur){
                this.cur = data;
            }

        },
        //隱藏篩選條件與否
        flow_or_not: function(){
            if($('.islabel_style').height() == 0){
                $('.islabel_style').animate({'height':$('.search_item').height()},200);
            }else{
                $('.islabel_style').animate({'height':0},200);
            }
        },
        //改變顯現筆數
        sortBy: function(){
            let self = this;
            self.all = Math.ceil(self.questions.length / self.limit);
            if(self.cur > self.all){
                self.cur = self.all;
            }
        },
        //顯示overlay
        show_overlay: function(boolean){
            if(boolean){
                $('html').scrollLeft(0);
                $('html').scrollTop(0);
                $('.overlay').fadeIn(400);
                $('html').addClass('over_hidden');
            }else{
                $('.overlay').fadeOut(400);
                $('html').removeClass('over_hidden');
            }
        }
    },
    watch: {
	},
    mounted: function () {
        this.init();
    }
}
</script>