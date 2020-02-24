<?php

namespace App\Http\Controllers\Web;

use Request;
use App\Http\Controllers\Controller;
use \Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Input;
use App\Library\CommonTools;
use Excel;
use DB;

class BatchImportController extends Controller {

    public function bigDataImport(){
        $searchdata = Request::all();
        $lt_r = new \App\Repositories\LanguageTranslationRepository;
        $lp_r = new \App\Repositories\Language_1productRepository;
        try {
            DB::beginTransaction();
            foreach ($searchdata as $key => $qqq) {
                if(!empty($qqq)){
                    // CommonTools::writeErrorLogByMessage($qqq[$key]);
                    $int_key = (int)$key + 1;
                    
                    // 檢查表格是否為問題提問的資料
                    // if(!isset($qqq['lp_id']) || !isset($qqq['lpf_id']) || !isset($qqq['lc_id']) || !isset($qqq['lsc_id']) || !isset($qqq['lt_taiwan']) || !isset($qqq['lt_china']) || !isset($qqq['lt_english']) || !isset($qqq['lt_japan']) || !isset($qqq['lt_korea']) || !isset($qqq['lt_vietnam']) || !isset($qqq['lt_thailand']) || !isset($qqq['lt_india']) || !isset($qqq['lt_spain'])){
                    //     DB::rollBack();
                    //     return CommonTools::returnData('導入失敗，請確定傳入的資料是否為翻譯語系的資料');
                    // }
                    if($qqq['lp_id'] == null && $qqq['lpf_id'] == null && $qqq['lc_id'] == null && $qqq['lsc_id'] == null && $qqq['lt_number'] == null && $qqq['lt_taiwan'] == null && $qqq['lt_china'] == null && $qqq['lt_english'] == null && $qqq['lt_japan'] == null && $qqq['lt_korea'] == null && $qqq['lt_vietnam'] == null && $qqq['lt_thailand'] == null && $qqq['lt_india'] == null && $qqq['lt_spain'] == null){
                        break;
                    }
                    // 這邊就是你資料庫裡面所有的欄位設定
                    if($qqq['lp_id'] == null || $qqq['lt_taiwan'] == null){
                        DB::rollBack();
                        return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料的必填欄位是否填寫');
                    }
                    // 檢查問題分類(qa_type)跟分類編號(qc_id)是否對得上
                    // if(!$q_data = $lp_r->getDataByRequestData($qqq)){
                    //     DB::rollBack();
                    //     return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料各欄位編號是否對得上，請參閱翻譯語系欄位樹狀圖');
                    // }
                    // 檢查所要新增的值是否已經存在
                    if($data = $lt_r->getDataByTaiwanData($qqq)){
                        continue;
                    }
                    $insert['lp_id'] = $qqq['lp_id'];
                    $insert['lpf_id'] = $qqq['lpf_id'];
                    $insert['lc_id'] = $qqq['lc_id'];
                    $insert['lsc_id'] = $qqq['lsc_id'];
                    // $insert['lt_number'] = $qqq['lt_number'];
                    $insert['lt_taiwan'] = $qqq['lt_taiwan'];
                    $insert['lt_china'] = $qqq['lt_china'];
                    $insert['lt_english'] = $qqq['lt_english'];
                    $insert['lt_japan'] = $qqq['lt_japan'];
                    $insert['lt_korea'] = $qqq['lt_korea'];
                    $insert['lt_vietnam'] = $qqq['lt_vietnam'];
                    $insert['lt_thailand'] = $qqq['lt_thailand'];
                    $insert['lt_india'] = $qqq['lt_india'];
                    // $insert['isflag'] = $qqq['isflag'];
                    if(!$request = $lt_r->create($insert)){
                        DB::rollBack();
                        return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料的欄位是否輸入錯誤');
                    }
                }
            }
            DB::commit();
            return CommonTools::returnData('ok');
        } catch (Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('未知錯誤');
        }
    }

    /**
     * 批量匯入的頁面
     */
    public function batchImport(){
        try {
            return View::make('batch/batchimport');
        } catch (Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('未知錯誤');
        }
    }

