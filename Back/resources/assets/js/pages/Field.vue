<style scoped>

</style>

<template>
	<!-- 欄位列表 -->
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
                    <button type="button" class="btn_yes" @click="remove(remove_lp_id,remove_lpf_id,remove_lc_id,remove_lsc_id,true)" v-else="btn_delete_save">確認</button>
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
                    <!-- <button type="button" class="btn btn-default btn_clear" @click="init(true)">清除</button> -->
                    <div class="search_content">
                        <i class="fa fa-search"></i>
                        <input type="text" placeholder="輸入關鍵字查詢" name="keyword" @input="search()" @compositionstart="listen_input_start()"
         @compositionend="listen_input_end()" :value=page_list_class.keyword v-bind:class="{ 'notFound': list_fields.length == 0}">
                    </div>
                </div>
                <div class="title_style">
                    <h1>語系分類管理</h1>
                </div>
                <div class="tabs">
                    <span @click="change_tab(-1)" v-bind:class="{ 'active': -1 == page_list_class.lp_id}">全部</span>
                    <span @click="change_tab(product.lp_id)" v-for="product in field_lp" v-bind:class="{ 'active': product.lp_id == page_list_class.lp_id}">{{product.lp_name}}</span>
                    <button type="button" title="新增" class="btn_create" @click="page_create()"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="page-bar" v-if="list_fields.length != 0 && fields.length > limit && loading == false">
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
    		        <table class="f_table">
    					<thead>
    						<tr>
                                <th class="text_align_l">產品</th>
                                <th class="text_align_l">平台</th>
                                <th class="text_align_l">分類</th>
                                <th class="text_align_l">子分類</th>
                                <th class="text_align_l">功能</th>
    						</tr>
    					</thead>
    					<tbody>
    						<tr v-for="data in list_fields">
    							<td v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lp_name}}</td>
    							<td v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lpf_name}}</td>
                                <td v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lc_name}}</td>
                                <td v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lsc_name}}</td>
    							<td>
                                    <i class="fa fa-edit" @click="page_modify(data.lp_id,data.lpf_id,data.lc_id,data.lsc_id)"></i>
                                    <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                    <i class="fa fa-trash" @click="remove(data.lp_id,data.lpf_id,data.lc_id,data.lsc_id,false)" v-else="btn_delete_save"></i>
    							</td>
    						</tr>
    					</tbody>
    				</table>
                    <div class="found_nothing" v-if="list_fields.length == 0">
                        查無任何資料
                    </div>
                </div>
                <div class="page-bar" v-if="list_fields.length != 0 && fields.length > limit && loading == false">
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
	<!-- 修改欄位 -->
	<div v-else-if="page === 'modify'" class="page_modify">
        <!-- 提示框 -->
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
        <div class="page_title">
             <h1>修改欄位</h1>
        </div>
		<div class="content_block">
            <div class="isfield">
                <label class="isfield_title">欄位項目</label>
                <div class="islabel_style">
                    <label v-for="field in field_item" v-if="field.fi_id == modify_item">
                        <input type="radio" class="input_radio" name="fi_id" :value=field.fi_id v-model="modify_item"><span>{{field.fi_name}}</span>
                    </label>
                </div>
            </div>
	        <div class="isproduct" v-if="modify_item != 1 && product_check">
                <label class="isproduct_title">產品</label>
                <div class="islabel_style">
                    <label>
                        <input type="radio" class="input_radio" name="lp_id" :value=field.lp_id v-model="product_check"><span>{{field.lp_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isplatform" v-if="modify_item != 2 && platform_check">
                <label class="isplatform_title">平台</label>
                <div class="islabel_style">
                    <label>
                        <input type="radio" class="input_radio" name="lpf_id" :value=field.lpf_id v-model="platform_check"><span>{{field.lpf_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isclass" v-if="modify_item != 3 && class_check">
                <label class="isclass_title">分類</label>
                <div class="islabel_style">
                    <label>
                        <input type="radio" class="input_radio" name="lc_id" :value=field.lc_id v-model="class_check"><span>{{field.lc_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isname" v-if="item_product">
                <label class="isname_title">產品名稱</label>
                <div class="islabel_style">
                    <input type="text" name="lp_name" :value=field.lp_name>
                </div>
            </div>
            <div class="isname" v-if="item_platform">
                <label class="isname_title">平台名稱</label>
                <div class="islabel_style">
                    <input type="text" name="lpf_name" :value=field.lpf_name>
                </div>
            </div>
            <div class="isname" v-if="item_class">
                <label class="isname_title">分類名稱</label>
                <div class="islabel_style">
                    <input type="text" name="lc_name" :value=field.lc_name>
                </div>
            </div>
            <div class="isname" v-if="item_subclass">
                <label class="isname_title">子分類名稱</label>
                <div class="islabel_style">
                    <input type="text" name="lsc_name" :value=field.lsc_name>
                </div>
            </div>
	    </div>
		<div class="modify_button">
			<button type="button" class="btn_back" @click="init()">返回</button>
			<button type="button" class="btn_save" v-if="btn_modify_save">存檔</button>
            <button type="button" class="btn_save" @click="modify()" v-else="btn_modify_save">存檔</button>
		</div>
	</div>
	<!-- 新增欄位 -->
	<div v-else-if="page === 'create'" class="page_create">
        <!-- 提示框 -->
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
        <div class="page_title">
            <h1>新增欄位</h1>
        </div>
		<div class="content_block">
            <!-- <h3>基本設定</h3> -->
            <div class="isfield">
                <label class="isfield_title">欄位項目</label>
                <div class="islabel_style">
                    <label v-for="field in field_item">
                        <input type="radio" class="input_radio" @click="clickItemRadio()" name="fi_id" :value=field.fi_id v-model="create_item"><span>{{field.fi_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isproduct" v-show="product_check">
                <label class="isproduct_title">產品</label>
                <div class="islabel_style">
                    <label v-for="field in field_lp">
                        <input type="radio" class="input_radio" @click="clickProductRadio()" name="lp_id" :value=field.lp_id v-model="product_check"><span>{{field.lp_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isplatform " v-show="platform_check">
                <label class="isplatform_title">平台：</label>
                <div class="islabel_style">
                    <label v-for="field in field_lpf">
                        <input type="radio" class="input_radio" @click="clickPlatformRadio()" name="lpf_id" :value=field.lpf_id v-model="platform_check"><span>{{field.lpf_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isclass " v-show="class_check">
                <label class="isclass_title">分類</label>
                <div class="islabel_style">
                    <label v-for="field in field_lc">
                        <input type="radio" class="input_radio" name="lc_id" :value=field.lc_id v-model="class_check"><span>{{field.lc_name}}</span>
                    </label>
                </div>
            </div>
            <div class="issubclass" v-show="subclass_check">
                <label class="issubclass_title">子分類</label>
                <div class="islabel_style">
                    <label v-for="field in field_lsc">
                        <input type="radio" class="input_radio" name="lsc_id" :value=field.lsc_id v-model="subclass_check"><span>{{field.lsc_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isname " v-if="item_product">
                <label class="isname_title">產品名稱：</label>
                <div class="islabel_style">
                    <input type="text" name="lp_name">
                </div>
            </div>
            <div class="isname" v-if="item_platform">
                <label class="isname_title">平台名稱：</label>
                <div class="islabel_style">
                    <input type="text" name="lpf_name">
                </div>
            </div>
            <div class="isname" v-if="item_class">
                <label class="isname_title">分類名稱：</label>
                <div class="islabel_style">
                    <input type="text" name="lc_name">
                </div>
            </div>
            <div class="isname" v-if="item_subclass">
                <label class="isname_title">子分類名稱：</label>
                <div class="islabel_style">
                    <input type="text" name="lsc_name">
                </div>
            </div>
        </div>
		<div class="create_button">
			<button type="button" class="btn_back" @click="init()">返回</button>
			<button type="button" class="btn_save" v-if="create_item && btn_create_save">存檔</button>
            <button type="button" class="btn_save" @click="create()" v-else="create_item && btn_create_save">存檔</button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
        return {
            btn_modify_save: false, // 修改頁面的存檔按鈕 - 防呆
            btn_create_save: false, // 新增頁面的存檔按鈕 - 防呆
            btn_delete_save: false, // 刪除的按鈕 - 防呆
            fields: [],
            field_lp: [],
            field_lpf: [],
            field_lc: [],
            field_lsc: [],
            field_item: [{fi_id: 1,fi_name: '產品'},{fi_id: 2,fi_name: '平台'},{fi_id: 3,fi_name: '分類'},{fi_id: 4,fi_name: '子分類'}],
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
            limit:10, //每頁筆數
        	cur: 1, //當前頁碼
            page: 'list', //當前頁面
            // 準備被刪除的分類id
            remove_btn:false,
            remove_lp_id:null,
            remove_lpf_id:null,
            remove_lc_id:null,
            remove_lsc_id:null,
            keyword:'',
            loading: true,
            composing:true, //監聽搜尋框輸入
        }
    },
    computed: {
    	list_fields: function(){
    		var start = (this.cur - 1) * this.limit;
    		return this.fields.slice(start, start+this.limit);
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
                self.page_list_class = { keyword:'',lp_id: -1};
                self.cur = 1;
                self.limit = 10;
                self.all = '';
                self.number = '';
                self.remove_btn = false;
            }
            if(self.needReset){
            	axios.post('/fields',self.page_list_class)
	                .then(function (response) {
	                    self.fields  = response.data;
	                    self.all = Math.ceil(self.fields.length / self.limit);
                        self.number = parseInt(self.fields.length);
                        setTimeout(function(){
                            self.loading = false;
                        },1000)
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result,'failure',false);
	                });
	            axios.get('/field-language-product')
	                .then(function (response) {
	                    self.field_lp  = response.data;
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result,'failure',false);
	                });
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
                self.keyword = $('.search_content').find('input[name=keyword]').val();
                self.cur = 1;
                self.page_list_class.keyword = $('.search_content').find('input[name=keyword]').val();
                axios.post('/fields', self.page_list_class)
                    .then(function (response) {
                        self.fields  = response.data;
                        self.all = Math.ceil(self.fields.length / self.limit);
                        self.number = parseInt(self.fields.length);
                    })
                    .catch(function (response) {
                        self.prompt(response.data.result,'failure',false);
                    });
                }
            },10)
        },
        //切換顯示產品資料
        change_tab: function(tab){
            let self = this;
            if(self.page_list_class.lp_id != tab){
                self.page_list_class.lp_id = tab;
                axios.post('/fields',self.page_list_class)
                    .then(function (response) {
                        self.fields  = response.data;
                        self.all = Math.ceil(self.fields.length / self.limit);
                        self.number = parseInt(self.fields.length);
                        self.cur = 1;
                    })
                    .catch(function (response) {
                        self.prompt(response.data.result,'failure',false);
                    });
            }
        },
        //跳頁到新增頁
        page_create: function() {
        	let self = this;
        	self.page = 'create';
            self.btn_create_save = false;
            self.product_check = false;
            self.platform_check = false;
            self.class_check = false;
            self.subclass_check = false;
        },
        //跳頁到修改頁
        page_modify: function(lp_id,lpf_id,lc_id,lsc_id) {
        	let self = this;
            self.btn_modify_save = false;
            self.field = {};
            self.field.lp_id = lp_id;
            self.field.lpf_id = lpf_id;
            self.field.lc_id = lc_id;
            self.field.lsc_id = lsc_id;
            axios.post('/field',self.field)
                .then(function(response){
                    self.field  = response.data;
                    if(!lp_id){
                        self.prompt(response.data.result,'failure',false);
                    }else if(!lpf_id){ //產品欄位
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
                    }else if(!lc_id){ //平台欄位
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
                    }else if(!lsc_id){ //分類欄位
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
                    }else{ //子分類欄位
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
                })
                .catch(function(response){
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //新增功能
        create: function () {
        	let self = this;
        	if(!self.create_item){
                var string ='<div class="tip_block">'+
                                '<p>請選擇欄位項目</p>'+
                            '</div>';
                $('.isfield .islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
            }else if(self.create_item == 1){ // 新增產品
            	var name = $('input[name=lp_name').val();
            	if(name == ''){
                    var string ='<div class="tip_block">'+
                                '<p>請填入產品名稱</p>'+
                            '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else{
                    self.btn_create_save = true;
            		self.field = {};
            		self.field.fi_id = self.create_item;
            		self.field.lp_name = name;
            		axios.post('/field-create', self.field)
		                .then(function (response) {
		                    if (response.data.result == 'ok') {
		                        // self.init(true);
		                        self.field = {};
		                        self.prompt('新增成功','success',true);
		                    }else{
                                self.btn_create_save = false;
		                    	self.prompt(response.data.result,'failure',false);
		                    }
		                })
		                .catch(function (response) {
                            self.btn_create_save = false;
		                    self.prompt(response.data.result,'failure',false);
		                });
            	}
        	}else if(self.create_item == 2){ // 新增平台
            	if(!$('input[name=lp_id]:checked').val()){
                    var string ='<div class="tip_block">'+
                                '<p>請選擇產品</p>'+
                            '</div>';
                    $('.isproduct .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else if($('input[name=lpf_name').val() == ''){
                    var string ='<div class="tip_block">'+
                                '<p>請填入平台名稱</p>'+
                            '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else{
                    self.btn_create_save = true;
            		self.field = {};
            		self.field.fi_id = self.create_item;
            		self.field.lp_id = $('input[name=lp_id]:checked').val();
            		self.field.lpf_name = $('input[name=lpf_name').val();
            		axios.post('/field-create', self.field)
		                .then(function (response) {
		                    if (response.data.result == 'ok') {
		                        // self.init(true);
		                        self.field = {};
		                        self.prompt('新增成功','success',true);
		                    }else{
                                self.btn_create_save = false;
		                    	self.prompt(response.data.result,'failure',false);
		                    }
		                })
		                .catch(function (response) {
                            self.btn_create_save = false;
		                    self.prompt(response.data.result,'failure',false);
		                });
            	}
        	}else if(self.create_item == 3){ // 新增分類
        		if(!$('input[name=lp_id]:checked').val()){
                    var string ='<div class="tip_block">'+
                                '<p>請選擇產品</p>'+
                            '</div>';
                    $('.isproduct .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else if(!$('input[name=lpf_id]:checked').val()){
                    var string ='<div class="tip_block">'+
                                '<p>請選擇平台</p>'+
                            '</div>';
                    $('.isplatform .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else if($('input[name=lc_name').val() == ''){
                    var string ='<div class="tip_block">'+
                                '<p>請填入分類名稱</p>'+
                            '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else{
                    self.btn_create_save = true;
            		self.field = {};
            		self.field.fi_id = self.create_item;
            		self.field.lp_id = $('input[name=lp_id]:checked').val();
            		self.field.lpf_id = $('input[name=lpf_id]:checked').val();
            		self.field.lc_name = $('input[name=lc_name').val();
            		axios.post('/field-create', self.field)
		                .then(function (response) {
		                    if (response.data.result == 'ok') {
		                        // self.init(true);
		                        self.field = {};
		                        self.prompt('新增成功','success',true);
		                    }else{
                                self.btn_create_save = false;
		                    	self.prompt(response.data.result,'failure',false);
		                    }
		                })
		                .catch(function (response) {
                            self.btn_create_save = false;
		                    self.prompt(response.data.result,'failure',false);
		                });
            	}
        	}else if(self.create_item == 4){ // 新增子分類
        		if(!$('input[name=lp_id]:checked').val()){
            		var string ='<div class="tip_block">'+
                                '<p>請選擇產品</p>'+
                            '</div>';
                    $('.isproduct .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else if(!$('input[name=lpf_id]:checked').val()){
            		var string ='<div class="tip_block">'+
                                '<p>請選擇平台</p>'+
                            '</div>';
                    $('.isplatform .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else if(!$('input[name=lc_id]:checked').val()){
                    var string ='<div class="tip_block">'+
                                '<p>請選擇分類</p>'+
                            '</div>';
                    $('.isclass .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else if($('input[name=lsc_name').val() == ''){
                    var string ='<div class="tip_block">'+
                                '<p>請填入子分類名稱</p>'+
                            '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
            	}else{
                    self.btn_create_save = true;
            		self.field = {};
            		self.field.fi_id = self.create_item;
            		self.field.lp_id = $('input[name=lp_id]:checked').val();
            		self.field.lpf_id = $('input[name=lpf_id]:checked').val();
            		self.field.lc_id = $('input[name=lc_id]:checked').val();
            		self.field.lsc_name = $('input[name=lsc_name').val();
            		axios.post('/field-create', self.field)
		                .then(function (response) {
		                    if (response.data.result == 'ok') {
		                        self.prompt('新增成功','success',true);
		                    }else{
                                self.btn_create_save = false;
		                    	self.prompt(response.data.result,'failure',false);
		                    }
		                })
		                .catch(function (response) {
                            self.btn_create_save = false;
		                    self.prompt(response.data.result,'failure',false);
		                });
            	}
        	}
        },
        //修改功能
        modify: function () {
            let self = this;
            if(self.modify_item == 1){ // 修改產品
                if($('input[name=lp_name]').val() == ''){
                    var string ='<div class="tip_block">'+
                                '<p>產品名稱不能為空值</p>'+
                            '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
                }else{
                    self.btn_modify_save = true;
                    self.field.fi_id = self.modify_item;
                    self.field.lp_name = $('input[name=lp_name]').val();
                    axios.post('/field-modify', this.field)
                        .then(function (response) {
                            if (response.data.result == 'ok') {
                                self.prompt('修改成功','success',true);
                            }else{
                                self.btn_modify_save = false;
                                self.prompt(response.data.result,'failure',false);
                            }
                        })
                        .catch(function (response) {
                            self.btn_modify_save = false;
                            self.prompt(response.data.result,'failure',false);
                        });
                }
            }else if(self.modify_item == 2){ // 修改平台
                if($('input[name=lpf_name]').val() == ''){
                    var string ='<div class="tip_block">'+
                                '<p>平台名稱不能為空值</p>'+
                            '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
                }else{
                    self.btn_modify_save = true;
                    self.field.fi_id = self.modify_item;
                    self.field.lpf_name = $('input[name=lpf_name]').val();
                    axios.post('/field-modify', this.field)
                        .then(function (response) {
                            if (response.data.result == 'ok') {
                                self.prompt('修改成功','success',true);
                            }else{
                                self.btn_modify_save = false;
                                self.prompt(response.data.result,'failure',false);
                            }
                        })
                        .catch(function (response) {
                            self.btn_modify_save = false;
                            self.prompt(response.data.result,'failure',false);
                        });
                }
            }else if(self.modify_item == 3){ // 修改分類
                if($('input[name=lc_name]').val() == ''){
                    var string ='<div class="tip_block">'+
                                '<p>分類名稱不能為空值</p>'+
                            '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
                }else{
                    self.btn_modify_save = true;
                    self.field.fi_id = self.modify_item;
                    self.field.lc_name = $('input[name=lc_name]').val();
                    axios.post('/field-modify', this.field)
                        .then(function (response) {
                            if (response.data.result == 'ok') {
                                self.prompt('修改成功','success',true);
                            }else{
                                self.btn_modify_save = false;
                                self.prompt(response.data.result,'failure',false);
                            }
                        })
                        .catch(function (response) {
                            self.btn_modify_save = false;
                            self.prompt(response.data.result,'failure',false);
                        });
                }
            }else if(self.modify_item == 4){ // 修改子分類
                if($('input[name=lsc_name]').val() == ''){
                    var string ='<div class="tip_block">'+
                                '<p>子分類名稱不能為空值</p>'+
                            '</div>';
                    $('.isname .islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
                }else{
                    self.btn_modify_save = true;
                    self.field.fi_id = self.modify_item;
                    self.field.lsc_name = $('input[name=lsc_name]').val();
                    axios.post('/field-modify', this.field)
                        .then(function (response) {
                            if (response.data.result == 'ok') {
                                self.prompt('修改成功','success',true);
                            }else{
                                self.btn_modify_save = false;
                                self.prompt(response.data.result,'failure',false);
                            }
                        })
                        .catch(function (response) {
                            self.btn_modify_save = false;
                            self.prompt(response.data.result,'failure',false);
                        });
                }
            }
        },
        //刪除功能
        remove: function (lp_id,lpf_id,lc_id,lsc_id,boolean) {
            let self = this;
            self.field = {};
            self.btn_delete_save = true;
            if(boolean){
                if(!lpf_id){
                    self.field.fi_id = 1;
                }else if(!lc_id){
                    self.field.fi_id = 2;
                }else if(!lsc_id){
                    self.field.fi_id = 3;
                }else{
                    self.field.fi_id = 4;
                }
                self.field.lp_id = lp_id;
                self.field.lpf_id = lpf_id;
                self.field.lc_id = lc_id;
                self.field.lsc_id = lsc_id;
                axios.post('/field-delete/',self.field)
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('刪除成功','success',true);
                            self.remove_btn = false;
                            self.notification('刪除成功','success');
                        }else{
                            self.btn_delete_save = false;
                            self.prompt(response.data.result,'failure',false);
                            self.remove_btn = false;
                            self.notification(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_delete_save = false;
                        self.prompt(response.data.result,'failure',false);
                    });
            }else{
                self.remove_btn = true;
                self.remove_lp_id = lp_id;
                self.remove_lpf_id = lpf_id;
                self.remove_lc_id = lc_id;
                self.remove_lsc_id = lsc_id;
                self.prompt('確定要刪除此分類？','question',false);
                self.btn_delete_save = false;
            }
        },
        //選擇要新增的欄位項目
        clickItemRadio: function(){
        	let self = this;
        	if($('input[name=fi_id]:checked').val() == 1){ //產品
        		self.item_product = true;
        		self.item_platform = false;
        		self.item_class = false;
        		self.item_subclass = false;
        		self.product_check = false;
        		self.platform_check = false;
        		self.class_check = false;
        		self.subclass_check = false;
        	}else if($('input[name=fi_id]:checked').val() == 2){ //平台
        		self.item_product = false;
        		self.item_platform = true;
        		self.item_class = false;
        		self.item_subclass = false;
        		self.platform_check = false;
        		self.class_check = false;
        		self.subclass_check = false;
        		axios.get('/field-language-product')
	                .then(function (response) {
	                	self.product_check = true;
	                    self.field_lp  = response.data;
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result,'failure',false);
	                });
        	}else if($('input[name=fi_id]:checked').val() == 3){ //分類
        		self.item_product = false;
        		self.item_platform = false;
        		self.item_class = true;
        		self.item_subclass = false;
        		self.platform_check = false;
        		self.class_check = false;
        		self.subclass_check = false;
        		axios.get('/field-language-product')
	                .then(function (response) {
	                	self.product_check = true;
	                    self.field_lp  = response.data;
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result,'failure',false);
	                });
        	}else if($('input[name=fi_id]:checked').val() == 4){ //子分類
        		self.item_product = false;
        		self.item_platform = false;
        		self.item_class = false;
        		self.item_subclass = true;
        		self.platform_check = false;
                self.class_check = false;
        		self.subclass_check = false;
        		axios.get('/field-language-product')
	                .then(function (response) {
	                	self.product_check = true;
	                    self.field_lp  = response.data;
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result,'failure',false);
	                });
        	}
        },
        //點擊產品欄位
        clickProductRadio: function(){
            let self = this;
            // self.search_condition.lpf_id = '';
            // self.search_condition.lc_id = '';
            // self.search_condition.lsc_id = '';
            if(self.create_item == 3 || self.create_item == 4){
            	var lp_id = $('input[name=lp_id]:checked').val();
                axios.get('/field-language-platform/' + lp_id)
                    .then(function (response) {
                        self.field_lpf = response.data;
                        if(self.field_lpf.length > 0){
                            self.platform_check = true;
                            self.class_check = false;
                            self.subclass_check = false;
                        }
                    })
                    .catch(function (response) {
                        self.prompt(response.data.result,'failure',false);
                    });
            }
        },
        //點擊平台欄位
        clickPlatformRadio:function(){
            let self = this;
            // self.search_condition.lc_id = '';
            // self.search_condition.lsc_id = '';
            if(self.create_item == 4){
            	var lpf_id = $('input[name=lpf_id]:checked').val();
                axios.get('/field-language-class/' + lpf_id)
                    .then(function(response){
                        if(response.data.length > 0){
                        	self.field_lc = response.data;
                            self.class_check = true;
                            self.subclass_check = false;
                        }else{
                            self.prompt('該平台沒有分類，請先新增分類','failure',false);
                            self.create_item = 3;
                            self.class_check = false;
                            self.subclass_check = false;
                            self.item_class = true;
                            self.item_subclass = false;
                        }
                    })
                    .catch(function(response){
                        self.prompt(response.data.result,'failure',false);
                    });
            }
        },
        //彈出提示框
        prompt:function(string,type,boolean){
        //string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
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
        // 隱藏篩選條件與否
        flow_or_not: function(){
            if($('.islabel_style').height() == 0){
                $('.islabel_style').animate({'height':$('.search_item').height()},200);
            }else{
                $('.islabel_style').animate({'height':0},200);
            }
        },
        // 改變顯現筆數
        sortBy: function(){
            let self = this;
            self.all = Math.ceil(self.fields.length / self.limit);
            if(self.cur > self.all){
                self.cur = self.all;
            }
        },
        // 顯示overlay
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
        },
        //頁碼點擊事件
        pageClick: function(data){
            if(data != this.cur){
                this.cur = data;
            }

        },
        //重置資料
        cancel: function () {

        }
    },
    watch: {

	},
    mounted: function () {
        this.init();
    }
}
</script>