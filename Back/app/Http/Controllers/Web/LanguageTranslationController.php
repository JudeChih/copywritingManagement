<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;
use DB;

class LanguageTranslationController extends Controller
{
	/**
	 * 取得所有問題提問的資料
	 * @param  [array] $searchdata [篩選條件資料]
	 */
	public function getLanguages(){
		$lt_r = new \App\Repositories\LanguageTranslationRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $lt_r->getAllData($searchdata)){
				return false;
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}

	/**
	 * 取得某翻譯語系資料
	 * @param  [string] $id [語系編號]
	 */
	public function getLanguage($id){
		$lt_r = new \App\Repositories\LanguageTranslationRepository;
		try {
			if(!$data = $lt_r->getDataById($id)){
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
	 * 新增翻譯語系資料
	 * @return [array] $searchdata [新增資料]
	 */
	public function actionLanguageCreate(){
		$lt_r = new \App\Repositories\LanguageTranslationRepository;
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 1; //異動動作：新增
		$recorddata['tr_goal'] = 2; //異動目標：翻譯語系
		try {
			foreach ($searchdata as $data) {
				if(!CommonTools::checkArrayValue($data,'lp_id')){
					return CommonTools::returnData('其中一筆資料未傳入產品編號');
				}
			}
			DB::beginTransaction();
			foreach ($searchdata as $data) {
				if(!$id = $lt_r->create($data)){
					DB::rollBack();
					return CommonTools::returnData('新增失敗');
				}else{
					$recorddata['goal_id'] = $id; //目標編號：lt_id
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
	 * 修改翻譯語系資料
	 * @return [array] $searchdata [修改資料]
	 */
	public function actionLanguageModify(){
		$lt_r = new \App\Repositories\LanguageTranslationRepository;
		$searchdata = Request::all();
		$recorddata = array();
		$recorddata['tr_action'] = 2; //異動動作：修改
		$recorddata['tr_goal'] = 2; //異動目標：翻譯語系
		try {
			if(!CommonTools::checkArrayValue($searchdata,'lt_id')){
				return CommonTools::returnData('未傳入語系編號');
			}
			if(!CommonTools::checkArrayValue($searchdata,'lp_id')){
				return CommonTools::returnData('未傳入產品編號');
			}
			if(!$lt_r->update($searchdata)){
				return CommonTools::returnData('修改失敗');
			}else{
				$recorddata['goal_id'] = $searchdata['lt_id']; //目標編號：lt_id
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
	 * 刪除翻譯語系
	 * @param  [string] $id [語系編號]
	 */
	public function actionLanguageDelete($id){
		$lt_r = new \App\Repositories\LanguageTranslationRepository;
		$recorddata = array();
		$recorddata['tr_action'] = 3; //異動動作：刪除
		$recorddata['tr_goal'] = 2; //異動目標：翻譯語系
		try {
			if(!$lt_r->delete($id)){
				return CommonTools::returnData('刪除失敗');
			}else{
				$recorddata['goal_id'] = $id; //目標編號：lt_id
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