<?php

namespace App\Repositories;

use \App\Models\ErrorLog;
use App\Library\CommonTools;
use DB;

class ErrorLogRepository {

    /**
     * 建立一筆新的資料
     * @param array $arraydata 要新增的資料
     * @return type
     */
    public function create(array $arraydata) {

        try {
            $savedata['log_time'] = \Carbon\Carbon::now();
            if (isset($arraydata['log_code'])) {
                $savedata['log_code'] = $arraydata['log_code'];
            }
            if (isset($arraydata['log_message'])) {
                $savedata['log_message'] = $arraydata['log_message'];
            }
            if (isset($arraydata['log_previous'])) {
                $savedata['log_previous'] = $arraydata['log_previous'];
            }
            if (isset($arraydata['log_file'])) {
                $savedata['log_file'] = $arraydata['log_file'];
            }
            if (isset($arraydata['log_line'])) {
                $savedata['log_line'] = $arraydata['log_line'];
            }
            if (isset($arraydata['log_trace'])) {
                $savedata['log_trace'] = $arraydata['log_trace'];
            }
            if (isset($arraydata['log_traceasstring'])) {
                $savedata['log_traceasstring'] = $arraydata['log_traceasstring'];
            }

            ErrorLog::insert($savedata);
            return true;
        } catch (\Exception $e) {
            \App\Library\CommonTools::writeErrorLogByException($e);
            return false;
        }
    }
}
