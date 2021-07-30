<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;
use DB;
// 錯誤代碼  #030000 開頭
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
			return CommonTools::returnData('#030101');
		}
	}

	/**
	 * 取得某翻譯語系資料
	 * @param  [string] $id [語系編號]
	 */
	public function getLanguage($id){
		$lt_r = new \App\Repositories\LanguageTranslationRepository;
		$lp_r = new \App\Repositories\Language_1productRepository;
		$lpf_r = new \App\Repositories\Language_2platformRepository;
		$lc_r = new \App\Repositories\Language_3classRepository;
		$lsc_r = new \App\Repositories\Language_4subclassRepository;
		try {
			if(!$data = $lt_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
				if($data['lp_id']){
					$lp_data = $lp_r->getDataById($data['lp_id']);
					if(count($lp_data) == 1){
						$lp_data = $lp_data[0];
						$data['lp_name'] = $lp_data['lp_name'];
					}
				}
				if($data['lpf_id']){
					$lpf_data = $lpf_r->getDataById($data['lpf_id']);
					if(count($lpf_data) == 1){
						$lpf_data = $lpf_data[0];
						$data['lpf_name'] = $lpf_data['lpf_name'];
					}
				}
				if($data['lc_id']){
					$lc_data = $lc_r->getDataByLcIdForModifyPage($data['lc_id']);
					if(count($lc_data) == 1){
						$lc_data = $lc_data[0];
						$data['lc_name'] = $lc_data['lc_name'];
					}
				}
				if($data['lsc_id']){
					$lsc_data = $lsc_r->getDataById($data['lsc_id']);
					if(count($lsc_data) == 1){
						$lsc_data = $lsc_data[0];
						$data['lsc_name'] = $lsc_data['lsc_name'];
					}
				}
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#030102');
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
		$recorddata['tr_action'] = 1; // 異動動作：新增
		$recorddata['tr_goal'] = 2; // 異動目標：翻譯語系
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
					$recorddata['goal_id'] = $id; // 目標編號：lt_id
				}
				// 新增異動紀錄
				CommonTools::createTransactionRecord($recorddata);
			}
			DB::commit();
			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			DB::rollBack();
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#030201');
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
		$recorddata['tr_action'] = 2; // 異動動作：修改
		$recorddata['tr_goal'] = 2; // 異動目標：翻譯語系
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
				$recorddata['goal_id'] = $searchdata['lt_id']; // 目標編號：lt_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#030301');
		}
	}

	/**
	 * 刪除翻譯語系
	 * @param  [string] $id [語系編號]
	 */
	public function actionLanguageDelete($id){
		$lt_r = new \App\Repositories\LanguageTranslationRepository;
		$recorddata = array();
		$recorddata['tr_action'] = 3; // 異動動作：刪除
		$recorddata['tr_goal'] = 2; // 異動目標：翻譯語系
		try {
			if(!$lt_r->delete($id)){
				return CommonTools::returnData('刪除失敗');
			}else{
				$recorddata['goal_id'] = $id; // 目標編號：lt_id
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#030401');
		}
	}
}