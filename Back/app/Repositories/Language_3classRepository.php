<?php

namespace App\Repositories;

use \App\Models\Language_3class;
use App\Library\CommonTools;
use DB;

class Language_3classRepository {

	/**
	 * 取得所有翻譯語系的分類的欄位資料
	 */
	public function getAllData(){
		return Language_3class::where('isflag',1)->get();
	}

	/**
	 * 取得所有翻譯語系的分類的欄位資料 - 專門for批量新增功能
	 */
	public function getAllDataForBatch(){
		return Language_3class::leftjoin('cm_language_2platform','cm_language_3class.lpf_id','cm_language_2platform.lpf_id')->leftjoin('cm_language_1product','cm_language_3class.lp_id','cm_language_1product.lp_id')->where('cm_language_3class.isflag',1)->orderBy('cm_language_1product.lp_name','DESC')->orderBy('cm_language_2platform.lpf_name','DESC')->orderBy('cm_language_3class.lc_name','DESC')->get();
	}

	/**
	 * 抓取 $lc_id 的資料
	 */
	public function getDataByLcId($arraydata){
		return Language_3class::leftjoin('cm_language_2platform','cm_language_3class.lpf_id','cm_language_2platform.lpf_id')->leftjoin('cm_language_1product','cm_language_3class.lp_id','cm_language_1product.lp_id')->where('cm_language_3class.lc_id',$arraydata['lc_id'])->where('cm_language_3class.isflag',1)->get();
	}

	public function getDataByLpfId($lpf_id){
		return Language_3class::where('lpf_id',$lpf_id)->where('isflag',1)->get();
	}

	public function getDataByLpId($arraydata){
		$string = Language_3class::leftjoin('cm_language_2platform','cm_language_3class.lpf_id','cm_language_2platform.lpf_id')->leftjoin('cm_language_1product','cm_language_3class.lp_id','cm_language_1product.lp_id');
		if($arraydata['lp_id'] != -1){
			$string->where('cm_language_3class.lp_id',$arraydata['lp_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'keyword')){
			return $string->where('cm_language_3class.lc_name','like','%'.$arraydata['keyword'].'%')->where('cm_language_3class.isflag',1)->get();
		}else{
			return $string->where('cm_language_3class.isflag',1)->get();
		}
	}

	/**
	 * 抓取 $lc_id 的資料
	 * @param  [array] $arraydata [查詢資料]
	 */
	public function getDataById($arraydata){
		$string = Language_3class::where('isflag',1);
		if(CommonTools::checkArrayValue($arraydata,'lp_id')){
			$string->where('lp_id',$arraydata['lp_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'lpf_id')){
			$string->where('lpf_id',$arraydata['lpf_id']);
		}
		return $string->get();
	}

	/**
	 * 透過分類名稱抓取資料
	 * @param  [array] $arraydata [分類資料]
	 */
	public function getCountByName($arraydata){
		return Language_3class::where('lc_name',$arraydata['lc_name'])->where('lp_id',$arraydata['lp_id'])->where('lpf_id',$arraydata['lpf_id'])->where('isflag',1)->count();
	}

	/**
	 * 透過分類資料抓取資料
	 * @param  [array] $arraydata [分類資料]
	 */
	public function getCountByNameId($arraydata){
		return Language_3class::where('lc_name',$arraydata['lc_name'])->where('lp_id',$arraydata['lp_id'])->where('lpf_id',$arraydata['lpf_id'])->where('lc_id','!=',$arraydata['lc_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除分類資料
	 * @param  [string] $lc_id [分類編號]
	 */
	public function delete($lc_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		return Language_3class::where('lc_id',$lc_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 新增分類欄位
	 * @param  [array] $arraydata [分類資料]
	 */
	public function create($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lc_name') ||
			   !CommonTools::checkArrayValue($arraydata,'lp_id') ||
			   !CommonTools::checkArrayValue($arraydata,'lpf_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['lc_name'] = $arraydata['lc_name'];
			$savedata['lp_id'] = $arraydata['lp_id'];
			$savedata['lpf_id'] = $arraydata['lpf_id'];

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 新增分類欄位
			return Language_3class::insertGetId($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 修改分類欄位
	 * @param  [array] $arraydata [分類資料]
	 */
	public function update($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lc_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'lc_name')){
				$savedata['lc_name'] = $arraydata['lc_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 更新分類欄位資訊
			return Language_3class::where("lc_id","=",$arraydata['lc_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
