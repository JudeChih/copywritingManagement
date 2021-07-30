<?php

namespace App\Repositories;

use \App\Models\Language_1product;
use App\Library\CommonTools;
use DB;

class Language_1productRepository {

	/**
	 * 取得所有翻譯語系的產品的欄位資料
	 */
	public function getAllData(){
		return Language_1product::where('isflag',1)->get();
	}

	/**
	 * 取得所有翻譯語系的產品的欄位資料 - 專門for批量新增功能
	 */
	public function getAllDataForBatch(){
		return Language_1product::where('isflag',1)->orderBy('lp_name','DESC')->get();
	}

	/**
	 * 抓取 $lp_id 的資料
	 * @param  [string] $lp_id [產品編號]
	 */
	public function getDataById($lp_id){
		return Language_1product::where('lp_id',$lp_id)->where('isflag',1)->get();
	}

	/**
	 * 
	 */
	public function getDataByLpId($arraydata){
		$string = Language_1product::where('isflag',1);
		if($arraydata['lp_id'] != -1){
			$string->where('lp_id',$arraydata['lp_id']);
		}
		if(CommonTools::checkArrayValue($arraydata,'keyword')){
			return $string->where('lp_name','like','%'.$arraydata['keyword'].'%')->get();
		}else{
			return $string->get();
		}
	}

	/**
	 * 透過產品名稱抓取資料
	 * @param  [array] $arraydata [產品資料]
	 */
	public function getCountByName($arraydata){
		return Language_1product::where('lp_name',$arraydata['lp_name'])->where('isflag',1)->count();
	}

	/**
	 * 透過產品資料抓取資料
	 * @param  [array] $arraydata [產品資料]
	 */
	public function getCountByNameId($arraydata){
		return Language_1product::where('lp_name',$arraydata['lp_name'])->where('lp_id','!=',$arraydata['lp_id'])->where('isflag',1)->count();
	}

	/**
	 * 抓取是否有符合的資料
	 * @param  [array] $arraydata [產品資料]
	 */
	public function getDataByRequestData($arraydata){
		$string = Language_1product::leftjoin('cm_language_2platform','cm_language_1product.lp_id','cm_language_2platform.lp_id')->leftjoin('cm_language_3class','cm_language_1product.lp_id','cm_language_3class.lp_id')->leftjoin('cm_language_4subclass','cm_language_1product.lp_id','cm_language_4subclass.lp_id');
		if($arraydata['lp_id']){
			$string->where('cm_language_1product.lp_id',$arraydata['lp_id'])->where('cm_language_1product.isflag',1);
		}
		if($arraydata['lpf_id']){
			$string->where('cm_language_2platform.lpf_id',$arraydata['lpf_id'])->where('cm_language_2platform.isflag',1);
		}
		if($arraydata['lc_id']){
			$string->where('cm_language_3class.lc_id',$arraydata['lc_id'])->where('cm_language_3class.isflag',1);
		}
		if($arraydata['lsc_id']){
			$string->where('cm_language_4subclass.lsc_id',$arraydata['lp_id'])->where('cm_language_4subclass.isflag',1);
		}
		return $string->count();
	}

	/**
	 * 刪除產品資料
	 * @param  [string] $lp_id [產品編號]
	 */
	public function delete($lp_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;
    		return Language_1product::where('lp_id',$lp_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 新增產品欄位
	 * @param  [array] $arraydata [產品資料]
	 */
	public function create($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lp_name')){
				return false;
			}
			// 填入必傳欄位
			$savedata['lp_name'] = $arraydata['lp_name'];
			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();
			// 新增產品欄位
			return Language_1product::insertGetId($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 修改產品欄位
	 * @param  [array] $arraydata [產品資料]
	 */
	public function update($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lp_id')){
				return false;
			}
			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'lp_name')){
				$savedata['lp_name'] = $arraydata['lp_name'];
			}
			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();
			// 更新產品欄位資訊
			return Language_1product::where("lp_id","=",$arraydata['lp_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return false;
		}
	}
}
