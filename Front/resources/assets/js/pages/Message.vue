<style scoped>

</style>

<template>
	<!-- 留言板列表 -->
	<div v-if="page === 'list'" class="container-main">
		<div class="container-top">
		    <div class="container-title">
		        <h1>留言板</h1>
		    </div>
            <button type="button" class="btn-style btn-create" @click="page_create()">新增留言</button>
		</div>
        <div class="loading_block" v-if="loading"></div>
		<div class="container-list message-list-wrap" v-if="loading == false">
		    <div class="message-list" v-if="list_messages.length != 0">
                <div v-for="data in list_messages" class="message-block">
                    <div class="message-name">
                        <i class="new" v-if="new_or_not(data.mb_time)"></i>
                        <h4>{{data.mb_name}}</h4><span>{{data.mb_time}}</span>
                    </div>
                    <div class="message-content">
                        <div>{{data.mb_content}}</div>
                    </div>
                </div>
		    </div>
            <div class="message-list-nodata" v-if="list_messages.length == 0">
                查無任何資料
            </div>
            <button class="btn-top" v-show="messages.length > 10" @click="goTop()"></button>
		</div>
        <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div> -->
        <div class="container-bottom"></div>
        <!-- 頁碼-新的樣式 -->
        <div class="pages-wrap" v-if="messages.length > limit && loading == false">
            <a href="javascript:void(0)" class="first" v-on:click="cur=1,change_select_option(1)">FIRST</a>
            <a href="javascript:void(0)" class="prev" v-if="showFirst" v-on:click="cur--,change_select_option(cur)"></a>
            <a href="javascript:void(0)" class="prev" v-else="showFirst"></a>
            <div class="select">
                <select v-on:change="pageClick()">
                    <option v-for="index in indexs" :value=index>{{ index }}</option>
                </select>
            </div>
            <div class="at">{{cur}} / {{all}}</div>
            <a href="javascript:void(0)" class="next" v-if="showLast" v-on:click="cur++,change_select_option(cur)"></a>
            <a href="javascript:void(0)" class="next" v-else="showLast"></a>
            <a href="javascript:void(0)" class="last" v-on:click="cur=all,change_select_option(all)">LAST</a>
        </div>
	</div>
    <!-- 新增留言 -->
    <div v-else-if="page === 'create'">
        <div class="container-main">
            <div class="container-top">
                <h1>新增留言</h1>
            </div>
            <div class="message-form">
                <div class="isip form-group">
                    <label class="control-label">IP：</label>
                    <div class="">
                        <input class="form-control" type="text" name="mb_id" value="192.168.160.XXX" disabled>
                    </div>
                </div>
                <div class="isname form-group">
                    <label class="control-label">名字：</label>
                    <div class="">
                        <input class="form-control" type="text" name="mb_name" placeholder="留言者大名">
                    </div>
                </div>
                <div class="iscontent form-group">
                    <label class="control-label">內容：</label>
                    <div class="" title="請輸入內容">
                        <textarea name="mb_content" class="form-control" placeholder="輸入留言內容"></textarea>
                    </div>
                </div>
            </div>
            <div class="container-bottom"></div>
            <div class="message-btn-row">
                <button type="button" class="btn-style btn-back" @click="init(true)">回上一頁</button>
                <button type="button" class="btn-style btn-save" v-if="btn_create_save">送出留言</button>
                <button type="button" class="btn-style btn-save" @click="create()" v-else="btn_create_save">送出留言</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	data() {
        return {
            btn_create_save:false, //防呆按鈕
            // list_messages:[], //當頁要顯示的資料
            message:{}, //單一筆資料
            messages: [], //所有資料
            page: 'list', //當前頁面
            all: '', //總頁數
            limit:10, //每頁顯示筆數
        	cur: 1, //當前頁碼
            loading:true, //loading的顯示與否
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
            while (left <= right){
                ar.push(left);
                left ++;
            }
            return ar;
        },
        showLast: function(){ //顯示分頁的下一頁按鈕
            if(this.cur == this.all){
                return false;
            }else if(this.all == 0){
                return false;
            }
            return true;
        },
        showFirst: function(){ //顯示分頁的上一頁按鈕
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
            	self.cur = 1;
                self.messages = [];
            }
        	axios.get('/messages')
                .then(function (response) {
                    self.messages  = response.data;
                    self.all = Math.ceil(self.messages.length / self.limit);
                    // self.loadMore();
                    setTimeout(function(){
                        self.loading = false;
                    },1000)
                })
                .catch(function (response) {
                    self.prompt('有Bug快解決，立刻馬上！');
                });
        },
        //跳頁到新增頁
        page_create: function() {
            let self = this;
            self.page = 'create';
            self.btn_create_save = false;
        },
        //新增功能
        create: function () {
            let self = this;
                self.message.mb_name = $('input[name=mb_name]').val();
                self.message.mb_content = $('textarea[name=mb_content]').val();
            if(self.message.mb_name == ''){
                self.prompt('請填寫大名');
            }else if(self.message.mb_content == ''){
                self.prompt('請填寫內容');
            }else if(self.message.mb_name.length > 50){
                self.prompt('請填寫大名字數不可超過50字');
            }else{
                self.btn_create_save = true;
                axios.post('/message-create', self.message)
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            self.init(true);
                            self.message = {};
                            self.prompt('新增成功');
                        }else{
                            self.btn_create_save = false;
                            self.prompt(response.data.result);
                        }
                    })
                    .catch(function (response) {
                        self.btn_create_save = false;
                        self.prompt(response.data.result);
                    });
            }
        },
        //加載數據
        loadMore: function(){
            let self = this;
            self.busy = true;
            self.cur = self.cur +1;
            var start = (this.cur - 1) * this.limit;
            setTimeout(() => {
                if(self.messages.length < self.cur * this.limit){
                    self.busy = true;
                }else{
                    self.busy = false;
                }
                self.list_messages = this.messages.slice(0, start+this.limit);
            }, 500);
        },
        //檢查是否為近幾天比較新的留言
        new_or_not: function(date){
            var date1 = new Date(date);
            var dd = new Date() - date1;
            if(dd < 7*24*60*60*1000){ //要小於7天才會顯示New icon
                return true;
            }else{
                return false;
            }
        },
        //彈出提示框
        prompt:function(string){
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
        	$('.prompt_body_admin h2').text(string);
    		$('.prompt_body_admin').fadeIn(400);
    		$('html').addClass('over_hidden');
        },
        //改變select裡的option
        change_select_option:function(string){
            $('.pages-wrap select option').eq(string - 1).prop('selected',true);
        },
        //回到最上面
        goTop:function(){
            $('html,body').animate({ 'scrollTop': 0 }, 250);
        },
        //頁碼點擊事件
        pageClick: function(){
            var data;
            $('.pages-wrap select option').each(function(){
                if($(this).prop('selected')){
                    data = $(this).val();
                }
            });
            if(data != this.cur){
                this.cur = data;
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