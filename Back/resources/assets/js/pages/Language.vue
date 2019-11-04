<style scoped>

</style>

<template>
	<!-- 語系列表 -->
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
                    <!-- <button type="button" class="btn_clear" @click="init(true)">清除</button> -->
                    <div class="search_content search_taiwan">
                        <i class="fa fa-search"></i>
                        <input type="text" placeholder="輸入關鍵字查詢" name="lt_taiwan" @input="search()" @compositionstart="listen_input_start()" @compositionend="listen_input_end()" :value=search_condition.lt_taiwan v-bind:class="{ 'notFound': list_languages.length == 0}">
                    </div>
                    <div class="search_condition">
                        <i class="fa fa-sliders"></i><p @click="flow_or_not()">篩選條件 FILTER</p>
                        <div class="flow_block">
                            <div class="islabel_style search_language">
                                <div class="search_title">語系</div>
                                <div class="search_item">
                                    <label v-for="field in field_ls">
                                        <input v-model="language_system_check" class="input_radio" type="checkbox" name="language_system" :value=field.ls_id @click="changeLanguageSystem()" ><span>{{field.ls_name}}</span>
                                    </label>
                                </div>
                            </div>
                            <div class="islabel_style" v-show="product_check && !open_advanced_search">
                                <div class="search_title">產品</div>
                                <div class="search_item">
                                    <label><input type="radio" class="input_radio" name="lp_id" :value=-1 @click="search(),clickProductRadio()" v-model="product_check"><span>全部</span></label>
                                    <label v-for="field in field_lp">
                                        <input type="radio" class="input_radio" name="lp_id" :value=field.lp_id @click="search(),clickProductRadio()" v-model="product_check"><span>{{field.lp_name}}</span>
                                    </label>
                                </div>
                            </div>
                            <div class="islabel_style" v-show="platform_check && !open_advanced_search">
                                <div class="search_title">平台</div>
                                <div class="search_item">
                                    <label v-for="field in field_lpf">
                                        <input type="radio" class="input_radio" name="lpf_id" :value=field.lpf_id @click="search(),clickPlatformRadio()" v-model="platform_check"><span>{{field.lpf_name}}</span>
                                    </label>
                                </div>
                            </div>
                            <div class="islabel_style" v-show="class_check && !open_advanced_search">
                                <div class="search_title">分類</div>
                                <div class="search_item">
                                    <label v-for="field in field_lc">
                                        <input type="radio" class="input_radio" name="lc_id" :value=field.lc_id @click="search(),clickClassRadio()" v-model="class_check"><span>{{field.lc_name}}</span>
                                    </label>
                                </div>
                            </div>
                            <div class="islabel_style" v-show="subclass_check && !open_advanced_search">
                                <div class="search_title">子分類</div>
                                <div class="search_item">
                                    <label v-for="field in field_lsc">
                                        <input type="radio" class="input_radio" name="lsc_id" :value=field.lsc_id @click="search()" v-model="subclass_check"><span>{{field.lsc_name}}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
		    	</div>
                <div class="title_style">
                    <h1>語系列表</h1>
                    <button type="button" title="新增" class="btn_create" @click="page_create()"><i class="fa fa-pencil"></i></button>
                </div>
                <div class="page-bar" v-if="list_languages.length != 0 && languages.length > limit && loading == false">
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
                <div class="table_block" v-if="loading == false" v-bind:class="{ 'nothing_to_show': list_languages.length == 0}">
                    <div class="view_field_block" @mouseenter="show_or_not()" @mouseleave="show_or_not()">
                        <div class="view_field_title">
                            <i class="fa fa-ellipsis-h"></i>
                        </div>
                        <div class="view_field islabel_style" v-show="open_view_field">
                            <label v-for="field in field_vf">
                                <input v-model="language_system_check" type="checkbox" name="language_system" class="input_radio" :value=field.vf_id @click="changeViewField()" ><span>{{field.vf_name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="table_overflow" @mousewheel="onWheel()" onmousewheel="return false;"><!-- 鎖定上下滾動的功能 -->
                        <table class="l_table">
                            <thead>
                                <tr>
                                    <th class="text_align_c">功能</th>
                                    <th class="text_align_l" v-show="field_display.product">產品</th>
                                    <th class="text_align_l" v-show="field_display.platform">平台</th>
                                    <th class="text_align_l" v-show="field_display.class">分類</th>
                                    <th class="text_align_l" v-show="field_display.subclass">子分類</th>
                                    <th class="text_align_l" v-show="field_display.number && product_check!=6">遊戲編號</th>
                                    <th class="text_align_l" v-show="field_display.taiwan">繁</th>
                                    <th class="text_align_l" v-show="field_display.china">簡</th>
                                    <th class="text_align_l" v-show="field_display.english">英</th>
                                    <th class="text_align_l" v-show="field_display.japan">日</th>
                                    <th class="text_align_l" v-show="field_display.korea">韓</th>
                                    <th class="text_align_l" v-show="field_display.vietnam">越</th>
                                    <th class="text_align_l" v-show="field_display.thailand">泰</th>
                                    <th class="text_align_l" v-show="field_display.india">印</th>
                                    <th class="text_align_l" v-show="field_display.spain">西</th>
                                    <th class="text_align_l">時間</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in list_languages">
                                    <td>
                                        <i class="fa fa-edit" @click="page_modify(data.lt_id)"></i>
                                        <i class="fa fa-trash" v-if="btn_delete_save"></i>
                                        <i class="fa fa-trash" @click="remove(data.lt_id,false)" v-else="btn_delete_save"></i>
                                    </td>
                                    <td class="hover_change_color" v-show="field_display.product" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lp_name}}</td>
                                    <td class="hover_change_color" v-show="field_display.platform" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lpf_name}}</td>
                                    <td class="hover_change_color" v-show="field_display.class" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lc_name}}</td>
                                    <td class="hover_change_color" v-show="field_display.subclass" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lsc_name}}</td>
                                    <td v-show="field_display.number && product_check!=6">{{data.lt_number}}</td>
                                    <td v-show="field_display.taiwan" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_taiwan}}</td>
                                    <td v-show="field_display.china" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_china}}</td>
                                    <td v-show="field_display.english" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_english}}</td>
                                    <td v-show="field_display.japan" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_japan}}</td>
                                    <td v-show="field_display.korea" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_korea}}</td>
                                    <td v-show="field_display.vietnam" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_vietnam}}</td>
                                    <td v-show="field_display.thailand" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_thailand}}</td>
                                    <td v-show="field_display.india" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_india}}</td>
                                    <td v-show="field_display.spain" v-highlight="{keyword: keyword,overWriteStyle:{color: '#EC4683'},sensitive:false}">{{data.lt_spain}}</td>
                                    <td>{{data.last_update_date}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="found_nothing" v-if="list_languages.length == 0 && loading == false">
                            查無任何資料
                        </div>
                    </div>
                </div>
				<div class="page-bar" v-if="list_languages.length != 0 && languages.length > limit && loading == false">
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
	<!-- 修改語系 -->
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
		     <h1>修改語系翻譯</h1>
		</div>
		<div class="content_block">
            <h3>設定</h3>
			<input type="hidden" name="lt_id" :value=language.lt_id>
	        <div class="isproduct" v-show="product_check">
                <div class="isproduct_title">產品</div>
                <div class="islabel_style">
                    <label v-for="field in field_lp">
                        <input type="radio" class="input_radio" @click="clickProductRadio()" name="lp_id" :value=field.lp_id v-model="product_check"><span>{{field.lp_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isplatform" v-show="platform_check">
                <div class="isplatform_title">平台</div>
                <div class="islabel_style">
                    <label v-for="field in field_lpf">
                        <input type="radio" class="input_radio" @click="clickPlatformRadio()" name="lpf_id" :value=field.lpf_id v-model="platform_check"><span>{{field.lpf_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isclass" v-show="class_check">
                <div class="isclass_title">分類</div>
                <div class="islabel_style">
                    <label v-for="field in field_lc">
                        <input type="radio" class="input_radio" @click="clickClassRadio()" name="lc_id" :value=field.lc_id v-model="class_check"><span>{{field.lc_name}}</span>
                    </label>
                </div>
            </div>
            <div class="issubclass" v-show="subclass_check">
                <div class="issubclass_title">子分類</div>
                <div class="islabel_style">
                    <label v-for="field in field_lsc">
                        <input type="radio" class="input_radio" name="lsc_id" :value=field.lsc_id v-model="subclass_check"><span>{{field.lsc_name}}</span>
                    </label>
                </div>
            </div>
            <div class="isnumber" v-show="product_check != 6">
                <div class="isnumber_title">遊戲編號</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_number" :value=language.lt_number>
                </div>
            </div>
	    </div>
        <div class="content_block">
            <h3>各國語系</h3>
            <div class="islanguage">
                <div class="islanguage_title">繁</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_taiwan" :value=language.lt_taiwan>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">簡</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_china" :value=language.lt_china>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">英</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_english" :value=language.lt_english>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">日</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_japan" :value=language.lt_japan>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">韓</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_korea" :value=language.lt_korea>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">越</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_vietnam" :value=language.lt_vietnam>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">泰</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_thailand" :value=language.lt_thailand>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">印</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_india" :value=language.lt_india>
                </div>
            </div>
            <div class="islanguage">
                <div class="islanguage_title">西</div>
                <div class="islabel_style">
                    <input class="" type="text" name="lt_spain" :value=language.lt_spain>
                </div>
            </div>
        </div>
		<div class="modify_button">
            <button type="button" class="btn_back" @click="return_page_list()">BACK 返回</button>
            <button type="button" class="btn_save" v-if="btn_modify_save">SAVE 存檔</button>
            <button type="button" class="btn_save" @click="modify()" v-else="btn_modify_save">SAVE 存檔</button>
        </div>
	</div>
	<!-- 新增語系 -->
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
            <h1 class="">新增語系翻譯</h1>
        </div>
        <div class="table_block">
            <div class="table_overflow" @mousewheel="onWheel()" onmousewheel="return false;"><!-- 鎖定上下滾動的功能 -->
                <table class="l_table">
                    <thead>
                        <tr>
                            <th class=""></th>
                            <th class="">產品</th>
                            <th class="">平台</th>
                            <th class="">分類</th>
                            <th class="">子分類</th>
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
                        <tr v-for="(data,key) in create_languages">
                            <td>
                                <i class="fa fa-plus" @click="add_onemore(),add_check = false" v-if="add_check"></i>
                                <i class="fa fa-plus" v-else="add_check"></i>
                                <i class="fa fa-trash" v-if="key != 0" @click="create_languages.splice(key,1)"></i>
                            </td>
                            <td class="">
                                <div class="islabel_style">
                                    <select name="lp_id" v-if="data.field_lp.length != 0" v-on:change="selectProductOption(key)" v-model="create_languages[key].lp_id">
                                        <option v-for="lp in data.field_lp" :value=lp.lp_id>{{lp.lp_name}}</option>
                                    </select>
                                    <select name="lp_id" v-else="data.field_lp.length == 0" disabled="disabled">
                                        <option>無</option>
                                    </select>
                                </div>
                            </td>
                            <td class="">
                                <div class="islabel_style">
                                    <select name="lpf_id" v-if="data.field_lpf.length != 0" v-on:change="selectPlatformOption(key)" v-model="create_languages[key].lpf_id">
                                        <option v-for="lpf in data.field_lpf" :value=lpf.lpf_id>{{lpf.lpf_name}}</option>
                                    </select>
                                    <select name="lpf_id" v-else="data.field_lpf.length == 0" disabled="disabled">
                                        <option>無</option>
                                    </select>
                                </div>
                            </td>
                            <td class="">
                                <div class="islabel_style">
                                    <select name="lc_id" v-if="data.field_lc.length != 0" v-on:change="selectClassOption(key)" v-model="create_languages[key].lc_id">
                                        <option v-for="lc in data.field_lc" :value=lc.lc_id>{{lc.lc_name}}</option>
                                    </select>
                                    <select name="lc_id" v-else="data.field_lc.length == 0" disabled="disabled">
                                        <option>無</option>
                                    </select>
                                </div>
                            </td>
                            <td class="">
                                <div class="islabel_style">
                                    <select name="lsc_id" v-if="data.field_lsc.length != 0" v-model="create_languages[key].lsc_id">
                                        <option v-for="lsc in data.field_lsc" :value=lsc.lsc_id>{{lsc.lsc_name}}</option>
                                    </select>
                                    <select name="lsc_id" v-else="data.field_lsc.length == 0" disabled="disabled">
                                        <option>無</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style" v-show="data.lp_id != 6">
                                    <input class="" type="text" name="lt_number" v-model="create_languages[key].lt_number">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_taiwan" v-model="create_languages[key].lt_taiwan">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_china" v-model="create_languages[key].lt_china">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_english" v-model="create_languages[key].lt_english">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_japan" v-model="create_languages[key].lt_japan">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_korea" v-model="create_languages[key].lt_korea">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_vietnam" v-model="create_languages[key].lt_vietnam">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_thailand" v-model="create_languages[key].lt_thailand">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_india" v-model="create_languages[key].lt_india">
                                </div>
                            </td>
                            <td>
                                <div class="islabel_style">
                                    <input class="" type="text" name="lt_spain" v-model="create_languages[key].lt_spain">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
		<div class="create_button">
			<button type="button" class="btn_back" @click="return_page_list()">BACK 返回</button>
            <button type="button" class="btn_save" v-if="btn_create_save">SAVE 存檔</button>
            <button type="button" class="btn_save" @click="create()" v-else="btn_create_save">SAVE 存檔</button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
        return {
            btn_modify_save: false,
            btn_create_save: false,
            btn_delete_save: false,
            add_check:true, // 防呆用，防止連按
            languages: [],
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
            language: {},
            field_display: {
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
            page_list_class: {
                lp_id: 1
            },
            create_languages:[
                {field_lp:[],field_lpf: [],field_lc: [],field_lsc: [],lp_id:'',lpf_id: '',lc_id: '',lsc_id: '',lt_number:'',lt_taiwan:'',lt_china:'',lt_english:'',lt_japan:'',lt_korea:'',lt_vietnam:'',lt_thailand:'',lt_india:'',lt_spain:''}
            ],
            // 篩選條件顯示
            start_use_view_field:false,
            open_view_field:false,
            open_advanced_search : false,
            advanced_search_height : 0, // 篩選條件縮小前的高度
            language_system_check: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
            hadSlice:false,
            field_lp: [],
            field_lpf: [],
            field_lc: [],
            field_lsc: [],
            search_condition: {
                language_system: '',
                lp_id: '',
                lpf_id: '',
                lc_id: '',
                lsc_id: '',
                lt_taiwan: ''
            },
            product_check: -1,
            platform_check: false,
            class_check: false,
            subclass_check: false,
            // end
            needReset: true,
            all: '', //總頁數
            number: '', //總筆數
            limit:10,
        	cur: 1, //當前頁碼
            remove_btn: null, //是否在提示框顯示刪除相關按鈕
            remove_id:null, //要被刪除的問題id
            // 搜尋資料暫存區
            save_search_data:{},
            keyword:'',
            deltaY:0,
            loading:true,
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
            self.page = 'list';
            self.loading = true; // 出現loading圖示
            if(boolean){
                self.btn_delete_save = false;
                self.btn_create_save = false;
                self.btn_modify_save = false;
            	self.needReset = true;
            	self.search_condition = { language: '',lp_id: '',lpf_id: '',lc_id: '',lsc_id: '',lt_taiwan: ''};
            	self.cur = 1;
                self.open_advanced_search = false;
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
                self.page_list_class.lp_id = 1;
                self.limit = 10;
                self.advanced_search_height = 0;
                self.create_languages = [];
            }
            if(self.needReset){
            	axios.post('/languages')
	                .then(function (response) {
	                    self.languages  = response.data;
	                    self.all = Math.ceil(self.languages.length / self.limit);
                        self.number = parseInt(self.languages.length);
                        setTimeout(function(){
                            self.loading = false;
                        },1000)
                        // self.loading = false; // 取消loading圖示
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
        //table內滾動滑鼠會變成左右移動
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
        //切換顯示產品資料
        change_tab: function(tab){
            let self = this;
            if(tab == 6){ // 廣告文宣不顯示遊戲編號的欄位
                var array = self.language_system_check;
                var index = array.indexOf(14);
                if (index > -1) {
                    array.splice(index, 1);
                    self.field_display.number = false;
                    self.hadSlice = true;
                    self.language_system_check = array;
                }
            }else{
                if(self.hadSlice){
                    self.language_system_check.push('14');
                    self.field_display.number = true;
                    self.hadSlice = false;
                }
            }
            if(self.page_list_class.lp_id != tab){
                self.page_list_class.lp_id = tab;
                self.cur = 1;
                axios.post('/languages',self.page_list_class)
                    .then(function (response) {
                        self.languages  = response.data;
                        self.all = Math.ceil(self.languages.length / self.limit);
                    })
                    .catch(function (response) {
                        self.prompt(response.data.result,'failure',false);
                    });
            }
        },
        //返回列表頁
        return_page_list: function(){
            let self = this;
            self.language = [];
            self.field_lp = self.save_search_data.field_lp;
            self.field_lpf = self.save_search_data.field_lpf;
            self.field_lc = self.save_search_data.field_lc;
            self.field_lsc = self.save_search_data.field_lsc;
            self.product_check = self.save_search_data.product_check;
            self.platform_check = self.save_search_data.platform_check;
            self.class_check = self.save_search_data.class_check;
            self.subclass_check = self.save_search_data.subclass_check;
            self.search_condition = self.save_search_data.search_condition;
            self.page = 'list';
        },
        //跳頁到新增頁
        page_create: function() {
        	let self = this;
            self.save_search_data.field_lp = self.field_lp;
            self.save_search_data.field_lpf = self.field_lpf;
            self.save_search_data.field_lc = self.field_lc;
            self.save_search_data.field_lsc = self.field_lsc;
            self.save_search_data.product_check = self.product_check;
            self.save_search_data.platform_check = self.platform_check;
            self.save_search_data.class_check = self.class_check;
            self.save_search_data.subclass_check = self.subclass_check;
            self.save_search_data.search_condition = self.search_condition;
            self.page = 'create';
            self.btn_create_save = false;
            axios.get('/field-language-product')
                .then(function (response) {
                    self.create_languages[0].field_lp  = response.data;
                    self.create_languages[0].lp_id = self.create_languages[0].field_lp[0].lp_id;
                    self.selectProductOption(0);
                })
                .catch(function (response) {
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //跳頁到修改頁
        page_modify: function(id) {
        	let self = this;
        	self.page = 'modify';
            self.btn_modify_save = false;
            self.save_search_data.field_lp = self.field_lp;
            self.save_search_data.field_lpf = self.field_lpf;
            self.save_search_data.field_lc = self.field_lc;
            self.save_search_data.field_lsc = self.field_lsc;
            self.save_search_data.product_check = self.product_check;
            self.save_search_data.platform_check = self.platform_check;
            self.save_search_data.class_check = self.class_check;
            self.save_search_data.subclass_check = self.subclass_check;
            self.save_search_data.search_condition = self.search_condition;
        	axios.get('/languages/'+id)
                .then(function (response) {
                    self.language = response.data;
                    if(self.language.lp_id){
                        self.product_check = self.language.lp_id;
                        axios.get('/field-language-product')
                            .then(function (response) {
                                self.field_lp  = response.data;
                            })
                            .catch(function (response) {
                                self.prompt(response.data.result,'failure',false);
                            });
                    }
                    if(self.language.lpf_id){
                        self.platform_check = self.language.lpf_id;
                        axios.get('/field-language-platform/'+self.language.lp_id)
                            .then(function(response){
                                self.field_lpf  = response.data;
                            })
                            .catch(function(response){
                                self.prompt(response.data.result,'failure',false);
                            });
                    }
                    if(self.language.lc_id){
                        self.class_check = self.language.lc_id;
                        if(self.language.lpf_id){
                            axios.get('/field-language-class/'+self.language.lpf_id)
                            .then(function(response){
                                self.field_lc  = response.data;
                            })
                            .catch(function(response){
                                self.prompt(response.data.result,'failure',false);
                            });
                        }else{
                            axios.post('/field-language-class',self.language)
                            .then(function(response){
                                self.field_lc  = response.data;
                            })
                            .catch(function(response){
                                self.prompt(response.data.result,'failure',false);
                            });
                        }
                    }
                    if(self.language.lsc_id){
                        self.subclass_check = self.language.lsc_id;
                        axios.get('/field-language-subclass/'+self.language.lc_id)
                            .then(function(response){
                                self.field_lsc  = response.data;
                            })
                            .catch(function(response){
                                self.prompt(response.data.result,'failure',false);
                            });
                    }
                })
                .catch(function (response) {
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //新增功能
        create: function () {
        	let self = this;
            var boolean = true;
            for(var i = 0;i<self.create_languages.length;i++){
                if(self.create_languages[i].lt_taiwan == ''){
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
                axios.post('/language-create', self.create_languages)
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
            if(!self.product_check){
                var string ='<div class="tip_block">'+
                                '<p>請選擇任意產品</p>'+
                            '</div>';
                $('.isproduct .islabel_style').append(string);
                $('.tip_block').hover(function(){
                    $(this).fadeOut(300,function(){
                        $(this).remove();
                    })
                })
            }else{
                self.btn_modify_save = true;
                self.language.lp_id = self.product_check;
                if($('input[name=lpf_id]:checked').val()){
                    self.language.lpf_id = $('input[name=lpf_id]:checked').val();
                }else{
                    self.language.lpf_id = '';
                }
                if($('input[name=lc_id]:checked').val()){
                    self.language.lc_id = $('input[name=lc_id]:checked').val();
                }else{
                    self.language.lc_id = '';
                }
                if($('input[name=lsc_id]:checked').val()){
                    self.language.lsc_id = $('input[name=lsc_id]:checked').val();
                }else{
                    self.language.lsc_id = '';
                }
                if($('input[name=lt_number]').val() && self.language.lp_id != 6){
                    self.language.lt_number = $('input[name=lt_number]').val();
                }else{
                    self.language.lt_number = '';
                }
                self.language.lt_taiwan = $('input[name=lt_taiwan]').val();
                self.language.lt_china = $('input[name=lt_china]').val();
                self.language.lt_english = $('input[name=lt_english]').val();
                self.language.lt_japan = $('input[name=lt_japan]').val();
                self.language.lt_korea = $('input[name=lt_korea]').val();
                self.language.lt_vietnam = $('input[name=lt_vietnam]').val();
                self.language.lt_thailand = $('input[name=lt_thailand]').val();
                self.language.lt_india = $('input[name=lt_india]').val();
                self.language.lt_spain = $('input[name=lt_spain]').val();
                axios.post('/language-modify', this.language)
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            // self.init(true);
                            self.language = {};
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
                axios.get('/language-delete/' + id)
                    .then(function (response) {
                        if (response.data.result == 'ok') {
                            // self.init(true);
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
                self.prompt('確定要刪除此語系翻譯？','question',false);
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
                        // console.log(self.search_condition);
                        axios.post('/languages', self.search_condition)
                            .then(function (response) {
                                self.languages = response.data;
                                self.all = Math.ceil(self.languages.length / self.limit);
                                self.number = parseInt(self.languages.length);
                                self.needReset = false
                            })
                            .catch(function (response) {
                                self.prompt(response.data.result,'failure',false);
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
                                self.prompt(response.data.result,'failure',false);
                            });
                        }
                    })
                    .catch(function (response) {
                        self.prompt(response.data.result,'failure',false);
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
                                self.prompt(response.data.result,'failure',false);
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
                                self.prompt(response.data.result,'failure',false);
                            });
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
                        self.prompt(response.data.result,'failure',false);
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
                        self.prompt(response.data.result,'failure',false);
                    });
            }
        },
        //新增頁面-新增一組資料欄位
        add_onemore:function(){
            let self = this;
            self.create_languages.push({field_lp:[],field_lpf: [],field_lc: [],field_lsc: [],lp_id:'',lpf_id: '',lc_id: '',lsc_id: '',lt_number:'',lt_taiwan:'',lt_china:'',lt_english:'',lt_japan:'',lt_korea:'',lt_vietnam:'',lt_thailand:'',lt_india:'',lt_spain:''});
            axios.get('/field-language-product')
                .then(function (response) {
                    self.create_languages[self.create_languages.length -1].field_lp  = response.data;
                    self.create_languages[self.create_languages.length -1].lp_id = self.create_languages[self.create_languages.length -1].field_lp[0].lp_id;
                    self.selectProductOption(self.create_languages.length -1);
                    self.add_check = true;
                })
                .catch(function (response) {
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //新增頁面-任一產品下拉發生改變
        selectProductOption: function(num){
            let self = this;
            var lp_id = self.create_languages[num].lp_id;
            //如果是廣告文宣的產品，要把遊戲編號清空
            if(lp_id == 6){
                self.create_languages[num].lt_number = '';
            }
            axios.get('/field-language-platform/' + lp_id)
                .then(function (response) {
                    if(response.data.length > 0){
                        self.create_languages[num].field_lpf = response.data;
                        self.create_languages[num].lpf_id = self.create_languages[num].field_lpf[0].lpf_id;
                        self.selectPlatformOption(num);
                    }else{
                        self.create_languages[num].field_lpf = [];
                        self.create_languages[num].field_lc = [];
                        self.create_languages[num].field_lsc = [];
                        self.create_languages[num].lpf_id = '';
                        self.create_languages[num].lc_id = '';
                        self.create_languages[num].lsc_id = '';
                    }
                })
                .catch(function (response) {
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //新增頁面-任一平台下拉發生改變
        selectPlatformOption:function(num){
            let self = this;
            var lpf_id = self.create_languages[num].lpf_id;
            axios.get('/field-language-class/' + lpf_id)
                .then(function(response){
                    if(response.data.length > 0){
                        self.create_languages[num].field_lc = response.data;
                        self.create_languages[num].lc_id = self.create_languages[num].field_lc[0].lc_id;
                        self.selectClassOption(num);
                    }else{
                        self.create_languages[num].field_lc = [];
                        self.create_languages[num].field_lsc = [];
                        self.create_languages[num].lc_id = '';
                        self.create_languages[num].lsc_id = '';
                    }
                })
                .catch(function(response){
                    self.prompt(response.data.result,'failure',false);
                });
        },
        //新增頁面-任一分類下拉發生改變
        selectClassOption:function(num){
            let self = this;
            var lc_id = self.create_languages[num].lc_id;
            axios.get('/field-language-subclass/' + lc_id)
                .then(function(response){
                    if(response.data.length > 0){
                        self.create_languages[num].field_lsc = response.data;
                        self.create_languages[num].lsc_id = self.create_languages[num].field_lsc[0].lsc_id;
                    }else{
                        self.create_languages[num].field_lsc = [];
                        self.create_languages[num].lsc_id = '';
                    }
                })
                .catch(function(response){
                    self.prompt(response.data.result,'failure',false);
                });
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
            if($('.view_field').find('input:checked').length == 0){
                boolean = false;
            }
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
        //隱藏篩選條件與否
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
        //隱藏欄位顯示與否
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
        //改變顯現筆數
        sortBy: function(){
            let self = this;
            self.all = Math.ceil(self.languages.length / self.limit);
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