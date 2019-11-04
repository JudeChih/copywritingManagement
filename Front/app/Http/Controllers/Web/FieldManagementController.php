<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;
use DB;
// use Excel;

class FieldManagementController extends Controller
{
	/**
	 * 取得所有符合條件的欄位資料
	 * @param  [array] $searchdata [篩選條件資料]
	 */
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

			foreach ($lp_data as $val) {
				array_push($data,$val);
			}
			foreach ($lpf_data as $val) {
				array_push($data,$val);
			}
			foreach ($lc_data as $val) {
				array_push($data,$val);
			}
			foreach ($lsc_data as $val) {
				array_push($data,$val);
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
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
			return CommonTools::returnData('未知錯誤');
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
			return CommonTools::returnData('未知錯誤');
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
			return CommonTools::returnData('未知錯誤');
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
			return CommonTools::returnData('未知錯誤');
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
			return CommonTools::returnData('未知錯誤');
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
			return CommonTools::returnData('未知錯誤');
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
			return CommonTools::returnData('未知錯誤');
		}
	}
}