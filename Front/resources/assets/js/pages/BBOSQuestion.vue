<style scoped>

</style>

<template>
	<!-- 問題列表 -->
	<div v-if="page === 'list'" class="container-main">
        <div class="container-filter">
            <!-- <h2>篩選條件</h2> -->
            <!-- 多增加了一個 v-if="list_questions.length != 0 ↓ -->
            <div class="input-group search_content" v-bind:class="{ 'no-search': list_questions.length == 0 && check != -1}">
                <input type="text" class="form-control" placeholder="輸入關鍵字查詢" name="qa_content" @input="search(-2)" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=search_condition.qa_content>
                <span class="input-group-btn" v-if="list_questions.length == 0 && check != -1">
                    <button class="btn btn-default btn_clearcontent" @click="search('clear')" type="button"></button>
                </span>
            </div>
            <div class="filter-wrap search_class">
                <h3>分類：</h3>
                <label>
                    <input type="radio" name="qc_id" :value=0 @click="search(0)" v-model="check"><span>全部</span>
                </label>
                <label v-for="field in question_field">
                    <input type="radio" name="qc_id" :value=field.qc_id @click="search(field.qc_id)" v-model="check"><span class="class_name">{{field.qc_name}}</span>
                </label>
                <label>
                    <input type="radio" name="qc_id" :value=-1 @click="search(-1)" v-model="check"><span>已選問題</span>
                </label>
            </div>
            <form class="none download_questions" action="/questions-download" method="post">
                <input type="hidden" name="_token">
                <input type="hidden" name="dq_data">
                <button type="button" title="下載所選的NBB提問" class="btn_download" v-if="downloadQuestions.length > 0" @click="download()"></button>
            </form>
        </div>
		<div class="container-top">
            <h1>NBB提問</h1>
            <span class="container-tips"></span>
		</div>
        <div class="loading_block" v-if="loading"></div>
		<div class="container-list question-list-wrap" v-if="loading == false">
		    <div class="question-list">
                <table class="question-table">
                    <thead>
                        <tr>
                            <th class="qa_checkbox"><button type="button" class="btn-style btn_clean" @click="clearQuestions()" title="清除所選NBB提問">清除</button></th>
                            <th class="qc_name">分類</th>
                            <th class="">問題</th>
                        </tr>
                    </thead>
                    <tbody v-if="check == -1">
                        <tr v-for="data in checked_question">
                            <td class="qa_checkbox"><input type="checkbox" name="qa_id" :value=data.qa_id @click="selectQuestion(data.qa_id)" v-model="downloadQuestions"><span></span></td>
                            <td class="qc_name">{{data.qc_name}}<input type="hidden" name="qc_name" :value=data.qc_name></td>
                            <!-- <td class="qa_content tip-block none" @dblclick="copyQuestion(data.qa_content,data.qa_id)">{{data.qa_content}}</td> -->
                            <td class="qa_input"><input @input="changeSelectQuestion(data.qa_id,true)" class="form-control" type="text" :value=data.qa_content></td>
                        </tr>
                    </tbody>
                    <tbody v-else="check">
                        <tr v-for="data in list_questions">
                            <td class="qa_checkbox">
                                <input type="checkbox" name="qa_id" :value=data.qa_id @click="selectQuestion(data.qa_id)" v-model="downloadQuestions">
                                <span></span>
                            </td>
                            <td class="qc_name">{{data.qc_name}}<input type="hidden" name="qc_name" :value=data.qc_name></td>
                            <td class="qa_content tip-block" @dblclick="copyQuestion(data.qa_content,data.qa_id)"><span class="none tip-block-show" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.qa_content}}</span></td>
                            <td class="qa_input dom_none"><input @input="changeSelectQuestion(data.qa_id,true)" class="form-control" type="text"></td>
                        </tr>
                    </tbody>
                </table>
                <div class="found-nothing-wrap" v-if="list_questions.length == 0 && check != -1">
                    <hgroup>
                        <h2>查無資料</h2>
                        <h3>There is no matching data for your query.</h3>
                    </hgroup>
                </div>
                <div class="found-nothing-wrap" v-else-if="checked_question.length == 0 && check == -1">
                    <hgroup>
                        <h2>暫無勾選任一NBB提問</h2>
                        <h3></h3>
                    </hgroup>
                </div>
		    </div>
            <button class="btn-top" v-show="questions.length > 10" @click="goTop()"></button>
		</div>
        <!-- 無限加載的感應區塊 -->
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
        <div class="container-bottom"></div>
	</div>
