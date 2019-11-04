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
	 * 新增留言
	 * @param [array] $searchdata [留言資料]
	 */
	public function actionMessageCreate(){
		$mb_r = new \App\Repositories\MessageBoardRepository;
		$searchdata = Request::all();
		try {
			$searchdata['mb_ip'] = Request::getClientIp();

			if(!$mb_r->create($searchdata)){
				return CommonTools::returnData('新增失敗');
			}

			return CommonTools::returnData('ok');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}
}