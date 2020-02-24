<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;

class MessageBoardController extends Controller
{
	/**
	 * 取得所有留言板資料
	 * @param  [array] $searchdata [篩選條件資料]
	 */
	public function getMessages(){
		$mb_r = new \App\Repositories\MessageBoardRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $mb_r->getAllData($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}

	/**
	 * 解決某留言板
	 * @param  [string] $id [留言版編號]
	 */
	public function actionMessageSolve($id){
		$mb_r = new \App\Repositories\MessageBoardRepository;
		$recorddata = array();
		$recorddata['tr_action'] = 4; //異動動作：解決
		$recorddata['tr_goal'] = 9; //異動目標：留言板
		try {
			$arraydata['mb_id'] = $id;
			if(!$mb_r->update($arraydata)){
				return CommonTools::returnData('解決失敗');
			}else{
				$recorddata['goal_id'] = $id; //目標編號：mb_id
			}

			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);

			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}
}