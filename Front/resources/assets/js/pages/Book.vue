<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
<template>
	<!-- 問題列表 -->
    <div>
        <div class="header">
            <div class="header-main">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>  
                    </button>
                    <figure class="logo">
                        <a href="/">
                            <img src="images/logo.png">
                        </a>
                    </figure>
                </div>
                <nav class="nav">
                    <ul>
                        <li v-bind:class="url_show_block == 'bbin-list' ? 'active' : false">
                            <a @click="changePage('bbin-list'),page = 'list'" href="javascript:void(0)">BBIN提問</a>
                        </li>
                        <li v-bind:class="url_show_block == 'bbos-list' ? 'active' : false">
                            <a @click="changePage('bbos-list'),page = 'list'" href="javascript:void(0)">XBB提問</a>
                        </li>
                        <li v-bind:class="url_show_block == 'language-list' ? 'active' : false">
                            <a @click="changePage('language-list'),page = 'list'" href="javascript:void(0)">語系翻譯</a>
                        </li>
                        <li v-if="user_status" v-bind:class="url_show_block == 'field-list' ? 'active' : false">
                            <a @click="changePage('field-list'),page = 'list'" href="javascript:void(0)">欄位管理</a>
                        </li>
                        <li v-if="user_status" v-bind:class="url_show_block == 'transaction-list' ? 'active' : false">
                            <a @click="changePage('transaction-list'),page = 'list'" href="javascript:void(0)">異動紀錄</a>
                        </li>
                        <li v-if="user_status" v-bind:class="url_show_block == 'user-list' ? 'active' : false">
                            <a @click="changePage('user-list'),page = 'list'" href="javascript:void(0)">使用者管理</a>
                        </li>
                    </ul>
                </nav>
                <div class="time-wrap">
                    <span class="date"></span>
                    <span class="md">
                        <span class="month"></span>
                        <span class="day"></span>
                    </span>
                    <span class="time"></span>
                    <span class="ampm"></span>
                </div>
                <div class="user-wrap">
                    <a v-if="!user_status" href="/login">登入</a>
                    <a v-else="" href="/logout">登出</a>
                </div>
            </div>
        </div>
        <div v-if="url_show_block == 'bbin-list'" class="container-main question-style">  
            <div v-if="page == 'list'">
                <!-- <label>
                    <textarea name="file_q" id="file_q" cols="30" rows="10"></textarea>
                </label>
                <button v-on:click="submitFile()">Import</button> -->
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
                            <button type="button" class="btn_yes" @click="removeQuestion(remove_id,true)" v-else>確認</button>
                        </div>
                        <div class="prompt_btn_group" v-else>
                            <p><span>2</span>s後自動關閉</p>
                        </div>
                    </div>
                </div>
                <div class="remove_wrapper">
                    <i class="fa"></i><span></span>
                </div>
                <div class="container-filter">
                    <!-- <h2>篩選條件</h2> -->
                    <div class="input-group search_content" v-bind:class="{ 'no-search': list_questions.length == 0 && bbin.check != -1}">
                        <input type="text" class="form-control" placeholder="輸入關鍵字查詢" name="qa_content" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=bbin.search_condition.qa_content>
                        <span class="input-group-btn" v-if="list_questions.length == 0 && bbin.check != -1">
                            <button class="btn btn-default btn_clearcontent" @click="search('clear')" type="button"></button>
                        </span>
                    </div>
                    <div class="filter-wrap search_class">
                        <h3>分類：</h3>
                        <label>
                            <input type="radio" name="qc_id" :value=0 @click="search(0)" v-model="bbin.check"><span>全部</span>
                        </label>
                        <label v-for="field in bbin.question_field">
                            <input type="radio" name="qc_id" :value=field.qc_id @click="search(field.qc_id)" v-model="bbin.check"><span class="class_name">{{field.qc_name}}</span>
                        </label>
                        <label>
                            <input type="radio" name="qc_id" :value=-1 @click="search(-1)" v-model="bbin.check"><span>已選問題</span>
                        </label>
                    </div>
                    <form class="none download_questions" action="/questions-download" method="post">
                        <input type="hidden" name="_token">
                        <input type="hidden" name="dq_data">
                        <button type="button" title="下載所選的BBIN提問" class="btn_download" v-if="bbin.downloadQuestions.length > 0" @click="download()"></button>
                    </form>
                </div>
                <div class="container-top">
                    <h1>BBIN提問</h1>
                    <span class="container-tips"></span>
                    <button v-if="user_status" type="button" title="新增" class="btn_create" @click="page_create('question')"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="container-list question-list-wrap">
                    <div class="question-list">
                        <table class="question-table">
                            <thead>
                                <tr>
                                    <th class="qa_checkbox"><button type="button" class="btn-style btn_clean" @click="clearQuestions()" title="清除所選BBIN提問">清除</button></th>
                                    <th class="last_update_date" v-if="user_status && bbin.check != -1">時間</th>
                                    <th class="qc_name">分類</th>
                                    <th class="">問題</th>
                                    <td v-if="user_status" class=""></td>
                                </tr>
                            </thead>
                            <tbody v-if="bbin.check == -1">
                                <tr v-for="data in bbin.checked_question">
                                    <td class="qa_checkbox"><input type="checkbox" name="qa_id" :value=data.qa_id @click="selectQuestion(data.qa_id)" v-model="bbin.downloadQuestions"><span></span></td>
                                    <!-- <td v-if="user_status" class="last_update_date">{{changeDateTimeToDate(data.last_update_date)}}</td> -->
                                    <td class="qc_name">{{data.qc_name}}<input type="hidden" name="qc_name" :value=data.qc_name></td>
                                    <td class="qa_input"><input @input="changeSelectQuestion(data.qa_id,true)" class="form-control" type="text" :value=data.qa_content></td>
                                    <td v-if="user_status" class=""></td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr v-for="data in list_questions">
                                    <td class="qa_checkbox">
                                        <input type="checkbox" name="qa_id" :value=data.qa_id @click="selectQuestion(data.qa_id)" v-model="bbin.downloadQuestions">
                                        <span></span>
                                    </td>
                                    <td v-if="user_status" class="last_update_date">{{changeDateTimeToDate(data.last_update_date)}}</td>
                                    <td class="qc_name">{{data.qc_name}}<input type="hidden" name="qc_name" :value=data.qc_name></td>
                                    <td class="qa_content tip-block" @dblclick="copyQuestion(data.qa_content,data.qa_id)"><span class="none tip-block-show" v-highlight="{keyword: bbin.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.qa_content}}</span></td>
                                    <td class="qa_input dom_none"><input @input="changeSelectQuestion(data.qa_id,true)" class="form-control" type="text"></td>
                                    <td v-if="user_status" class="settings">
                                        <i class="fa fa-edit" @click="page_modify(data.qa_id,'question')"></i>
                                        <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                        <i class="fa fa-trash" @click="removeQuestion(data.qa_id,false)" v-else></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="found-nothing-wrap" v-if="list_questions.length == 0 && bbin.check != -1">
                            <hgroup>
                                <h2>查無資料</h2>
                                <h3>There is no matching data for your query.</h3>
                            </hgroup>
                        </div>
                        <div class="found-nothing-wrap" v-else-if="bbin.checked_question.length == 0 && bbin.check == -1">
                            <hgroup>
                                <h2>暫無勾選任一BBIN提問</h2>
                                <h3></h3>
                            </hgroup>
                        </div>
                    </div>
                    <button class="btn-top" v-show="bbin.questions.length > 10" @click="goTop()"></button>
                </div>
                <!-- 無限加載的感應區塊 -->
                <div class="container-bottom"></div>
            </div>
            <div v-else-if="page == 'modify'" class="page_modify">
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
                <div v-if="bbin.field_class" class="field_class_wrapper">
                    <i class="fa fa-times close_fc" @click="bbin.field_class = false,create_class_block=false,show_overlay(false)"></i>
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
                                    <button type="button" class="btn_create_save" @click="createQuestionClass()" v-else><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_create_back" @click="create_class_block = false"><i class="fa fa-times"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="field_class_item" v-for="field in bbin.question_field">
                            <div class="item_block color_block">
                                <span>{{field.qc_name}}</span>
                                <i class="fa fa-edit" @click="show_question_class(field.qc_id)"></i>
                            </div>
                            <div class="modify_block">
                                <input type="hidden" name="qc_id" :value=field.qc_id>
                                <input type="text" name="qc_name" :value=field.qc_name>
                                <div class="btn_group">
                                    <button type="button" class="btn_modify_save" v-if="btn_modify_class_save"><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_modify_save" @click="modifyQuestionClass()" v-else><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_modify_back" @click="hide_question_class()"><i class="fa fa-times"></i></button>
                                    <button type="button" class="btn_delete_save" v-if="btn_delete_class_save"><i class="fa fa-trash"></i></button>
                                    <button type="button" class="btn_delete_save" @click="removeQuestionClass(field.qc_id)" v-else><i class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page_title">
                    <h1>修改問題</h1>
                </div>
                <div class="content_block">
                    <input type="hidden" name="qa_id" :value=bbin.question.qa_id>
                    <div class="isclass">
                        <div class="isclass_title">分類</div>
                        <div class="islabel_style">
                            <label v-for="field in bbin.question_field">
                                <input type="radio" class="input_radio" name="qc_id" :value=field.qc_id v-model="bbin.check"><span>{{field.qc_name}}</span>
                            </label>
                            <button class="btn_edit" type="button" @click="bbin.field_class = true,show_overlay(true)"><i class="fa fa-pencil">編輯分類</i></button>
                        </div>
                    </div>
                    <div class="iscontent">
                        <div class="iscontent_title">問題內容</div>
                        <div class="istextarea_style" data-toggle="tooltip" title="請輸入問題內容">
                            <textarea name="qa_content" v-model="bbin.question.qa_content"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modify_button">
                    <button type="button" class="btn_back" @click="init()">BACK 返回</button>
                    <button type="button" class="btn_save" v-if="btn_modify_save">SAVE 存檔</button>
                    <button type="button" class="btn_save" @click="modifyBbinQuestion()" v-else>SAVE 存檔</button>
                </div>
            </div>
            <div v-else-if="page == 'create'" class="page_create">
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
                <div v-if="bbin.field_class" class="field_class_wrapper">
                    <i class="fa fa-times close_fc" @click="bbin.field_class = false,create_class_block=false,show_overlay(false)"></i>
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
                                    <button type="button" class="btn_create_save" @click="createQuestionClass()" v-else><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_create_back" @click="create_class_block = false"><i class="fa fa-times"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="field_class_item" v-for="field in bbin.question_field">
                            <div class="item_block color_block">
                                <span>{{field.qc_name}}</span>
                                <i class="fa fa-edit" @click="show_question_class(field.qc_id)"></i>
                            </div>
                            <div class="modify_block">
                                <input type="hidden" name="qc_id" :value=field.qc_id>
                                <input type="text" name="qc_name" :value=field.qc_name>
                                <div class="btn_group">
                                    <button type="button" class="btn_modify_save" v-if="btn_modify_class_save"><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_modify_save" @click="modifyQuestionClass()" v-else><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_modify_back" @click="hide_question_class()"><i class="fa fa-times"></i></button>
                                    <button type="button" class="btn_delete_save" v-if="btn_delete_class_save"><i class="fa fa-trash"></i></button>
                                    <button type="button" class="btn_delete_save" @click="removeQuestionClass(field.qc_id)" v-else><i class="fa fa-trash"></i></button>
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
                                    <button class="btn_edit" type="button" @click="bbin.field_class = true,show_overlay(true)"><i class="fa fa-pencil">編輯分類</i></button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,key) in bbin.create_questions">
                                <td>
                                    <i class="fa fa-plus" @click="add_onemore('question'),add_check = false" v-if="add_check"></i>
                                    <i class="fa fa-plus" v-else></i>
                                    <i class="fa fa-trash" v-if="key != 0" @click="bbin.create_questions.splice(key,1)"></i>
                                </td>
                                <td class="">
                                    <div class="islabel_style">
                                        <select name="qc_id" v-model="bbin.create_questions[key].qc_id">
                                            <option v-for="qc in bbin.question_field" :value=qc.qc_id>{{qc.qc_name}}</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div class="islabel_style">
                                        <input class="" type="text" name="qa_content" v-model="bbin.create_questions[key].qa_content">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="create_button">
                    <button type="button" class="btn_back" @click="init()">BACK 返回</button>
                    <button type="button" class="btn_save" v-if="btn_create_save">SAVE 存檔</button>
                    <button type="button" class="btn_save" @click="createBbinQuestion()" v-else>SAVE 存檔</button>
                </div>
            </div>
        </div>
        <div v-else-if="url_show_block == 'bbos-list'" class="container-main question-style">
            <div v-if="page == 'list'">
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
                            <button type="button" class="btn_yes" @click="removeQuestion(remove_id,true)" v-else>確認</button>
                        </div>
                        <div class="prompt_btn_group" v-else>
                            <p><span>2</span>s後自動關閉</p>
                        </div>
                    </div>
                </div>
                <div class="remove_wrapper">
                    <i class="fa"></i><span></span>
                </div>
                <div class="container-filter">
                    <!-- <h2>篩選條件</h2> -->
                    <div class="input-group search_content" v-bind:class="{ 'no-search': list_questions.length == 0 && bbos.check != -1}">
                        <input type="text" class="form-control" placeholder="輸入關鍵字查詢" name="qa_content" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=bbos.search_condition.qa_content>
                        <span class="input-group-btn" v-if="list_questions.length == 0 && bbos.check != -1">
                            <button class="btn btn-default btn_clearcontent" @click="search('clear')" type="button"></button>
                        </span>
                    </div>
                    <div class="filter-wrap search_class">
                        <h3>分類：</h3>
                        <label>
                            <input type="radio" name="qc_id" :value=0 @click="search(0)" v-model="bbos.check"><span>全部</span>
                        </label>
                        <label v-for="field in bbos.question_field">
                            <input type="radio" name="qc_id" :value=field.qc_id @click="search(field.qc_id)" v-model="bbos.check"><span class="class_name">{{field.qc_name}}</span>
                        </label>
                        <label>
                            <input type="radio" name="qc_id" :value=-1 @click="search(-1)" v-model="bbos.check"><span>已選問題</span>
                        </label>
                    </div>
                    <form class="none download_questions" action="/questions-download" method="post">
                        <input type="hidden" name="_token">
                        <input type="hidden" name="dq_data">
                        <button type="button" title="下載所選的XBB提問" class="btn_download" v-if="bbos.downloadQuestions.length > 0" @click="download()"></button>
                    </form>
                </div>
                <div class="container-top">
                    <h1>XBB提問</h1>
                    <span class="container-tips"></span>
                    <button v-if="user_status" type="button" title="新增" class="btn_create" @click="page_create('question')"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="container-list question-list-wrap">
                    <div class="question-list">
                        <table class="question-table">
                            <thead>
                                <tr>
                                    <th class="qa_checkbox"><button type="button" class="btn-style btn_clean" @click="clearQuestions()" title="清除所選XBB提問">清除</button></th>
                                    <th class="last_update_date" v-if="user_status && bbos.check != -1">時間</th>
                                    <th class="qc_name">分類</th>
                                    <th class="">問題</th>
                                    <td v-if="user_status" class=""></td>
                                </tr>
                            </thead>
                            <tbody v-if="bbos.check == -1">
                                <tr v-for="data in bbos.checked_question">
                                    <td class="qa_checkbox"><input type="checkbox" name="qa_id" :value=data.qa_id @click="selectQuestion(data.qa_id)" v-model="bbos.downloadQuestions"><span></span></td>
                                    <td class="qc_name">{{data.qc_name}}<input type="hidden" name="qc_name" :value=data.qc_name></td>
                                    <td class="qa_input"><input @input="changeSelectQuestion(data.qa_id,true)" class="form-control" type="text" :value=data.qa_content></td>
                                    <td v-if="user_status" class=""></td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr v-for="data in list_questions">
                                    <td class="qa_checkbox">
                                        <input type="checkbox" name="qa_id" :value=data.qa_id @click="selectQuestion(data.qa_id)" v-model="bbos.downloadQuestions">
                                        <span></span>
                                    </td>
                                    <td v-if="user_status" class="last_update_date">{{changeDateTimeToDate(data.last_update_date)}}</td>
                                    <td class="qc_name">{{data.qc_name}}<input type="hidden" name="qc_name" :value=data.qc_name></td>
                                    <td class="qa_content tip-block" @dblclick="copyQuestion(data.qa_content,data.qa_id)"><span class="none tip-block-show" v-highlight="{keyword: bbos.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.qa_content}}</span></td>
                                    <td class="qa_input dom_none"><input @input="changeSelectQuestion(data.qa_id,true)" class="form-control" type="text"></td>
                                    <td v-if="user_status" class="settings">
                                        <i class="fa fa-edit" @click="page_modify(data.qa_id,'question')"></i>
                                        <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                        <i class="fa fa-trash" @click="removeQuestion(data.qa_id,false)" v-else></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="found-nothing-wrap" v-if="list_questions.length == 0 && bbos.check != -1">
                            <hgroup>
                                <h2>查無資料</h2>
                                <h3>There is no matching data for your query.</h3>
                            </hgroup>
                        </div>
                        <div class="found-nothing-wrap" v-else-if="bbos.checked_question.length == 0 && bbos.check == -1">
                            <hgroup>
                                <h2>暫無勾選任一XBB提問</h2>
                                <h3></h3>
                            </hgroup>
                        </div>
                    </div>
                    <button class="btn-top" v-show="bbos.questions.length > 10" @click="goTop()"></button>
                </div>
                <!-- 無限加載的感應區塊 -->
                <div class="container-bottom"></div>
            </div>
            <div v-else-if="page == 'modify'" class="page_modify">
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
                <div v-if="bbos.field_class" class="field_class_wrapper">
                    <i class="fa fa-times close_fc" @click="bbos.field_class = false,create_class_block=false,show_overlay(false)"></i>
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
                                    <button type="button" class="btn_create_save" @click="createQuestionClass()" v-else><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_create_back" @click="create_class_block = false"><i class="fa fa-times"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="field_class_item" v-for="field in bbos.question_field">
                            <div class="item_block color_block">
                                <span>{{field.qc_name}}</span>
                                <i class="fa fa-edit" @click="show_question_class(field.qc_id)"></i>
                            </div>
                            <div class="modify_block">
                                <input type="hidden" name="qc_id" :value=field.qc_id>
                                <input type="text" name="qc_name" :value=field.qc_name>
                                <div class="btn_group">
                                    <button type="button" class="btn_modify_save" v-if="btn_modify_class_save"><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_modify_save" @click="modifyQuestionClass()" v-else><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_modify_back" @click="hide_question_class()"><i class="fa fa-times"></i></button>
                                    <button type="button" class="btn_delete_save" v-if="btn_delete_class_save"><i class="fa fa-trash"></i></button>
                                    <button type="button" class="btn_delete_save" @click="removeQuestionClass(field.qc_id)" v-else><i class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page_title">
                    <h1>修改問題</h1>
                </div>
                <div class="content_block">
                    <input type="hidden" name="qa_id" :value=bbos.question.qa_id>
                    <div class="isclass">
                        <div class="isclass_title">分類</div>
                        <div class="islabel_style">
                            <label v-for="field in bbos.question_field">
                                <input type="radio" class="input_radio" name="qc_id" :value=field.qc_id v-model="bbos.check"><span>{{field.qc_name}}</span>
                            </label>
                            <button class="btn_edit" type="button" @click="bbos.field_class = true,show_overlay(true)"><i class="fa fa-pencil">編輯分類</i></button>
                        </div>
                    </div>
                    <div class="iscontent">
                        <div class="iscontent_title">問題內容</div>
                        <div class="istextarea_style" data-toggle="tooltip" title="請輸入問題內容">
                            <textarea name="qa_content" v-model="bbos.question.qa_content"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modify_button">
                    <button type="button" class="btn_back" @click="init()">BACK 返回</button>
                    <button type="button" class="btn_save" v-if="btn_modify_save">SAVE 存檔</button>
                    <button type="button" class="btn_save" @click="modifyBbosQuestion()" v-else>SAVE 存檔</button>
                </div>
            </div>
            <div v-else-if="page == 'create'" class="page_create">
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
                <div v-if="bbos.field_class" class="field_class_wrapper">
                    <i class="fa fa-times close_fc" @click="bbos.field_class = false,create_class_block=false,show_overlay(false)"></i>
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
                                    <button type="button" class="btn_create_save" @click="createQuestionClass()" v-else><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_create_back" @click="create_class_block = false"><i class="fa fa-times"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="field_class_item" v-for="field in bbos.question_field">
                            <div class="item_block color_block">
                                <span>{{field.qc_name}}</span>
                                <i class="fa fa-edit" @click="show_question_class(field.qc_id)"></i>
                            </div>
                            <div class="modify_block">
                                <input type="hidden" name="qc_id" :value=field.qc_id>
                                <input type="text" name="qc_name" :value=field.qc_name>
                                <div class="btn_group">
                                    <button type="button" class="btn_modify_save" v-if="btn_modify_class_save"><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_modify_save" @click="modifyQuestionClass()" v-else><i class="fa fa-check"></i></button>
                                    <button type="button" class="btn_modify_back" @click="hide_question_class()"><i class="fa fa-times"></i></button>
                                    <button type="button" class="btn_delete_save" v-if="btn_delete_class_save"><i class="fa fa-trash"></i></button>
                                    <button type="button" class="btn_delete_save" @click="removeQuestionClass(field.qc_id)" v-else><i class="fa fa-trash"></i></button>
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
                                    <button class="btn_edit" type="button" @click="bbos.field_class = true,show_overlay(true)"><i class="fa fa-pencil">編輯分類</i></button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,key) in bbos.create_questions">
                                <td>
                                    <i class="fa fa-plus" @click="add_onemore('question'),add_check = false" v-if="add_check"></i>
                                    <i class="fa fa-plus" v-else></i>
                                    <i class="fa fa-trash" v-if="key != 0" @click="bbos.create_questions.splice(key,1)"></i>
                                </td>
                                <td class="">
                                    <div class="islabel_style">
                                        <select name="qc_id" v-model="bbos.create_questions[key].qc_id">
                                            <option v-for="qc in bbos.question_field" :value=qc.qc_id>{{qc.qc_name}}</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div class="islabel_style">
                                        <input class="" type="text" name="qa_content" v-model="bbos.create_questions[key].qa_content">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="create_button">
                    <button type="button" class="btn_back" @click="init()">BACK 返回</button>
                    <button type="button" class="btn_save" v-if="btn_create_save">SAVE 存檔</button>
                    <button type="button" class="btn_save" @click="createBbosQuestion()" v-else>SAVE 存檔</button>
                </div>
            </div>
        </div>
        <div v-else-if="url_show_block == 'language-list'" class="container-main language-style">
            <div v-if="page == 'list'">
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
                            <button type="button" class="btn_yes" @click="removeLanguage(remove_id,true)" v-else>確認</button>
                        </div>
                        <div class="prompt_btn_group" v-else>
                            <p><span>2</span>s後自動關閉</p>
                        </div>
                    </div>
                </div>
                <div class="remove_wrapper">
                    <i class="fa"></i><span></span>
                </div>
                <div class="container-filter">
                    <div class="lang-filter-condition">
                        <span v-if="lang.open_advanced_search" class="arrow arrow-down" aria-hidden="true" @click="lang.open_advanced_search=false"></span>
                        <span v-else class="arrow arrow-up" aria-hidden="true" @click="lang.open_advanced_search=true"></span> 
                    </div>
                    <div class="input-group search_taiwan" v-bind:class="{ 'no-search': list_languages.length == 0}">
                        <input type="text" class="form-control" placeholder="輸入關鍵字查詢" name="lt_taiwan" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=lang.search_condition.lt_taiwan>
                        <span class="input-group-btn" v-if="list_languages.length == 0">
                            <button class="btn btn-default btn_clearcontent" @click="init(),lang.languages = lang.languages_backup,lang.all = Math.ceil(lang.languages_backup.length / lang.limit)" type="button"></button>
                        </span>
                    </div>
                    <div class="filter-wrap lang-style search_language" v-show="lang.product_check && !lang.open_advanced_search">
                        <h3>語系：</h3>
                        <div class="filter-label">
                            <label v-for="field in lang.field_ls">
                                <input v-model="lang.language_system_check" type="checkbox" name="language_system" :value=field.ls_id @click="changeLanguageSystem()" >
                                <span>{{field.ls_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="filter-wrap lang-style" v-show="lang.product_check && !lang.open_advanced_search">
                        <h3>產品：</h3>
                        <div class="filter-label">
                            <label><input type="radio" name="lp_id" :value=-1 @click="search(),clickProductRadio('-1')" v-model="lang.product_check"><span>全部</span></label>
                            <label v-for="field in lang.field_lp">
                                <input type="radio" name="lp_id" :value=field.lp_id @click="search(),clickProductRadio(field.lp_id)" v-model="lang.product_check">
                                <span>{{field.lp_name}}</span>
                            </label>
                        </div>
                    </div>
                    <!-- <div class="filter-wrap lang-style" v-show="lang.platform_check && !lang.open_advanced_search">
                        <h3>平台：</h3>
                        <div class="filter-label">
                            <label v-for="field in lang.field_lpf">
                                <input type="radio" name="lpf_id" :value=field.lpf_id @click="search(),clickPlatformRadio(field.lpf_id)" v-model="lang.platform_check">
                                <span>{{field.lpf_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="filter-wrap lang-style" v-show="lang.class_check && !lang.open_advanced_search">
                        <h3>分類：</h3>
                        <div class="filter-label">
                            <label v-for="field in lang.field_lc">
                                <input type="radio" name="lc_id" :value=field.lc_id @click="search(),clickClassRadio(field.lc_id)" v-model="lang.class_check">
                                <span>{{field.lc_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="filter-wrap lang-style" v-show="lang.subclass_check && !lang.open_advanced_search">
                        <h3>子分類：</h3>
                        <div class="filter-label">
                            <label v-for="field in lang.field_lsc">
                                <input type="radio" name="lsc_id" :value=field.lsc_id @click="search(),clickSubClassRadio(field.lsc_id)" v-model="lang.subclass_check">
                                <span>{{field.lsc_name}}</span>
                            </label>
                        </div>
                    </div> -->
                </div>
                <div class="container-top">
                    <h1>語系翻譯</h1>
                    <span class="container-tips"></span>
                    <button v-if="user_status" type="button" title="新增" class="btn_create" @click="page_create('language')"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="container-list lang-list-wrap">
                    <div class="lang-list">
                        <table class="lang-table" v-if="list_languages.length != 0">
                            <thead>
                                <div class="view_field_block" @mouseenter="show_or_not()" @mouseleave="show_or_not()">
                                    <div class="view_field_title">
                                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                                    </div>
                                    <div class="view_field islabel_style" v-show="lang.open_view_field">
                                        <label v-for="field in lang.field_vf">
                                            <input v-model="lang.language_system_check" type="checkbox" name="language_system" class="input_radio" :value=field.vf_id @click="changeViewField()" ><span>{{field.vf_name}}</span>
                                        </label>
                                    </div>
                                </div>
                                <tr>
                                    <th class="" v-if="user_status"></th>
                                    <th class="t_date_style" v-if="user_status">時間</th>
                                    <th class="t_project_style" v-if="lang.field_display.product">產品</th>
                                    <!-- <th class="t_platform_style" v-if="lang.field_display.platform">平台</th>
                                    <th class="t_class_style" v-if="lang.field_display.class">分類</th> -->
                                    <th class="t_subclass_style" v-if="lang.product_check == 7">子分類</th>
                                    <!-- <th class="t_number_style" v-if="lang.field_display.number && lang.product_check!=6">遊戲編號</th> -->
                                    <th class="" v-if="lang.field_display.taiwan">繁</th>
                                    <th class="" v-if="lang.field_display.china">簡</th>
                                    <th class="" v-if="lang.field_display.english">英</th>
                                    <th class="" v-if="lang.field_display.japan">日</th>
                                    <th class="" v-if="lang.field_display.korea">韓</th>
                                    <th class="" v-if="lang.field_display.vietnam">越</th>
                                    <th class="" v-if="lang.field_display.thailand">泰</th>
                                    <!-- <th class="" v-if="field_display.india">印</th>
                                    <th class="" v-if="field_display.spain">西</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in list_languages">
                                    <td class="" v-if="user_status">
                                        <i class="fa fa-edit" @click="page_modify(data.lt_id,'language')"></i>
                                        <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                        <i class="fa fa-trash" @click="removeLanguage(data.lt_id,false)" v-else></i>
                                    </td>
                                    <td class="t_date_style" v-if="user_status">{{changeDateTimeToDate(data.last_update_date)}}</td>
                                    <td class="t_project_style" v-if="lang.field_display.product" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lp_name}}</td>
                                    <!-- <td class="t_platform_style" v-if="lang.field_display.platform" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lpf_name}}</td>
                                    <td class="t_class_style" v-if="lang.field_display.class" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lc_name}}</td> -->
                                    <td class="t_subclass_style" v-if="lang.product_check == 7" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lsc_name}}</td>
                                    <!-- <td class="t_number_style" v-if="lang.field_display.number && lang.product_check!=6">{{data.lt_number}}</td> -->
                                    <td class="taiwan tip-block" v-if="lang.field_display.taiwan" @dblclick="copyLanguage(data.lt_taiwan,data.lt_id,'taiwan')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_taiwan}}</span>
                                    </td>
                                    <td class="china tip-block" v-if="lang.field_display.china" @dblclick="copyLanguage(data.lt_china,data.lt_id,'china')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_china}}</span>
                                    </td>
                                    <td class="english tip-block" v-if="lang.field_display.english" @dblclick="copyLanguage(data.lt_english,data.lt_id,'english')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_english}}</span>
                                    </td>
                                    <td class="japan tip-block" v-if="lang.field_display.japan" @dblclick="copyLanguage(data.lt_japan,data.lt_id,'japan')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_japan}}</span>
                                    </td>
                                    <td class="korea tip-block" v-if="lang.field_display.korea" @dblclick="copyLanguage(data.lt_korea,data.lt_id,'korea')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_korea}}</span>
                                    </td>
                                    <td class="vietnam tip-block" v-if="lang.field_display.vietnam" @dblclick="copyLanguage(data.lt_vietnam,data.lt_id,'vietnam')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_vietnam}}</span>
                                    </td>
                                    <td class="thailand tip-block" v-if="lang.field_display.thailand" @dblclick="copyLanguage(data.lt_thailand,data.lt_id,'thailand')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_thailand}}</span>
                                    </td>
                                    <!-- <td class="india tip-block" v-if="lang.field_display.india" @dblclick="copyLanguage(data.lt_india,data.lt_id,'india')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_india}}</span>
                                    </td>
                                    <td class="spain tip-block" v-if="lang.field_display.spain"            @dblclick="copyLanguage(data.lt_spain,data.lt_id,'spain')">
                                        <span class="none tip-block-show" v-highlight="{keyword: lang.keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_spain}}</span>
                                    </td> -->
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
                    <button class="btn-top" v-show="lang.languages.length > 10" @click="goTop()"></button>
                </div>
                <div class="container-bottom"></div>
                <!-- 頁碼-新的樣式 -->
                <div class="pages-wrap" v-if="lang.languages.length > 10">
                    <a href="javascript:void(0)" class="first" v-on:click="lang.cur=1,change_select_option(1)">FIRST</a>
                    <a href="javascript:void(0)" class="prev" v-if="showFirst" v-on:click="lang.cur--,change_select_option(lang.cur)"></a>
                    <a href="javascript:void(0)" class="prev" v-else></a>
                    <div class="select">
                        <select v-on:change="pageClick()">
                            <option v-for="index in indexs" :value=index>{{ index }}</option>
                        </select>
                    </div>
                    <div class="at">{{lang.cur}} / {{lang.all}}</div>
                    <a href="javascript:void(0)" class="next" v-if="showLast" v-on:click="lang.cur++,change_select_option(lang.cur)"></a>
                    <a href="javascript:void(0)" class="next" v-else></a>
                    <a href="javascript:void(0)" class="last" v-on:click="lang.cur=lang.all,change_select_option(lang.all)">LAST</a>
                </div>
            </div>
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
                            <p><span>2</span>s後自動關閉</p>
                        </div>
                    </div>
                </div>
                <el-dialog
                    title="提示"
                    :visible.sync="lang.dialogVisible"
                    width="30%">
                    <el-tree class="filter-tree" show-checkbox :data="lang.lang_field" accordion node-key="id" ref="tree" @check='lang_check' :check-strictly='true' :default-expanded-keys="lang.expanded" :default-checked-keys="lang.checked">
                    </el-tree>
                </el-dialog>
                <div class="page_title">
                    <h1>修改語系翻譯</h1>
                </div>
                <div class="content_block">
                    <h3>設定</h3>
                    <input type="hidden" name="lt_id" :value=lang.language.lt_id>
                    <div class="isproduct" v-show="lang.language.lp_id">
                        <div class="isproduct_title">產品</div>
                        <div class="islabel_style">
                            <label>
                                <input type="radio" class="input_radio" @click="lang.dialogVisible = true" name="lp_name" checked><span>{{lang.language.lp_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="isplatform" v-show="lang.language.lpf_id">
                        <div class="isplatform_title">平台</div>
                        <div class="islabel_style">
                            <label>
                                <input type="radio" class="input_radio" @click="lang.dialogVisible = true" name="lpf_name" checked><span>{{lang.language.lpf_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="isclass" v-show="lang.language.lc_id">
                        <div class="isclass_title">分類</div>
                        <div class="islabel_style">
                            <label>
                                <input type="radio" class="input_radio" @click="lang.dialogVisible = true" name="lc_name" checked><span>{{lang.language.lc_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="issubclass" v-show="lang.language.lsc_id">
                        <div class="issubclass_title">子分類</div>
                        <div class="islabel_style">
                            <label>
                                <input type="radio" class="input_radio" @click="lang.dialogVisible = true" name="lsc_name" checked><span>{{lang.language.lsc_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="isnumber" v-show="lang.product_check != 6">
                        <div class="isnumber_title">遊戲編號</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_number" :value=lang.language.lt_number>
                        </div>
                    </div>
                </div>
                <div class="content_block">
                    <h3>各國語系</h3>
                    <div class="islanguage">
                        <div class="islanguage_title">繁</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_taiwan" :value=lang.language.lt_taiwan>
                        </div>
                    </div>
                    <div class="islanguage">
                        <div class="islanguage_title">簡</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_china" :value=lang.language.lt_china>
                        </div>
                    </div>
                    <div class="islanguage">
                        <div class="islanguage_title">英</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_english" :value=lang.language.lt_english>
                        </div>
                    </div>
                    <div class="islanguage">
                        <div class="islanguage_title">日</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_japan" :value=lang.language.lt_japan>
                        </div>
                    </div>
                    <div class="islanguage">
                        <div class="islanguage_title">韓</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_korea" :value=lang.language.lt_korea>
                        </div>
                    </div>
                    <div class="islanguage">
                        <div class="islanguage_title">越</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_vietnam" :value=lang.language.lt_vietnam>
                        </div>
                    </div>
                    <div class="islanguage">
                        <div class="islanguage_title">泰</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_thailand" :value=lang.language.lt_thailand>
                        </div>
                    </div>
                    <div class="islanguage">
                        <div class="islanguage_title">印</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_india" :value=lang.language.lt_india>
                        </div>
                    </div>
                    <div class="islanguage">
                        <div class="islanguage_title">西</div>
                        <div class="islabel_style">
                            <input class="" type="text" name="lt_spain" :value=lang.language.lt_spain>
                        </div>
                    </div>
                </div>
                <div class="modify_button">
                    <button type="button" class="btn_back" @click="init()">BACK 返回</button>
                    <button type="button" class="btn_save" v-if="btn_modify_save">SAVE 存檔</button>
                    <button type="button" class="btn_save" @click="modifyLanguage()" v-else>SAVE 存檔</button>
                </div>
            </div>
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
                            <p><span>2</span>s後自動關閉</p>
                        </div>
                    </div>
                </div>
                <el-dialog v-if="lang.dialogVisible"
                    title="提示"
                    :visible.sync="lang.dialogVisible"
                    width="30%">
                    <el-tree class="filter-tree" show-checkbox :data="lang.lang_field" accordion node-key="id" ref="tree" @check='lang_check' :check-strictly='true' :default-checked-keys="lang.checked" :default-expanded-keys="lang.expanded">
                    </el-tree>
                </el-dialog>
                <div class="page_title">
                    <h1 class="">新增語系翻譯</h1>
                </div>
                <div class="table_block">
                    <div class="table_overflow" @mousewheel="onWheel()" onmousewheel="return false;"><!-- 鎖定上下滾動的功能 -->
                        <table class="l_table">
                            <thead>
                                <tr>
                                    <th class=""></th>
                                    <th class=""></th>
                                    <th class="" style="min-width: 112px;">產品分類</th>
                                    <th class="">遊戲編號</th>
                                    <th class="">繁</th>
                                    <th class="">簡</th>
                                    <th class="">英</th>
                                    <th class="">日</th>
                                    <th class="">韓</th>
                                    <th class="">越</th>
                                    <th class="">泰</th>
                                    <th class="">印</th>
                                    <th class="">西</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,key) in lang.create_languages">
                                    <td>
                                        <i class="fa fa-plus" @click="addOnemoreLanguage(data),add_check = false" v-if="add_check"></i>
                                        <i class="fa fa-plus" v-else></i>
                                        <i class="fa fa-trash" v-if="key != 0" @click="lang.create_languages.splice(key,1)"></i>
                                    </td>
                                    <td class="">
                                        <div class="islabel_style">
                                            <div class="select_lang_sort" @click="lang.create_lang_item = key,changeTreeChecked(data.id)">選擇</div>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="islabel_style" style="white-space:nowrap;">
                                            {{breadcrumb(data)}}
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div class="islabel_style" v-show="data.lp_id != 6">
                                            <input class="" type="text" name="lt_number" v-model="lang.create_languages[key].lt_number">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_taiwan" v-model="lang.create_languages[key].lt_taiwan">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_china" v-model="lang.create_languages[key].lt_china">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_english" v-model="lang.create_languages[key].lt_english">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_japan" v-model="lang.create_languages[key].lt_japan">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_korea" v-model="lang.create_languages[key].lt_korea">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_vietnam" v-model="lang.create_languages[key].lt_vietnam">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_thailand" v-model="lang.create_languages[key].lt_thailand">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_india" v-model="lang.create_languages[key].lt_india">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="islabel_style">
                                            <input class="" type="text" name="lt_spain" v-model="lang.create_languages[key].lt_spain">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="create_button">
                    <button type="button" class="btn_back" @click="init()">BACK 返回</button>
                    <button type="button" class="btn_save" v-if="btn_create_save">SAVE 存檔</button>
                    <button type="button" class="btn_save" @click="createLanguage()" v-else>SAVE 存檔</button>
                </div>
            </div>
        </div>
        <div v-else-if="url_show_block == 'field-list' && user_status" class="container-main language-style">
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
                            <button type="button" class="btn_yes" @click="removeField(field.remove_item,true)" v-else>確認</button>
                        </div>
                        <div class="prompt_btn_group" v-else>
                            <p><span>2</span>s後自動關閉</p>
                        </div>
                    </div>
                </div>
                <div class="remove_wrapper">
                    <i class="fa"></i><span></span>
                </div>
                <div class="container-filter">
                    <div class="input-group" v-bind:class="{ 'no-search': field.fields.length == 0}">
                        <input type="text" placeholder="輸入關鍵字查詢" name="keyword" v-model="filterText" v-bind:class="{ 'notFound': field.fields.length == 0}">
                        <span class="input-group-btn" v-if="field.fields.length == 0">
                            <button class="btn btn-default btn_clearcontent" @click="init()" type="button"></button>
                        </span>
                    </div>
                    <!-- <div class="field_tabs">
                        <span @click="change_tab(-1)" v-bind:class="{ 'active': -1 == field.page_list_class.lp_id}">全部</span>
                        <span v-for="product in field.field_lp" @click="change_tab(product.lp_id)" v-bind:class="{ 'active': product.lp_id == field.page_list_class.lp_id}">{{product.lp_name}}</span>
                    </div> -->
                </div>
                <div class="container-top">
                    <h1>語系分類管理</h1>
                    <button type="button" title="新增" class="btn_create right" @click="page_create('field')"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="container-list lang-list-wrap">
                    <div class="lang-list">
                        <!-- <el-tree class="filter-tree" :data="field.fields" accordion node-key="id" show-checkbox :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree" :check-strictly='true' @check="check"> -->
                        <el-tree class="filter-tree" :data="field.fields" accordion :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span v-highlight="{keyword: filterText,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{ node.label }}</span>
                                <span>
                                <el-button type="text" size="mini">
                                    <i class="fa fa-edit" @click="page_modify(data,'field')"></i> 
                                </el-button>
                                <el-button type="text" size="mini">
                                    <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                    <i class="fa fa-trash" @click="removeField(data,false)" v-else></i>
                                </el-button>
                                </span>
                            </span>
                        </el-tree>
                    </div>
                    <button class="btn-top" v-show="field.fields.length > 10" @click="goTop()"></button>
                </div>
                <div class="container-bottom"></div>
                <!-- 頁碼-新的樣式 -->
                <div class="pages-wrap" v-if="field.fields.length > 10">
                    <a href="javascript:void(0)" class="first" v-on:click="field.cur=1,change_select_option(1)">FIRST</a>
                    <a href="javascript:void(0)" class="prev" v-if="showFirst" v-on:click="field.cur--,change_select_option(field.cur)"></a>
                    <a href="javascript:void(0)" class="prev" v-else></a>
                    <div class="select">
                        <select v-on:change="pageClick()">
                            <option v-for="index in indexs" :value=index>{{ index }}</option>
                        </select>
                    </div>
                    <div class="at">{{field.cur}} / {{field.all}}</div>
                    <a href="javascript:void(0)" class="next" v-if="showLast" v-on:click="field.cur++,change_select_option(field.cur)"></a>
                    <a href="javascript:void(0)" class="next" v-else></a>
                    <a href="javascript:void(0)" class="last" v-on:click="field.cur=field.all,change_select_option(field.all)">LAST</a>
                </div>
            </div>
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
                            <p><span>2</span>s後自動關閉</p>
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
                            <label v-for="fie in field.field_item" v-if="fie.fi_id == field.modify_item">
                                <input type="radio" class="input_radio" name="fi_id" :value=fie.fi_id v-model="field.modify_item"><span>{{fie.fi_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="isproduct" v-if="field.modify_item != 1 && field.product_check">
                        <label class="isproduct_title">產品</label>
                        <div class="islabel_style">
                            <label>
                                <input type="radio" class="input_radio" name="lp_id" :value=field.field.lp_id v-model="field.product_check"><span>{{field.field.lp_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="isplatform" v-if="field.modify_item != 2 && field.platform_check">
                        <label class="isplatform_title">平台</label>
                        <div class="islabel_style">
                            <label>
                                <input type="radio" class="input_radio" name="lpf_id" :value=field.field.lpf_id v-model="field.platform_check"><span>{{field.field.lpf_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="isclass" v-if="field.modify_item != 3 && field.class_check">
                        <label class="isclass_title">分類</label>
                        <div class="islabel_style">
                            <label>
                                <input type="radio" class="input_radio" name="lc_id" :value=field.field.lc_id v-model="field.class_check"><span>{{field.field.lc_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="isname" v-if="field.item_product">
                        <label class="isname_title">產品名稱</label>
                        <div class="islabel_style">
                            <input type="text" name="lp_name" :value=field.field.lp_name>
                        </div>
                    </div>
                    <div class="isname" v-if="field.item_platform">
                        <label class="isname_title">平台名稱</label>
                        <div class="islabel_style">
                            <input type="text" name="lpf_name" :value=field.field.lpf_name>
                        </div>
                    </div>
                    <div class="isname" v-if="field.item_class">
                        <label class="isname_title">分類名稱</label>
                        <div class="islabel_style">
                            <input type="text" name="lc_name" :value=field.field.lc_name>
                        </div>
                    </div>
                    <div class="isname" v-if="field.item_subclass">
                        <label class="isname_title">子分類名稱</label>
                        <div class="islabel_style">
                            <input type="text" name="lsc_name" :value=field.field.lsc_name>
                        </div>
                    </div>
                </div>
                <div class="modify_button">
                    <button type="button" class="btn_back" @click="init()">返回</button>
                    <button type="button" class="btn_save" v-if="btn_modify_save">存檔</button>
                    <button type="button" class="btn_save" @click="modifyField()" v-else>存檔</button>
                </div>
            </div>
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
                    <el-alert
                        title="注意"
                        type="warning"
                        description="單選某個欄位即在底下新增一個子欄位，如果都不選的話就是新增一個大類">
                    </el-alert>
                    <el-tree class="filter-tree" show-checkbox :data="field.fields_create" accordion node-key="id" :filter-node-method="filterNode" ref="tree" :check-strictly='true' @check='field_check'>
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span v-highlight="{keyword: filterText,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{ node.label }}</span>
                            </span>
                        </el-tree>
                    <div class="isname">
                        <label class="isname_title">欄位名稱：</label>
                        <div class="islabel_style">
                            <input type="text" name="name">
                        </div>
                    </div>
                </div>
                <div class="create_button" style="display:block !important">
                    <button type="button" class="btn_back" @click="init()">返回</button>
                    <button type="button" class="btn_save" v-if="field.create_item && btn_create_save">存檔</button>
                    <button type="button" class="btn_save" @click="createField()" v-else>存檔</button>
                </div>
            </div>
        </div>
        <div v-else-if="url_show_block == 'transaction-list' && user_status" class="container-main question-style">
            <div class="container-top">
                <h1>異動紀錄列表</h1>
            </div>
            <div class="container-list question-list-wrap">
                <div class="question-list">
                    <table class="question-table">
                        <thead>
                            <tr>
                                <th class="tran_id">編號</th>
                                <th class="tran_action">動作</th>
                                <th class="">內容</th>
                                <th class="tran_user">操作者</th>
                                <th class="tran_date">時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in list_transactions">
                                <td class="tran_id">{{data.tr_id}}</td>
                                <td class="tran_action">{{data.tr_action_name}}</td>
                                <td>
                                    {{data.tr_action_name}}{{data.tr_goal_name}}，{{data.tr_goal_id_name}}為{{data.goal_id}}
                                </td>
                                <td class="tran_user">{{data.tr_user}}</td>
                                <td class="tran_date">{{data.create_date}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="found-nothing-wrap" v-if="list_transactions.length == 0">
                        <hgroup>
                            <h2>查無資料</h2>
                            <h3>There is no matching data for your query.</h3>
                        </hgroup>
                    </div>
                </div>
                <button class="btn-top" v-show="list_transactions.length > 10" @click="goTop()"></button>
            </div>
            <div class="container-bottom"></div>
            <!-- 頁碼-新的樣式 -->
            <div class="pages-wrap" v-if="tran.transactions.length > 10">
                <a href="javascript:void(0)" class="first" v-on:click="tran.cur=1,change_select_option(1)">FIRST</a>
                <a href="javascript:void(0)" class="prev" v-if="showFirst" v-on:click="tran.cur--,change_select_option(tran.cur)"></a>
                <a href="javascript:void(0)" class="prev" v-else></a>
                <div class="select">
                    <select v-on:change="pageClick()">
                        <option v-for="index in indexs" :value=index>{{ index }}</option>
                    </select>
                </div>
                <div class="at">{{tran.cur}} / {{tran.all}}</div>
                <a href="javascript:void(0)" class="next" v-if="showLast" v-on:click="tran.cur++,change_select_option(tran.cur)"></a>
                <a href="javascript:void(0)" class="next" v-else></a>
                <a href="javascript:void(0)" class="last" v-on:click="tran.cur=tran.all,change_select_option(tran.all)">LAST</a>
            </div>
        </div>
        <div v-else-if="url_show_block == 'user-list' && user_status" class="container-main language-style">
            <div v-if="page == 'list'">
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
                            <button type="button" class="btn_yes" @click="removeUser(remove_id,true)" v-else>確認</button>
                        </div>
                        <div class="prompt_btn_group" v-else>
                            <p><span>2</span>s後自動關閉</p>
                        </div>
                    </div>
                </div>
                <div class="remove_wrapper">
                    <i class="fa"></i><span></span>
                </div>
                <div class="container-top">
                    <h1>使用者列表</h1>
                    <!-- <span class="container-tips"></span> -->
                    <button v-if="user_status" type="button" title="新增" class="btn_create right" @click="page_create('user')"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="container-list lang-list-wrap">
                    <div class="lang-list">
                        <table class="lang-table" v-if="list_users.length != 0">
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
                                    <td class="status_off" v-else>停用中</td>
                                    <td>{{data.ud_last_login}}</td>
                                    <td>
                                        <i class="fa fa-edit" @click="page_modify(data.ud_id,'user')"></i>
                                        <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                        <i class="fa fa-trash" @click="removeUser(data.ud_id,false)" v-else></i>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <div class="found-nothing-wrap" v-if="list_users.length == 0">
                            <hgroup>
                                <h2>查無資料</h2>
                                <h3>There is no matching data for your query.</h3>
                            </hgroup>
                        </div>
                    </div>
                    <button class="btn-top" v-show="user.users.length > 10" @click="goTop()"></button>
                </div>
                <div class="container-bottom"></div>
                <!-- 頁碼-新的樣式 -->
                <div class="pages-wrap" v-if="user.users.length > 10">
                    <a href="javascript:void(0)" class="first" v-on:click="user.cur=1,change_select_option(1)">FIRST</a>
                    <a href="javascript:void(0)" class="prev" v-if="showFirst" v-on:click="user.cur--,change_select_option(user.cur)"></a>
                    <a href="javascript:void(0)" class="prev" v-else></a>
                    <div class="select">
                        <select v-on:change="pageClick()">
                            <option v-for="index in indexs" :value=index>{{ index }}</option>
                        </select>
                    </div>
                    <div class="at">{{user.cur}} / {{user.all}}</div>
                    <a href="javascript:void(0)" class="next" v-if="showLast" v-on:click="user.cur++,change_select_option(user.cur)"></a>
                    <a href="javascript:void(0)" class="next" v-else></a>
                    <a href="javascript:void(0)" class="last" v-on:click="user.cur=user.all,change_select_option(user.all)">LAST</a>
                </div>
            </div>
            <div v-else-if="page == 'modify'" class="page_modify">
                <div class="prompt_body_admin">
                    <div class="prompt_box_admin">
                        <div class="prompt_content">
                            <div class="prompt_logo">
                                <i class="fa fa-question"></i>
                            </div>
                            <h2></h2>
                        </div>
                        <div class="prompt_btn_group">
                            <p><span>2</span>s後自動關閉</p>
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
                            <input class="input_radio" type="text" name="ud_name" :value=user.user.ud_name placeholder="請輸入使用者名稱">
                        </div>
                    </div>
                    <div class="isaccount">
                        <label class="isaccount_title">帳號</label>
                        <div class="islabel_style">
                            <!-- <input class="input_radio" type="text" name="ud_account" :value=user.ud_account readonly> -->
                            <p>{{user.user.ud_account}}</p>
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
                                <input class="input_radio" type="radio" name="ud_admin" value='0' v-model="user.admin_check"><span>一般使用者</span>
                            </label>
                            <label>
                                <input class="input_radio" type="radio" name="ud_admin" value='1' v-model="user.admin_check"><span>管理者</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modify_button">
                    <button type="button" class="btn_back" @click="init()">返回</button>
                    <button type="button" class="btn_save" v-if="btn_modify_save">存檔</button>
                    <button type="button" class="btn_save" @click="modifyUser(user.user.ud_id)" v-else>存檔</button>
                </div>
            </div>
            <div v-else-if="page == 'create'" class="page_create">
                <div class="prompt_body_admin">
                    <div class="prompt_box_admin">
                        <div class="prompt_content">
                            <div class="prompt_logo">
                                <i class="fa fa-question"></i>
                            </div>
                            <h2></h2>
                        </div>
                        <div class="prompt_btn_group">
                            <p><span>2</span>s後自動關閉</p>
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
                                <input class="input_radio" type="radio" name="ud_admin" value='0' v-model="user.admin_check"><span>一般使用者</span>
                            </label>
                            <label>
                                <input class="input_radio" type="radio" name="ud_admin" value='1' v-model="user.admin_check"><span>管理者</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="create_button">
                    <button type="button" class="btn_back" @click="init()">返回</button>
                    <button type="button" class="btn_save" v-if="btn_create_save">存檔</button>
                    <button type="button" class="btn_save" @click="createUser()" v-else>存檔</button>
                </div>
            </div>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScroll" infinite-scroll-distance="10"></div>
    </div>
</template>
<script>
export default {
	data() {
        return {
            btn_import: true,
            file_l:'',
            btn_modify_class_save: false,// 防呆用，防止連按
            btn_create_class_save: false,// 防呆用，防止連按
            btn_delete_class_save: false,// 防呆用，防止連按
            btn_modify_save: false,// 防呆用，防止連按
            btn_create_save: false,// 防呆用，防止連按
            btn_delete_save: false,// 防呆用，防止連按
            add_check:true, // 防呆用，防止連按
            remove_btn: null, //是否在提示框顯示刪除相關按鈕
            remove_id:null, //要被刪除的問題id
            needReset: true, // 是否需要重新載入資料
            composing:true, // 監聽搜尋框輸入
            url_show_block:'', // 當前頁面 bbin-list bbos-list language-list field-list transaction-list user-list 
            user_status:false,
            user_data:[],//登入中的會員資料
            deltaY:0,
            page:'list', // list:列表  create:新增  modify:修改
            question_class:{},
            create_class_block:false,
            delete_class_block:false,
            bbin:{//放置bbin問題提問的資料
                field_class:false,
                questions: [], // 全部BBIN提問資料
                questions_backup: [], // 全部BBIN提問資料的備份
                question_field: [], // 問題分類欄位
                question: {}, // 單一筆BBIN提問資料
                create_questions:[
                    {qc_id:'',qa_type: 1,qa_content:''}
                ],
                check: 0, // 所選qc_id
                keyword:'', // 關鍵字查詢
                search_condition: {}, // 搜尋關鍵字
                save_search_data: {use:false}, // 搜尋資料暫存區
                all: '', // 總頁數
                limit:10, // 每頁顯示筆數
                cur: 1, // 當前頁碼
                // list_questions: [], // 當頁要顯示的資料
                downloadQuestions: [], // 所選的BBIN提問id陣列
                checked_question: [],
                busy: false, // 無限加載的開關
            },
            bbos:{//放置bbos問題提問的資料
                field_class:false,
                questions: [], // 全部BBOS提問資料
                questions_backup: [], // 全部BBOS提問資料的備份
                question_field: [], // 問題分類欄位
                question: {}, // 單一筆BBOS提問資料
                create_questions:[
                    {qc_id:'',qa_type: 1,qa_content:''}
                ],
                check: 0, // 所選qc_id
                keyword:'', // 關鍵字查詢
                search_condition: {}, // 搜尋關鍵字
                save_search_data: {use:false}, // 搜尋資料暫存區
                all: '', // 總頁數
                limit:10, // 每頁顯示筆數
                cur: 1, // 當前頁碼
                // list_questions: [], // 當頁要顯示的資料
                downloadQuestions: [], // 所選的BBOS提問id陣列
                checked_question: [],
                busy: false, // 無限加載的開關
            },
            lang:{//放置語系的資料
                languages: [], // 全部語系資料
                languages_backup: [], // 全部語系資料的備份
                language: {}, // 單一筆資料
                lang_field: [], // 用於修改功能頁面和新增功能頁面
                language_id: '',
                expanded: [],
                checked: [],
                search_condition: {}, // 查詢關鍵字
                keyword:'', // 關鍵字查詢
                create_languages:[ // 新增頁面的語系資料(會是複數)
                    {field_lp:[],field_lpf: [],field_lc: [],field_lsc: [],lp_id:'',lpf_id: '',lc_id: '',lsc_id: '',lt_number:'',lt_taiwan:'',lt_china:'',lt_english:'',lt_japan:'',lt_korea:'',lt_vietnam:'',lt_thailand:'',lt_india:'',lt_spain:''}
                ],
                create_lang_item:'',
                save_search_data:{use:false}, // 搜尋資料暫存區
                field_lp: [], // 產品欄位
                field_lpf: [], // 平台欄位
                field_lc: [], // 分類欄位
                field_lsc: [], // 子分類欄位
                field_ls: [ // language_system
                    {ls_id : 1,ls_name : '繁'},
                    {ls_id : 2,ls_name : '簡'},
                    {ls_id : 3,ls_name : '英'},
                    {ls_id : 4,ls_name : '日'},
                    {ls_id : 5,ls_name : '韓'},
                    {ls_id : 6,ls_name : '越'},
                    {ls_id : 7,ls_name : '泰'},
                    // {ls_id : 8,ls_name : '印'},
                    // {ls_id : 9,ls_name : '西'}
                ],
                field_vf: [ // view_field
                    {vf_id : 1,vf_name : '繁'},
                    {vf_id : 2,vf_name : '簡'},
                    {vf_id : 3,vf_name : '英'},
                    {vf_id : 4,vf_name : '日'},
                    {vf_id : 5,vf_name : '韓'},
                    {vf_id : 6,vf_name : '越'},
                    {vf_id : 7,vf_name : '泰'},
                    // {vf_id : 8,vf_name : '印'},
                    // {vf_id : 9,vf_name : '西'},
                    {vf_id : 10,vf_name : '產品'},
                    // {vf_id : 11,vf_name : '平台'},
                    // {vf_id : 12,vf_name : '分類'},
                    // {vf_id : 13,vf_name : '子分類'},
                    // {vf_id : 14,vf_name : '遊戲編號'}
                ],
                field_display: { // 欄位顯示狀態
                    product: true,
                    // platform: true,
                    // class: true,
                    // subclass: true,
                    // number:true,
                    taiwan: true,
                    china: true,
                    english: true,
                    japan: true,
                    korea: true,
                    vietnam: true,
                    thailand: true,
                    // india: true,
                    // spain: true
                },
                dialogVisible:false,
                start_use_view_field:false, // 篩選條件顯示
                open_view_field:false, // 打開顯示欄位區塊
                open_advanced_search : true, // 打開進階查詢(篩選條件)區塊
                language_system_check: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
                hadSlice:false,
                product_check: -1, // 選擇產品
                platform_check: false, // 選擇平台
                class_check: false, // 選擇分類
                subclass_check: false, // 選擇子分類
                needReset: true, // 是否需要重新載入資料
                all: '', // 總頁數
                limit:15, // 每頁顯示筆數
                cur: 1, // 當前頁碼
            },
            field:{
                field: {},
                fields: [],
                fields_backup: [],
                fields_create: [], // 給新增功能頁面用的
                fields_create_id:'', // 新增功能頁面所選到項目的id
                field_lp: [],
                field_lpf: [],
                field_lc: [],
                field_lsc: [],
                field_item: [{fi_id: 1,fi_name: '產品'},{fi_id: 2,fi_name: '平台'},{fi_id: 3,fi_name: '分類'},{fi_id: 4,fi_name: '子分類'}],
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
                // 準備被刪除的分類id
                remove_item:{},
                keyword:'',
            },
            tran:{// 放置異動紀錄的資料
                transactions: [],
                transaction: {},
                needReset: true,
                all: '', //總頁數
                limit:20, //每頁顯示筆數
                number: '', //總筆數
                cur: 1, //當前頁碼
                tr_goal_name:['問題提問','翻譯語系','問題分類欄位','語系產品欄位','語系平台欄位','語系分類欄位','語系子分類欄位','使用者'],
                tr_goal_id_name:['問題編號','語系編號','問題分類編號','語系產品編號','語系平台編號','語系分類編號','語系子分類編號','使用者編號'],
                tr_action_name:['新增','修改','刪除','解決'],
            },
            user:{//放置使用者的資料
                users: [],
                user: {},
                all: '', //總頁數
                limit:10, //每頁顯示筆數
                number: '', //總筆數
                cur: 1, //當前頁碼
                admin_check: 0,
            },
            filterText:'' // 語系欄位的查詢關鍵字
        }
    },
    created: function(){
        let self = this;
        self.checkUserStatus();
        // 取BBOS提問資料
        self.getBbosQuestions();
        // 取BBOS提問的分類欄位資料
        self.getBbosQuestionField();
        // 取BBIN提問資料
        self.getBbinQuestions();
        // 取BBIN提問的分類欄位資料
        self.getBbinQuestionField();
        // 取語系的資料
        self.getLanguages();
        // 取語系的產品欄位
        self.getLanguageProductField();        
    },
    computed: {
        list_questions: function(){
            if(this.url_show_block == 'bbin-list'){
                if(this.bbin.questions.length > 0){
                    var start = (this.bbin.cur - 1) * this.bbin.limit;
                    return this.bbin.questions.slice(0, start+this.bbin.limit);
                }else{
                    var array = [];
                    return array;
                }
            }else if(this.url_show_block == 'bbos-list'){
                if(this.bbos.questions.length > 0){
                    var start = (this.bbos.cur - 1) * this.bbos.limit;
                    return this.bbos.questions.slice(0, start+this.bbos.limit);
                }else{
                    var array = [];
                    return array;
                }
            }
        },
        list_languages: function(){
            if(this.url_show_block == 'language-list'){
                var start = (this.lang.cur - 1) * this.lang.limit;
    		    return this.lang.languages.slice(start, start+this.lang.limit);
            }
        },
        // list_fields: function(){
    	// 	var start = (this.field.cur - 1) * this.field.limit;
    	// 	return this.field.fields.slice(start, start+this.field.limit);
    	// },
        list_transactions: function(){
            if(this.url_show_block == 'transaction-list'){
                var start = (this.tran.cur - 1) * this.tran.limit;
                return this.tran.transactions.slice(start, start+this.tran.limit);
            }
        },
        list_users: function(){
            if(this.url_show_block == 'user-list'){
                var start = (this.user.cur - 1) * this.user.limit;
                return this.user.users.slice(start, start+this.user.limit);
            }
    	},
        indexs: function(){
            var left = 1;
            if(this.url_show_block == 'language-list'){
                var right = this.lang.all;
            }else if(this.url_show_block == 'transaction-list'){
                var right = this.tran.all;
            }else if(this.url_show_block == 'field-list'){
                var right = this.field.all;
            }else if(this.url_show_block == 'user-list'){
                var right = this.user.all;
            }
          	var ar = [];
        	while (left <= right){
	            ar.push(left);
	            left ++;
        	}
        	return ar;
       	},
        showLast: function(){ // 顯示分頁的下一頁按鈕
            if(this.url_show_block == 'language-list'){
                if(this.lang.cur == this.lang.all){
                    return false;
                }else if(this.lang.all == 0){
                    return false;
                }
            }else if(this.url_show_block == 'transaction-list'){
                if(this.tran.cur == this.tran.all){
                    return false;
                }else if(this.tran.all == 0){
                    return false;
                }
            }else if(this.url_show_block == 'field-list'){
                if(this.field.cur == this.field.all){
                    return false;
                }else if(this.field.all == 0){
                    return false;
                }
            }else if(this.url_show_block == 'user-list'){
                if(this.user.cur == this.user.all){
                    return false;
                }else if(this.user.all == 0){
                    return false;
                }
            }
            return true;
       	},
        showFirst: function(){ // 顯示分頁的上一頁按鈕
            if(this.url_show_block == 'language-list'){
                if(this.lang.cur == 1){
                    return false;
                }else if(this.lang.all == 0){
                    return false;
                }
            }else if(this.url_show_block == 'transaction-list'){
                if(this.tran.cur == 1){
                    return false;
                }else if(this.tran.all == 0){
                    return false;
                }
            }else if(this.url_show_block == 'field-list'){
                if(this.field.cur == 1){
                    return false;
                }else if(this.field.all == 0){
                    return false;
                }
            }else if(this.url_show_block == 'user-list'){
                if(this.user.cur == 1){
                    return false;
                }else if(this.user.all == 0){
                    return false;
                }
            }
            return true;
        },
        infiniteScroll:function(){
            let self = this;
            if(self.url_show_block == 'bbin-list'){
                return self.bbin.busy;
            }else if(self.url_show_block == 'bbos-list'){
                return self.bbos.busy;
            }else{
                return true;
            }
        } 
   	},
    methods: {
        //上傳檔案
        // submitFile:function(type){
        //     let self = this;
        //     let json = $('textarea[name=file_q]').val();
        //     axios.post( '/batch/import-excel/language',JSON.parse(json))
        //         .then(function (response) {
        //             if (response.data.result == 'ok') {
        //                 self.notification('批量新增成功','success');
        //             }else{
        //                 self.notification(response.data.result,'failure');
        //             }
        //         })
        //         .catch(function (response) {
        //             self.notification(response,'failure');
        //         });
        // },
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        ////////// 初 ////////// 始 ////////// 化 ////////// 相關 /////////
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
    	// 跳頁到列表頁，並且初始化
        init: function () {
            let self = this;
            self.page = 'list';
            if(self.url_show_block == 'bbin-list'){
                self.initBbinSetting();
            }else if(self.url_show_block == 'bbos-list'){
                self.initBbosSetting();
            }else if(self.url_show_block == 'language-list'){
                self.initLanguageSetting();
            }else if(self.url_show_block == 'field-list'){
                self.initFieldSetting();
            }else if(self.url_show_block == ''){
                self.initBbinSetting();
                self.initBbosSetting();
                self.initLanguageSetting();
                self.initFieldSetting();
            }
        },
        // 初始化bbin頁面相關設定
        initBbinSetting:function(){
            let self = this;
            // 初始化bbin相關設定
            self.bbin.create_questions = [];
            self.bbin.question = {};
            if(self.bbin.save_search_data.use){
                self.bbin.save_search_data.use = false;
                self.bbin.downloadQuestions = self.bbin.save_search_data.downloadQuestions;
                self.bbin.checked_question = self.bbin.save_search_data.checked_question;
                self.bbin.search_condition = self.bbin.save_search_data.search_condition;
                self.bbin.cur = self.bbin.save_search_data.cur;
                self.bbin.check = self.bbin.save_search_data.check;
                self.bbin.all = self.bbin.save_search_data.all;
                self.bbin.keyword = self.bbin.save_search_data.keyword;
                self.bbin.busy = self.bbin.save_search_data.busy;
            }else{
                self.bbin.downloadQuestions = [];
                self.bbin.checked_question = [];
                self.bbin.search_condition = {};
                self.bbin.cur = 1;
                self.bbin.check = 0;
                self.bbin.all = '';
                self.bbin.keyword = '';
                self.bbin.busy = false;
            }
            // 取消選擇問題
            $('.qa_content').removeClass('dom_none');
            $('.qa_input').addClass('dom_none');
        },
        // 初始化bbos頁面相關設定
        initBbosSetting:function(){
            let self = this;
            // 初始化bbos相關設定
            self.bbos.create_questions = [];
            self.bbos.question = {};
            if(self.bbos.save_search_data.use){
                self.bbos.save_search_data.use = false;
                self.bbos.downloadQuestions = self.bbos.save_search_data.downloadQuestions;
                self.bbos.checked_question = self.bbos.save_search_data.checked_question;
                self.bbos.search_condition = self.bbos.save_search_data.search_condition;
                self.bbos.cur = self.bbos.save_search_data.cur;
                self.bbos.check = self.bbos.save_search_data.check;
                self.bbos.all = self.bbos.save_search_data.all;
                self.bbos.keyword = self.bbos.save_search_data.keyword;
                self.bbos.busy = self.bbos.save_search_data.busy;
            }else{
                self.bbos.downloadQuestions = [];
                self.bbos.checked_question = [];
                self.bbos.search_condition = {};
                self.bbos.cur = 1;
                self.bbos.check = 0;
                self.bbos.all = '';
                self.bbos.keyword = '';
                self.bbos.busy = false;
            }
            // 取消選擇問題
            $('.qa_content').removeClass('dom_none');
            $('.qa_input').addClass('dom_none');
        },
        // 初始化翻譯語系頁面相關設定
        initLanguageSetting:function(){
            let self = this;
            // 初始化language相關設定
            self.lang.create_languages = [{field_lp:[],field_lpf: [],field_lc: [],field_lsc: [],lp_id:'',lpf_id: '',lc_id: '',lsc_id: '',lt_number:'',lt_taiwan:'',lt_china:'',lt_english:'',lt_japan:'',lt_korea:'',lt_vietnam:'',lt_thailand:'',lt_india:'',lt_spain:''}];
            self.lang.cur = 1;
            self.lang.language = {};
            self.lang.lang_field = [];
            self.lang.language_id = '';
            self.lang.dialogVisible = false;
            if(self.lang.save_search_data.use){
                self.lang.field_lp = self.lang.save_search_data.field_lp;
                self.lang.field_lpf = self.lang.save_search_data.field_lpf;
                self.lang.field_lc = self.lang.save_search_data.field_lc;
                self.lang.field_lsc = self.lang.save_search_data.field_lsc;
                self.lang.product_check = self.lang.save_search_data.product_check;
                self.lang.platform_check = self.lang.save_search_data.platform_check;
                self.lang.class_check = self.lang.save_search_data.class_check;
                self.lang.subclass_check = self.lang.save_search_data.subclass_check;
                self.lang.search_condition = self.lang.save_search_data.search_condition;
                self.lang.keyword = self.lang.save_search_data.keyword;
            }else{
                self.lang.product_check = -1;
                self.lang.platform_check = false;
                self.lang.class_check = false;
                self.lang.subclass_check = false;
                self.lang.field_lp = [];
                self.lang.field_lpf = [];
                self.lang.field_lc = [];
                self.lang.field_lsc = [];
                self.getLanguageProductField();
                self.lang.search_condition = {};
                self.lang.keyword = '';
            }
        },
        // 初始化欄位頁面相關設定
        initFieldSetting:function(){
            let self = this;
            // 初始化field相關設定
            self.filterText = '';
            self.field.create_item = false;
            self.field.modify_item = false;
            self.field.product_check = false;
            self.field.platform_check = false;
            self.field.class_check = false;
            self.field.subclass_check = false;
            self.field.item_product = false;
            self.field.item_platform = false;
            self.field.item_class = false;
            self.field.item_subclass = false;
            self.field.remove_item = {};
        },
        // 初始化使用者頁面相關設定
        initUserSetting:function(){
            let self = this;
            // 初始化user相關設定
        },
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        ////////// 取 ////////// 值 ////////// 相 ////////// 關 ///////////
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        // 更新該頁面的資料
        updatePageData:function(){
            let self = this;
            if(self.url_show_block == 'bbin-list'){
                self.getBbinQuestions();
            }else if(self.url_show_block == 'bbos-list'){
                self.getBbosQuestions();
            }else if(self.url_show_block == 'language-list'){
                self.getLanguages();
            }else if(self.url_show_block == 'field-list' && self.user_status){
                self.getFields();
            }else if(self.url_show_block == 'user-list' && self.user_status){
                self.getUsers();
            }
        },
        // 取BBIN提問資料
        getBbinQuestions: function(){
            let self = this;
            axios.get('/questions/BBIN')
                .then(function (response) {
                    self.bbin.questions  = response.data;
                    self.bbin.questions_backup  = response.data;
                    self.bbin.all = Math.ceil(self.bbin.questions.length / self.bbin.limit);
                    self.showNowList('bbin');
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 取BBIN提問的分類欄位資料
        getBbinQuestionField:function(){
            let self = this;
            axios.get('/field-question/BBIN')
                .then(function (response) {
                    self.bbin.question_field  = response.data;
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 取BBOS提問資料
        getBbosQuestions: function(){
            let self = this;
            axios.get('/questions/BBOS')
                .then(function (response) {
                    self.bbos.questions  = response.data;
                    self.bbos.questions_backup  = response.data;
                    self.bbos.all = Math.ceil(self.bbos.questions.length / self.bbos.limit);
                    self.showNowList('bbos');
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 取BBOS提問的分類欄位資料
        getBbosQuestionField:function(){
            let self = this;
            axios.get('/field-question/BBOS')
                .then(function (response) {
                    self.bbos.question_field  = response.data;
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 取語系所有資料
        getLanguages: function(){
            let self = this;
            axios.post('/languages',self.lang.search_condition)
                .then(function (response) {
                    self.lang.languages  = response.data;
                    self.lang.languages_backup  = response.data;
                    self.lang.all = Math.ceil(self.lang.languages.length / self.lang.limit);
                    $('td').hover(function(){
                        $(this).addClass('in');
                    },function(){
                        $(this).removeClass('in');
                    })
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 取語系欄位資料
        getLanguageProductField:function(){
            let self = this;
            axios.get('/field-language-product')
                .then(function (response) {
                    self.lang.field_lp  = response.data;
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 取語系欄位資料
        getFields:function(){
            let self = this;
            axios.post('/fields',self.field.page_list_class)
                .then(function (response) {
                    self.field.fields_backup = response.data
                    var lp_data = response.data.lp_data;
                    var lpf_data = response.data.lpf_data;
                    var lc_data = response.data.lc_data;
                    var lsc_data = response.data.lsc_data;
                    var f_data = [];
                    var id = 0;
                    for(var i = 0 ; i < lp_data.length ; i ++){
                        var lp_json = {};
                        lp_json = lp_data[i];
                        lp_json.id = id++;
                        lp_json.label = lp_data[i].lp_name;
                        lp_json.children = [];
                        lp_json.disabled = true;
                        for(var j = 0 ; j < lpf_data.length ; j ++){
                            var lpf_json = {};
                            lpf_json = lpf_data[j];
                            lpf_json.id = id++;
                            lpf_json.label = lpf_data[j].lpf_name;
                            lpf_json.children = [];
                            for(var k = 0 ; k < lc_data.length ; k ++){
                                var lc_json = {};
                                lc_json = lc_data[k];
                                lc_json.id = id++;
                                lc_json.label = lc_data[k].lc_name;
                                lc_json.children = [];
                                for(var l = 0 ; l < lsc_data.length ; l ++){
                                    var lsc_json = {};
                                    lsc_json = lsc_data[l];
                                    lsc_json.id = id++;
                                    lsc_json.label = lsc_data[l].lsc_name;
                                    if(lc_json.lc_id == lsc_data[l].lc_id){
                                        lc_json.children.push(lsc_json);
                                    }
                                }
                                if(lpf_json.lpf_id == lc_data[k].lpf_id){
                                    lpf_json.children.push(lc_json);
                                }
                            }
                            if(lp_json.lp_id == lpf_data[j].lp_id){
                                lp_json.children.push(lpf_json);
                            }
                        }
                        f_data.push(lp_json);
                    }
                    self.field.fields = f_data;
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 取使用者資料
        getUsers:function(){
            let self = this;
            axios.get('/users')
                .then(function (response) {
                    self.user.users  = response.data;
                    self.user.all = Math.ceil(self.user.users.length / self.user.limit);
                    self.user.number = parseInt(self.user.users.length);
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 取異動紀錄資料
        getTransactions: function(){
            let self = this;
            axios.get('/transactions')
                .then(function (response) {
                    self.tran.transactions  = response.data;
                    if(self.tran.transactions.length > 0){
                        for(var i=0 ; i<self.tran.transactions.length;i++){
                            var goal = self.tran.transactions[i].tr_goal;
                            var action = self.tran.transactions[i].tr_action;
                            self.tran.transactions[i].tr_goal_name = self.tran.tr_goal_name[goal-1];
                            self.tran.transactions[i].tr_goal_id_name = self.tran.tr_goal_id_name[goal-1];
                            self.tran.transactions[i].tr_action_name = self.tran.tr_action_name[action-1];
                        }
                    }
                    self.tran.all = Math.ceil(self.tran.transactions.length / self.tran.limit);
                    self.tran.number = parseInt(self.tran.transactions.length);
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        ////////// 暫 ////////// 存 ////////// 相 ////////// 關 ///////////
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        saveBbinSearchData:function(){
            let self = this;
            self.bbin.save_search_data.use = true;
            self.bbin.save_search_data.downloadQuestions = self.bbin.downloadQuestions;
            self.bbin.save_search_data.checked_question = self.bbin.checked_question;
            self.bbin.save_search_data.search_condition = self.bbin.search_condition;
            self.bbin.save_search_data.cur = self.bbin.cur;
            self.bbin.save_search_data.check = self.bbin.check;
            self.bbin.save_search_data.keyword = self.bbin.keyword;
            self.bbin.save_search_data.busy = self.bbin.busy;
        },
        saveBbosSearchData:function(){
            let self = this;
            self.bbos.save_search_data.use = true;
            self.bbos.save_search_data.downloadQuestions = self.bbos.downloadQuestions;
            self.bbos.save_search_data.checked_question = self.bbos.checked_question;
            self.bbos.save_search_data.search_condition = self.bbos.search_condition;
            self.bbos.save_search_data.cur = self.bbos.cur;
            self.bbos.save_search_data.check = self.bbos.check;
            self.bbos.save_search_data.keyword = self.bbos.keyword;
            self.bbos.save_search_data.busy = self.bbos.busy;
        },
        saveLanguageSearchData:function(){
            let self = this;
            self.lang.save_search_data.use = true;
            self.lang.save_search_data.field_lp = self.lang.field_lp;
            self.lang.save_search_data.field_lpf = self.lang.field_lpf;
            self.lang.save_search_data.field_lc = self.lang.field_lc;
            self.lang.save_search_data.field_lsc = self.lang.field_lsc;
            self.lang.save_search_data.product_check = self.lang.product_check;
            self.lang.save_search_data.platform_check = self.lang.platform_check;
            self.lang.save_search_data.class_check = self.lang.class_check;
            self.lang.save_search_data.subclass_check = self.lang.subclass_check;
            self.lang.save_search_data.search_condition = self.lang.search_condition;
            self.lang.save_search_data.keyword = self.lang.keyword;
        },
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // 查詢功能
        search: function (id = null) {
        	let self = this;
            setTimeout(function(){
                if(self.composing){
                    if(self.url_show_block == 'bbin-list'){
                        if(id == 'clear'){
                            $('.search_content').find('input[name=qa_content]').val('');
                        }
                        self.bbin.busy = false;
                        self.bbin.keyword = $('.search_content').find('input[name=qa_content]').val();
                        self.bbin.cur = 1;
                        var array_a = [];
                        for(var i = 0;i <　self.bbin.questions_backup.length;i++){
                            var ss = self.bbin.questions_backup[i].qa_content;
                            var tt = new RegExp($('.search_content').find('input[name=qa_content]').val(), "i");
                            self.bbin.search_condition.qa_content = $('.search_content').find('input[name=qa_content]').val();
                            if(ss.match(tt)){
                                if($('.search_class').find('input[name=qc_id]:checked').val() > 0){
                                    if(self.bbin.questions_backup[i].qc_id == $('.search_class').find('input[name=qc_id]:checked').val()){
                                        array_a.push(self.bbin.questions_backup[i]);
                                        self.bbin.search_condition.qc_id = $('.search_class').find('input[name=qc_id]:checked').val();
                                    }
                                }else if($('.search_class').find('input[name=qc_id]:checked').val() == 0){
                                    array_a.push(self.bbin.questions_backup[i]);
                                    self.bbin.search_condition.qc_id = '';
                                }
                            }
                        }
                        self.bbin.all = Math.ceil(array_a.length / self.bbin.limit);
                        self.bbin.questions = array_a;
                        self.showNowList('bbin');
                    }else if(self.url_show_block == 'bbos-list'){
                        if(id == 'clear'){
                            $('.search_content').find('input[name=qa_content]').val('');
                        }
                        self.bbos.busy = false;
                        self.bbos.keyword = $('.search_content').find('input[name=qa_content]').val();
                        self.bbos.cur = 1;
                        var array_a = [];
                        for(var i = 0;i <　self.bbos.questions_backup.length;i++){
                            var ss = self.bbos.questions_backup[i].qa_content;
                            var tt = new RegExp($('.search_content').find('input[name=qa_content]').val(), "i");
                            self.bbos.search_condition.qa_content = $('.search_content').find('input[name=qa_content]').val();
                            if(ss.match(tt)){
                                if($('.search_class').find('input[name=qc_id]:checked').val() > 0){
                                    if(self.bbos.questions_backup[i].qc_id == $('.search_class').find('input[name=qc_id]:checked').val()){
                                        array_a.push(self.bbos.questions_backup[i]);
                                        self.bbos.search_condition.qc_id = $('.search_class').find('input[name=qc_id]:checked').val();
                                    }
                                }else if($('.search_class').find('input[name=qc_id]:checked').val() == 0){
                                    array_a.push(self.bbos.questions_backup[i]);
                                    self.bbos.search_condition.qc_id = '';
                                }
                            }
                        }
                        self.bbos.all = Math.ceil(array_a.length / self.bbos.limit);
                        self.bbos.questions = array_a;
                        self.showNowList('bbos');
                    }else if(self.url_show_block == 'language-list'){
                        if(id == 'clear'){
                            $('.search_taiwan').find('input[name=lt_taiwan]').val('');
                        }
                        self.lang.keyword = $('.search_taiwan').find('input[name=lt_taiwan]').val();
                        self.lang.cur = 1;
                        self.lang.search_condition.lt_taiwan = $('.search_taiwan').find('input[name=lt_taiwan]').val();
                        var array_a = [];
                        var array_b = [];
                        var array_c = [];
                        var array_d = [];
                        var array_e = [];
                        var lp_id,lpf_id,lc_id,lsc_id,num;
                        if(self.lang.search_condition.lp_id){
                            lp_id = self.lang.search_condition.lp_id;
                        }else{
                            lp_id = false;
                        }
                        if(self.lang.search_condition.lpf_id){
                            lpf_id = self.lang.search_condition.lpf_id;
                        }else{
                            lpf_id = false;
                        }
                        if(self.lang.search_condition.lc_id){
                            lc_id = self.lang.search_condition.lc_id;
                        }else{
                            lc_id = false;
                        }
                        if(self.lang.search_condition.lsc_id){
                            lsc_id = self.lang.search_condition.lsc_id;
                        }else{
                            lsc_id = false;
                        }

                        for(var i = 0;i < self.lang.languages_backup.length ; i++){
                            var lpn = self.lang.languages_backup[i].lp_name;
                            var lpfn = self.lang.languages_backup[i].lpf_name;
                            var lcn = self.lang.languages_backup[i].lc_name;
                            var lscn = self.lang.languages_backup[i].lsc_name;
                            var ltt = self.lang.languages_backup[i].lt_taiwan;
                            var ltc = self.lang.languages_backup[i].lt_china;
                            var lte = self.lang.languages_backup[i].lt_english;
                            var ltj = self.lang.languages_backup[i].lt_japan;
                            var ltk = self.lang.languages_backup[i].lt_korea;
                            var ltv = self.lang.languages_backup[i].lt_vietnam;
                            var lttl = self.lang.languages_backup[i].lt_thailand;
                            var tt = new RegExp($('.search_taiwan').find('input[name=lt_taiwan]').val(), "i");
                            if(self.lang.search_condition.lt_taiwan.replace(/\s+/g,"") != '' || self.lang.search_condition.lp_id !=''){
                                lpn = lpn ? lpn.match(tt) : false;
                                lpfn = lpfn ? lpfn.match(tt) : false;
                                lcn = lcn ? lcn.match(tt) : false;
                                lscn = lscn ? lscn.match(tt) : false;
                                ltt = ltt ? ltt.match(tt) : false;
                                ltc = ltc ? ltc.match(tt) : false;
                                lte = lte ? lte.match(tt) : false;
                                ltj = ltj ? ltj.match(tt) : false;
                                ltk = ltk ? ltk.match(tt) : false;
                                ltv = ltv ? ltv.match(tt) : false;
                                lttl = lttl ? lttl.match(tt) : false;
                                if(lpn || lpfn || lcn || lscn || ltt || ltc || lte || ltj || ltk || ltv || lttl){
                                    if(lp_id && self.lang.languages_backup[i].lp_id == lp_id){
                                        if(lpf_id && self.lang.languages_backup[i].lpf_id == lpf_id){
                                            if(lc_id && self.lang.languages_backup[i].lc_id == lc_id){
                                                if(lsc_id && self.lang.languages_backup[i].lsc_id == lsc_id){
                                                    array_d.push(self.lang.languages_backup[i]);
                                                }else if(!lsc_id){
                                                    array_c.push(self.lang.languages_backup[i]);
                                                }else{
                                                }
                                            }else if(!lc_id){
                                                array_b.push(self.lang.languages_backup[i]);
                                            }
                                        }else if(!lpf_id){
                                            array_a.push(self.lang.languages_backup[i]);
                                        }
                                    }else{
                                        array_e.push(self.lang.languages_backup[i]);
                                    }
                                }
                            }
                        }
                        
                        if(lp_id && lp_id != -1 && !lpf_id && !lc_id && !lsc_id){
                            self.lang.languages = array_a;
                            self.lang.all = Math.ceil(array_a.length / self.lang.limit);
                        }else if(lp_id && lp_id != -1 && lpf_id && !lc_id && !lsc_id){
                            self.lang.languages = array_b;
                            self.lang.all = Math.ceil(array_b.length / self.lang.limit);
                        }else if(lp_id && lp_id != -1 && lpf_id && lc_id && !lsc_id){
                            self.lang.languages = array_c;
                            self.lang.all = Math.ceil(array_c.length / self.lang.limit);
                        }else if(lp_id && lp_id != -1 && lpf_id && lc_id && lsc_id){
                            self.lang.languages = array_d;
                            self.lang.all = Math.ceil(array_d.length / self.lang.limit);
                        }else if(lp_id == -1 || !lp_id){
                            self.lang.languages = array_e;
                            self.lang.all = Math.ceil(array_e.length / self.lang.limit);
                        }
                    }
                    // else if(self.url_show_block == 'field-list'){
                    //     self.field.keyword = $('.container-filter').find('input[name=keyword]').val();
                    //     self.field.page_list_class.keyword = $('.container-filter').find('input[name=keyword]').val();
                    //     var lp_data = self.field.fields_backup.lp_data;
                    //     var lpf_data = self.field.fields_backup.lpf_data;
                    //     var lc_data = self.field.fields_backup.lc_data;
                    //     var lsc_data = self.field.fields_backup.lsc_data;
                    //     var f_data = [];
                    //     var tt = new RegExp($('.container-filter').find('input[name=keyword]').val(), "i");
                    //     for(var i = 0 ; i < lp_data.length ; i ++){
                    //         var lp_json = {};
                    //         lp_json = lp_data[i];
                    //         lp_json.label = lp_data[i].lp_name;
                    //         lp_json.children = [];
                    //         for(var j = 0 ; j < lpf_data.length ; j ++){
                    //             var lpf_json = {};
                    //             lpf_json = lpf_data[j];
                    //             lpf_json.label = lpf_data[j].lpf_name;
                    //             lpf_json.children = [];
                    //             for(var k = 0 ; k < lc_data.length ; k ++){
                    //                 var lc_json = {};
                    //                 lc_json = lc_data[k];
                    //                 lc_json.label = lc_data[k].lc_name;
                    //                 lc_json.children = [];
                    //                 for(var l = 0 ; l < lsc_data.length ; l ++){
                    //                     var lsc_json = {};
                    //                     lsc_json = lsc_data[l];
                    //                     lsc_json.label = lsc_data[l].lsc_name;
                    //                     if(lc_json.lc_id == lsc_data[l].lc_id && lsc_json.label.match(tt)){
                    //                         lc_json.children.push(lsc_json);
                    //                     }
                    //                 }
                    //                 if((lpf_json.lpf_id == lc_data[k].lpf_id && lc_json.children.length > 0) || (lpf_json.lpf_id == lc_data[k].lpf_id && lc_json.label.match(tt))){
                    //                     lpf_json.children.push(lc_json);
                    //                 }
                    //             }
                    //             if((lp_json.lp_id == lpf_data[j].lp_id && lpf_json.children.length > 0) || (lp_json.lp_id == lpf_data[j].lp_id && lpf_json.label.match(tt))){
                    //                 lp_json.children.push(lpf_json);
                    //             }
                    //         }
                    //         if(lp_json.children.length > 0 || lp_json.label.match(tt)){
                    //             f_data.push(lp_json);
                    //         }
                    //     }
                    //     self.field.fields = f_data;
                    // }
                }
            },10)
        },
        // 語系欄位的查詢
        filterNode:function(value, data){
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // 麵包屑功能
        breadcrumb:function(data){
            let self = this;
            var string = '';
            if(data.lp_name){
                string = string + data.lp_name;
            }
            if(data.lpf_name){
                string = string + ' > ' + data.lpf_name;
            }
            if(data.lc_name){
                string = string + ' > ' + data.lc_name;
            }
            if(data.lsc_name){
                string = string + ' > ' + data.lsc_name;
            }
            return string;
        },
        // 樹狀化資料監聽並設定 for field列表
        field_check:function(thisNode,selectedNodes){
            let self = this;
            if(self.field.fields_create_id == thisNode.id){
                self.field.fields_create_id = '';
                self.field.field = {};
                this.$refs.tree.setCheckedKeys([],true)
            }else{
                self.field.fields_create_id = thisNode.id;
                self.field.field = thisNode;
                this.$refs.tree.setCheckedKeys([thisNode.id],true)
            }

        },
        // 樹狀化資料監聽並設定 for language列表
        lang_check:function(thisNode,selectedNodes){
            let self = this;
            if(self.page == 'modify'){
                self.lang.language_id = thisNode.id;
                self.lang.language.lp_id = thisNode.lp_id;
                self.lang.language.lpf_id = thisNode.lpf_id;
                self.lang.language.lc_id = thisNode.lc_id;
                self.lang.language.lsc_id = thisNode.lsc_id;
                self.lang.language.lp_name = thisNode.lp_name;
                self.lang.language.lpf_name = thisNode.lpf_name;
                self.lang.language.lc_name = thisNode.lc_name;
                self.lang.language.lsc_name = thisNode.lsc_name;
            }else if(self.page == 'create'){
                self.lang.create_languages[self.lang.create_lang_item].lp_id = thisNode.lp_id;
                self.lang.create_languages[self.lang.create_lang_item].lpf_id = thisNode.lpf_id;
                self.lang.create_languages[self.lang.create_lang_item].lc_id = thisNode.lc_id;
                self.lang.create_languages[self.lang.create_lang_item].lsc_id = thisNode.lsc_id;
                self.lang.create_languages[self.lang.create_lang_item].lp_name = thisNode.lp_name;
                self.lang.create_languages[self.lang.create_lang_item].lpf_name = thisNode.lpf_name;
                self.lang.create_languages[self.lang.create_lang_item].lc_name = thisNode.lc_name;
                self.lang.create_languages[self.lang.create_lang_item].lsc_name = thisNode.lsc_name;
                self.lang.create_languages[self.lang.create_lang_item].id = thisNode.id;
            }
            this.$refs.tree.setCheckedKeys([thisNode.id],true);
        },
        // 重置語系翻譯新增功能的欄位選單
        resetLangField:function(){
            let self = this;
            var lp_data = self.field.fields_backup.lp_data;
            var lpf_data = self.field.fields_backup.lpf_data;
            var lc_data = self.field.fields_backup.lc_data;
            var lsc_data = self.field.fields_backup.lsc_data;
            var f_data = [];
            var id = 0;
            for(var i = 0 ; i < lp_data.length ; i ++){
                var lp_json = {};
                lp_json = lp_data[i];
                lp_json.id = id++;
                lp_json.label = lp_data[i].lp_name;
                lp_json.children = [];
                lp_json.disabled = false;
                for(var j = 0 ; j < lpf_data.length ; j ++){
                    var lpf_json = {};
                    lpf_json = lpf_data[j];
                    lpf_json.id = id++;
                    lpf_json.label = lpf_data[j].lpf_name;
                    lpf_json.children = [];
                    for(var k = 0 ; k < lc_data.length ; k ++){
                        var lc_json = {};
                        lc_json = lc_data[k];
                        lc_json.id = id++;
                        lc_json.label = lc_data[k].lc_name;
                        lc_json.children = [];
                        for(var l = 0 ; l < lsc_data.length ; l ++){
                            var lsc_json = {};
                            lsc_json = lsc_data[l];
                            lsc_json.id = id++;
                            lsc_json.label = lsc_data[l].lsc_name;
                            if(lc_json.lc_id == lsc_data[l].lc_id){
                                lc_json.children.push(lsc_json);
                            }
                        }
                        if(lpf_json.lpf_id == lc_data[k].lpf_id){
                            lpf_json.children.push(lc_json);
                        }
                    }
                    if(lp_json.lp_id == lpf_data[j].lp_id){
                        lp_json.children.push(lpf_json);
                    }
                }
                f_data.push(lp_json);
            }
            self.lang.lang_field = f_data;
        },
        // 加載數據
        loadMore: function(){
            let self = this; 
            if(self.url_show_block == 'bbin-list'){
                if(self.bbin.questions.length > 0){
                    // self.bbin.busy = false;
                    self.bbin.cur = self.bbin.cur +1;
                    setTimeout(() => {
                        $('.qa_content').removeClass('dom_none');
                        $('.qa_input').addClass('dom_none');
                        setTimeout(() => {
                            for(var i = 0 ; i < self.bbin.checked_question.length ; i++){
                                var qa_id = self.bbin.checked_question[i].qa_id;
                                var qa_content = self.bbin.checked_question[i].qa_content;
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').find('input').val(qa_content);
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_content').addClass('dom_none');
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').removeClass('dom_none');
                            }
                            if(self.bbin.questions.length > self.bbin.cur * self.bbin.limit){
                                self.bbin.busy = false;
                            }else{
                                self.bbin.busy = true;
                            }
                        }, 200);
                    }, 50);
                }
            }else if(self.url_show_block == 'bbos-list'){
                if(self.bbos.questions.length > 0){
                    // self.bbos.busy = false;
                    self.bbos.cur = self.bbos.cur +1;
                    setTimeout(() => {
                        $('.qa_content').removeClass('dom_none');
                        $('.qa_input').addClass('dom_none');
                        setTimeout(() => {
                            for(var i = 0 ; i < self.bbos.checked_question.length ; i++){
                                var qa_id = self.bbos.checked_question[i].qa_id;
                                var qa_content = self.bbos.checked_question[i].qa_content;
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').find('input').val(qa_content);
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_content').addClass('dom_none');
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').removeClass('dom_none');
                            }
                            if(self.bbos.questions.length > self.bbos.cur * self.bbos.limit){
                                self.bbos.busy = false;
                            }else{
                                self.bbos.busy = true;
                            }
                        }, 200);
                    }, 50);
                }
            }    
        },
        // 檢查是否登入
        checkUserStatus: function(){
            let self = this;
            axios.get('/userstatus')
                .then(function (response) {
                    if(response.data.user_status){
                        self.user_status = true;
                        self.user_data = response.data.user_data;
                    }else{
                        self.user_status = false;
                    }
                    self.checkUrl();
                    if(self.user_status){
                        // 取語系各欄位的資料
                        self.getFields();
                        // 取使用者資料
                        self.getUsers();
                        // 取異動紀錄資料
                        self.getTransactions();
                    }
                })
                .catch(function (response) {
                    self.notification(response,'failure');
                });
        },
        // 檢查該使用者是否可以瀏覽該頁面
        checkUrl:function(){
            let self = this;
            let url = new URL(location.href);
            var array = url.hash.split("#/");
            if(array[1] != ''){
                self.url_show_block = array[1];
            }else if(array[1] == ''){
                self.url_show_block = 'bbin-list';
                this.$router.replace('/bbin-list');
            }
        },
        // 切換頁面
        changePage:function(page){
            let self = this;
            // 順便清除語系欄位的搜尋關鍵字
            self.filterText = '';
            if(page != self.url_show_block){
                if(self.url_show_block == 'language-list'){
                    self.initLanguageSetting();
                    self.lang.languages = self.lang.languages_backup;
                    self.lang.all = Math.ceil(self.lang.languages_backup.length / self.lang.limit)
                }else if(self.url_show_block == 'bbin-list'){
                    self.initBbinSetting();
                    self.bbin.questions  = self.bbin.questions_backup;
                    self.bbin.all = Math.ceil(self.bbin.questions.length / self.bbin.limit);
                    self.showNowList('bbin');
                }else if(self.url_show_block == 'bbos-list'){
                    self.initBbosSetting();
                    self.bbos.questions  = self.bbos.questions_backup;
                    self.bbos.all = Math.ceil(self.bbos.questions.length / self.bbos.limit);
                    self.showNowList('bbos');
                }
                self.$router.replace('/'+page);
                self.url_show_block = page;
            }
        },
        // 加載數據
        showNowList: function(type){
            let self = this;
            if(type == 'bbin'){
                if(self.bbin.questions.length > 0){
                    self.bbin.cur = self.bbin.cur +1;
                    setTimeout(() => {
                        $('.qa_content').removeClass('dom_none');
                        $('.qa_input').addClass('dom_none');
                        setTimeout(() => {
                            for(var i = 0 ; i < self.bbin.checked_question.length ; i++){
                                var qa_id = self.bbin.checked_question[i].qa_id;
                                var qa_content = self.bbin.checked_question[i].qa_content;
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').find('input').val(qa_content);
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_content').addClass('dom_none');
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').removeClass('dom_none');
                            }
                        }, 200);
                    }, 50);
                }
            }else if(type == 'bbos'){
                if(self.bbos.questions.length > 0){
                    self.bbos.cur = self.bbos.cur +1;
                    setTimeout(() => {
                        $('.qa_content').removeClass('dom_none');
                        $('.qa_input').addClass('dom_none');
                        setTimeout(() => {
                            for(var i = 0 ; i < self.bbos.checked_question.length ; i++){
                                var qa_id = self.bbos.checked_question[i].qa_id;
                                var qa_content = self.bbos.checked_question[i].qa_content;
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').find('input').val(qa_content);
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_content').addClass('dom_none');
                                $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').removeClass('dom_none');
                            }
                        }, 200);
                    }, 50);
                }
            }
        },
        // 複製問題
        copyQuestion: function(content,id){
            let self = this;
            if(content){
                this.$copyText(content).then(function (e) {
                    $('input[name=qa_id][value='+id+']').parent('.qa_checkbox').siblings('td.qa_content').find('span').removeClass('none');
                    setTimeout(function(){ $('input[name=qa_id][value='+id+']').parent('.qa_checkbox').siblings('td.qa_content').find('span').addClass('none'); }, 1000);
                }, function (e) {
                    self.notification('複製出了問題！','failure');
                })
            }
        },
        // 複製語系
        copyLanguage: function(content,id,lang){
            if(content){
                this.$copyText(content).then(function (e) {
                    $('input[name=lt_id][value='+id+']').siblings('td.'+lang).find('span').removeClass('none');
                    setTimeout(function(){ $('input[name=lt_id][value='+id+']').siblings('td.'+lang).find('span').addClass('none'); }, 1000);
                }, function (e) {
                    self.notification('複製出了問題！','failure');
                })
            }
        },
        // 選擇問題
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
        // 下載問題
        download: function (){
            let self = this;
            var data = [];
            var boolean = true;
            var class_leng = $('.class_name').length;
            if(self.url_show_block == 'bbin-list'){
                data = self.bbin.checked_question;
            }else if(self.url_show_block == 'bbos-list'){
                data = self.bbos.checked_question;
            }
            
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
            if(data.length > 0){
                if(boolean){
                    $('.download_questions').find('input[name=dq_data]').val(JSON.stringify(resultdata));
                    $('.download_questions').find('input[name=_token]').val($('head').find('meta[name=csrf-token]').prop('content'));
                    $('.download_questions').submit();
                }else{
                    self.prompt('問題不能為空！','failure');
                }
            }
        },
        // 監聽搜尋框 注音輸入開始
        listen_input_start:function(){
            let self = this;
            self.composing = false;
        },
        // 監聽搜尋框 注音輸入結束
        listen_input_end:function(){
            let self = this;
            self.composing = true;
        },
        // 點擊產品欄位
        clickProductRadio: function(id){
            let self = this;
            if(id == -1){
                self.lang.search_condition.lp_id = -1;
                self.lang.search_condition.lpf_id = '';
                self.lang.search_condition.lc_id = '';
                self.lang.search_condition.lsc_id = '';
                self.lang.platform_check = false;
                self.lang.class_check = false;
                self.lang.subclass_check = false;
            }else if(!id){
                axios.get('/field-language-platform/1')
                    .then(function (response) {
                        self.lang.field_lpf = response.data;
                        if(self.lang.field_lpf.length > 0){
                            self.lang.platform_check = true;
                            self.lang.class_check = false;
                            self.lang.subclass_check = false;
                        }else{
                            self.lang.platform_check = false;
                            axios.post('/field-language-class', self.lang.search_condition)
                            .then(function (response) {
                                self.lang.field_lc = response.data;
                                if(self.lang.field_lc.length > 0){
                                    self.lang.class_check = true;
                                }else{
                                    self.lang.class_check = false;
                                }
                            })
                            .catch(function (response) {
                                self.notification(response,'failure');
                            });
                        }
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }else{
                self.lang.search_condition.lpf_id = '';
                self.lang.search_condition.lc_id = '';
                self.lang.search_condition.lsc_id = '';
                self.lang.search_condition.lp_id = id;
                var lp_id = id;
                axios.get('/field-language-platform/' + lp_id)
                    .then(function (response) {
                        self.lang.field_lpf = response.data;
                        if(self.lang.field_lpf.length > 0){
                            self.lang.platform_check = true;
                            self.lang.class_check = false;
                            self.lang.subclass_check = false;
                        }else if(self.page == 'list'){
                            self.lang.platform_check = false;
                            axios.post('/field-language-class', self.lang.search_condition)
                            .then(function (response) {
                                self.lang.field_lc = response.data;
                                if(self.lang.field_lc.length > 0){
                                    self.lang.class_check = true;
                                }else{
                                    self.lang.class_check = false;
                                }
                            })
                            .catch(function (response) {
                                self.notification(response,'failure');
                            });
                        }else if(self.page == 'modify' || self.page == 'create'){
                            self.lang.platform_check = false;
                            var data = {};
                            data.lp_id = $('input[name=lp_id]:checked').val();
                            axios.post('/field-language-class', data)
                            .then(function (response) {
                                self.lang.field_lc = response.data;
                                if(self.lang.field_lc.length > 0){
                                    self.lang.class_check = true;
                                }else{
                                    self.lang.class_check = false;
                                }
                            })
                            .catch(function (response) {
                                self.notification(response,'failure');
                            });
                        }
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }
        },
        // 點擊平台欄位
        clickPlatformRadio:function(id){
            let self = this;
            self.lang.search_condition.lc_id = '';
            self.lang.search_condition.lsc_id = '';
            if(id){
                var lpf_id = id;
                self.lang.search_condition.lpf_id = lpf_id;
                axios.get('/field-language-class/' + lpf_id)
                    .then(function(response){
                        self.lang.field_lc = response.data;
                        if(self.lang.field_lc.length > 0){
                            self.lang.class_check = true;
                            self.lang.subclass_check = false;
                        }else{
                            self.lang.class_check = false;
                            self.lang.subclass_check = false;
                        }
                    })
                    .catch(function(response){
                        self.notification(response,'failure');
                    });
            }
        },
        // 點擊分類欄位
        clickClassRadio:function(id){
            let self = this;
            self.lang.search_condition.lsc_id = '';
            if(id){
                var lc_id = id;
                self.lang.search_condition.lc_id = lc_id;
                axios.get('/field-language-subclass/' + lc_id)
                    .then(function(response){
                        self.lang.field_lsc = response.data;
                        if(self.lang.field_lsc.length > 0){
                            self.lang.subclass_check = true;
                        }else{
                            self.lang.subclass_check = false;
                        }
                    })
                    .catch(function(response){
                        self.notification(response,'failure');
                    });
            }
        },
        // 點擊子分類欄位
        clickSubClassRadio: function(id){
            let self = this;
            self.lang.search_condition.lsc_id = id;
        },
        // 顯示所有欄位
        changeViewField: function(){
            let self = this;
            var boolean = true;
            self.lang.field_display.taiwan = false;
            self.lang.field_display.china = false;
            self.lang.field_display.english = false;
            self.lang.field_display.japan = false;
            self.lang.field_display.korea = false;
            self.lang.field_display.vietnam = false;
            self.lang.field_display.thailand = false;
            self.lang.field_display.india = false;
            self.lang.field_display.spain = false;
            self.lang.field_display.product = false;
            self.lang.field_display.platform = false;
            self.lang.field_display.class = false;
            self.lang.field_display.subclass = false;
            self.lang.field_display.number =false;
            $('.view_field').find('input:checked').each(function(){
                if($(this).prop('value') == 1){
                    self.lang.field_display.taiwan = true;
                    boolean = false;
                }else if($(this).prop('value') == 2){
                    self.lang.field_display.china = true;
                    boolean = false;
                }else if($(this).prop('value') == 3){
                    self.lang.field_display.english = true;
                    boolean = false;
                }else if($(this).prop('value') == 4){
                    self.lang.field_display.japan = true;
                    boolean = false;
                }else if($(this).prop('value') == 5){
                    self.lang.field_display.korea = true;
                    boolean = false;
                }else if($(this).prop('value') == 6){
                    self.lang.field_display.vietnam = true;
                    boolean = false;
                }else if($(this).prop('value') == 7){
                    self.lang.field_display.thailand = true;
                    boolean = false;
                }else if($(this).prop('value') == 8){
                    self.lang.field_display.india = true;
                    boolean = false;
                }else if($(this).prop('value') == 9){
                    self.lang.field_display.spain = true;
                    boolean = false;
                }else if($(this).prop('value') == 10){
                    self.lang.field_display.product = true;
                    boolean = false;
                }else if($(this).prop('value') == 11){
                    self.lang.field_display.platform = true;
                    boolean = false;
                }else if($(this).prop('value') == 12){
                    self.lang.field_display.class = true;
                    boolean = false;
                }else if($(this).prop('value') == 13){
                    self.lang.field_display.subclass = true;
                    boolean = false;
                }else if($(this).prop('value') == 14){
                    self.lang.field_display.number = true;
                    boolean = false;
                }
            })
        },
        // 改變select裡的option
        change_select_option:function(string){
            $('.pages-wrap select option').eq(string - 1).prop('selected',true);
        },
        // 顯示語系欄位
        changeLanguageSystem: function(){
            let self = this;
            var boolean = true;
            self.lang.field_display.taiwan = false;
            self.lang.field_display.china = false;
            self.lang.field_display.english = false;
            self.lang.field_display.japan = false;
            self.lang.field_display.korea = false;
            self.lang.field_display.vietnam = false;
            self.lang.field_display.thailand = false;
            self.lang.field_display.india = false;
            self.lang.field_display.spain = false;
            $('.search_language').find('input:checked').each(function(){
                if($(this).prop('value') == 1){
                    self.lang.field_display.taiwan = true;
                    boolean = false;
                }else if($(this).prop('value') == 2){
                    self.lang.field_display.china = true;
                    boolean = false;
                }else if($(this).prop('value') == 3){
                    self.lang.field_display.english = true;
                    boolean = false;
                }else if($(this).prop('value') == 4){
                    self.lang.field_display.japan = true;
                    boolean = false;
                }else if($(this).prop('value') == 5){
                    self.lang.field_display.korea = true;
                    boolean = false;
                }else if($(this).prop('value') == 6){
                    self.lang.field_display.vietnam = true;
                    boolean = false;
                }else if($(this).prop('value') == 7){
                    self.lang.field_display.thailand = true;
                    boolean = false;
                }else if($(this).prop('value') == 8){
                    self.lang.field_display.india = true;
                    boolean = false;
                }else if($(this).prop('value') == 9){
                    self.lang.field_display.spain = true;
                    boolean = false;
                }
            })
            if(boolean){
                self.lang.field_display.taiwan = true;
                self.lang.field_display.china = true;
                self.lang.field_display.english = true;
                self.lang.field_display.japan = true;
                self.lang.field_display.korea = true;
                self.lang.field_display.vietnam = true;
                self.lang.field_display.thailand = true;
                self.lang.field_display.india = true;
                self.lang.field_display.spain = true;
            }
        },
        // 將時間原本是datetime改成只顯示date
        changeDateTimeToDate: function(datetime){
            let self = this;
            var array = datetime.split(" ");
            return array[0];
        },
        // 修改所選的問題資料的json
        changeSelectQuestion: function (qa_id,boolean){
            let self = this;
            var data = {};
            var ques = [];
            var new_q = true;

            if(self.url_show_block == 'bbin-list'){
                ques = self.bbin.checked_question;
            }else if(self.url_show_block == 'bbos-list'){
                ques = self.bbos.checked_question;
            }
            
            if(boolean){
                data.qa_id = qa_id;
                data.qa_content = $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qa_input').find('input').val();
                data.qc_name = $('.qa_checkbox input[value='+qa_id+']').parent('.qa_checkbox').siblings('.qc_name').find('input').val();
                for(var i = 0 ; i < ques.length ; i++){
                    if(ques[i].qa_id == qa_id){
                        ques[i].qa_content = data.qa_content;
                        new_q = false;
                    }
                }
                if(new_q){
                    ques.push(data);
                }
                if(self.url_show_block == 'bbin-list'){
                    self.bbin.checked_question = ques;
                }else if(self.url_show_block == 'bbos-list'){
                    self.bbos.checked_question = ques;
                }
            }else{
                for(var i = 0 ; i < ques.length ; i++){
                    if(ques[i].qa_id == qa_id){
                        ques.splice(i,1);
                    }
                }
                if(self.url_show_block == 'bbin-list'){
                    self.bbin.checked_question = ques;
                }else if(self.url_show_block == 'bbos-list'){
                    self.bbos.checked_question = ques;
                }
            }
        },
        // 隱藏欄位顯示與否
        show_or_not: function(){
            let self = this;
            if(self.lang.open_view_field){
                self.lang.open_view_field = false;
            }else{
                self.lang.open_view_field = true;
            }
            if(self.lang.start_use_view_field){
                self.lang.start_use_view_field = false;
            }else{
                self.lang.start_use_view_field = true;
            }
        },
        // 隱藏問題分類欄位修改頁
        hide_question_class:function(){
            self.btn_delete_class_save == false;
            self.btn_modify_class_save == false;
            self.btn_create_class_save == false;
            $('.field_class_item.active').removeClass('active');
        },
        // 顯示問題分類欄位修改頁
        show_question_class:function(id){
            let self = this;
            $('.modify_block').find('input[name=qc_id]').each(function(){
                if($(this).val() == id){
                    $(this).parent('.modify_block').find('input[name=qc_name]').val($(this).parent('.modify_block').siblings().find('span').text())
                    $(this).parent('.modify_block').css('background-color',$(this).parent('.modify_block').siblings().css('background-color'));
                    $(this).parents('.field_class_item').siblings().removeClass('active');
                    $(this).parents('.field_class_item').addClass('active');
                }
            });
        },
        // 頁碼點擊事件
        pageClick: function(){
            var data;
            $('.pages-wrap select option').each(function(){
                if($(this).prop('selected')){
                    data = $(this).val();
                }
            });
            if(data != this.lang.cur){
                this.lang.cur = data;
            }
        },
        // 語系新增頁面-點開數狀資訊的時候根據該筆資料顯示不同的欄位
        changeTreeChecked:function(id){
            let self = this;
            if(id){
                self.lang.expanded = [];
                self.lang.expanded.push(id);
                // this.$refs.tree.setCheckedKeys([id],true);
                self.lang.checked = [];
                self.lang.checked.push(id);
                self.lang.dialogVisible = true
            }else{
                self.lang.checked = [];
                self.lang.expanded = [];
                self.lang.dialogVisible = true
            }
        },
        // 語系新增頁面-新增一組資料欄位
        addOnemoreLanguage:function(data){
            let self = this;
            var json = {};
            if(data.lp_id){
                json.lp_id = data.lp_id;
                json.lp_name = data.lp_name;
            }else{
                json.lp_id = "";
                json.lp_name = "";
            }
            if(data.lpf_id){
                json.lpf_id = data.lpf_id;
                json.lpf_name = data.lpf_name;
            }else{
                json.lpf_id = "";
                json.lpf_name = "";
            }
            if(data.lc_id){
                json.lc_id = data.lc_id;
                json.lc_name = data.lc_name;
            }else{
                json.lc_id = "";
                json.lc_name = "";
            }
            if(data.lsc_id){
                json.lsc_id = data.lsc_id;
                json.lsc_name = data.lsc_name;
            }else{
                json.lsc_id = "";
                json.lsc_name = "";
            }
            if(data.id){
                json.id = data.id;
            }else{
                json.id = "";
            }
            json.lt_number = "";
            json.lt_english = "";
            json.lt_taiwan = "";
            json.lt_china = "";
            json.lt_japan = "";
            json.lt_korea = "";
            json.lt_vietnam = "";
            json.lt_thailand = "";
            json.lt_india = "";
            json.lt_spain = "";
            self.lang.create_languages.push(json);
            setTimeout(function(){
                self.add_check = true;
            }, 1000);
        },
        // 新增頁面-新增一組資料欄位
        add_onemore:function(type){// type：問題提問(question)或是語系翻譯(language)
            let self = this;
            if(type == 'question'){
                if(self.url_show_block == 'bbin-list'){
                    self.bbin.create_questions.push({qc_id:'',qa_type:1,qa_content:''});
                    self.bbin.create_questions[self.bbin.create_questions.length -1].qc_id = self.bbin.question_field[0].qc_id;
                }else if(self.url_show_block == 'bbos-list'){
                    self.bbos.create_questions.push({qc_id:'',qa_type:2,qa_content:''});
                    self.bbos.create_questions[self.bbos.create_questions.length -1].qc_id = self.bbos.question_field[0].qc_id;
                }
            }
            setTimeout(function(){
                self.add_check = true;
            }, 1000);
        },
        // 清除所選BBIN提問
        clearQuestions:function(){
            let self = this;
            if(self.url_show_block == 'bbin-list'){
                self.bbin.downloadQuestions = [];
                self.bbin.checked_question = [];
            }else if(self.url_show_block == 'bbos-list'){
                self.bbos.downloadQuestions = [];
                self.bbos.checked_question = [];    
            }
            $('.qa_content').removeClass('dom_none');
            $('.qa_input').addClass('dom_none');
        },
        // table內滾動滑鼠會變成左右移動
        onWheel:function(){
            let self = this;
            if((self.deltaY + window.event.deltaY + $( ".table_overflow" ).width()) >= $('.l_table').width()){
                self.deltaY = $('.l_table').width() - $( ".table_overflow" ).width();
            }else if( (self.deltaY + window.event.deltaY) < 0){
                self.deltaY = 0;
            }else{
                self.deltaY = self.deltaY + window.event.deltaY;
            }
            $( ".table_overflow" ).stop().animate({'scrollLeft':self.deltaY},10);
        },
        // 改變顯現筆數
        sortBy: function(){
            let self = this;
            if(self.url_show_block == 'language-list'){
                self.lang.all = Math.ceil(self.lang.transactions.length / self.lang.limit);
                if(self.lang.cur > self.lang.all){
                    self.lang.cur = self.lang.all;
                }
            }else if(self.url_show_block == 'transaction-list'){
                self.tran.all = Math.ceil(self.tran.transactions.length / self.tran.limit);
                if(self.tran.cur > self.tran.all){
                    self.tran.cur = self.tran.all;
                }
            }
        },
        // 回到最上面
        goTop:function(){
            $('html,body').animate({ 'scrollTop': 0 }, 250);
        },
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        ////////// 跳 ////////// 頁 ////////// 功 ////////// 能 ///////////
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        // 跳頁到修改頁
        page_modify: function(id,type) {// id：某筆資料的編號  type：問題提問(question)或是語系翻譯(language)或是語系欄位(field)或是使用者(user)
        	let self = this;
        	self.page = 'modify';
            self.btn_modify_save = false;
            if(type == 'question'){
                if(self.url_show_block == 'bbin-list'){
                    self.saveBbinSearchData();
                }else if(self.url_show_block == 'bbos-list'){
                    self.saveBbosSearchData();
                }
                axios.get('/question/'+id)
                    .then(function (response) {
                        if(self.url_show_block == 'bbin-list'){
                            self.bbin.question = response.data;
                            self.bbin.check = self.bbin.question.qc_id;
                        }else if(self.url_show_block == 'bbos-list'){
                            self.bbos.question = response.data;
                            self.bbos.check = self.bbos.question.qc_id;
                        }
                        
                    })
                    .catch(function (response) {
                        self.prompt(response.data.result,'failure',false);
                    });
            }else if(type == 'language'){
                self.saveLanguageSearchData();
                axios.get('/languages/'+id)
                    .then(function (response) {
                        self.lang.language = response.data;
                        var check_lp = false;
                        var check_lpf = false;
                        var check_lc = false;
                        var check_lsc = false;
                        if(self.lang.language.lp_id){
                            check_lp = true;
                        }
                        if(self.lang.language.lpf_id){
                            check_lpf = true;
                        }
                        if(self.lang.language.lc_id){
                            check_lc = true;
                        }
                        if(self.lang.language.lsc_id){
                            check_lsc = true;
                        }
                        var lp_data = self.field.fields_backup.lp_data;
                        var lpf_data = self.field.fields_backup.lpf_data;
                        var lc_data = self.field.fields_backup.lc_data;
                        var lsc_data = self.field.fields_backup.lsc_data;
                        var f_data = [];
                        var id = 0;
                        for(var i = 0 ; i < lp_data.length ; i ++){
                            var lp_json = {};
                            lp_json = lp_data[i];
                            lp_json.id = id++;
                            lp_json.label = lp_data[i].lp_name;
                            lp_json.children = [];
                            lp_json.disabled = false;
                            if(check_lp){
                                if(self.lang.language.lp_id == lp_data[i].lp_id){
                                    check_lp = lp_json.id;
                                }
                            }
                            for(var j = 0 ; j < lpf_data.length ; j ++){
                                var lpf_json = {};
                                lpf_json = lpf_data[j];
                                lpf_json.id = id++;
                                lpf_json.label = lpf_data[j].lpf_name;
                                lpf_json.children = [];
                                if(check_lpf){
                                    if(self.lang.language.lpf_id == lpf_data[j].lpf_id){
                                        check_lpf = lpf_json.id;
                                    }
                                }
                                for(var k = 0 ; k < lc_data.length ; k ++){
                                    var lc_json = {};
                                    lc_json = lc_data[k];
                                    lc_json.id = id++;
                                    lc_json.label = lc_data[k].lc_name;
                                    lc_json.children = [];
                                    if(check_lc){
                                        if(self.lang.language.lc_id == lc_data[k].lc_id){
                                            check_lc = lc_json.id;
                                        }
                                    }
                                    for(var l = 0 ; l < lsc_data.length ; l ++){
                                        var lsc_json = {};
                                        lsc_json = lsc_data[l];
                                        lsc_json.id = id++;
                                        lsc_json.label = lsc_data[l].lsc_name;
                                        if(check_lsc){
                                            if(self.lang.language.lsc_id == lsc_data[l].lsc_id){
                                                check_lsc = lsc_json.id;
                                            }
                                        }
                                        if(lc_json.lc_id == lsc_data[l].lc_id){
                                            lc_json.children.push(lsc_json);
                                        }
                                    }
                                    if(lpf_json.lpf_id == lc_data[k].lpf_id){
                                        lpf_json.children.push(lc_json);
                                    }
                                }
                                if(lp_json.lp_id == lpf_data[j].lp_id){
                                    lp_json.children.push(lpf_json);
                                }
                            }
                            f_data.push(lp_json);
                        }
                        if(check_lsc){
                            self.lang.checked = [check_lsc];
                            self.lang.expanded = [check_lsc];
                        }else if(check_lc){
                            self.lang.checked = [check_lc];
                            self.lang.expanded = [check_lc];
                        }else if(check_lpf){
                            self.lang.checked = [check_lpf];
                            self.lang.expanded = [check_lpf];
                        }else if(check_lp){
                            self.lang.checked = [check_lp];
                            self.lang.expanded = [check_lp];
                        }
                        self.lang.lang_field = f_data;
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }else if(type == 'field'){
                var f_data = id;
                axios.post('/field',f_data) // 這邊的id是個json
                    .then(function(response){
                        self.field.field  = response.data;
                        if(!f_data.lp_id){
                            self.prompt(response.data.result,'failure');
                        }else if(!f_data.lpf_id){ //產品欄位
                            self.field.modify_item = 1;
                            self.field.item_product = true;
                            self.field.item_platform = false;
                            self.field.item_class = false;
                            self.field.item_subclass = false;
                            self.field.product_check = f_data.lp_id;
                            self.field.platform_check = false;
                            self.field.class_check = false;
                            self.field.subclass_check = false;
                        }else if(!f_data.lc_id){ //平台欄位
                            self.field.modify_item = 2;
                            self.field.item_product = false;
                            self.field.item_platform = true;
                            self.field.item_class = false;
                            self.field.item_subclass = false;
                            self.field.product_check = f_data.lp_id;
                            self.field.platform_check = f_data.lpf_id;
                            self.field.class_check = false;
                            self.field.subclass_check = false;
                        }else if(!f_data.lsc_id){ //分類欄位
                            self.field.modify_item = 3;
                            self.field.item_product = false;
                            self.field.item_platform = false;
                            self.field.item_class = true;
                            self.field.item_subclass = false;
                            self.field.product_check = f_data.lp_id;
                            self.field.platform_check = f_data.lpf_id;
                            self.field.class_check = f_data.lc_id;
                            self.field.subclass_check = false;
                        }else{ //子分類欄位
                            self.field.modify_item = 4;
                            self.field.item_product = false;
                            self.field.item_platform = false;
                            self.field.item_class = false;
                            self.field.item_subclass = true;
                            self.field.product_check = f_data.lp_id;
                            self.field.platform_check = f_data.lpf_id;
                            self.field.class_check = f_data.lc_id;
                            self.field.subclass_check = f_data.lsc_id;
                        }
                    })
                    .catch(function(response){
                        self.notification(response,'failure');
                    });
            }else if(type == 'user'){
                axios.get('/users/'+id)
                    .then(function (response) {
                        self.user.user = response.data;
                        if(self.user.user.ud_status == 1){
                            $('input[name=ud_status]').prop('checked',true);
                        }
                        self.user.admin_check = self.user.user.ud_admin;
                    })
                    .catch(function (response) {
                        self.notification(response,'failure');
                    });
            }
        },
        // 跳頁到新增頁
        page_create: function(type) {// type：問題提問(question)或是語系翻譯(language)或是語系欄位(field)或是使用者(user)
        	let self = this;
        	self.page = 'create';
            self.btn_create_save = false;
            if(type == 'question'){
                if(self.url_show_block == 'bbin-list'){
                    self.saveBbinSearchData();
                }else if(self.url_show_block == 'bbos-list'){
                    self.saveBbosSearchData();
                }
                if(self.url_show_block == 'bbin-list'){
                    self.bbin.create_questions.push({qc_id:self.bbin.question_field[0].qc_id,qa_type:1,qa_content:''});
                }else if(self.url_show_block == 'bbos-list'){
                    self.bbos.create_questions.push({qc_id:self.bbos.question_field[0].qc_id,qa_type:2,qa_content:''});
                }
            }else if(type == 'language'){
                self.saveLanguageSearchData();
                self.resetLangField();
            }else if(type == 'field'){
                var lp_data = self.field.fields_backup.lp_data;
                var lpf_data = self.field.fields_backup.lpf_data;
                var lc_data = self.field.fields_backup.lc_data;
                var lsc_data = self.field.fields_backup.lsc_data;
                var f_data = [];
                var id = 0;
                for(var i = 0 ; i < lp_data.length ; i ++){
                    var lp_json = {};
                    lp_json = lp_data[i];
                    lp_json.id = id++;
                    lp_json.label = lp_data[i].lp_name;
                    lp_json.children = [];
                    lp_json.disabled = false;
                    for(var j = 0 ; j < lpf_data.length ; j ++){
                        var lpf_json = {};
                        lpf_json = lpf_data[j];
                        lpf_json.id = id++;
                        lpf_json.label = lpf_data[j].lpf_name;
                        lpf_json.children = [];
                        for(var k = 0 ; k < lc_data.length ; k ++){
                            var lc_json = {};
                            lc_json = lc_data[k];
                            lc_json.id = id++;
                            lc_json.label = lc_data[k].lc_name;
                            lc_json.children = [];
                            if(lpf_json.lpf_id == lc_data[k].lpf_id){
                                lpf_json.children.push(lc_json);
                            }
                        }
                        if(lp_json.lp_id == lpf_data[j].lp_id){
                            lp_json.children.push(lpf_json);
                        }
                    }
                    f_data.push(lp_json);
                }
                self.field.fields_create = f_data;
            }else if(type == 'user'){
                self.user.admin_check = 0;
            }
        },
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        ////////// 新 ////////// 增 ////////// 相 ////////// 關 ///////////
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        // 新增Bbin問題提問
        createBbinQuestion: function () {
        	let self = this;
            var boolean = true;
            for(var i = 0 ; i < self.bbin.create_questions.length ; i++){
                if(self.bbin.create_questions[i].qa_content == ''){
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
                axios.post('/question-create', self.bbin.create_questions)
                    .then(function (response) {
                        self.btn_create_save = false;
                        if (response.data.result == 'ok') {
                            self.bbin.save_search_data.use = false;
                            self.prompt('新增成功','success');
                            self.notification('新增成功','success');
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_create_save = false;
                        self.notification(response,'failure');
                    });
            }
        },
        // 新增Bbos問題提問
        createBbosQuestion: function () {
        	let self = this;
            var boolean = true;
            for(var i = 0 ; i < self.bbos.create_questions.length ; i++){
                if(self.bbos.create_questions[i].qa_content == ''){
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
                axios.post('/question-create', self.bbos.create_questions)
                    .then(function (response) {
                        self.btn_create_save = false;
                        if (response.data.result == 'ok') {
                            self.bbos.save_search_data.use = false;
                            self.prompt('新增成功','success');
                            self.notification('新增成功','success');
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_create_save = false;
                        self.notification(response,'failure');
                    });
            }
        },
        // 新增語系翻譯
        createLanguage:function(){
            let self = this;
            var boolean = true;
            for(var i = 0;i<self.lang.create_languages.length;i++){
                if(self.lang.create_languages[i].lt_taiwan == ''){
                    var string ='<div class="tip_block">'+
                                '<p>請務必填入繁體語系</p>'+
                            '</div>';
                    $('tbody tr').eq(i).find('input[name=lt_taiwan]').parent('.islabel_style').append(string);
                    $('.tip_block').hover(function(){
                        $(this).fadeOut(300,function(){
                            $(this).remove();
                        })
                    })
                    boolean = false;
                }
            }
            if(boolean){
                axios.post('/language-create', self.lang.create_languages)
                    .then(function (response) {
                        self.btn_create_save = false;
                        if (response.data.result == 'ok') {
                            self.lang.save_search_data.use = false;
                            self.prompt('新增成功','success');
                            self.notification('新增成功','success');
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_create_save = false;
                        self.notification(response,'failure');
                    });
            }
        },
        // 新增分類欄位
        createQuestionClass:function(){
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
                if(self.url_show_block == 'bbin-list'){
                    self.question_class.qa_type = 1; //BBIN分類
                }else if(self.url_show_block == 'bbos-list'){
                    self.question_class.qa_type = 2; //BBOS分類
                }
                
                axios.post('/field-create', self.question_class)
                    .then(function (response) {
                        self.create_class_block = false;
                        self.btn_create_class_save == false;
                        if (response.data.result == 'ok') {
                            // self.prompt('新增成功','success');
                            self.notification('新增成功','success');
                            if(self.url_show_block == 'bbin-list'){
                                self.getBbinQuestionField();
                            }else if(self.url_show_block == 'bbos-list'){
                                self.getBbosQuestionField();
                            }
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_create_class_save == false;
                        self.notification(response,'failure');
                    });
            }
        },
        // 新增語系欄位
        createField:function(){
            let self = this;
            var name = $('input[name=name').val();
            if(name == ''){
                var string ='<div class="tip_block">'+
                            '<p>請填入欄位名稱</p>'+
                        '</div>';
                $('.isname .islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
            }else{
                self.btn_create_save = true;    
                if(!self.field.field.lp_id){
                    self.field.field.fi_id = 1;
            		self.field.field.lp_name = name; 
                }else if(self.field.field.lc_id){
                    self.field.field.fi_id = 4;
            		self.field.field.lsc_name = name; 
                }else if(self.field.field.lpf_id){
                    self.field.field.fi_id = 3;
            		self.field.field.lc_name = name; 
                }else if(self.field.field.lp_id){
                    self.field.field.fi_id = 2;
            		self.field.field.lpf_name = name; 
                }
                axios.post('/field-create', self.field.field)
                    .then(function (response) {
                        self.btn_create_save = false;
                        if (response.data.result == 'ok') {
                            self.field.field = {};
                            self.prompt('新增成功','success');
                            self.notification('新增成功','success');
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_create_save = false;
                        self.notification(response,'failure');
                    });

            }            
        },
        // 新增使用者
        createUser:function(){
            let self = this;
            var boolean = true;
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
        		self.user.user.ud_account = $('input[name=ud_account]').val();
        		self.user.user.ud_password = $('input[name=ud_password]').val();
        		self.user.user.ud_name = $('input[name=ud_name]').val();
                if($('input[name=ud_status]').prop('checked')){
                    self.user.user.ud_status = 1;
                }else{
                    self.user.user.ud_status = 0;
                }
	        	self.user.user.ud_admin = $('input[name=ud_admin]:checked').val();
	        	axios.post('/user-create', self.user.user)
	                .then(function (response) {
                        self.btn_create_save = false;
	                    if (response.data.result == 'ok') {
                            self.prompt('新增成功','success');
                            self.notification('新增成功','success');
	                    }else{
	                    	self.prompt(response.data.result,'failure');
	                    }
	                })
	                .catch(function (response) {
                        self.btn_create_save = false;
	                    self.notification(response,'failure');
	                });
        	}
        },
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        ////////// 修 ////////// 改 ////////// 相 ////////// 關 ///////////
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        // 修改Bbin問題提問
        modifyBbinQuestion: function () {
            let self = this;
			$('.isclass').find('input[name=qc_id]').each(function(){
        		if($(this).prop('checked')){
        			self.bbin.question.qc_id = $(this).prop('value');
        		}
            });
        	self.bbin.question.qa_id = $('input[name=qa_id]').val();
        	self.bbin.question.qa_content = $('textarea[name=qa_content]').val();

            if(self.bbin.question.qc_id == ''){
                var string ='<div class="tip_block">'+
                                '<p>請選擇分類</p>'+
                            '</div>';
                $('.islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
        	}else if(self.bbin.question.qa_content == ''){
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
	            axios.post('/question-modify', self.bbin.question)
	                .then(function (response) {
                        self.btn_modify_save = false;
	                    if (response.data.result == 'ok') {
                            self.bbin.save_search_data.use = false;
                            self.prompt('修改成功','success');
                            self.notification('修改成功','success');
	                    }else{
                            self.prompt(response.data.result,'failure');
	                    }
	                })
	                .catch(function (response) {
                        self.btn_modify_save = false;
	                    self.notification(response,'failure');
	                });
            }
        },
        // 修改Bbos問題提問
        modifyBbosQuestion: function () {
            let self = this;
			$('.isclass').find('input[name=qc_id]').each(function(){
        		if($(this).prop('checked')){
        			self.bbos.question.qc_id = $(this).prop('value');
        		}
            });
        	self.bbos.question.qa_id = $('input[name=qa_id]').val();
        	self.bbos.question.qa_content = $('textarea[name=qa_content]').val();

            if(self.bbos.question.qc_id == ''){
                var string ='<div class="tip_block">'+
                                '<p>請選擇分類</p>'+
                            '</div>';
                $('.islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
        	}else if(self.bbos.question.qa_content == ''){
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
	            axios.post('/question-modify', self.bbos.question)
	                .then(function (response) {
                        self.btn_modify_save = false;
	                    if (response.data.result == 'ok') {
                            self.bbos.save_search_data.use = false;
                            self.prompt('修改成功','success');
                            self.notification('修改成功','success');
	                    }else{
                            self.prompt(response.data.result,'failure');
	                    }
	                })
	                .catch(function (response) {
                        self.btn_modify_save = false;
	                    self.notification(response,'failure');
	                });
            }
        },
        // 修改語系翻譯
        modifyLanguage:function(){
            let self = this;
            self.btn_modify_save = true;
            self.lang.language.lt_id = $('input[name=lt_id]').val();
            if(!self.lang.language.lpf_id){
                self.lang.language.lpf_id = '';
            }
            if(!self.lang.language.lc_id){
                self.lang.language.lc_id = '';
            }
            if(!self.lang.language.lsc_id){
                self.lang.language.lsc_id = '';
            }
            if($('input[name=lt_number]').val() && self.lang.language.lp_id != 6){
                self.lang.language.lt_number = $('input[name=lt_number]').val();
            }else{
                self.lang.language.lt_number = '';
            }
            self.lang.language.lt_taiwan = $('input[name=lt_taiwan]').val();
            self.lang.language.lt_china = $('input[name=lt_china]').val();
            self.lang.language.lt_english = $('input[name=lt_english]').val();
            self.lang.language.lt_japan = $('input[name=lt_japan]').val();
            self.lang.language.lt_korea = $('input[name=lt_korea]').val();
            self.lang.language.lt_vietnam = $('input[name=lt_vietnam]').val();
            self.lang.language.lt_thailand = $('input[name=lt_thailand]').val();
            self.lang.language.lt_india = $('input[name=lt_india]').val();
            self.lang.language.lt_spain = $('input[name=lt_spain]').val();
            axios.post('/language-modify', self.lang.language)
                .then(function (response) {
                    self.btn_modify_save = false;
                    if (response.data.result == 'ok') {
                        self.lang.save_search_data.use = false;
                        self.prompt('修改成功','success');
                        self.notification('修改成功','success');
                    }else{
                        self.prompt(response.data.result,'failure');
                    }
                })
                .catch(function (response) {
                    self.btn_modify_save = false;
                    self.notification(response,'failure');
                });
        },
        // 修改語系欄位
        modifyField:function(){
            let self = this;
            if(self.field.modify_item == 1){ // 修改產品
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
                    self.field.field.fi_id = self.field.modify_item;
                    self.field.field.lp_name = $('input[name=lp_name]').val();
                    axios.post('/field-modify', this.field.field)
                        .then(function (response) {
                            self.btn_modify_save = false;
                            if (response.data.result == 'ok') {
                                self.prompt('修改成功','success');
                                self.notification('修改成功','success');
                            }else{
                                self.prompt(response.data.result,'failure');
                            }
                        })
                        .catch(function (response) {
                            self.btn_modify_save = false;
                            self.notification(response,'failure');
                        });
                }
            }else if(self.field.modify_item == 2){ // 修改平台
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
                    self.field.field.fi_id = self.field.modify_item;
                    self.field.field.lpf_name = $('input[name=lpf_name]').val();
                    axios.post('/field-modify', this.field.field)
                        .then(function (response) {
                            self.btn_modify_save = false;
                            if (response.data.result == 'ok') {
                                self.prompt('修改成功','success');
                                self.notification('修改成功','success');
                            }else{
                                self.prompt(response.data.result,'failure');
                            }
                        })
                        .catch(function (response) {
                            self.btn_modify_save = false;
                            self.notification(response,'failure');
                        });
                }
            }else if(self.field.modify_item == 3){ // 修改分類
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
                    self.field.field.fi_id = self.field.modify_item;
                    self.field.field.lc_name = $('input[name=lc_name]').val();
                    axios.post('/field-modify', this.field.field)
                        .then(function (response) {
                            self.btn_modify_save = false;
                            if (response.data.result == 'ok') {
                                self.prompt('修改成功','success');
                                self.notification('修改成功','success');
                            }else{
                                self.prompt(response.data.result,'failure');
                            }
                        })
                        .catch(function (response) {
                            self.btn_modify_save = false;
                            self.notification(response,'failure');
                        });
                }
            }else if(self.field.modify_item == 4){ // 修改子分類
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
                    self.field.field.fi_id = self.field.modify_item;
                    self.field.field.lsc_name = $('input[name=lsc_name]').val();
                    axios.post('/field-modify', this.field.field)
                        .then(function (response) {
                            self.btn_modify_save = false;
                            if (response.data.result == 'ok') {
                                self.prompt('修改成功','success');
                                self.notification('修改成功','success');
                            }else{
                                self.prompt(response.data.result,'failure');
                            }
                        })
                        .catch(function (response) {
                            self.btn_modify_save = false;
                            self.notification(response,'failure');
                        });
                }
            }
        },
        // 修改使用者
        modifyUser:function(id){
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
        		self.user.user.ud_id = id;
        		if($('input[name=ud_password]').val() != ''){
	        		self.user.user.ud_password = $('input[name=ud_password]').val();
	        	}
	        	self.user.user.ud_name = $('input[name=ud_name]').val();
                if($('input[name=ud_status]').prop('checked')){
                    self.user.user.ud_status = 1;
                }else{
                    self.user.user.ud_status = 0;
                }
	        	self.user.user.ud_admin = $('input[name=ud_admin]:checked').val();
	        	axios.post('/user-modify', this.user.user)
	                .then(function (response) {
                        self.btn_modify_save = false;
	                    if (response.data.result == 'ok') {
                            self.prompt('修改成功','success');
                            self.notification('修改成功','success');
	                    }else{
                            self.prompt(response.data.result,'failure');
                            self.notification(response.data.result,'failure');
	                    }
	                })
	                .catch(function (response) {
                        self.btn_modify_save = false;
	                    self.notification(response,'failure');
	                });
        	}
        },
        // 修改分類欄位
        modifyQuestionClass:function(){
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
                if(self.url_show_block == 'bbin-list'){
                    self.question_class.qa_type = 1;
                }else if(self.url_show_block == 'bbos-list'){
                    self.question_class.qa_type = 2;
                }
                axios.post('/field-modify', this.question_class)
                    .then(function (response) {
                        self.btn_modify_class_save = false;
                        self.create_class_block = false;
                        if (response.data.result == 'ok') {
                            self.hide_question_class();
                            self.prompt('修改成功','success');
                            if(self.url_show_block == 'bbin-list'){
                                self.getBbinQuestionField();
                            }else if(self.url_show_block == 'bbos-list'){
                                self.getBbosQuestionField();
                            }
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_modify_class_save = false;
                        self.notification(response,'failure');
                    });
            }
        },
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        ////////// 刪 ////////// 除 ////////// 相 ////////// 關 ///////////
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        // 刪除問題提問
        removeQuestion: function (id,boolean) {
            let self = this;
            self.btn_delete_save = true;
            if(boolean){
                axios.get('/question-delete/' + id)
                    .then(function (response) {
                        self.btn_delete_save = false;
                        self.remove_btn = false;
                        if (response.data.result == 'ok') {
                            if(self.url_show_block == 'bbin-list'){
                                self.bbin.save_search_data.use = false;
                            }else if(self.url_show_block == 'bbos-list'){
                                self.bbos.save_search_data.use = false;
                            }
                            self.prompt('刪除成功','success');
                            self.notification('刪除成功','success');
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_delete_save = false;
                        self.remove_btn = false;
                        self.notification(response,'failure');
                    });
            }else{
                self.remove_btn = true;
                self.remove_id = id;
                self.prompt('確定要刪除此問題？','question');
                self.btn_delete_save = false;
            }
        },
        // 刪除語系翻譯
        removeLanguage: function (id,boolean) {
            let self = this;
            self.btn_delete_save = true;
            if(boolean){
                axios.get('/language-delete/' + id)
                    .then(function (response) {
                        self.remove_btn = false;
                        self.btn_delete_save = false;
                        if (response.data.result == 'ok') {
                            self.lang.save_search_data.use = false;
                            self.prompt('刪除成功','success');
                            self.notification('刪除成功','success');
                        }else{
                        	self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.btn_delete_save = false;
                        self.notification(response,'failure');
                        self.remove_btn = false;
                    });
            }else{

                self.remove_btn = true;
                self.remove_id = id;
                self.prompt('確定要刪除此語系翻譯？','question');
                self.btn_delete_save = false;
            }
        },
        // 刪除語系欄位
        removeField:function(data,boolean){
            let self = this;
            var field_array = {};
            self.btn_delete_save = true;
            if(boolean){
                if(!data.lpf_id){
                    field_array.fi_id = 1;
                }else if(!data.lc_id){
                    field_array.fi_id = 2;
                }else if(!data.lsc_id){
                    field_array.fi_id = 3;
                }else{
                    field_array.fi_id = 4;
                }
                field_array.lp_id = data.lp_id;
                field_array.lpf_id = data.lpf_id;
                field_array.lc_id = data.lc_id;
                field_array.lsc_id = data.lsc_id;
                axios.get('/field-delete/'+JSON.stringify(field_array))
                    .then(function (response) {
                        self.remove_btn = false;
                        self.btn_delete_save = false;
                        if (response.data.result == 'ok') {
                            self.prompt('刪除成功','success');
                            self.notification('刪除成功','success');
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.remove_btn = false;
                        self.btn_delete_save = false;
                        self.notification(response,'failure');
                    });
            }else{
                self.remove_btn = true;
                self.field.remove_item.lp_id = data.lp_id;
                self.field.remove_item.lpf_id = data.lpf_id;
                self.field.remove_item.lc_id = data.lc_id;
                self.field.remove_item.lsc_id = data.lsc_id;
                self.prompt('確定要刪除此欄位？','question');
                self.btn_delete_save = false;
            }
        },
        // 刪除使用者
        removeUser:function(id,boolean){
            let self = this;
            self.btn_delete_save = true;
            if(boolean){
                axios.get('/user-delete/' + id)
                    .then(function (response) {
                        self.remove_btn = false;
                        self.btn_delete_save = false;
                        if (response.data.result == 'ok') {
                            self.prompt('刪除成功','success');
                            self.notification('刪除成功','success');
                        }else{
                            self.prompt(response.data.result,'failure');
                        }
                    })
                    .catch(function (response) {
                        self.remove_btn = false;
                        self.btn_delete_save = false;
                        self.notification(response.data.result,'failure');
                    });
            }else{
                self.remove_btn = true;
                self.remove_id = id;
                self.prompt('確定要刪除這使用者？','question');
                self.btn_delete_save = false;
            }
        },
        // 刪除分類欄位
        removeQuestionClass:function(id){
            let self = this;
            self.question_class.fi_id = 5; //問題分類欄位
            self.question_class.qc_id = $('.field_class_item.active .modify_block').find('input[name=qc_id]').val();
            self.btn_delete_class_save = true;
            axios.post('/field-delete',this.question_class)
                .then(function (response) {
                    self.btn_delete_class_save = false;
                    self.create_class_block = false;
                    if (response.data.result == 'ok') {
                        self.hide_question_class();
                        self.prompt('刪除成功','success');
                        self.notification('刪除成功','success');
                        if(self.url_show_block == 'bbin-list'){
                            self.getBbinQuestionField();
                        }else if(self.url_show_block == 'bbos-list'){
                            self.getBbosQuestionField();
                        }
                    }else{
                        self.btn_delete_class_save = false;
                        self.prompt(response.data.result,'failure');
                    }
                })
                .catch(function (response) {
                    self.btn_delete_class_save = false;
                    self.notification(response.data.result,'failure');
                });
        },
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
        /////// 提 /////// 示 /////// 框 /////// 相 /////// 關 ////////
        //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
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
        // 關閉提示框
        prompt_fade_out:function(){
            $('.prompt_body_admin').fadeOut(400,function(){
                $('html').removeClass('over_hidden');
            });
            $('.overlay').fadeOut(400);
        },
        // 彈出提示框
        prompt:function(string,type){// string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
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
                var n = 2;
                $('.prompt_btn_group span').text(n);
                setTimeout(function(){
                    $('.prompt_btn_group span').text(n-1);
                    setTimeout(function(){
                        self.prompt_fade_out();
                        self.init();
                        self.updatePageData();
                    }, 1000);
                }, 1000);
            }else if(type == 'failure'){
                $('.prompt_logo').removeClass('success');
                $('.prompt_logo').removeClass('question');
                $('.prompt_logo i').removeClass('fa-check');
                $('.prompt_logo i').removeClass('fa-question');
                $('.prompt_logo i').addClass('fa-times');
                $('.prompt_logo').addClass('failure');
                var n = 2;
                $('.prompt_btn_group span').text(n);
                setTimeout(function(){
                    $('.prompt_btn_group span').text(n-1);
                    setTimeout(function(){
                        self.prompt_fade_out();
                    }, 1000);
                }, 1000);
            }
            $('.prompt_body_admin').fadeIn(400);
            $('html').addClass('over_hidden');
        },
        // 推撥提示框
        notification:function(string,type){
            if(type == 'success'){
                this.$notify({
                    title: '成功',
                    message: string,
                    position: 'bottom-right',
                    type:'success'
                });
            }else if(type == 'failure'){
                this.$notify({
                    title: '失敗',
                    message: string,
                    position: 'bottom-right',
                    type:'error'
                });
            }
            // if(type == 'success'){
            //     $('.remove_wrapper').find('i').removeClass('fa-times');
            //     $('.remove_wrapper').find('i').addClass('fa-check');
            //     $('.remove_wrapper').removeClass('failure');
            //     $('.remove_wrapper').addClass('success');
            //     $('.remove_wrapper span').text(string);
            //     $('.remove_wrapper').fadeIn(400);
            //     $('.remove_wrapper').hover(function(){
            //         $(this).fadeOut(400)
            //     })
            //     setTimeout(function(){
            //        $('.remove_wrapper').fadeOut(400);
            //     }, 5000);
            // }else if(type == 'failure'){
            //     $('.remove_wrapper').find('i').addClass('fa-times');
            //     $('.remove_wrapper').find('i').removeClass('fa-check');
            //     $('.remove_wrapper').addClass('failure');
            //     $('.remove_wrapper').removeClass('success');
            //     $('.remove_wrapper span').text(string);
            //     $('.remove_wrapper').fadeIn(400);
            //     $('.remove_wrapper').hover(function(){
            //         $(this).fadeOut(400)
            //     })
            //     setTimeout(function(){
            //        $('.remove_wrapper').fadeOut(400);
            //     }, 5000);
            // }
        },
    },
    watch: {
        // 語系欄位查詢功能專用 for element-ui
        filterText(val){
            this.$refs.tree.filter(val);
        }
    },
    mounted: function () {
        this.init();
    }
}
</script>