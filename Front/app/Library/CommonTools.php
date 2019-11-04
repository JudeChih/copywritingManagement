<?php

namespace App\Library;

use Illuminate\Http\Request;

class CommonTools {

    /**
     * 將異動資訊記錄起來
     * @param  [array] $arraydata [異動資訊]
     */
    public static function createTransactionRecord($arraydata){
        try {
            $tr_r = new \App\Repositories\TransactionRecordRepository;
            // 異動使用者名稱
            if(\App\Services\AuthService::userData()->ud_account){
                $arraydata['tr_user'] = \App\Services\AuthService::userData()->ud_account;
            }else{
                $arraydata['tr_user'] = '無法辨識的使用者';
            }
            return $tr_r->create($arraydata);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return false;
        }
    }

    /**
     * 如果是要回傳字串，統一由此編輯並回傳
     * @param  [string] $string [提示文字]
     */
    public static function returnData($string){
        try {
            $data['result'] = $string;
            return response()->json($data);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            $data['result'] = '未知錯誤';
            return response()->json($data);
        }
    }

    /**
     * 檢查「keyname」是否存在於「arraydata」中，並檢查是否有填值
     * @param type $arraydata
     * @param type $keyname
     * @return boolean
     */
    public static function checkArrayValue($arraydata, $keyname) {
        try {
            if (
                    !array_key_exists($keyname, $arraydata) || is_null($arraydata[$keyname]) || mb_strlen($arraydata[$keyname]) == 0
            ) {
                return false;
            }

            return true;
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return false;
        }
    }

