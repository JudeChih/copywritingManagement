<style scoped>

</style>

<template>
	<!-- 語系列表 -->
	<div v-if="page === 'list'" class="container-main lang-style">
        <div class="container-filter">
            <div class="lang-filter-condition">
                <span v-if="open_advanced_search" class="arrow arrow-down" aria-hidden="true" @click="open_advanced_search=false"></span>
                <span v-else="open_advanced_search" class="arrow arrow-up" aria-hidden="true" @click="open_advanced_search=true"></span> 
            </div>
            <div class="input-group search_taiwan" v-bind:class="{ 'no-search': list_languages.length == 0}">
                <input type="text" class="form-control" placeholder="輸入關鍵字查詢" name="lt_taiwan" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=search_condition.lt_taiwan>
                <span class="input-group-btn" v-if="list_languages.length == 0">
                    <button class="btn btn-default btn_clearcontent" @click="init(true)" type="button"></button>
                </span>
            </div>
            <div class="filter-wrap lang-style search_language" v-show="product_check && !open_advanced_search">
                <h3>語系：</h3>
                <div class="filter-label">
                    <label v-for="field in field_ls">
                        <input v-model="language_system_check" type="checkbox" name="language_system" :value=field.ls_id @click="changeLanguageSystem()" >
                        <span>{{field.ls_name}}</span>
                    </label>
                </div>
            </div>
            <div class="filter-wrap lang-style" v-show="product_check && !open_advanced_search">
                <h3>產品：</h3>
                <div class="filter-label">
                    <label><input type="radio" name="lp_id" :value=-1 @click="search(),clickProductRadio()" v-model="product_check"><span>全部</span></label>
                    <label v-for="field in field_lp">
                        <input type="radio" name="lp_id" :value=field.lp_id @click="search(),clickProductRadio()" v-model="product_check">
                        <span>{{field.lp_name}}</span>
                    </label>
                </div>
            </div>
            <div class="filter-wrap lang-style" v-show="platform_check && !open_advanced_search">
                <h3>平台：</h3>
                <div class="filter-label">
                    <label v-for="field in field_lpf">
                        <input type="radio" name="lpf_id" :value=field.lpf_id @click="search(),clickPlatformRadio()" v-model="platform_check">
                        <span>{{field.lpf_name}}</span>
                    </label>
                </div>
            </div>
            <div class="filter-wrap lang-style" v-show="class_check && !open_advanced_search">
                <h3>分類：</h3>
                <div class="filter-label">
                    <label v-for="field in field_lc">
                        <input type="radio" name="lc_id" :value=field.lc_id @click="search(),clickClassRadio()" v-model="class_check">
                        <span>{{field.lc_name}}</span>
                    </label>
                </div>
            </div>
            <div class="filter-wrap lang-style" v-show="subclass_check && !open_advanced_search">
                <h3>子分類：</h3>
                <div class="filter-label">
                    <label v-for="field in field_lsc">
                        <input type="radio" name="lsc_id" :value=field.lsc_id @click="search()" v-model="subclass_check">
                        <span>{{field.lsc_name}}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="container-top">
            <h1>語系翻譯</h1>
            <span class="container-tips"></span>
        </div>
        <div class="loading_block" v-if="loading"></div>
		<div class="container-list lang-list-wrap" v-if="loading == false">
		    <div class="lang-list">
                <table class="lang-table" v-if="list_languages.length != 0">
                    <thead>
                        <div class="view_field_block" @mouseenter="show_or_not()" @mouseleave="show_or_not()">
                            <div class="view_field_title">
                                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                            </div>
                            <div class="view_field islabel_style" v-show="open_view_field">
                                <label v-for="field in field_vf">
                                    <input v-model="language_system_check" type="checkbox" name="language_system" class="input_radio" :value=field.vf_id @click="changeViewField()" ><span>{{field.vf_name}}</span>
                                </label>
                            </div>
                        </div>
                        <tr>
                            <th class="" v-if="field_display.product">產品</th>
                            <th class="t_platform_style" v-if="field_display.platform">平台</th>
                            <th class="t_class_style" v-if="field_display.class">分類</th>
                            <th class="t_subclass_style" v-if="field_display.subclass">子分類</th>
                            <th class="t_number_style" v-if="field_display.number && product_check!=6">遊戲編號</th>
                            <th class="" v-if="field_display.taiwan">繁</th>
                            <th class="" v-if="field_display.china">簡</th>
                            <th class="" v-if="field_display.english">英</th>
                            <th class="" v-if="field_display.japan">日</th>
                            <th class="" v-if="field_display.korea">韓</th>
                            <th class="" v-if="field_display.vietnam">越</th>
                            <th class="" v-if="field_display.thailand">泰</th>
                            <th class="" v-if="field_display.india">印</th>
                            <th class="" v-if="field_display.spain">西</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in list_languages">
                            <td v-if="field_display.product" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lp_name}}</td>
                            <td class="t_platform_style" v-if="field_display.platform" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lpf_name}}</td>
                            <td class="t_class_style" v-if="field_display.class" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lc_name}}</td>
                            <td class="t_subclass_style" v-if="field_display.subclass" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lsc_name}}</td>
                            <td class="t_number_style" v-if="field_display.number && product_check!=6">{{data.lt_number}}</td>
                            <td class="taiwan tip-block" v-bind:class="" v-if="field_display.taiwan" @dblclick="copyLanguage(data.lt_taiwan,data.lt_id,'taiwan')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_taiwan}}</span>
                            </td>
                            <td class="china tip-block" v-if="field_display.china" @dblclick="copyLanguage(data.lt_china,data.lt_id,'china')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_china}}</span>
                            </td>
                            <td class="english tip-block" v-if="field_display.english" @dblclick="copyLanguage(data.lt_english,data.lt_id,'english')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_english}}</span>
                            </td>
                            <td class="japan tip-block" v-if="field_display.japan" @dblclick="copyLanguage(data.lt_japan,data.lt_id,'japan')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_japan}}</span>
                            </td>
                            <td class="korea tip-block" v-if="field_display.korea" @dblclick="copyLanguage(data.lt_korea,data.lt_id,'korea')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_korea}}</span>
                            </td>
                            <td class="vietnam tip-block" v-if="field_display.vietnam" @dblclick="copyLanguage(data.lt_vietnam,data.lt_id,'vietnam')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_vietnam}}</span>
                            </td>
                            <td class="thailand tip-block" v-if="field_display.thailand" @dblclick="copyLanguage(data.lt_thailand,data.lt_id,'thailand')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_thailand}}</span>
                            </td>
                            <td class="india tip-block" v-if="field_display.india" @dblclick="copyLanguage(data.lt_india,data.lt_id,'india')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_india}}</span>
                            </td>
                            <td class="spain tip-block" v-if="field_display.spain" @dblclick="copyLanguage(data.lt_spain,data.lt_id,'spain')">
                                <span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_spain}}</span>
                            </td>
                            <input type="hidden" name="lt_id" :value=data.lt_id>
                        </tr>
                    </tbody>
                </table>
                <div class="found-nothing-wrap" v-if="list_languages.length == 0">
                    <hgroup>
                        <h2>查無資料</h2>
                        <h3>There is no matching data for your query.</h3>
                    </hgroup>
                </div>
		    </div>
            <button class="btn-top" v-show="languages.length > 10" @click="goTop()"></button>
		</div>
        <div class="container-bottom"></div>
        <!-- 頁碼-新的樣式 -->
        <div class="pages-wrap" v-if="languages.length > 10 && loading == false">
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
</template>
<script>

