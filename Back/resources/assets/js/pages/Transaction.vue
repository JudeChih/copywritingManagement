<style scoped>

</style>

<template>
	<!-- 異動紀錄列表 -->
	<div v-if="page === 'list'" class="page_list">
		<div class="content_block">
		    <div class="content list">
                <div class="title_style">
                    <h1>異動紀錄列表</h1>
                </div>
                <div class="page-bar" v-if="list_transactions.length != 0 && loading == false">
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
    		        <table class="t_table">
    					<thead>
    						<tr>
    							<th class="text_align_l">編號</th>
    							<th class="text_align_l">動作</th>
    							<th class="text_align_l">內容</th>
    							<th class="text_align_l">操作者</th>
    							<th class="text_align_l">時間</th>
    						</tr>
    					</thead>
    					<tbody>
    						<tr v-for="data in list_transactions">
    							<td>{{data.tr_id}}</td>
    							<td>{{data.tr_action_name}}</td>
    							<td>
    								{{data.tr_action_name}}{{data.tr_goal_name}}，{{data.tr_goal_id_name}}為{{data.goal_id}}
    							</td>
    							<td>{{data.tr_user}}</td>
    							<td>{{data.create_date}}</td>
    						</tr>
    					</tbody>
    				</table>
                    <div class="found_nothing" v-if="list_transactions.length == 0">
                        查無任何資料
                    </div>
                </div>
				<div class="page-bar" v-if="list_transactions.length != 0 && loading == false">
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
            transactions: [],
            transaction: {},
            page: 'list', //當前頁面
            needReset: true,
            all: '', //總頁數
            limit:10,
            number: '', //總筆數
        	cur: 1, //當前頁碼
        	tr_goal_name:['問題提問','翻譯語系','問題分類欄位','語系產品欄位','語系平台欄位','語系分類欄位','語系子分類欄位','使用者','留言板'],
        	tr_goal_id_name:['問題編號','語系編號','問題分類編號','語系產品編號','語系平台編號','語系分類編號','語系子分類編號','使用者編號','留言板編號'],
        	tr_action_name:['新增','修改','刪除','解決'],
            loading:true,
        }
    },
    computed: {
    	list_transactions: function(){
    		var start = (this.cur - 1) * this.limit;
    		return this.transactions.slice(start, start+this.limit);
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
            	self.cur = 1;
            }
            if(self.needReset){
            	axios.get('/transactions')
	                .then(function (response) {
	                    self.transactions  = response.data;
	                    if(self.transactions.length > 0){
	                    	for(var i=0 ; i<self.transactions.length;i++){
	                    		var goal = self.transactions[i].tr_goal;
	                    		var action = self.transactions[i].tr_action;
	                    		self.transactions[i].tr_goal_name = self.tr_goal_name[goal-1];
	                    		self.transactions[i].tr_goal_id_name = self.tr_goal_id_name[goal-1];
	                    		self.transactions[i].tr_action_name = self.tr_action_name[action-1];
	                    	}
	                    }
	                    self.all = Math.ceil(self.transactions.length / self.limit);
                        self.number = parseInt(self.transactions.length);
                        setTimeout(function(){
                            self.loading = false;
                        },1000)
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result);
	                });
	        }
        },
        //彈出提示框
        prompt:function(string){
        	$('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_body_admin h2').text(string);
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
                            $('.prompt_body_admin').fadeOut(400,function(){
                                $('html').removeClass('over_hidden');
                            });
                            $('.overlay').fadeOut(400);
                            self.init(true);
                        }else{
                            $('.prompt_body_admin').fadeOut(400);
                            $('.overlay').fadeOut(400);
                        }
                    }, 1000);
                }, 1000);
            }, 1000);
            $('.prompt_body_admin').fadeIn(400);
            $('html').addClass('over_hidden');
        },
        // 改變顯現筆數
        sortBy: function(){
            let self = this;
            self.all = Math.ceil(self.transactions.length / self.limit);
            if(self.cur > self.all){
                self.cur = self.all;
            }
        },
        //頁碼點擊事件
        pageClick: function(data){
            if(data != this.cur){
                this.cur = data;
            }

        }
    },
    watch: {
	    cur: function(oldValue , newValue){
                console.log(arguments)
        }
	},
    mounted: function () {
        this.init();
    }
}
</script>