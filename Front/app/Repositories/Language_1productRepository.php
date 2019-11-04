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
	 * 抓取 $lp_id 的資料
	 * @param  [string] $lp_id [產品編號]
	 */
	public function getDataById($lp_id){
		return Language_1product::where('lp_id',$lp_id)->where('isflag',1)->get();
	}

	public function getDataByLpId($arraydata){
		return Language_1product::where('lp_id',$arraydata['lp_id'])->where('isflag',1)->get();
	}

	/**
	 * 透過產品名稱抓取資料
	 * @param  [array] $arraydata [產品資料]
	 */
	public function getCountByName($lp_name){
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
