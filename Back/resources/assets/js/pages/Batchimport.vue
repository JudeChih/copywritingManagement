<style scoped>

</style>

<template>
	<!-- 異動紀錄列表 -->
	<div v-if="page === 'list'" class="page_list">
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
             <h1>批量新增</h1>
        </div>
        <div class="content_block">
            <h3>上傳檔案</h3>
            <div class="isquestion">
                <div class="isquestion_title">問題提問</div>
                <div class="islabel_style">
                    <label>
                        <input type="file" id="file_q" ref="file_q" v-on:change="handleFileUpload('question')"/>
                        <p class="text_q">請選擇檔案</p>
                    </label>
                    <button class="btn_import" v-if="btn_import" v-on:click="submitFile('question'),btn_import = false">Import</button>
                    <button class="btn_import" v-else="btn_import">Import</button>
                    <p class="prompt_word">*只能導入CSV或Excel類型的檔案</p>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">翻譯語系</div>
                <div class="islabel_style">
                    <label>
                        <input type="file" id="file_l" ref="file_l" v-on:change="handleFileUpload('language')"/>
                        <p class="text_l">請選擇檔案</p>
                    </label>
                    <button class="btn_import" v-if="btn_import" v-on:click="submitFile('language'),btn_import = false">Import</button>
                    <button class="btn_import" v-else="btn_import">Import</button>
                    <p class="prompt_word">*只能導入CSV或Excel類型的檔案</p>
                </div>
            </div>
        </div>
        <div class="content_block">
            <h3>下載範例</h3>
            <div class="isdownload">
                <div class="isdownload_title">問題提問</div>
                <div class="islabel_style">
                    <a class="a_download" href="/batch/export-excel/question">
                        <button type="button" class="btn_download">點擊下載</button>
                    </a>
                    <p class="prompt_word">*下載範例，直接依序填寫在相對應的欄位下方</p>
                </div>
            </div>
            <div class="isdownload">
                <div class="isdownload_title">翻譯語系</div>
                <div class="islabel_style">
                    <a class="a_download" href="/batch/export-excel/language">
                        <button type="button" class="btn_download">點擊下載</button>
                    </a>
                    <p class="prompt_word">*下載範例，直接依序填寫在相對應的欄位下方</p>
                </div>
            </div>
            <div class="isdownload">
                <div class="isdownload_title">問題提問欄位樹狀圖</div>
                <div class="islabel_style">
                    <a class="a_download" href="/batch/export-excel/question-field">
                        <button type="button" class="btn_download">點擊下載</button>
                    </a>
                    <p class="prompt_word">*此範例僅提供問題提問欄位查找，勿使用此範例上傳</p>
                </div>
            </div>
            <div class="isdownload">
                <div class="isdownload_title">翻譯語系欄位樹狀圖</div>
                <div class="islabel_style">
                    <a class="a_download" href="/batch/export-excel/language-field">
                        <button type="button" class="btn_download">點擊下載</button>
                    </a>
                    <p class="prompt_word">*此範例僅提供翻譯語系欄位查找，勿使用此範例上傳</p>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	data() {
        return {
            page: 'list', //當前頁面
            file_q: '', //問題提問要上傳的檔案
            file_l: '', //翻譯語系要上傳的檔案
            btn_import: true,
        }
    },
    computed: {

   	},
    methods: {
    	//跳頁到列表頁
        init: function (boolean) {
            let self = this;
            self.btn_import = true;
            self.page = 'list';
        },
        //抓取使用者上傳的檔案資料
        handleFileUpload:function(type){
            let self = this;
            if(type == 'question'){
                self.file_q = self.$refs.file_q.files[0];
                $('.text_q').text($('#file_q').val());
            }else if(type == 'language'){
                self.file_l = self.$refs.file_l.files[0];
                $('.text_l').text($('#file_l').val());
            }
        },
        //上傳檔案
        submitFile:function(type){
            let self = this;
            let formData = new FormData();
            if(type == 'question'){
                formData.append('file', this.file_q);
                axios.post( '/batch/import-excel/question',formData,{headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function(response){
                        if (response.data.result == 'ok') {
                            self.prompt('批量新增成功','success',true);
                        }else{
                            self.prompt(response.data.result,'failure',true);
                            self.btn_import = true;
                        }
                    })
                    .catch(function(response){
                        self.prompt(response.data.result,'failure',true);
                    });
            }else if(type == 'language'){
                formData.append('file', this.file_l);
                axios.post( '/batch/import-excel/language',formData,{headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            self.prompt('批量新增成功','success',true);
                        }else{
                            self.prompt(response.data.result,'failure',true);
                            self.btn_import = true;
                        }
                    })
                    .catch(function (response) {
                        self.prompt(response.data.result,'failure',true);
                    });
            }
        },
        //彈出提示框
        prompt:function(string,type,boolean){
            let self = this;
            $('.overlay').fadeIn(400);
        	$('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_body_admin h2').text(string);
            if(type == 'success'){
                $('.prompt_logo').removeClass('failure');
                $('.prompt_logo').removeClass('question');
                $('.prompt_logo i').removeClass('fa-times');
                $('.prompt_logo i').removeClass('fa-question');
                $('.prompt_logo i').addClass('fa-check');
                $('.prompt_logo').addClass('success');
            }else if(type == 'failure'){
                $('.prompt_logo').removeClass('success');
                $('.prompt_logo').removeClass('question');
                $('.prompt_logo i').removeClass('fa-check');
                $('.prompt_logo i').removeClass('fa-question');
                $('.prompt_logo i').addClass('fa-times');
                $('.prompt_logo').addClass('failure');
            }
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
                            window.location.reload();
                        }else{
                            $('.prompt_body_admin').fadeOut(400);
                            $('.overlay').fadeOut(400);
                        }
                    }, 1000);
                }, 1000);
            }, 1000);
            $('.prompt_body_admin').fadeIn(400);
            $('html').addClass('over_hidden');
        }
    },
    watch: {
	},
    mounted: function () {
        this.init();
    }
}
</script>