    /**
     * 導入資料到table
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function importExcel(Request $request,$type){
        try {
            if(Request::hasFile('file')){
                $path = Request::file('file')->getRealPath();
                $data = Excel::selectSheetsByIndex(0)->load($path, function($reader) {})->get();
                if(!empty($data) && $data->count()){
                    // 問題提問的上傳
                    if($type == 'question'){
                        $qa_r = new \App\Repositories\QuestionAskRepository;
                        $qc_r = new \App\Repositories\Question_1classRepository;
                        DB::beginTransaction();
                        foreach ($data as $key => $qqq) {
                            if(!empty($qqq)){
                                $int_key = (int)$key + 1;
                                // 檢查表格是否為問題提問的資料
                                if(!isset($qqq['qa_type']) || !isset($qqq['qc_id']) || !isset($qqq['qa_content'])){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，請確定傳入的資料是否為問題提問的資料');
                                }
                                // 檢查是否已經無資料了
                                if($qqq['qc_id'] == null && $qqq['qa_content'] == null && $qqq['qa_type'] == null){
                                    break;
                                }
                                // 檢查必填欄位是否傳入
                                if($qqq['qc_id'] == null || $qqq['qa_content'] == null || $qqq['qa_type'] == null){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料的必填欄位是否填寫');
                                }
                                // 檢查問題分類(qa_type)跟分類編號(qc_id)是否對得上
                                if(!$q_data = $qc_r->getDataByTypeId($qqq)){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料的問題分類跟分類編號是否對得上，請參閱問題提問欄位樹狀圖');
                                }
                                // 檢查所要新增的值是否已經存在
                                if($q_data = $qa_r->getDataByRequestData($qqq)){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，第'.$int_key.'筆資料已重複新增');
                                }
                                $insert['qc_id'] = $qqq['qc_id'];
                                $insert['qa_content'] = $qqq['qa_content'];
                                $insert['qa_type'] = $qqq['qa_type'];
                                if(!$request = $qa_r->create($insert)){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料的欄位是否輸入錯誤');
                                }
                            }
                        }
                        DB::commit();
                        return CommonTools::returnData('ok');
                    // 翻譯語系的上傳
                    }elseif($type == 'language'){
                        $lt_r = new \App\Repositories\LanguageTranslationRepository;
                        $lp_r = new \App\Repositories\Language_1productRepository;
                        DB::beginTransaction();
                        foreach ($data as $key => $qqq) {
                            if(!empty($qqq)){
                                $int_key = (int)$key + 1;
                                // 檢查表格是否為問題提問的資料
                                if(!isset($qqq['lp_id']) || !isset($qqq['lpf_id']) || !isset($qqq['lc_id']) || !isset($qqq['lsc_id']) || !isset($qqq['lt_number']) || !isset($qqq['lt_taiwan']) || !isset($qqq['lt_china']) || !isset($qqq['lt_english']) || !isset($qqq['lt_japan']) || !isset($qqq['lt_korea']) || !isset($qqq['lt_vietnam']) || !isset($qqq['lt_thailand']) || !isset($qqq['lt_india']) || !isset($qqq['lt_spain'])){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，請確定傳入的資料是否為翻譯語系的資料');
                                }
                                if($qqq['lp_id'] == null && $qqq['lpf_id'] == null && $qqq['lc_id'] == null && $qqq['lsc_id'] == null && $qqq['lt_number'] == null && $qqq['lt_taiwan'] == null && $qqq['lt_china'] == null && $qqq['lt_english'] == null && $qqq['lt_japan'] == null && $qqq['lt_korea'] == null && $qqq['lt_vietnam'] == null && $qqq['lt_thailand'] == null && $qqq['lt_india'] == null && $qqq['lt_spain'] == null){
                                    break;
                                }
                                // 這邊就是你資料庫裡面所有的欄位設定
                                if($qqq['lp_id'] == null || $qqq['lt_taiwan'] == null){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料的必填欄位是否填寫');
                                }
                                // 檢查問題分類(qa_type)跟分類編號(qc_id)是否對得上
                                if(!$q_data = $lp_r->getDataByRequestData($qqq)){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料各欄位編號是否對得上，請參閱翻譯語系欄位樹狀圖');
                                }
                                // 檢查所要新增的值是否已經存在
                                if($data = $lt_r->getDataByRequestData($qqq)){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，第'.$int_key.'筆資料已重複新增');
                                }
                                $insert['lp_id'] = $qqq['lp_id'];
                                $insert['lpf_id'] = $qqq['lpf_id'];
                                $insert['lc_id'] = $qqq['lc_id'];
                                $insert['lsc_id'] = $qqq['lsc_id'];
                                $insert['lt_number'] = $qqq['lt_number'];
                                $insert['lt_taiwan'] = $qqq['lt_taiwan'];
                                $insert['lt_china'] = $qqq['lt_china'];
                                $insert['lt_english'] = $qqq['lt_english'];
                                $insert['lt_japan'] = $qqq['lt_japan'];
                                $insert['lt_korea'] = $qqq['lt_korea'];
                                $insert['lt_vietnam'] = $qqq['lt_vietnam'];
                                $insert['lt_thailand'] = $qqq['lt_thailand'];
                                $insert['lt_india'] = $qqq['lt_india'];
                                $insert['lt_spain'] = $qqq['lt_spain'];
                                if(!$request = $lt_r->create($insert)){
                                    DB::rollBack();
                                    return CommonTools::returnData('導入失敗，請檢查第'.$int_key.'筆資料的欄位是否輸入錯誤');
                                }
                            }
                        }
                        DB::commit();
                        return CommonTools::returnData('ok');
                    }
                }
                return CommonTools::returnData('導入失敗，請檢查你導入的檔案是否有資料');
            }
            return CommonTools::returnData('導入失敗，請檢查你導入的檔案');
        } catch (Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('傳入的檔案有誤');
        }
    }

    /**
     * 導出並下載檔案
     * @param  Request $request [description]
     * @param  [type]  $type    [檔案格式]
     * @return [type]           [description]
     */
    public function exportExcel(Request $request, $type){
        $lp_r = new \App\Repositories\Language_1productRepository;
        $lpf_r = new \App\Repositories\Language_2platformRepository;
        $lc_r = new \App\Repositories\Language_3classRepository;
        $lsc_r = new \App\Repositories\Language_4subclassRepository;
        $qc_r = new \App\Repositories\Question_1classRepository;
        try {
            if($type == 'question'){
                $template = 'question_template';
                $string = '問題提問範本';
                if(count($qcdata = $qc_r->getAllData()) > 0){
                    $qctip = '';
                    foreach ($qcdata as $dd) {
                        $qctip = $qctip.$dd['qc_id'].':'.$dd['qc_name'].',';
                    }
                }else{
                    $qctip = '';
                }
                //第一排
                $data1['qc_id'] = '分類編號(必填)';
                $data1['qa_type'] = '問題分類(必填)';
                $data1['qa_content'] = '問題內容(必填)';
                //第二排
                $data2['qc_id'] = '請查閱翻譯欄位分布圖並填入相對應的qc_id';
                $data2['qa_type'] = '填入"1"為BBIN，填入"2"為BBOS';
                $data2['qa_content'] = '字數限制1000字';
                //第三排
                $data3['qc_id'] = 'qc_id';
                $data3['qa_type'] = 'qa_type';
                $data3['qa_content'] = 'qa_content';

                $result[0] = $data1;
                $result[1] = $data2;
                $result[2] = $data3;
            }else if($type == 'language'){
                $template = 'language_template';
                $string = '翻譯語系範本';
                //第一排
                $data1['lp_id'] = '產品編號(必填)';
                $data1['lpf_id'] = '平台編號';
                $data1['lc_id'] = '分類編號';
                $data1['lsc_id'] = '子分類編號';
                $data1['lt_number'] = '遊戲編號';
                $data1['lt_taiwan'] = '繁(必填)';
                $data1['lt_china'] = '簡';
                $data1['lt_english'] = '英';
                $data1['lt_japan'] = '日';
                $data1['lt_korea'] = '韓';
                $data1['lt_vietnam'] = '越';
                $data1['lt_thailand'] = '泰';
                $data1['lt_india'] = '印';
                $data1['lt_spain'] = '西';
                //第二排
                $data2['lp_id'] = '請查閱翻譯欄位分布圖並填入相對應的id';
                $data2['lpf_id'] = '請查閱翻譯欄位分布圖並填入相對應的id';
                $data2['lc_id'] = '請查閱翻譯欄位分布圖並填入相對應的id';
                $data2['lsc_id'] = '請查閱翻譯欄位分布圖並填入相對應的id';
                $data2['lt_number'] = '';
                $data2['lt_taiwan'] = '字數限制1000字';
                $data2['lt_china'] = '字數限制1000字';
                $data2['lt_english'] = '英字數限制1000字文字';
                $data2['lt_japan'] = '字數限制1000字';
                $data2['lt_korea'] = '字數限制1000字';
                $data2['lt_vietnam'] = '字數限制1000字';
                $data2['lt_thailand'] = '字數限制1000字';
                $data2['lt_india'] = '字數限制1000字';
                $data2['lt_spain'] = '字數限制1000字';
                //第三排
                $data3['lp_id'] = 'lp_id';
                $data3['lpf_id'] = 'lpf_id';
                $data3['lc_id'] = 'lc_id';
                $data3['lsc_id'] = 'lsc_id';
                $data3['lt_number'] = 'lt_number';
                $data3['lt_taiwan'] = 'lt_taiwan';
                $data3['lt_china'] = 'lt_china';
                $data3['lt_english'] = 'lt_english';
                $data3['lt_japan'] = 'lt_japan';
                $data3['lt_korea'] = 'lt_korea';
                $data3['lt_vietnam'] = 'lt_vietnam';
                $data3['lt_thailand'] = 'lt_thailand';
                $data3['lt_india'] = 'lt_india';
                $data3['lt_spain'] = 'lt_spain';

                $result[0] = $data1;
                $result[1] = $data2;
                $result[2] = $data3;
            }else if($type == 'language-field'){
                $template = 'language_field';
                $string = '翻譯語系欄位分布圖';
                //第一排
                $data1['field'] = '欄位樹狀';
                $data1['lp_id'] = '產品編號';
                $data1['lpf_id'] = '平台編號';
                $data1['lc_id'] = '分類編號';
                $data1['lsc_id'] = '子分類編號';
                $result[0] = $data1;

                $arraydata = array();
                if(!$lp_data = $lp_r->getAllDataForBatch()){
                    $lp_data = [];
                }
                if(!$lpf_data = $lpf_r->getAllDataForBatch()){
                    $lpf_data = [];
                }
                if(!$lc_data = $lc_r->getAllDataForBatch()){
                    $lc_data = [];
                }
                if(!$lsc_data = $lsc_r->getAllDataForBatch()){
                    $lsc_data = [];
                }

                foreach ($lp_data as $val) {
                    array_push($arraydata,$val);
                }
                foreach ($lpf_data as $val) {
                    array_push($arraydata,$val);
                }
                foreach ($lc_data as $val) {
                    array_push($arraydata,$val);
                }
                foreach ($lsc_data as $val) {
                    array_push($arraydata,$val);
                }

                foreach ($arraydata as $val) {
                    $tt = '';
                    if($val['lp_name']){
                        $tt = $tt.$val['lp_name'];
                    }
                    if($val['lpf_name']){
                        $tt = $tt.' > '.$val['lpf_name'];
                    }
                    if($val['lc_name']){
                        $tt = $tt.' > '.$val['lc_name'];
                    }
                    if($val['lsc_name']){
                        $tt = $tt.' > '.$val['lsc_name'];
                    }
                    $data2['field'] = $tt;
                    if($val['lp_id']){
                        $data2['lp_id'] = $val['lp_id'];
                    }
                    if($val['lpf_id']){
                        $data2['lpf_id'] = $val['lpf_id'];
                    }
                    if($val['lc_id']){
                        $data2['lc_id'] = $val['lc_id'];
                    }
                    if($val['lsc_id']){
                        $data2['lsc_id'] = $val['lsc_id'];
                    }
                    array_push($result,$data2);
                }
            }else if($type == 'question-field'){
                $template = 'question_field';
                $string = '問題提問欄位分布圖';
                //第一排
                $data1['field'] = '欄位樹狀';
                $data1['qa_type'] = '問題分類';
                $data1['qc_id'] = '分類編號';
                $result[0] = $data1;

                $arraydata = array();
                if(!$qc_data = $qc_r->getAllDataForBatch()){
                    $qc_data = [];
                }

                foreach ($qc_data as $val) {
                    $data2['field'] = $val['qc_name'];
                    if($val['qa_type'] == 1){
                        $data2['qa_type'] = 'BBIN';
                    }elseif($val['qa_type'] == 2){
                        $data2['qa_type'] = 'BBOS';
                    }
                    $data2['qc_id'] = $val['qc_id'];
                    array_push($result,$data2);
                }
            }

            return Excel::create($template, function($excel) use ($result,$string) {
                $excel->sheet($string, function($sheet) use ($result)
                {
                    $sheet->fromArray($result);
                });
            })->download('xlsx');
        } catch (Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('未知錯誤');
        }

    }

}