</template>
<script>
export default {
	data() {
        return {
            questions: [], //全部NBB提問資料
            question_field: [], //問題分類欄位
            question: {}, //單一筆NBB提問資料
            search_condition: {}, //搜尋關鍵字
            page: 'list', //當前頁面
            check: 0, //所選qc_id
            needReset: true, //是否需要重新載入資料
            all: '', //總頁數
            limit:10, //每頁顯示筆數
        	cur: 1, //當前頁碼
            busy: false, //無限加載的開關
            list_questions: [], //當頁要顯示的資料
            downloadQuestions: [], //所選的NBB提問id陣列
            checked_question: [],
            down_ques: [],
            show_clear_btn: false, //顯示清除搜尋關鍵字按鈕
            keyword:'', //關鍵字查詢
            loading:true, //loading的顯示與否
            composing:true, //監聽搜尋框輸入
            loading_finish:false,
        }
    },
    computed: {
   	},
    methods: {
    	//跳頁到列表頁
        init: function (boolean) {
            let self = this;
            self.loading = true;
            self.loading_finish = false;
            self.page = 'list';
            if(boolean){
            	self.needReset = true;
            	self.search_condition = {};
            	self.check = '';
            	self.cur = 1;
                // 取消選擇問題
                $('.qa_content').removeClass('dom_none');
                $('.qa_input').addClass('dom_none');
                self.downloadQuestions = [];
            }
            if(self.needReset){
                // 取NBB提問資料
            	axios.get('/questions/BBOS')
	                .then(function (response) {
	                    self.questions  = response.data;
	                    self.all = Math.ceil(self.questions.length / self.limit);
                        self.loadMore();
                        setTimeout(function(){
                            self.loading = false;
                            self.loading_finish = true;
                        },1000)
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result);
	                });
                // 取NBB提問的分類欄位資料
	            axios.get('/field-question/BBOS')
	                .then(function (response) {
	                    self.question_field  = response.data;
	                })
	                .catch(function (response) {
	                    self.prompt(response.data.result);
	                });
	        }
        },
        //加載數據
        loadMore: function(){
            let self = this;
            if(self.questions.length > 0){
                self.busy = false;
                self.cur = self.cur +1;
                var start = (this.cur - 1) * self.limit;
                setTimeout(() => {
                    $('.qa_content').removeClass('dom_none');
                    $('.qa_input').addClass('dom_none');
                    setTimeout(() => {
                        if(self.questions.length > self.cur * self.limit){
                            self.busy = false;
                        }else{
                            self.busy = true;
                        }
                        self.list_questions = self.questions.slice(0, start+self.limit);
                        setTimeout(() => {
                            for(var i = 0 ; i < self.checked_question.length ; i++){
                                var qa_id = self.checked_question[i].qa_id;
                                var qa_content = self.checked_question[i].qa_content;
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').find('input').val(qa_content);
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_content').addClass('dom_none');
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').removeClass('dom_none');
                            }
                        }, 200);
                    }, 100);
                }, 50);
            }else{
                self.list_questions = [];
            }
        },
        //複製語系
        copyQuestion: function(content,id){
            let self = this;
            if(content){
                this.$copyText(content).then(function (e) {
                    $('input[name=qa_id][value='+id+']').parent('.qa_checkbox').siblings('td.qa_content').find('span').removeClass('none');
                    setTimeout(function(){ $('input[name=qa_id][value='+id+']').parent('.qa_checkbox').siblings('td.qa_content').find('span').addClass('none'); }, 1000);
                }, function (e) {
                    self.prompt('複製出了問題！');
                })
            }
        },
        //選擇問題
        selectQuestion: function (qa_id) {
            let self = this;
            if($('.qa_checkbox input[value='+qa_id+']').prop('checked')){
                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_content').addClass('dom_none');
                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').removeClass('dom_none');
                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').find('input').val($('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_content').find('p').text());
                self.changeSelectQuestion(qa_id,true);
            }else{
                if(self.check != -1){
                    $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_content').removeClass('dom_none');
                    $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').addClass('dom_none');
                }
                self.changeSelectQuestion(qa_id,false);
            }

        },
        //下載問題
        download: function (){
            let self = this;
            var data = [];
            var boolean = true;
            var class_leng = $('.class_name').length;
            data = self.checked_question;
            var class_json = [];
            for(var i = 0 ; i < class_leng ; i++){
                var aaa = {};
                aaa.name = $('.class_name').eq(i).text();
                aaa.data = [];
                class_json.push(aaa);
            }
            for(var j = 0 ; j < data.length ; j++){
                for(var k = 0 ; k < class_json.length ; k++){
                    if(data[j].qa_content == ''){
                        boolean = false;
                    }
                    if(data[j].qc_name == class_json[k].name){
                        class_json[k].data.push(data[j]);
                    }
                }
            }
            var resultdata = [];
            for(var l = 0 ; l < class_json.length ; l++){
                for(var m = 0 ; m < class_json[l].data.length ; m++){
                    resultdata.push(class_json[l].data[m]);
                }
            }
            if(self.checked_question.length > 0){
                if(boolean){
                    $('.download_questions').find('input[name=dq_data]').val(JSON.stringify(resultdata));
                    $('.download_questions').find('input[name=_token]').val($('head').find('meta[name=csrf-token]').prop('content'));
                    $('.download_questions').submit();
                }else{
                    self.prompt('問題不能為空');
                }
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
        search: function (id = null) {
        	let self = this;
            setTimeout(function(){
                if(self.composing){
                    self.keyword = $('.search_content').find('input[name=qa_content]').val();
                    self.cur = 1;
                    // 按下清除關鍵字按鈕
                    if(id == 'clear'){
                        $('.search_content').find('input[name=qa_content]').val('');
                    }

                    if($('.search_class').find('input[name=qc_id]:checked').val() == 0){
                        self.search_condition.qc_id = '';
                        self.search_condition.qa_content = $('.search_content').find('input[name=qa_content]').val();
                        if(self.search_condition.qa_content != ''){
                            self.show_clear_btn = true;
                        }else{
                            self.show_clear_btn = false;
                        }
                        axios.post('/questions/BBOS', self.search_condition)
                            .then(function (response) {
                                self.questions = response.data;
                                self.all = Math.ceil(self.questions.length / self.limit);
                                self.needReset = false
                                self.loadMore();
                            })
                            .catch(function (response) {
                                self.prompt(response.data.result);
                            });
                    }else if($('.search_class').find('input[name=qc_id]:checked').val() == -1){

                    }else{
                        $('.search_class').find('input[name=qc_id]').each(function(){
                            if($(this).prop('checked')){
                                self.search_condition.qc_id = $(this).prop('value');
                            }
                        })
                        self.search_condition.qa_content = $('.search_content').find('input[name=qa_content]').val();
                        if(self.search_condition.qa_content != ''){
                            self.show_clear_btn = true;
                        }else{
                            self.show_clear_btn = false;
                        }
                        axios.post('/questions/BBOS', self.search_condition)
                            .then(function (response) {
                                self.questions = response.data;
                                self.all = Math.ceil(self.questions.length / self.limit);
                                self.needReset = false
                                self.loadMore();
                            })
                            .catch(function (response) {
                                self.prompt(response.data.result);
                            });
                    }
                }
            },10)
        },
        //修改所選的問題資料的json
        changeSelectQuestion: function (qa_id,boolean){
            let self = this;
            var data = {};
            var ques = [];
            var new_q = true;

            if(boolean){
                data.qa_id = qa_id;
                data.qa_content = $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').find('input').val();
                data.qc_name = $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qc_name').find('input').val();
                ques = self.checked_question;
                for(var i = 0 ; i < ques.length ; i++){
                    if(ques[i].qa_id == qa_id){
                        ques[i].qa_content = data.qa_content;
                        new_q = false;
                    }
                }
                if(new_q){
                    ques.push(data);
                }
                self.checked_question = ques;
            }else{
                ques = self.checked_question;
                for(var i = 0 ; i < ques.length ; i++){
                    if(ques[i].qa_id == qa_id){
                        ques.splice(i,1);
                    }
                }
                self.checked_question = ques;
            }
        },
         //清除所選NBB提問
        clearQuestions:function(){
            let self = this;
            self.downloadQuestions = [];
            self.checked_question = [];
            $('.qa_content').removeClass('dom_none');
            $('.qa_input').addClass('dom_none');
        },
        //彈出提示框
        prompt:function(string){
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_body_admin h2').text(string);
            $('.prompt_body_admin').fadeIn(400);
            $('html').addClass('over_hidden');
        },
        //回到最上面
        goTop:function(){
            $('html,body').animate({ 'scrollTop': 0 }, 250);
        }
    },
    watch: {
    },
    mounted: function () {
        this.init();
    }
}
</script>