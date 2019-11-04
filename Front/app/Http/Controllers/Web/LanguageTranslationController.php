<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;

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
}