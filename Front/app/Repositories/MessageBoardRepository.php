<?php

namespace App\Repositories;

use \App\Models\MessageBoard;
use App\Library\CommonTools;
use DB;

class MessageBoardRepository {

	/**
	 * 抓取 $mb_id 的資料
	 * @param  [string] $mb_id [留言板編號]
	 */
	public function getDataById($mb_id){

	}

	public function getAllData($arraydata){
		$string = MessageBoard::where('isflag',1);
		if(CommonTools::checkArrayValue($arraydata,'keyword')){
			$string->where('mb_name','like','%'.$arraydata['keyword'].'%')->orWhere('mb_content','like','%'.$arraydata['keyword'].'%');
		}
		$string->where('mb_status','!=',2); //已解決的不會顯示
		return $string->orderBy('last_update_date','DASC')->get();
	}

	/**
	 * 刪除留言板資料
	 * @param  [string] $mb_id [留言板編號]
	 */
	public function delete($mb_id){
		try {
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
    		$savedata['isflag'] = 0;

    		return MessageBoard::where('mb_id',$mb_id)->update($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}

	/**
	 * 新增留言板
	 * @param  [array] $arraydata [留言板資料]
	 */
	public function create($arraydata){
		try {
			// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'mb_name') ||
			   !CommonTools::checkArrayValue($arraydata,'mb_ip') ||
			   !CommonTools::checkArrayValue($arraydata,'mb_content')){
				return false;
			}
			// 填入必傳欄位
			$savedata['mb_name'] = $arraydata['mb_name'];
			$savedata['mb_ip'] = $arraydata['mb_ip'];
			$savedata['mb_content'] = $arraydata['mb_content'];
			$savedata['mb_time'] = \Carbon\Carbon::now();
			$savedata['mb_status'] = 1;

			// 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = $arraydata['mb_name'];
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = $arraydata['mb_name'];
			$savedata['last_update_date'] = \Carbon\Carbon::now();

			// 新增留言板
			return MessageBoard::insert($savedata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
    		return false;
		}
	}
}
