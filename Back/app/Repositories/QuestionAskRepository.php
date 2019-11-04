<?php

namespace App\Repositories;

use \App\Models\QuestionAsk;
use App\Library\CommonTools;
use DB;

class QuestionAskRepository {

	/**
	 * 取得所有問題提問資料
	 */
	public function getAlldata($arraydata){
		$string = QuestionAsk::leftjoin('cm_question_1class','cm_questionask.qc_id','cm_question_1class.qc_id');
		if(CommonTools::checkArrayValue($arraydata,'qc_id')){
			$string->where('cm_questionask.qc_id',$arraydata['qc_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'qa_content')){
			$string->where('cm_questionask.qa_content','like','%'.$arraydata['qa_content'].'%');
		}
		return $string->where('cm_questionask.isflag','1')->where('cm_question_1class.isflag','1')->orderBy('cm_questionask.qc_id','ASC')->orderBy('cm_questionask.last_update_date','DESC')->select('cm_question_1class.qc_name','cm_questionask.*')->get();
	}

	/**
	 * 取得所有BBIN提問資料
	 */
	public function getBBINData($arraydata){
		$string = QuestionAsk::leftjoin('cm_question_1class','cm_questionask.qc_id','cm_question_1class.qc_id');
		if(CommonTools::checkArrayValue($arraydata,'qc_id')){
			$string->where('cm_questionask.qc_id',$arraydata['qc_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'qa_content')){
			$string->where('cm_questionask.qa_content','like','%'.$arraydata['qa_content'].'%');
		}
		return $string->where('cm_questionask.qa_type','1')->where('cm_questionask.isflag','1')->where('cm_question_1class.isflag','1')->orderBy('cm_questionask.qc_id','ASC')->orderBy('cm_questionask.last_update_date','DESC')->select('cm_question_1class.qc_name','cm_questionask.*')->get();
	}

	/**
	 * 取得所有BBOS提問資料
	 */
	public function getBBOSData($arraydata){
		$string = QuestionAsk::leftjoin('cm_question_1class','cm_questionask.qc_id','cm_question_1class.qc_id');
		if(CommonTools::checkArrayValue($arraydata,'qc_id')){
			$string->where('cm_questionask.qc_id',$arraydata['qc_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'qa_content')){
			$string->where('cm_questionask.qa_content','like','%'.$arraydata['qa_content'].'%');
		}
		return $string->where('cm_questionask.qa_type','2')->where('cm_questionask.isflag','1')->where('cm_question_1class.isflag','1')->orderBy('cm_questionask.qc_id','ASC')->orderBy('cm_questionask.last_update_date','DESC')->select('cm_question_1class.qc_name','cm_questionask.*')->get();
	}

	/**
	 * 抓取 $qa_id 的資料
	 * @param  [string] $qa_id [問題編號]
	 */
	public function getDataById($qa_id){
		return QuestionAsk::where('qa_id',$qa_id)->where('isflag','1')->get();
	}

	public function getDataByRequestData($arraydata){
		return QuestionAsk::where('isflag',1)->where('qc_id',$arraydata['qc_id'])->where('qa_content',$arraydata['qa_content'])->count();
	}

	/**
	 * 刪除問題
	 * @param  [string] $qa_id [問題編號]
	 */
	public function delete($qa_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		return QuestionAsk::where('qa_id',$qa_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 新增問題
	 * @param  [array] $arraydata [問題資料]
	 */
	public function create($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'qa_content') ||
			   !CommonTools::checkArrayValue($arraydata,'qc_id') ||
			   !CommonTools::checkArrayValue($arraydata,'qa_type')){
				return false;
			}
			// 填入必傳欄位
			$savedata['qc_id'] = $arraydata['qc_id'];
			$savedata['qa_content'] = $arraydata['qa_content'];
			$savedata['qa_type'] = $arraydata['qa_type'];

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 新增問題
			return QuestionAsk::insertGetId($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 修改問題
	 * @param  [array] $arraydata [問題資料]
	 */
	public function update($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'qa_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'qa_content')){
				$savedata['qa_content'] = $arraydata['qa_content'];
			}
			if(CommonTools::checkArrayValue($arraydata,'qc_id')){
				$savedata['qc_id'] = $arraydata['qc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'qa_type')){
				$savedata['qa_type'] = $arraydata['qa_type'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 更新問題資訊
			return QuestionAsk::where("qa_id","=",$arraydata['qa_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
