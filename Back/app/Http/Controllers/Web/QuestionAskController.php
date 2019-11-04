<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;
use DB;

class QuestionAskController extends Controller
{
	/**
	 * 取得所有問題提問的資料
	 * @param  [array] $searchdata [篩選條件資料]
	 */
	public function getQuestions($qa_type){
		$qa_r = new \App\Repositories\QuestionAskRepository;
		$searchdata = Request::all();
		try {
			if($qa_type == 'BBIN'){
				if(!$data = $qa_r->getBBINData($searchdata)){
					return CommonTools::returnData('資料獲取失敗');
				}
			}elseif($qa_type == 'BBOS'){
				if(!$data = $qa_r->getBBOSData($searchdata)){
					return CommonTools::returnData('資料獲取失敗');
				}
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}

	/**
	 * 取得某$id的問題提問資料
	 * @param  [string] $id [就是qa_id問題編號]
	 */
	public function getQuestion($id){
		$qa_r = new \App\Repositories\QuestionAskRepository;
		try {
			if(!$data = $qa_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}

	/**
	 * 新增一個問題提問
	 * @param [array] $searchdata [新增資料]
	 */
	public function actionQuestionCreate(){
		$qa_r = new \App\Repositories\QuestionAskRepository;
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 1; //異動動作：新增
		$recorddata['tr_goal'] = 1; //異動目標：問題提問
		try {
			foreach ($searchdata as $data) {
				if(CommonTools::checkArrayValue($data,'qc_id')){
					if(!is_numeric($data['qc_id']) || $data['qc_id'] == ""){
						return CommonTools::returnData('其中一筆資料未傳入分類編號');
					}
				}else{
					return CommonTools::returnData('其中一筆資料未傳入分類編號');
				}
				if(CommonTools::checkArrayValue($data,'qa_content')){
					if($data['qa_content'] == ""){
						return CommonTools::returnData('其中一筆資料未傳入問題內容');
					}
				}else{
					return CommonTools::returnData('其中一筆資料未傳入問題內容');
				}
			}

			DB::beginTransaction();
			foreach ($searchdata as $data) {
				if(!$id = $qa_r->create($data)){
					DB::rollBack();
					return CommonTools::returnData('新增失敗');
				}else{
					$recorddata['goal_id'] = $id; //目標編號：qa_id
				}
				// 新增異動紀錄
				CommonTools::createTransactionRecord($recorddata);
			}

			DB::commit();
			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}

	/**
	 * 修改某問題提問
	 * @param [array] $searchdata [修改資料]
	 */
	public function actionQuestionModify(){
		$qa_r = new \App\Repositories\QuestionAskRepository;
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 2; //異動動作：修改
		$recorddata['tr_goal'] = 1; //異動目標：問題提問
		try {
			if(!CommonTools::checkArrayValue($searchdata,'qa_id')){
				return CommonTools::returnData('未傳入問題編號');
			}
			if(CommonTools::checkArrayValue($searchdata,'qc_id')){
				if(!is_numeric($searchdata['qc_id']) || $searchdata['qc_id'] == ""){
					$searchdata['qc_id'] = null;
				}
			}
			if(CommonTools::checkArrayValue($searchdata,'qa_content')){
				if($searchdata['qa_content'] == ""){
					return CommonTools::returnData('問題內容不能為空');
				}
			}
			if(!$qa_r->update($searchdata)){
				return CommonTools::returnData('修改失敗');
			}else{
				$recorddata['goal_id'] = $searchdata['qa_id']; //目標編號：qa_id
			}

			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);

			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}

	/**
	 * 刪除某問題提問
	 * @param  [string] $id [問題編號]
	 */
	public function actionQuestionDelete($id){
		$qa_r = new \App\Repositories\QuestionAskRepository;
		$recorddata = array();
		$recorddata['tr_action'] = 3; //異動動作：刪除
		$recorddata['tr_goal'] = 1; //異動目標：問題提問
		try {
			if(!$qa_r->delete($id)){
				return CommonTools::returnData('刪除失敗');
			}else{
				$recorddata['goal_id'] = $id; //目標編號：qa_id
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