    /**
     * 檢查值的格式是否正確
     * @param type $value 要檢查的值
     * @param type $maxLength 限制長度，若為「０」則不限制
     * @param type $canEmpty 可否〔不填值〕或〔空值〕
     * @param type $canSpace 可否包含〔空白〕
     * @return boolean 檢查結果
     */
    public static function checkValueFormat($value, $maxLength, $canEmpty, $canSpace) {
        try {
            if (mb_strlen($value) == 0 && $canempty) {
                return true;
            }
            if (mb_strlen($value) == 0) {
                return false;
            }

            if ($maxLength != 0 && mb_strlen($value) > $maxLength) {
                //長度太長
                return false;
            }
            if (!$canSpace && preg_match('/\s/', $value)) {
                //檢查是否可包含空白
                return false;
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * 取得隨機GUID字串, 依「$havedash」決定是否包含Dash
     * @param type $havedash 是否包含Dash
     * @return type GUID字串
     */
    public static function generateGUID($havedash = true) {

        if ($havedash) {
            $formatstring = '%04x%04x-%04x-%04x-%04x-%04x%04x%04x';
        } else {
            $formatstring = '%04x%04x%04x%04x%04x%04x%04x%04x';
        }

        return sprintf($formatstring,
                // 32 bits for "time_low"
                mt_rand(0, 0xffff), mt_rand(0, 0xffff),
                // 16 bits for "time_mid"
                mt_rand(0, 0xffff),
                // 16 bits for "time_hi_and_version",
                // four most significant bits holds version number 4
                mt_rand(0, 0x0fff) | 0x4000,
                // 16 bits, 8 bits for "clk_seq_hi_res",
                // 8 bits for "clk_seq_low",
                // two most significant bits holds zero and one for variant DCE1.1
                mt_rand(0, 0x3fff) | 0x8000,
                // 48 bits for "node"
                mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    /**
     * 產生亂數數字字串
     * @param type $length 字串長度
     * @return string
     */
    public static function generateRandomNumberString($length) {
        $characters = '0123456789';
        $randstring = '';
        for ($i = 0; $i < $length; $i++) {
            $randstring .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randstring;
    }

    /**
     * 建立「Exception」記錄
     * @param type $ex
     * @return boolean 執行結果
     */
    public static function writeErrorLogByException($ex) {
        try {
            $arraydata['log_code'] = $ex->getCode();
            $arraydata['log_message'] = $ex->getMessage();
            $arraydata['log_previous'] = $ex->getPrevious();
            $arraydata['log_file'] = $ex->getFile();
            $arraydata['log_line'] = $ex->getLine();

            $errRepo = new \App\Repositories\ErrorLogRepository();
            return $errRepo->create($arraydata);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return false;
        }
    }

    /**
     * 建立「Message」記錄
     * @param type $message 訊息
     * @param type $code 代碼
     * @param type $file 檔案
     * @param type $line 行數
     * @return boolean 執行結果
     */
    public static function writeErrorLogByMessage($message, $code = null, $file = null, $line = null) {
        try {
            $arraydata['log_message'] = $message;
            if (isset($code)) {
                $arraydata['log_code'] = $code;
            }
            if (isset($file)) {
                $arraydata['log_file'] = $file;
            }
            if (isset($line)) {
                $arraydata['log_line'] = $line;
            }

            $errRepo = new \App\Repositories\ErrorLogRepository();
            return $errRepo->create($arraydata);
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return false;
        }
    }

    /**
     * 判斷字串裡是否有包含特殊符號
     * @param  string $data [要判別的字串]
     * @return [type]       [description]
     */
    public static function strIsSpecial($data){
        $l2 = "&,',\",<,>,!,%,#,$,@,=,?,/,(,),[,],{,},.,+,*,_";
        $I2 = explode(',', $l2);
        $I2[] = ",";

        foreach ($I2 as $v) {
           if (strpos($data, $v) !== false) {
               return true;
           }
        }
        return false;
    }

    /**
     * 判斷身分證字號
     * @param  string $id [身分證字號]
     */
    public static function id_card($cardid){
        $err ='';
        //先將字母數字存成陣列
        $alphabet =['A'=>'10','B'=>'11','C'=>'12','D'=>'13','E'=>'14','F'=>'15','G'=>'16','H'=>'17','I'=>'34',
                    'J'=>'18','K'=>'19','L'=>'20','M'=>'21','N'=>'22','O'=>'35','P'=>'23','Q'=>'24','R'=>'25',
                    'S'=>'26','T'=>'27','U'=>'28','V'=>'29','W'=>'32','X'=>'30','Y'=>'31','Z'=>'33'];
        //檢查字元長度
        if(strlen($cardid) !=10){//長度不對
            $err = '1';
            return false;
        }

        //驗證英文字母正確性
        $alpha = substr($cardid,0,1);//英文字母
        $alpha = strtoupper($alpha);//若輸入英文字母為小寫則轉大寫
        if(!preg_match("/[A-Za-z]/",$alpha)){
            $err = '2';
            return false;
        }else{
            //計算字母總和
            $nx = $alphabet[$alpha];
            $ns = $nx[0]+$nx[1]*9;//十位數+個位數x9
        }

        //驗證男女性別
        $gender = substr($cardid,1,1);//取性別位置
        //驗證性別
        if($gender !='1' && $gender !='2'){
            $err = '3';
            return false;
        }

        //N2x8+N3x7+N4x6+N5x5+N6x4+N7x3+N8x2+N9+N10
        if($err ==''){
            $i = 8;
            $j = 1;
            $ms =0;
            //先算 N2x8 + N3x7 + N4x6 + N5x5 + N6x4 + N7x3 + N8x2
            while($i >= 2){
                $mx = substr($cardid,$j,1);//由第j筆每次取一個數字
                $my = $mx * $i;//N*$i
                $ms = $ms + $my;//ms為加總
                $j+=1;
                $i--;
            }
            //最後再加上 N9 及 N10
            $ms = $ms + substr($cardid,8,1) + substr($cardid,9,1);
            //最後驗證除10
            $total = $ns + $ms;//上方的英文數字總和 + N2~N10總和
            if( ($total%10) !=0){
                $err = '4';
                return false;
            }
        }
        //錯誤訊息返回
        // switch($err){
        //     case '1':$msg = '字元數錯誤';break;
        //     case '2':$msg = '英文字母錯誤';break;
        //     case '3':$msg = '性別錯誤';break;
        //     case '4':$msg = '驗證失敗';break;
        //     default:$msg = '驗證通過';break;
        // }
        // \App\Library\CommonTools::writeErrorLogByMessage('身份字號：'.$cardid);
        // \App\Library\CommonTools::writeErrorLogByMessage($msg);
        return true;
    }

    /**
     * 將Json格式的字串 轉換為 PHP Array
     * @param type $inputstring WebAPI接收到的「JSON」格式字串
     * @return type PHP陣列
     */
    public static function convertStringToArray($inputstring) {

        try {
            // $input = str_replace("'", '"', $inputstring);
            $input = $inputstring;

            if (is_array($input)) {
                $inputjson = json_decode($input[0], true);
            } else {
                $inputjson = json_decode($input, true);
            }
            return $inputjson;
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return null;
        }
    }

    /**
     * 對〔$data〕陣列中所有值作「rawurlencode」
     * @param type $data 陣列值
     * @return type 「rawurlencode」後的資料
     */
    private static function urlEncodeArray($data) {

        //若不為〔陣列〕則直接作「rawurlencode」後回傳
        if (!is_array($data)) {
            //return $data;
            return rawurlencode($data);
        }
        //迴圈：「rawurlencode」所有$value
        foreach ($data as $name => $value) {
            //遞迴：呼叫原本 Function 以跑遍所有「陣列」中的「陣列」
            $data[$name] = CommonTools::urlEncodeArray($value);
        }

        return $data;
    }

    /**
     * 建立「WebAPI 執行記錄」到資料庫中
     * @param type $functionname 執行的功能名稱
     * @param type $input 接收到的值
     * @param type $result 回傳的值
     * @param type $messagecode 訊息代碼
     * @return boolean 執行結果
     */
    public static function writeExecuteLog($functionname, $input, $result, $messagecode) {
        $jsoniorec = new \App\Repositories\JsonInOutRecordRepository;
        $arraydata = array("jio_receive" => json_encode($input), "jio_return" => $result, "jio_wcffunction" => $functionname, "ps_id" => $messagecode);
        if ($jsoniorec->insertData($arraydata)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 檢查「$keyname」是否存在於「$arraydata」中，並檢查其他條件
     * @param type $arraydata   要檢查的陣列
     * @param type $keyname    要檢查的參數名稱
     * @param type $maxlength 最大長度限制，若輸入「0」則為不限制
     * @param type $canempty 是否可為「空值」
     * @param type $canspace 是否可包含「空白」
     * @return boolean 是否符合條件
     */
    public static function checkRequestArrayValue($arraydata, $keyname, $maxlength, $canempty, $canspace) {
        try {

            if (array_key_exists($keyname, $arraydata)) {
                $QQ = $arraydata[$keyname];
                if (is_array($QQ)) {
                    $QQ = implode(" ", $QQ);
                }
            } else {
                $QQ = null;
            }

            if ((!array_key_exists($keyname, $arraydata) || ( mb_strlen($QQ) == 0)) && $canempty) {
                return true;
            }
            if (!array_key_exists($keyname, $arraydata) || ( mb_strlen($QQ) == 0)) {
                //不存在
                return false;
            }

            if ($maxlength != 0 && mb_strlen($QQ) > $maxlength) {
                //長度太長
                return false;
            }
            if (!$canspace) {
                //檢查是否可包含空白
                if (preg_match('/\s/', $QQ) === 1) {
                    return false;
                }
            }
            return true;
        } catch (\Exception $e) {
            CommonTools::writeErrorLogByException($e);
            return false;
        }
    }

    /**
     * 將傳入傳出的值寫到DB紀錄裡
     * @param [type] $functionname [傳入傳出的函數名稱]
     * @param [type] $input        [傳入傳出的值]
     * @param [type] $result       [傳入傳出的結果]
     * @param [type] $messagecode  [結果的代碼]
     * @param [type] &$jio_id      [回傳存入DB的PK]
     */
    public static function writeExecuteLogGetId($functionname, $input, $result, $messagecode, &$jio_id) {
        $jsoniorec = new \App\Repositories\JsonInOutRecordRepository;
        $arraydata = array("jio_receive" => json_encode($input), "jio_return" => $result, "jio_wcffunction" => $functionname, "ps_id" => $messagecode);
        if ($jsoniorec->insertDataGetId($arraydata, $jio_id)) {
            return true;
        } else {
            return false;
        }
        return true;
    }
}
