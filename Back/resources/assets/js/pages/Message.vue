<style scoped>

</style>

<template>
	<!-- 留言板列表 -->
	<div v-if="page === 'list'" class="page_list">
        <div class="prompt_body_admin">
            <div class="prompt_box_admin">
                <div class="prompt_content">
                    <div class="prompt_logo">
                        <i class="fa fa-question"></i>
                    </div>
                    <h2></h2>
                </div>
                <div class="prompt_btn_group" v-if="resolve_btn">
                    <button type="button" class="btn_no" @click="prompt_fade_out()">取消</button>
                    <button type="button" class="btn_yes" v-if="btn_resolve_save">確認</button>
                    <button type="button" class="btn_yes" @click="resolve(resolve_id,resolve_name,true)" v-else="btn_resolve_save">確認</button>
                </div>
                <div class="prompt_btn_group" v-else="resolve_btn">
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
         @compositionend="listen_input_end()" :value=search_condition.keyword v-bind:class="{ 'notFound': list_messages.length == 0}">
                        <select name="mb_status" v-model="status_check" v-on:change="show_status()">
                            <option value="0">全部</option>
                            <option value="1">未處理</option>
                            <option value="2">已處理</option>
                        </select>
                    </div>
                </div>
                <div class="title_style">
                    <h1>留言板列表</h1>
                </div>
                <div class="page-bar" v-if="list_messages.length != 0 && messages.length > limit && loading == false">
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
    		        <table class="m_table" v-if="list_messages.length != 0">
    					<thead>
    						<tr>
                                <th class="text_align_l">名字</th>
                                <th class="text_align_l">IP</th>
                                <th class="text_align_l">時間</th>
                                <th class="text_align_l">內容</th>
                                <th class="text_align_l">狀態</th>
    						</tr>
    					</thead>
    					<tbody>
    						<tr v-for="data in list_messages">
    							<td v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.mb_name}}</td>
    							<td>{{data.mb_ip}}</td>
                                <td>{{data.mb_time}}</td>
                                <td v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.mb_content}}</td>
    							<td>
                                    <span class="btn_status" v-if="data.mb_status == 1" @click="resolve(data.mb_id,data.mb_name,false)">未處理</span>
                                    <span v-else="data.mb_status == 2">已處理</span>
    							</td>
    						</tr>
    					</tbody>
    				</table>
                    <div class="found_nothing" v-if="list_messages.length == 0">
                        查無任何資料
                    </div>
                </div>
                <div class="page-bar" v-if="list_messages.length != 0 && messages.length > limit && loading == false">
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
</template>
<script>
export default {
	data() {
        return {
            messages: [],
            search_condition: {
            	keyword: '',
                mb_status:null,
            },
            page: 'list', //當前頁面
            page_list_class: {
                lp_id: 1
            },
            needReset: true,
            all: null, //總頁數
            number: null, //總筆數
            limit:10,
        	cur: 1, //當前頁碼
            status_check: 0, //針對所選狀態做顯示，0:全部  1:未處理  2:已處理
            resolve_btn: null, //是否在提示框顯示解決相關按鈕
            btn_resolve_save: false,
            resolve_id: null,
            resolve_name: null,
            keyword:'',
            loading:true,
            composing:true, //監聽搜尋框輸入
        }
    },
    computed: {
    	list_messages: function(){
    		var start = (this.cur - 1) * this.limit;
    		return this.messages.slice(start, start+this.limit);
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
            	self.search_condition = {keyword: '',mb_status:null};
            	self.cur = 1;
                self.limit = 10;
                self.messages = [];
                self.btn_resolve_save = false;
                self.resolve_id = null;
                self.resolve_btn = null;
                self.resolve_name = null;
            }
            if(self.needReset){
            	axios.get('/messages')
	                .then(function (response) {
	                    self.messages  = response.data;
	                    self.all = Math.ceil(self.messages.length / self.limit);
                        self.number = parseInt(self.messages.length);
                        setTimeout(function(){
                            self.loading = false;
                        },1000)
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result,'failure',false);
	                });
	        }
        },
        //針對所選狀態做顯示
        show_status: function(){
            let self = this;
            self.search_condition.mb_status = parseInt(self.status_check);
            if(self.search_condition.mb_status == 0){
                self.search_condition.mb_status = null;
            }
            axios.post('/messages', this.search_condition)
                .then(function (response) {
                    self.cur = 1;
                    self.messages = response.data;
                    self.all = Math.ceil(self.messages.length / self.limit);
                    self.needReset = false
                    self.number = parseInt(self.messages.length);
                })
                .catch(function (response) {
                    self.prompt(response.data.result,'failure',false);
                });
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
                    self.keyword = $('.search_content').find('input[name=keyword]').val();
                	self.search_condition.keyword = $('.search_content').find('input[name=keyword]').val();
                    axios.post('/messages', self.search_condition)
                        .then(function (response) {
                            self.messages = response.data;
                            self.all = Math.ceil(self.messages.length / self.limit);
                            self.needReset = false
                            self.number = parseInt(self.messages.length);
                        })
                        .catch(function (response) {
                            self.prompt(response.data.result,'failure',false);
                        });
                }
            },10)
        },
        //解決功能
        resolve: function (id,name,boolean) {
            let self = this;
            if(boolean){
                axios.get('/message-solve/'+id)
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            self.resolve_btn = false;
                            self.prompt('解決成功','success',true);
                            self.notification('解決成功','success');
                        }else{
                            self.resolve_btn = false;
                            self.prompt(response.data.result,'failure',true);
                            self.notification(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.prompt(response.data.result,'failure',false);
                    });
            }else{
                self.resolve_btn = true;
                self.resolve_id = id;
                self.prompt('確定已經解決'+name+'這個留言問題？','question',false);
                self.btn_resolve_save = false;
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
                                $('.overlay').fadeOut(400);
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
        // 隱藏篩選條件與否
        flow_or_not: function(){
            let self = this;
            if(!self.product_check){
                self.product_check = true;
            }
            if($('.flow_block').height() == 0){
                $('.flow_block').animate({'height':self.advanced_search_height},200,function(){
                    $('.flow_block').css('height','auto');
                });
            }else{
                self.advanced_search_height = $('.flow_block').height();
                $('.flow_block').animate({'height':0},200);
            }
        },
        // 隱藏欄位顯示與否
        show_or_not: function(){
            let self = this;
            if(self.open_view_field){
                self.open_view_field = false;
            }else{
                self.open_view_field = true;
            }
            if(self.start_use_view_field){
                self.start_use_view_field = false;
            }else{
                self.start_use_view_field = true;
            }
        },
        //關閉提示框
        prompt_fade_out:function(){
            $('.prompt_body_admin').fadeOut(400,function(){
                $('html').removeClass('over_hidden');
            });
            $('.overlay').fadeOut(400);
        },
        // 改變顯現筆數
        sortBy: function(){
            let self = this;
            self.all = Math.ceil(self.messages.length / self.limit);
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