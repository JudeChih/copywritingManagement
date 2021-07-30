<?php

namespace App\Repositories;

use \App\Models\TransactionRecord;
use App\Library\CommonTools;
use DB;

class TransactionRecordRepository {

    /**
     * 取得全部的異動紀錄，一頁顯示15筆
     */
    public function getAllData(){
        return TransactionRecord::where('isflag',1)->orderBy('tr_id','DESC')->get();
    }

    /**
     * 建立一筆新的資料
     * @param array $arraydata 要新增的資料
     */
    public function create(array $arraydata) {
        try {
        	// 檢查必傳欄位
			if(!CommonTools::checkArrayValue($arraydata,'tr_action') ||
			   !CommonTools::checkArrayValue($arraydata,'tr_goal') ||
               !CommonTools::checkArrayValue($arraydata,'goal_id')){
				return false;
			}
			// 填入必傳欄位
			$savedata['tr_action'] = $arraydata['tr_action'];
			$savedata['tr_goal'] = $arraydata['tr_goal'];
            $savedata['goal_id'] = $arraydata['goal_id'];
			$savedata['tr_user'] = \App\Services\AuthService::userData()->ud_account;
            // 檢查非必傳欄位並填入

            // 填入基本欄位
			$savedata['isflag'] = 1;
			$savedata['create_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['create_date'] = \Carbon\Carbon::now();
			$savedata['last_update_user'] = \App\Services\AuthService::userData()->ud_account;
			$savedata['last_update_date'] = \Carbon\Carbon::now();
            return TransactionRecord::insert($savedata);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return false;
        }
    }
}