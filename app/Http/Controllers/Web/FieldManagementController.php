<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;
use DB;
// use Excel;
// 錯誤代碼  #020000 開頭
class FieldManagementController extends Controller
{
	/**
	 * 取得所有符合條件的欄位資料
	 * @param  [array] $searchdata [篩選條件資料]
	 **/
	public function getFields(){
		$lp_r = new \App\Repositories\Language_1productRepository;
		$lpf_r = new \App\Repositories\Language_2platformRepository;
		$lc_r = new \App\Repositories\Language_3classRepository;
		$lsc_r = new \App\Repositories\Language_4subclassRepository;
		$searchdata = Request::all();
		$data = array();
		try {
			if(!$lp_data = $lp_r->getDataByLpId($searchdata)){
				return CommonTools::returnData('資料獲取失敗');
			}
			if(!$lpf_data = $lpf_r->getPFDataByLpId($searchdata)){
				return CommonTools::returnData('資料獲取失敗');
			}
			if(!$lc_data = $lc_r->getDataByLpId($searchdata)){
				return CommonTools::returnData('資料獲取失敗');
			}
			if(!$lsc_data = $lsc_r->getDataByLpId($searchdata)){
				return CommonTools::returnData('資料獲取失敗');
			}

			$arraydata['lp_data'] = $lp_data;
			$arraydata['lpf_data'] = $lpf_data;
			$arraydata['lc_data'] = $lc_data;
			$arraydata['lsc_data'] = $lsc_data;

			return response()->json($arraydata);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020101');
		}
	}

