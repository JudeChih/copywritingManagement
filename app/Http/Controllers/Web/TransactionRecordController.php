<?php
namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;
// 錯誤代碼  #060000 開頭
class TransactionRecordController extends Controller
{
	/**
	 * 取得所有異動紀錄的資料
	 */
	public function getTransactions(){
		$tr_r = new \App\Repositories\TransactionRecordRepository;
		try {
			if(!$data = $tr_r->getAllData()){
				return view('feature.transactionrecordlist');
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('#060101');
		}
	}
}