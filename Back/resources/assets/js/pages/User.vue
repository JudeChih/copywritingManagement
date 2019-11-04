<style scoped>

</style>

<template>
	<!-- 使用者列表 -->
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
                <div class="title_style">
                    <h1>使用者列表</h1>
                    <button type="button" title="新增" class="btn_create" @click="page_create()"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="page-bar" v-if="list_users.length != 0 && users.length > limit && loading == false">
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
    		        <table class="u_table">
    					<thead>
    						<tr>
    							<th class="text_align_l">名稱</th>
    							<th class="text_align_l">帳號</th>
    							<th class="text_align_l">密碼</th>
    							<th class="text_align_l">權限</th>
    							<th class="text_align_l">狀態</th>
    							<th class="text_align_l">最後一次登入</th>
    							<th class="text_align_l">功能</th>
    						</tr>
    					</thead>
    					<tbody>
    						<tr v-for="data in list_users">
    							<td>{{data.ud_name}}</td>
    							<td>{{data.ud_account}}</td>
    							<td>{{data.ud_password}}</td>
    							<td>{{data.ud_admin}}</td>
    							<td class="status_on" v-if="data.ud_status == 1">使用中</td>
                                <td class="status_off" v-else="data.ud_status">停用中</td>
    							<td>{{data.ud_last_login}}</td>
    							<td>
                                    <i class="fa fa-edit" @click="page_modify(data.ud_id)"></i>
                                    <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                    <i class="fa fa-trash" @click="remove(data.ud_id,false)" v-else="btn_delete_save"></i>
    							</td>
    						</tr>
    					</tbody>
    				</table>
                    <div class="found_nothing" v-if="list_users.length == 0">
                        查無任何資料
                    </div>
                </div>
				<div class="page-bar" v-if="list_users.length != 0 && users.length > limit && loading == false">
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
	<!-- 修改使用者 -->
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
        <div class="page_title">
             <h1>修改使用者</h1>
        </div>
		<div class="content_block">
            <div class="isname">
                <label class="isname_title">名稱</label>
                <div class="islabel_style">
                    <input class="input_radio" type="text" name="ud_name" :value=user.ud_name placeholder="請輸入使用者名稱">
                </div>
            </div>
	        <div class="isaccount">
                <label class="isaccount_title">帳號</label>
                <div class="islabel_style">
                    <!-- <input class="input_radio" type="text" name="ud_account" :value=user.ud_account readonly> -->
                    <p>{{user.ud_account}}</p>
                </div>
            </div>
            <div class="ispassword">
                <label class="ispassword_title">密碼</label>
                <div class="islabel_style">
                    <input class="input_radio" type="text" name="ud_password" placeholder="填入視為要變更密碼">
                </div>
            </div>
            <div class="isstatus">
                <label class="isstatus_title">狀態</label>
                <div class="ischeckbox_style">
                    <label class="app_checkbox">
                        <input type="checkbox" name="ud_status">
                            <span class="app_checkbox_qy">启用</span>
                            <span class="app_checkbox_ty">停用</span>
                            <em><i></i></em>
                    </label>
                </div>
            </div>
            <div class="isadmin">
                <label class="isadmin_title">權限</label>
                <div class="islabel_style">
                    <label>
                        <input class="input_radio" type="radio" name="ud_admin" value='0' v-model="admin_check"><span>一般使用者</span>
                    </label>
                    <label>
                        <input class="input_radio" type="radio" name="ud_admin" value='1' v-model="admin_check"><span>管理者</span>
                    </label>
                </div>
            </div>
	    </div>
		<div class="modify_button">
            <button type="button" class="btn_back" @click="init()">返回</button>
            <button type="button" class="btn_save" v-if="btn_modify_save">存檔</button>
            <button type="button" class="btn_save" @click="modify(user.ud_id)" v-else="btn_modify_save">存檔</button>
		</div>
	</div>
	<!-- 新增使用者 -->
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
        <div class="page_title">
             <h1>新增使用者</h1>
        </div>
		<div class="content_block">
            <div class="isname">
                <label class="isname_title">名稱</label>
                <div class="islabel_style">
                    <input class="input_radio" type="text" name="ud_name" placeholder="請輸入使用者名稱">
                </div>
            </div>
	        <div class="isaccount">
                <label class="isaccount_title">帳號</label>
                <div class="islabel_style">
                    <input class="input_radio" type="text" name="ud_account" placeholder="請輸入使用者帳號">
                </div>
            </div>
            <div class="ispassword">
                <label class="ispassword_title">密碼</label>
                <div class="islabel_style">
                    <input class="input_radio" type="text" name="ud_password" placeholder="請輸入使用者密碼">
                </div>
            </div>
            <div class="isstatus">
                <label class="isstatus_title">狀態</label>
                <div class="ischeckbox_style">
                    <label class="app_checkbox">
                        <input type="checkbox" name="ud_status">
                            <span class="app_checkbox_qy">启用</span>
                            <span class="app_checkbox_ty">停用</span>
                            <em><i></i></em>
                    </label>
                </div>
            </div>
            <div class="isadmin">
                <label class="isadmin_title">權限</label>
                <div class="islabel_style">
                    <label>
                        <input class="input_radio" type="radio" name="ud_admin" value='0' v-model="admin_check"><span>一般使用者</span>
                    </label>
                    <label>
                        <input class="input_radio" type="radio" name="ud_admin" value='1' v-model="admin_check"><span>管理者</span>
                    </label>
                </div>
            </div>
	    </div>
		<div class="create_button">
            <button type="button" class="btn_back" @click="init()">返回</button>
            <button type="button" class="btn_save" v-if="btn_create_save">存檔</button>
            <button type="button" class="btn_save" @click="create()" v-else="btn_create_save">存檔</button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
        return {
            btn_create_save: false,
            btn_modify_save: false,
            btn_delete_save: false,
            users: [],
            user: {},
            page: 'list', //當前頁面
            needReset: true,
            all: '', //總頁數
            number: '', //總筆數
            limit:10, //每頁顯示筆數
        	cur: 1, //當前頁碼
        	admin_check: 0,
            remove_btn:false,
            remove_id:null,
            loading:true,
        }
    },
    computed: {
    	list_users: function(){
    		var start = (this.cur - 1) * this.limit;
    		return this.users.slice(start, start+this.limit);
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
            	self.needReset = true;
            	self.cur = 1;
            	self.admin_check = 0;
                self.user = {};
                self.limit = 10;
                self.remove_id = null;
            }
            if(self.needReset){
            	axios.get('/users')
	                .then(function (response) {
	                    self.users  = response.data;
	                    self.all = Math.ceil(self.users.length / self.limit);
                        self.number = parseInt(self.users.length);
                        setTimeout(function(){
                            self.loading = false;
                        },1000)
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
        	self.status_check = 1;
            self.admin_check = 0;
            self.btn_create_save = false;
        },
        //跳頁到修改頁
        page_modify: function(id) {
        	let self = this;
        	self.page = 'modify';
            self.btn_modify_save = false;
        	axios.get('/users/'+id)
                .then(function (response) {
                    self.user = response.data;
                    if(self.user.ud_status == 1){
                        $('input[name=ud_status]').prop('checked',true);
                    }
                    self.admin_check = self.user.ud_admin;
                })
                .catch(function (response) {
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //新增功能
        create: function (user) {
        	let self = this;
            var boolean = true;
            $('.tip_block').fadeOut(300,function(){
                $(this).remove();
            })
        	if($('input[name=ud_account]').val() == ''){
                var string ='<div class="tip_block">'+
                                '<p>請填入使用者帳號</p>'+
                            '</div>';
                $('.isaccount .islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
                boolean = false;
        	}
            if($('input[name=ud_password]').val() == ''){
                var string ='<div class="tip_block">'+
                                '<p>請填入使用者密碼</p>'+
                            '</div>';
                $('.ispassword .islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
                boolean = false;
        	}
            if($('input[name=ud_name]').val() == ''){
                var string ='<div class="tip_block">'+
                                '<p>請填入使用者名稱</p>'+
                            '</div>';
                $('.isname .islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
                boolean = false;
        	}
            if(boolean){
                self.btn_create_save = true;
        		self.user.ud_account = $('input[name=ud_account]').val();
        		self.user.ud_password = $('input[name=ud_password]').val();
        		self.user.ud_name = $('input[name=ud_name]').val();
                if($('input[name=ud_status]').prop('checked')){
                    self.user.ud_status = 1;
                }else{
                    self.user.ud_status = 0;
                }
	        	self.user.ud_admin = $('input[name=ud_admin]:checked').val();
	        	axios.post('/user-create', self.user)
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
        },
        //修改功能
        modify: function (id) {
            let self = this;
        	if($('input[name=ud_name]').val() == ''){
                var string ='<div class="tip_block">'+
                                '<p>請填入使用者名稱</p>'+
                            '</div>';
                $('.isname .islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
        	}else{
                self.btn_modify_save = true;
        		self.user.ud_id = id;
        		if($('input[name=ud_password]').val() != ''){
	        		self.user.ud_password = $('input[name=ud_password]').val();
	        	}
	        	self.user.ud_name = $('input[name=ud_name]').val();
                if($('input[name=ud_status]').prop('checked')){
                    self.user.ud_status = 1;
                }else{
                    self.user.ud_status = 0;
                }
	        	self.user.ud_admin = $('input[name=ud_admin]:checked').val();
	        	axios.post('/user-modify', this.user)
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
        },
        //刪除功能
        remove: function (id,boolean) {
            let self = this;
            self.btn_delete_save = true;
            if(boolean){
                axios.get('/user-delete/' + id)
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            self.remove_btn = false;
                            self.prompt('刪除成功','success',true);
                            self.notification('刪除成功','success');
                        }else{
                            self.remove_btn = false;
                            self.btn_delete_save = false;
                            self.prompt(response.data.result,'failure',false);
                            self.notification(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_delete_save = false;
                        self.prompt(response.data.result,'failure',false);
                    });
            }else{
                self.remove_btn = true;
                self.remove_id = id;
                self.prompt('確定要刪除這使用者？','question',false);
                self.btn_delete_save = false;
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
        // 改變顯現筆數
        sortBy: function(){
            let self = this;
            self.all = Math.ceil(self.users.length / self.limit);
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
	},
    mounted: function () {
        this.init();
    }
}
</script>