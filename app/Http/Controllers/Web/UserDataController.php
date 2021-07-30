<?php

namespace App\Http\Controllers\Web;

use Request;
use Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;
// 錯誤代碼  #070000 開頭
class UserDataController extends Controller
{
    /**
     * 取得所有使用者的資料
     */
    public function getUsers(){
        $ud_r = new \App\Repositories\UserDataRepository;
        try {
            if(!$data = $ud_r->getAllData()){
                return CommonTools::returnData('資料獲取失敗');
            }
            return response()->json($data);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('#070101');
        }
    }

    /**
     * 取得某使用者的資料
     * @param  [string] $id [使用者編號]
     */
    public function getUser($id){
        $ud_r = new \App\Repositories\UserDataRepository;
        try {
            if(!$data = $ud_r->getDataById($id)){
                return CommonTools::returnData('資料獲取失敗');
            }
            if(count($data) == 1){
                $data = $data[0];
            }
            return response()->json($data);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('#070102');
        }
    }

    /**
     * 新增使用者
     */
    public function actionUserCreate(){
        $ud_r = new \App\Repositories\UserDataRepository;
        $searchdata = Request::all();
        $recorddata = array();
        $recorddata['tr_action'] = 1; //異動動作：新增
        $recorddata['tr_goal'] = 8; //異動目標：使用者
        try {
            if(!CommonTools::checkArrayValue($searchdata,'ud_account')){
                return CommonTools::returnData('未傳入使用者帳號');
            }
            if(!CommonTools::checkArrayValue($searchdata,'ud_password')){
                return CommonTools::returnData('未傳入使用者密碼');
            }
            if(!CommonTools::checkArrayValue($searchdata,'ud_name')){
                return CommonTools::returnData('未傳入使用者名稱');
            }
            if($ud_r->getDataByAccount($searchdata['ud_account'])){
                return CommonTools::returnData('該帳號已被註冊');
            }
            if(!$id = $ud_r->create($searchdata)){
                return CommonTools::returnData('新增失敗');
            }else{
                $recorddata['goal_id'] = $id; //目標編號：ud_id
            }
            // 新增異動紀錄
            CommonTools::createTransactionRecord($recorddata);

            return CommonTools::returnData('ok');
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('#070201');
        }
    }

    /**
     * 修改使用者
     */
    public function actionUserModify(){
        $ud_r = new \App\Repositories\UserDataRepository;
        $searchdata = Request::all();
        $recorddata = array();
        $recorddata['tr_action'] = 2; //異動動作：修改
        $recorddata['tr_goal'] = 8; //異動目標：使用者
        try {
            if(!CommonTools::checkArrayValue($searchdata,'ud_id')){
                return CommonTools::returnData('未傳入使用者編號');
            }
            if(!$ud_r->update($searchdata)){
                return CommonTools::returnData('修改失敗');
            }else{
                $recorddata['goal_id'] = $searchdata['ud_id']; //目標編號：ud_id
            }
            // 新增異動紀錄
            CommonTools::createTransactionRecord($recorddata);

            return CommonTools::returnData('ok');
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('#070301');
        }
    }

    /**
     * 刪除使用者
     * @param  [string] $id [使用者編號]
     */
    public function actionUserDelete($id){
        $ud_r = new \App\Repositories\UserDataRepository;
        $recorddata = array();
        $recorddata['tr_action'] = 3; //異動動作：刪除
        $recorddata['tr_goal'] = 8; //異動目標：使用者
        try {
            if(!$ud_r->delete($id)){
                return CommonTools::returnData('刪除失敗');
            }else{
                $recorddata['goal_id'] = $id; //目標編號：ud_id
            }
            // 新增異動紀錄
            CommonTools::createTransactionRecord($recorddata);

            return CommonTools::returnData('ok');
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return CommonTools::returnData('#070401');
        }
    }
}
