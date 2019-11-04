<?php

namespace App\Repositories;

use \App\Models\Question_1class;
use App\Library\CommonTools;
use DB;

class Question_1classRepository {

	/**
	 * 取得所有問題提問的欄位資料
	 */
	public function getAllData(){
		return Question_1class::where('isflag',1)->get();
	}

	/**
	 * 取得所有BBIN提問的欄位資料
	 */
	public function getBBINData(){
		return Question_1class::where('qa_type',1)->where('isflag',1)->get();
	}

	/**
	 * 取得所有BBOS提問的欄位資料
	 */
	public function getBBOSData(){
		return Question_1class::where('qa_type',2)->where('isflag',1)->get();
	}

	/**
	 * 取得所有問題提問的欄位資料 for batch用
	 */
	public function getAllDataForBatch(){
		return Question_1class::where('isflag',1)->get();
	}

	/**
	 * 抓取 $qc_id 的資料
	 * @param  [string] $qc_id [分類編號]
	 */
	public function getDataById($qc_id){

	}

	/**
	 * 抓取符合的資料
	 */
	public function getDataByTypeId($arraydata){
		return Question_1class::where('qa_type',$arraydata['qa_type'])->where('qc_id',$arraydata['qc_id'])->where('isflag',1)->count();
	}

	/**
	 * 透過分類名稱抓取符合的資料並傳出筆數
	 * @param  [string] $qc_name [分類名稱]
	 */
	public function getCountByName($qc_name){
		return Question_1class::where('qc_name',$qc_name)->where('isflag',1)->count();
	}

	/**
	 * 透過分類名稱及分類抓取符合的資料並傳出筆數
	 * @param  [string] $qc_name [分類名稱]
	 */
	public function getCountByTypeName($arraydata){
		return Question_1class::where('qa_type',$arraydata['qa_type'])->where('qc_name',$arraydata['qc_name'])->where('isflag',1)->count();
	}

	/**
	 * 透過分類名稱抓取符合的資料並傳出筆數
	 * @param  [array] $arraydata [分類資料]
	 */
	public function getCountByNameId($arraydata){
		return Question_1class::where('qc_name',$arraydata['qc_name'])->where('qc_id','!=',$arraydata['qc_id'])->where('isflag',1)->count();
	}

	/**
	 * 刪除分類資料
	 * @param  [string] $qc_id [分類編號]
	 */
	public function delete($qc_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		return Question_1class::where('qc_id',$qc_id)->update($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'qc_name') || !CommonTools::checkArrayValue($arraydata,'qa_type')){
				return false;
			}

			// 填入必傳欄位
			$savedata['qc_name'] = $arraydata['qc_name'];
			$savedata['qa_type'] = $arraydata['qa_type'];

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 新增分類欄位
			return Question_1class::insertGetId($savedata);
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
			if(!CommonTools::checkArrayValue($arraydata,'qc_name') ||
			   !CommonTools::checkArrayValue($arraydata,'qc_id')){
				return false;
			}

			// 檢查非必傳欄位並填入
			if(CommonTools::checkArrayValue($arraydata,'qc_name')){
				$savedata['qc_name'] = $arraydata['qc_name'];
			}

			// 填入基本欄位
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 更新分類欄位資訊
			return Question_1class::where("qc_id","=",$arraydata['qc_id'])->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
