<?php

namespace App\Repositories;

use \App\Models\LanguageTranslation;
use App\Library\CommonTools;
use DB;

class LanguageTranslationRepository {

	/**
	 * 取得所有問題提問資料
	 */
	public function getAlldata($arraydata){
		$string = LanguageTranslation::leftjoin('cm_language_1product','cm_languagetranslation.lp_id','cm_language_1product.lp_id')->leftjoin('cm_language_2platform','cm_languagetranslation.lpf_id','cm_language_2platform.lpf_id')->leftjoin('cm_language_3class','cm_languagetranslation.lc_id','cm_language_3class.lc_id')->leftjoin('cm_language_4subclass','cm_languagetranslation.lsc_id','cm_language_4subclass.lsc_id');
		if(CommonTools::checkArrayValue($arraydata,'lp_id')){
			if($arraydata['lp_id'] != -1){
				$string->where('cm_languagetranslation.lp_id',$arraydata['lp_id']);
			}
		}
		if(CommonTools::checkArrayValue($arraydata,'lpf_id')){
			$string->where('cm_languagetranslation.lpf_id',$arraydata['lpf_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'lc_id')){
			$string->where('cm_languagetranslation.lc_id',$arraydata['lc_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'lsc_id')){
			$string->where('cm_languagetranslation.lsc_id',$arraydata['lsc_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'lt_taiwan')){
			$string->where(function($query) use ($arraydata){
				$query->where('cm_languagetranslation.lt_taiwan','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_languagetranslation.lt_china','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_languagetranslation.lt_english','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_languagetranslation.lt_japan','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_languagetranslation.lt_korea','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_languagetranslation.lt_vietnam','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_languagetranslation.lt_thailand','like','%'.$arraydata['lt_taiwan'].'%')
					//   ->orWhere('cm_languagetranslation.lt_india','like','%'.$arraydata['lt_taiwan'].'%')
					//   ->orWhere('cm_languagetranslation.lt_spain','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_language_1product.lp_name','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_language_2platform.lpf_name','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_language_3class.lc_name','like','%'.$arraydata['lt_taiwan'].'%')
					  ->orWhere('cm_language_4subclass.lsc_name','like','%'.$arraydata['lt_taiwan'].'%');
			});
		}
		return $string->where('cm_languagetranslation.isflag','1')->orderBy('cm_languagetranslation.lp_id','ASC')->orderBy('cm_languagetranslation.last_update_date','DASC')->select('cm_language_1product.lp_name','cm_language_2platform.lpf_name','cm_language_3class.lc_name','cm_language_4subclass.lsc_name','cm_languagetranslation.*')->get();
	}

	/**
	 * 抓取 $lt_id 的資料
	 * @param  [string] $lt_id [語系編號]
	 */
	public function getDataById($lt_id){
		return LanguageTranslation::where('lt_id',$lt_id)->where('isflag',1)->get();
	}

	/** 
	 * 查詢是否有此語系
	 */
	public function getDataByLpId($lp_id){
		return LanguageTranslation::where('lp_id',$lp_id)->where('isflag',1)->count();
	}

	/** 
	 * 查詢是否有此產品
	 */
	public function getDataByLpfId($lpf_id){
		return LanguageTranslation::where('lpf_id',$lpf_id)->where('isflag',1)->count();
	}

	/** 
	 * 查詢是否有此平台
	 */
	public function getDataByLcId($lc_id){
		return LanguageTranslation::where('lc_id',$lc_id)->where('isflag',1)->count();
	}

	/** 
	 * 查詢是否有此分類
	 */
	public function getDataByLscId($lsc_id){
		return LanguageTranslation::where('lsc_id',$lsc_id)->where('isflag',1)->count();
	}

	/**
	 * 抓取是否有符合的資料
	 * @param  [array] $arraydata [語系資料]
	 */
	public function getDataByRequestData($arraydata){
		return LanguageTranslation::where('isflag',1)->where('lp_id',$arraydata['lp_id'])->where('lpf_id',$arraydata['lpf_id'])->where('lc_id',$arraydata['lc_id'])->where('lsc_id',$arraydata['lsc_id'])->where('lt_taiwan',$arraydata['lt_taiwan'])->count();
	}

	/**
	 * 抓取是否有符合的資料
	 * @param  [array] $arraydata [語系資料]
	 */
	public function getDataByTaiwanData($arraydata){
		return LanguageTranslation::where('isflag',1)->where('lt_taiwan',$arraydata['lt_taiwan'])->count();
	}

	/**
	 * 刪除語系資料
	 * @param  [string] $lt_id [語系編號]
	 */
	public function delete($lt_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;
    		return LanguageTranslation::where('lt_id',$lt_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 新增語系資料
	 * @param  [array] $arraydata [語系資料]
	 */
	public function create($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lp_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['lp_id'] = $arraydata['lp_id'];
			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'lpf_id')){
				$savedata['lpf_id'] = $arraydata['lpf_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lc_id')){
				$savedata['lc_id'] = $arraydata['lc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lsc_id')){
				$savedata['lsc_id'] = $arraydata['lsc_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_number')){
				$savedata['lt_number'] = $arraydata['lt_number'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_taiwan')){
				$savedata['lt_taiwan'] = $arraydata['lt_taiwan'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_china')){
				$savedata['lt_china'] = $arraydata['lt_china'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_english')){
				$savedata['lt_english'] = $arraydata['lt_english'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_japan')){
				$savedata['lt_japan'] = $arraydata['lt_japan'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_korea')){
				$savedata['lt_korea'] = $arraydata['lt_korea'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_vietnam')){
				$savedata['lt_vietnam'] = $arraydata['lt_vietnam'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_thailand')){
				$savedata['lt_thailand'] = $arraydata['lt_thailand'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_india')){
				$savedata['lt_india'] = $arraydata['lt_india'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_spain')){
				$savedata['lt_spain'] = $arraydata['lt_spain'];
			}
			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();
			// 新增語系
			return LanguageTranslation::insertGetId($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 修改語系資料
	 * @param  [array] $arraydata [語系資料]
	 */
	public function update($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lt_id')){
				return false;
			}
			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'lp_id')){
				$savedata['lp_id'] = $arraydata['lp_id'];
			}
			if(CommonTools::checkArrayValue($arraydata,'lpf_id')){
				$savedata['lpf_id'] = $arraydata['lpf_id'];
			}else{
				$savedata['lpf_id'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lc_id')){
				$savedata['lc_id'] = $arraydata['lc_id'];
			}else{
				$savedata['lc_id'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lsc_id')){
				$savedata['lsc_id'] = $arraydata['lsc_id'];
			}else{
				$savedata['lsc_id'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_number')){
				$savedata['lt_number'] = $arraydata['lt_number'];
			}else{
				$savedata['lt_number'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_taiwan')){
				$savedata['lt_taiwan'] = $arraydata['lt_taiwan'];
			}else{
				$savedata['lt_taiwan'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_china')){
				$savedata['lt_china'] = $arraydata['lt_china'];
			}else{
				$savedata['lt_china'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_english')){
				$savedata['lt_english'] = $arraydata['lt_english'];
			}else{
				$savedata['lt_english'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_japan')){
				$savedata['lt_japan'] = $arraydata['lt_japan'];
			}else{
				$savedata['lt_japan'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_korea')){
				$savedata['lt_korea'] = $arraydata['lt_korea'];
			}else{
				$savedata['lt_korea'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_vietnam')){
				$savedata['lt_vietnam'] = $arraydata['lt_vietnam'];
			}else{
				$savedata['lt_vietnam'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_thailand')){
				$savedata['lt_thailand'] = $arraydata['lt_thailand'];
			}else{
				$savedata['lt_thailand'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_india')){
				$savedata['lt_india'] = $arraydata['lt_india'];
			}else{
				$savedata['lt_india'] = null;
			}
			if(CommonTools::checkArrayValue($arraydata,'lt_spain')){
				$savedata['lt_spain'] = $arraydata['lt_spain'];
			}else{
				$savedata['lt_spain'] = null;
			}
			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();
			// 更新語系資訊
			return LanguageTranslation::where("lt_id","=",$arraydata['lt_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