	/**
	 * 取得某欄位資料
	 * @param  [array] $searchdata [篩選條件資料]
	 */
	public function getField(){
		$lp_r = new \App\Repositories\Language_1productRepository;
		$lpf_r = new \App\Repositories\Language_2platformRepository;
		$lc_r = new \App\Repositories\Language_3classRepository;
		$lsc_r = new \App\Repositories\Language_4subclassRepository;
		$searchdata = Request::all();
		$data = array();
		try {
			if(!CommonTools::checkArrayValue($searchdata,'lpf_id')){
				if(!$data = $lp_r->getDataByLpId($searchdata)){
					return CommonTools::returnData('資料獲取失敗');
				}
			}elseif(!CommonTools::checkArrayValue($searchdata,'lc_id')){
				if(!$data = $lpf_r->getDataByLpfId($searchdata)){
					return CommonTools::returnData('資料獲取失敗');
				}
			}elseif(!CommonTools::checkArrayValue($searchdata,'lsc_id')){
				if(!$data = $lc_r->getDataByLcId($searchdata)){
					return CommonTools::returnData('資料獲取失敗');
				}
			}else{
				if(!$data = $lsc_r->getDataByLscId($searchdata)){
					return CommonTools::returnData('資料獲取失敗');
				}
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020102');
		}
	}

	/**
	 * 取得問題提問的欄位資料
	 */
	public function getField_qc($qa_type){
		$qc_r = new \App\Repositories\Question_1classRepository;
		try {
			if($qa_type == 'BBIN'){
				if(!$data = $qc_r->getBBINData()){
					return CommonTools::returnData('資料獲取失敗');
				}
			}elseif($qa_type == 'BBOS'){
				if(!$data = $qc_r->getBBOSData()){
					return CommonTools::returnData('資料獲取失敗');
				}
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020103');
		}
	}

	/**
	 * 取得翻譯語系的產品的欄位資料
	 */
	public function getField_lp(){
		$lp_r = new \App\Repositories\Language_1productRepository;
		try {
			if(!$data = $lp_r->getAllData()){
				return CommonTools::returnData('資料獲取失敗');
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020104');
		}
	}

	/**
	 * 取得翻譯語系的平台的欄位資料
	 */
	public function getField_lpf($id){
		$lpf_r = new \App\Repositories\Language_2platformRepository;
		try {
			if(!$data = $lpf_r->getDataByLpId($id)){
				return CommonTools::returnData('資料獲取失敗');
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020105');
		}
	}

	/**
	 * 取得翻譯語系的分類的欄位資料
	 */
	public function getField_lc(){
		$lc_r = new \App\Repositories\Language_3classRepository;
		$searchdata = Request::all();
		try {
			if(!$data = $lc_r->getDataById($searchdata)){
				return CommonTools::returnData('資料獲取失敗');
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020106');
		}
	}

	/**
	 * 藉由平台編號取得翻譯語系的分類的欄位資料
	 * @param  [string] $id [平台編號]
	 */
	public function getField_lc_byId($id){
		$lc_r = new \App\Repositories\Language_3classRepository;
		try {
			if(!$data = $lc_r->getDataByLpfId($id)){
				return CommonTools::returnData('資料獲取失敗');
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020107');
		}
	}

	/**
	 * 取得翻譯語系的子分類的欄位資料
	 * @param  [type] $id [description]
	 * @return [type]     [description]
	 */
	public function getField_lsc($id){
		$lsc_r = new \App\Repositories\Language_4subclassRepository;
		try {
			if(!$data = $lsc_r->getDataByLcId($id)){
				return CommonTools::returnData('資料獲取失敗');
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020108');
		}
	}

	/**
	 * 新增欄位
	 */
	public function actionFieldCreate(){
		$lp_r = new \App\Repositories\Language_1productRepository;
		$lpf_r = new \App\Repositories\Language_2platformRepository;
		$lc_r = new \App\Repositories\Language_3classRepository;
		$lsc_r = new \App\Repositories\Language_4subclassRepository;
		$qc_r = new \App\Repositories\Question_1classRepository;
		$searchdata = Request::all();
		$arraydata = array();
		$recorddata = array();
		$recorddata['tr_action'] = 1; // 異動動作：新增
		try {
			if(!CommonTools::checkArrayValue($searchdata,'fi_id')){
				return CommonTools::returnData('未傳入欄位項目');
			}
			if($searchdata['fi_id'] == 1){ // 新增產品
				$recorddata['tr_goal'] = 4; // 異動目標：語系產品
				if($count = $lp_r->getCountByName($searchdata) > 0){
					return CommonTools::returnData('此產品名稱已經存在');
				}
				// DB::beginTransaction();
				if(!$id = $lp_r->create($searchdata)){
					// DB::rollback();
					return CommonTools::returnData('新增失敗');
				}else{
					$recorddata['goal_id'] = $id; // 目標編號：lp_id
					$arraydata['lp_id'] = $id;
					$arraydata['lpf_name'] = '全平台';
					if(!$lpf_r->create($arraydata)){
						// DB::rollback();
						return CommonTools::returnData('新增失敗');
					}
				}
			}else if($searchdata['fi_id'] == 2){ // 新增平台
				$recorddata['tr_goal'] = 5; // 異動目標：語系平台
				if($count = $lpf_r->getCountByName($searchdata) > 0){
					return CommonTools::returnData('此平台名稱已經存在');
				}
				if(!$id = $lpf_r->create($searchdata)){
					return CommonTools::returnData('新增失敗');
				}else{
					$recorddata['goal_id'] = $id; // 目標編號：lpf_id
				}
			}else if($searchdata['fi_id'] == 3){ // 新增分類
				$recorddata['tr_goal'] = 6; // 異動目標：語系分類
				if($count = $lc_r->getCountByName($searchdata) > 0){
					return CommonTools::returnData('此分類名稱已經存在');
				}
				if(!$id = $lc_r->create($searchdata)){
					return CommonTools::returnData('新增失敗');
				}else{
					$recorddata['goal_id'] = $id; // 目標編號：lc_id
				}
			}else if($searchdata['fi_id'] == 4){ // 新增子分類
				$recorddata['tr_goal'] = 7; // 異動目標：語系子分類
				if($count = $lsc_r->getCountByName($searchdata) > 0){
					return CommonTools::returnData('此子分類名稱已經存在');
				}
				if(!$id = $lsc_r->create($searchdata)){
					return CommonTools::returnData('新增失敗');
				}else{
					$recorddata['goal_id'] = $id; // 目標編號：lsc_id
				}
			}else if($searchdata['fi_id'] == 5){ // 新增問題提問 分類
				$recorddata['tr_goal'] = 3; // 異動目標：問題分類
				if($count = $qc_r->getCountByTypeName($searchdata) > 0){
					return CommonTools::returnData('此分類名稱已經存在');
				}
				if(!$id = $qc_r->create($searchdata)){
					return CommonTools::returnData('新增失敗');
				}else{
					$recorddata['goal_id'] = $id; // 目標編號：lsc_id
				}
			}
			DB::commit();
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);

			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020201');
		}
	}

	/**
	 * 修改欄位
	 */
	public function actionFieldModify(){
		$lp_r = new \App\Repositories\Language_1productRepository;
		$lpf_r = new \App\Repositories\Language_2platformRepository;
		$lc_r = new \App\Repositories\Language_3classRepository;
		$lsc_r = new \App\Repositories\Language_4subclassRepository;
		$qc_r = new \App\Repositories\Question_1classRepository;
		$searchdata = Request::all();
		$arraydata = array();
		$recorddata = array();
		$recorddata['tr_action'] = 2; // 異動動作：修改
		try {
			if(!CommonTools::checkArrayValue($searchdata,'fi_id')){
				return CommonTools::returnData('未傳入欄位項目');
			}
			if($searchdata['fi_id'] == 1){ // 修改產品
				$recorddata['tr_goal'] = 4; // 異動目標：語系產品
				if($count = $lp_r->getCountByNameId($searchdata) > 0){
					return CommonTools::returnData('此產品名稱已經存在');
				}
				if(!$lp_r->update($searchdata)){
					return CommonTools::returnData('修改失敗');
				}else{
					$recorddata['goal_id'] = $searchdata['lp_id']; // 目標編號：lp_id
				}
			}else if($searchdata['fi_id'] == 2){ // 修改平台
				$recorddata['tr_goal'] = 5; // 異動目標：語系平台
				if($count = $lpf_r->getCountByNameId($searchdata) > 0){
					return CommonTools::returnData('此平台名稱已經存在');
				}
				if(!$lpf_r->update($searchdata)){
					return CommonTools::returnData('修改失敗');
				}else{
					$recorddata['goal_id'] = $searchdata['lpf_id']; // 目標編號：lp_id
				}
			}else if($searchdata['fi_id'] == 3){ // 修改分類
				$recorddata['tr_goal'] = 6; // 異動目標：語系分類
				if($count = $lc_r->getCountByNameId($searchdata) > 0){
					return CommonTools::returnData('此分類名稱已經存在');
				}
				if(!$lc_r->update($searchdata)){
					return CommonTools::returnData('修改失敗');
				}else{
					$recorddata['goal_id'] = $searchdata['lc_id']; // 目標編號：lp_id
				}
			}else if($searchdata['fi_id'] == 4){ // 修改子分類
				$recorddata['tr_goal'] = 7; // 異動目標：語系子分類
				if($count = $lsc_r->getCountByNameId($searchdata) > 0){
					return CommonTools::returnData('此子分類名稱已經存在');
				}
				if(!$lsc_r->update($searchdata)){
					return CommonTools::returnData('修改失敗');
				}else{
					$recorddata['goal_id'] = $searchdata['lsc_id']; // 目標編號：lp_id
				}
			}else if($searchdata['fi_id'] == 5){ // 修改問題提問 分類
				$recorddata['tr_goal'] = 3; // 異動目標：問題分類
				if($count = $qc_r->getCountByNameId($searchdata) > 0){
					return CommonTools::returnData('此分類名稱已經存在');
				}
				if(!$id = $qc_r->update($searchdata)){
					return CommonTools::returnData('修改失敗');
				}else{
					$recorddata['goal_id'] = $searchdata['qc_id']; // 目標編號：lsc_id
				}
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020301');
		}
	}

	/**
	 * 刪除欄位
	 */
	public function actionFieldDelete($data){
		$lp_r = new \App\Repositories\Language_1productRepository;
		$lpf_r = new \App\Repositories\Language_2platformRepository;
		$lc_r = new \App\Repositories\Language_3classRepository;
		$lsc_r = new \App\Repositories\Language_4subclassRepository;
		$lt_r = new \App\Repositories\LanguageTranslationRepository;
		$qc_r = new \App\Repositories\Question_1classRepository;

		$searchdata = json_decode($data,true);
		$arraydata = array();
		$recorddata['tr_action'] = 3; // 異動動作：刪除
		try {
			if(!CommonTools::checkArrayValue($searchdata,'fi_id')){
				return CommonTools::returnData('未傳入欄位項目');
			}
			if($searchdata['fi_id'] == 1){ // 刪除產品
				$recorddata['tr_goal'] = 4; // 異動目標：語系產品
				if($data = $lt_r->getDataByLpId($searchdata['lp_id'])){
					return CommonTools::returnData('該產品底下來有語系資料，刪除失敗');
				}else{
					if(!$lp_r->delete($searchdata['lp_id'])){
						return CommonTools::returnData('刪除失敗');
					}else{
						$recorddata['goal_id'] = $searchdata['lp_id']; // 目標編號：lp_id
					}
				}
			}else if($searchdata['fi_id'] == 2){ // 刪除平台
				$recorddata['tr_goal'] = 5; // 異動目標：語系平台
				if($data = $lt_r->getDataByLpfId($searchdata['lpf_id'])){
					return CommonTools::returnData('該平台底下來有語系資料，刪除失敗');
				}else{
					if(!$lpf_r->delete($searchdata['lpf_id'])){
						return CommonTools::returnData('刪除失敗');
					}else{
						$recorddata['goal_id'] = $searchdata['lpf_id']; // 目標編號：lpf_id
					}
				}
			}else if($searchdata['fi_id'] == 3){ // 刪除分類
				$recorddata['tr_goal'] = 6; // 異動目標：語系分類
				if($data = $lt_r->getDataByLcId($searchdata['lc_id'])){
					return CommonTools::returnData('該分類底下來有語系資料，刪除失敗');
				}else{
					if(!$lc_r->delete($searchdata['lc_id'])){
						return CommonTools::returnData('刪除失敗');
					}else{
						$recorddata['goal_id'] = $searchdata['lc_id']; // 目標編號：lc_id
					}
				}
			}else if($searchdata['fi_id'] == 4){ // 刪除子分類
				$recorddata['tr_goal'] = 7; // 異動目標：語系子分類
				if($data = $lt_r->getDataByLscId($searchdata['lsc_id'])){
					return CommonTools::returnData('該子分類底下來有語系資料，刪除失敗');
				}else{
					if(!$lsc_r->delete($searchdata['lsc_id'])){
						return CommonTools::returnData('刪除失敗');
					}else{
						$recorddata['goal_id'] = $searchdata['lsc_id']; // 目標編號：lsc_id
					}
				}
			}else if($searchdata['fi_id'] == 5){ // 刪除問題提問 分類
				$recorddata['tr_goal'] = 3; // 異動目標：問題分類
				if(!$id = $qc_r->delete($searchdata['qc_id'])){
					return CommonTools::returnData('刪除失敗');
				}else{
					$recorddata['goal_id'] = $searchdata['qc_id']; // 目標編號：lsc_id
				}
			}
			// 新增異動紀錄
			CommonTools::createTransactionRecord($recorddata);
			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#020401');
		}
	}
}