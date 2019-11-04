<?php

namespace App\Repositories;

use \App\Models\Language_2platform;
use App\Library\CommonTools;
use DB;

class Language_2platformRepository {

	/**
	 * 取得所有翻譯語系的平台的欄位資料
	 */
	public function getAllData(){
		return Language_2platform::where('isflag',1)->get();
	}

	/**
	 * 抓取 $lpf_id 的資料
	 * @param  [string] $lpf_id [平台編號]
	 */
	public function getDataByLpfId($arraydata){
		return Language_2platform::leftjoin('cm_language_1product','cm_language_2platform.lp_id','cm_language_1product.lp_id')->where('cm_language_2platform.lpf_id',$arraydata['lpf_id'])->where('cm_language_2platform.isflag',1)->get();
	}

	/**
	 * 抓取 $lpf_id 的資料
	 * @param  [string] $lpf_id [平台編號]
	 */
	public function getDataById($lpf_id){
		return Language_2platform::where('lpf_id',$lpf_id)->where('isflag',1)->get();
	}

	/**
	 * 抓取 $lpf_id 的資料
	 * @param  [string] $lp_id [產品編號]
	 */
	public function getDataByLpId($lp_id){
		return Language_2platform::where('lp_id',$lp_id)->where('isflag',1)->get();
	}

	/**
	 * 抓取 $lpf_id 的資料
	 * @param  [string] $lp_id [產品編號]
	 */
	public function getPFDataByLpId($lp_id){
		return Language_2platform::leftjoin('cm_language_1product','cm_language_2platform.lp_id','cm_language_1product.lp_id')->where('cm_language_2platform.lp_id',$lp_id)->where('cm_language_2platform.isflag',1)->get();
	}

	/**
	 * 透過平台名稱抓取資料
	 * @param  [array] $arraydata [平台資料]
	 */
	public function getCountByName($arraydata){
		return Language_2platform::where('lpf_name',$arraydata['lpf_name'])->where('lp_id',$arraydata['lp_id'])->where('isflag',1)->count();
	}

	/**
	 * 透過平台資料抓取資料
	 * @param  [array] $arraydata [平台資料]
	 */
	public function getCountByNameId($arraydata){
		return Language_2platform::where('lpf_name',$arraydata['lpf_name'])->where('lp_id',$arraydata['lp_id'])->where('lpf_id','!=',$arraydata['lpf_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除平台資料
	 * @param  [string] $lpf_id [平台編號]
	 */
	public function delete($lpf_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		return Language_2platform::where('lpf_id',$lpf_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 新增平台欄位
	 * @param  [array] $arraydata [平台資料]
	 */
	public function create($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lpf_name') ||
			   !CommonTools::checkArrayValue($arraydata,'lp_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['lpf_name'] = $arraydata['lpf_name'];
			$savedata['lp_id'] = $arraydata['lp_id'];

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 新增平台欄位
			return Language_2platform::insertGetId($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 修改平台欄位
	 * @param  [array] $arraydata [平台資料]
	 */
	public function update($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'lpf_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'lpf_name')){
				$savedata['lpf_name'] = $arraydata['lpf_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 更新平台欄位資訊
			return Language_2platform::where("lpf_id","=",$arraydata['lpf_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