export default {
	data() {
        return {
            languages: [], //全部資料
            language: {}, //單一筆資料
            search_condition: {}, //查詢關鍵字
            field_lp: [], //產品欄位
            field_lpf: [], //平台欄位
            field_lc: [], //分類欄位
            field_lsc: [], //子分類欄位
            field_ls: [ //language_system
                {ls_id : 1,ls_name : '繁'},
                {ls_id : 2,ls_name : '簡'},
                {ls_id : 3,ls_name : '英'},
                {ls_id : 4,ls_name : '日'},
                {ls_id : 5,ls_name : '韓'},
                {ls_id : 6,ls_name : '越'},
                {ls_id : 7,ls_name : '泰'},
                {ls_id : 8,ls_name : '印'},
                {ls_id : 9,ls_name : '西'}
            ],
            field_vf: [ //view_field
                {vf_id : 1,vf_name : '繁'},
                {vf_id : 2,vf_name : '簡'},
                {vf_id : 3,vf_name : '英'},
                {vf_id : 4,vf_name : '日'},
                {vf_id : 5,vf_name : '韓'},
                {vf_id : 6,vf_name : '越'},
                {vf_id : 7,vf_name : '泰'},
                {vf_id : 8,vf_name : '印'},
                {vf_id : 9,vf_name : '西'},
                {vf_id : 10,vf_name : '產品'},
                {vf_id : 11,vf_name : '平台'},
                {vf_id : 12,vf_name : '分類'},
                {vf_id : 13,vf_name : '子分類'},
                {vf_id : 14,vf_name : '遊戲編號'}
            ],
            field_display: { //欄位顯示狀態
                product: true,
                platform: true,
                class: true,
                subclass: true,
                number:true,
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
            // page_list_class: {
            //     lp_id: 1
            // },
            start_use_view_field:false, // 篩選條件顯示
            open_view_field:false, //打開顯示欄位區塊
            open_advanced_search : true, //打開進階查詢(篩選條件)區塊
            language_system_check: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
            hadSlice:false,
            product_check: -1, //選擇產品
            platform_check: false, //選擇平台
            class_check: false, //選擇分類
            subclass_check: false, //選擇子分類
            needReset: true, //是否需要重新載入資料
            all: '', //總頁數
            limit:15, //每頁顯示筆數
        	cur: 1, //當前頁碼
            keyword:'', //關鍵字查詢
            loading:true, //loading的顯示與否
            composing:true, //監聽搜尋框輸入
        }
    },
    computed: {
    	list_languages: function(){
    		var start = (this.cur - 1) * this.limit;
    		return this.languages.slice(start, start+this.limit);
    	},
        indexs: function(){
          	var left = 1;
          	var right = this.all;
          	var ar = [];
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
            if(self.needReset){
            	axios.post('/languages',self.search_condition)
	                .then(function (response) {
	                    self.languages  = response.data;
	                    self.all = Math.ceil(self.languages.length / self.limit);
                        $('td').hover(function(){
                            $(this).addClass('in');
                        },function(){
                            $(this).removeClass('in');
                        })
                        setTimeout(function(){
                            self.loading = false;
                        },1000)
	                })
	                .catch(function (response) {
	                    self.prompt('有Bug快解決，立刻馬上！');
	                });
	            axios.get('/field-language-product')
	                .then(function (response) {
	                    self.field_lp  = response.data;
	                })
	                .catch(function (response) {
	                    self.prompt('有Bug快解決，立刻馬上！');
	                });
	        }
        },
        //複製語系
        copyLanguage: function(content,id,lang){
            if(content){
                this.$copyText(content).then(function (e) {
                    $('input[name=lt_id][value='+id+']').siblings('td.'+lang).find('span').removeClass('none');
                    setTimeout(function(){ $('input[name=lt_id][value='+id+']').siblings('td.'+lang).find('span').addClass('none'); }, 1000);
                }, function (e) {
                    self.prompt('複製出了問題！');
                })
            }
        },
        //切換顯示產品資料
        // change_tab: function(tab){
        //     let self = this;
        //     if(tab == 6){ // 廣告文宣不顯示遊戲編號的欄位
        //         var array = self.language_system_check;
        //         var index = array.indexOf(14);
        //         if (index > -1) {
        //             array.splice(index, 1);
        //             self.field_display.number = false;
        //             self.hadSlice = true;
        //             self.language_system_check = array;
        //         }
        //     }else{
        //         if(self.hadSlice){
        //             self.language_system_check.push('14');
        //             self.field_display.number = true;
        //             self.hadSlice = false;
        //         }
        //     }
        //     if(self.page_list_class.lp_id != tab){
        //         self.page_list_class.lp_id = tab;
        //         self.cur = 1;
        //         axios.post('/languages',self.page_list_class)
        //             .then(function (response) {
        //                 self.languages  = response.data;
        //                 self.all = Math.ceil(self.languages.length / self.limit);
        //             })
        //             .catch(function (response) {
        //                 self.prompt('有Bug快解決，立刻馬上！');
        //             });
        //     }
        // },
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
        // //清除查詢資料
        // clear: function(){
        //     let self = this;
        //     self.needReset = true;
        //     self.search_condition = {};
        //     self.cur = 1;
        //     self.open_advanced_search = true;
        //     self.product_check = -1;
        //     self.platform_check = false;
        //     self.class_check = false;
        //     self.subclass_check = false;
        //     self.languages = [];
        //     self.field_lp = [];
        //     self.field_lpf = [];
        //     self.field_lc = [];
        //     self.field_lsc = [];
        //     self.language = {};
        //     this.init(true);
        // },
        //查詢功能
        search: function () {
        	let self = this;
            setTimeout(function(){
                if(self.composing){
                    self.keyword = $('.search_taiwan').find('input[name=lt_taiwan]').val();
                	self.cur = 1;
                	self.search_condition.lt_taiwan = $('.search_taiwan').find('input[name=lt_taiwan]').val();
                    if($('input[name=lp_id]:checked').val()){
                        self.search_condition.lp_id = $('input[name=lp_id]:checked').val();
                    }
                    if($('input[name=lpf_id]:checked').val()){
                        self.search_condition.lpf_id = $('input[name=lpf_id]:checked').val();
                    }
                    if($('input[name=lc_id]:checked').val()){
                        self.search_condition.lc_id = $('input[name=lc_id]:checked').val();
                    }
                    if($('input[name=lsc_id]:checked').val()){
                        self.search_condition.lsc_id = $('input[name=lsc_id]:checked').val();
                    }

                    if(self.search_condition.lt_taiwan.replace(/\s+/g,"") != '' || self.search_condition.lp_id !=''){
                        axios.post('/languages', self.search_condition)
                            .then(function (response) {
                                self.languages = response.data;
                                self.all = Math.ceil(self.languages.length / self.limit);
                                self.needReset = false
                            })
                            .catch(function (response) {
                                self.prompt('有Bug快解決，立刻馬上！');
                            });
                    }else{
                        self.init(true);
                    }
                }
            },10)
        },
        //點擊產品欄位
        clickProductRadio: function(){
            let self = this;
            self.search_condition.lpf_id = '';
            self.search_condition.lc_id = '';
            self.search_condition.lsc_id = '';
            if($('input[name=lp_id]:checked').val() == -1){
                self.platform_check = false;
                self.class_check = false;
                self.subclass_check = false;
            }else if(!$('input[name=lp_id]:checked').val()){
                // console.log('product_if');
                axios.get('/field-language-platform/1')
                    .then(function (response) {
                        self.field_lpf = response.data;
                        if(self.field_lpf.length > 0){
                            self.platform_check = true;
                            self.class_check = false;
                            self.subclass_check = false;
                        }else{
                            self.platform_check = false;
                            axios.post('/field-language-class', self.search_condition)
                            .then(function (response) {
                                self.field_lc = response.data;
                                if(self.field_lc.length > 0){
                                    self.class_check = true;
                                }else{
                                    self.class_check = false;
                                }
                            })
                            .catch(function (response) {
                                self.prompt('有Bug快解決，立刻馬上！');
                            });
                        }
                    })
                    .catch(function (response) {
                        self.prompt('有Bug快解決，立刻馬上！');
                    });
            }else{
                // console.log('product_else_if');
                self.search_condition.lpf_id = '';
                self.search_condition.lc_id = '';
                self.search_condition.lsc_id = '';
                var lp_id = $('input[name=lp_id]:checked').val();
                axios.get('/field-language-platform/' + lp_id)
                    .then(function (response) {
                        self.field_lpf = response.data;
                        if(self.field_lpf.length > 0){
                            self.platform_check = true;
                            self.class_check = false;
                            self.subclass_check = false;
                        }else if(self.page == 'list'){
                            self.platform_check = false;
                            axios.post('/field-language-class', self.search_condition)
                            .then(function (response) {
                                self.field_lc = response.data;
                                if(self.field_lc.length > 0){
                                    self.class_check = true;
                                }else{
                                    self.class_check = false;
                                }
                            })
                            .catch(function (response) {
                                self.prompt('有Bug快解決，立刻馬上！');
                            });
                        }else if(self.page == 'modify' || self.page == 'create'){
                            self.platform_check = false;
                            var data = {};
                            data.lp_id = $('input[name=lp_id]:checked').val();
                            axios.post('/field-language-class', data)
                            .then(function (response) {
                                self.field_lc = response.data;
                                if(self.field_lc.length > 0){
                                    self.class_check = true;
                                }else{
                                    self.class_check = false;
                                }
                            })
                            .catch(function (response) {
                                self.prompt('有Bug快解決，立刻馬上！');
                            });
                        }
                    })
                    .catch(function (response) {
                        self.prompt('有Bug快解決，立刻馬上！');
                    });
            }
        },
        //點擊平台欄位
        clickPlatformRadio:function(){
            let self = this;
            self.search_condition.lc_id = '';
            self.search_condition.lsc_id = '';
            if($('input[name=lpf_id]:checked').val()){
                // console.log('platform_if');
                var lpf_id = $('input[name=lpf_id]:checked').val();
                axios.get('/field-language-class/' + lpf_id)
                    .then(function(response){
                        self.field_lc = response.data;
                        if(self.field_lc.length > 0){
                            self.class_check = true;
                            self.subclass_check = false;
                        }else{
                            self.class_check = false;
                            self.subclass_check = false;
                        }
                    })
                    .catch(function(response){
                        self.prompt('有Bug快解決，立刻馬上！');
                    });
            }
        },
        //點擊分類欄位
        clickClassRadio:function(){
            let self = this;
            self.search_condition.lsc_id = '';
            if($('input[name=lc_id]:checked').val()){
                // console.log('class_if');
                var lc_id = $('input[name=lc_id]:checked').val();
                axios.get('/field-language-subclass/' + lc_id)
                    .then(function(response){
                        self.field_lsc = response.data;
                        if(self.field_lsc.length > 0){
                            self.subclass_check = true;
                        }else{
                            self.subclass_check = false;
                        }
                    })
                    .catch(function(response){
                        self.prompt('有Bug快解決，立刻馬上！');
                    });
            }

        },
        //顯示所有欄位
        changeViewField: function(){
            let self = this;
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
            self.field_display.number =false;

            $('.view_field').find('input:checked').each(function(){
                if($(this).prop('value') == 1){
                    self.field_display.taiwan = true;
                    boolean = false;
                }else if($(this).prop('value') == 2){
                    self.field_display.china = true;
                    boolean = false;
                }else if($(this).prop('value') == 3){
                    self.field_display.english = true;
                    boolean = false;
                }else if($(this).prop('value') == 4){
                    self.field_display.japan = true;
                    boolean = false;
                }else if($(this).prop('value') == 5){
                    self.field_display.korea = true;
                    boolean = false;
                }else if($(this).prop('value') == 6){
                    self.field_display.vietnam = true;
                    boolean = false;
                }else if($(this).prop('value') == 7){
                    self.field_display.thailand = true;
                    boolean = false;
                }else if($(this).prop('value') == 8){
                    self.field_display.india = true;
                    boolean = false;
                }else if($(this).prop('value') == 9){
                    self.field_display.spain = true;
                    boolean = false;
                }else if($(this).prop('value') == 10){
                    self.field_display.product = true;
                    boolean = false;
                }else if($(this).prop('value') == 11){
                    self.field_display.platform = true;
                    boolean = false;
                }else if($(this).prop('value') == 12){
                    self.field_display.class = true;
                    boolean = false;
                }else if($(this).prop('value') == 13){
                    self.field_display.subclass = true;
                    boolean = false;
                }else if($(this).prop('value') == 14){
                    self.field_display.number = true;
                    boolean = false;
                }
            })
            if(boolean){
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
                self.field_display.number =true;
            }
        },
        //顯示語系欄位
        changeLanguageSystem: function(){
            let self = this;
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

            $('.search_language').find('input:checked').each(function(){
                if($(this).prop('value') == 1){
                    self.field_display.taiwan = true;
                    boolean = false;
                }else if($(this).prop('value') == 2){
                    self.field_display.china = true;
                    boolean = false;
                }else if($(this).prop('value') == 3){
                    self.field_display.english = true;
                    boolean = false;
                }else if($(this).prop('value') == 4){
                    self.field_display.japan = true;
                    boolean = false;
                }else if($(this).prop('value') == 5){
                    self.field_display.korea = true;
                    boolean = false;
                }else if($(this).prop('value') == 6){
                    self.field_display.vietnam = true;
                    boolean = false;
                }else if($(this).prop('value') == 7){
                    self.field_display.thailand = true;
                    boolean = false;
                }else if($(this).prop('value') == 8){
                    self.field_display.india = true;
                    boolean = false;
                }else if($(this).prop('value') == 9){
                    self.field_display.spain = true;
                    boolean = false;
                }
            })
            if(boolean){
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