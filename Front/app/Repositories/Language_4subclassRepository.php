<?php

namespace App\Repositories;

use \App\Models\Language_4subclass;
use App\Library\CommonTools;
use DB;

class Language_4subclassRepository {

	/**
	 * 取得所有翻譯語系的子分類的欄位資料
	 */
	public function getAllData(){
		return Language_4subclass::where('isflag',1)->get();
	}

	public function getDataByLscId($arraydata){
		return Language_4subclass::leftjoin('cm_language_3class','cm_language_4subclass.lc_id','cm_language_3class.lc_id')->leftjoin('cm_language_2platform','cm_language_4subclass.lpf_id','cm_language_2platform.lpf_id')->leftjoin('cm_language_1product','cm_language_4subclass.lp_id','cm_language_1product.lp_id')->where('cm_language_4subclass.lsc_id',$arraydata['lsc_id'])->where('cm_language_4subclass.isflag',1)->get();
	}

	public function getDataByLpId($arraydata){
		return Language_4subclass::leftjoin('cm_language_3class','cm_language_4subclass.lc_id','cm_language_3class.lc_id')->leftjoin('cm_language_2platform','cm_language_4subclass.lpf_id','cm_language_2platform.lpf_id')->leftjoin('cm_language_1product','cm_language_4subclass.lp_id','cm_language_1product.lp_id')->where('cm_language_4subclass.lp_id',$arraydata['lp_id'])->where('cm_language_4subclass.isflag',1)->get();
	}

	/**
	 * 抓取 $lc_id 的資料
	 * @param  [string] $lc_id [子分類編號]
	 */
	public function getDataByLcId($lc_id){
		return Language_4subclass::where('lc_id',$lc_id)->where('isflag',1)->get();
	}

	/**
	 * 透過子分類名稱抓取資料
	 * @param  [array] $arraydata [子分類資料]
	 */
	public function getCountByName($arraydata){
		return Language_4subclass::where('lsc_name',$arraydata['lsc_name'])->where('lp_id',$arraydata['lp_id'])->where('lpf_id',$arraydata['lpf_id'])->where('lc_id',$arraydata['lc_id'])->where('isflag',1)->count();
	}

	/**
	 * 透過子分類資料抓取資料
	 * @param  [array] $arraydata [子分類資料]
	 */
	public function getCountByNameId($arraydata){
		return Language_4subclass::where('lsc_name',$arraydata['lsc_name'])->where('lp_id',$arraydata['lp_id'])->where('lpf_id',$arraydata['lpf_id'])->where('lc_id',$arraydata['lc_id'])->where('lsc_id','!=',$arraydata['lsc_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除子分類資料
	 * @param  [string] $lsc_id [子分類編號]
	 */
	public function delete($lsc_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		return Language_4subclass::where('lsc_id',$lsc_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 新增子分類欄位
	 * @param  [array] $arraydata [子分類資料]
	 */
	public function create($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lsc_name') ||
			   !CommonTools::checkArrayValue($arraydata,'lp_id') ||
			   !CommonTools::checkArrayValue($arraydata,'lpf_id') ||
			   !CommonTools::checkArrayValue($arraydata,'lc_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['lsc_name'] = $arraydata['lsc_name'];
			$savedata['lp_id'] = $arraydata['lp_id'];
			$savedata['lpf_id'] = $arraydata['lpf_id'];
			$savedata['lc_id'] = $arraydata['lc_id'];

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 新增子分類欄位
			return Language_4subclass::insertGetId($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 修改子分類欄位
	 * @param  [array] $arraydata [子分類資料]
	 */
	public function update($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lsc_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'lsc_name')){
				$savedata['lsc_name'] = $arraydata['lsc_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 更新子分類欄位資訊
			return Language_4subclass::where("lsc_id","=",$arraydata['lsc_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
