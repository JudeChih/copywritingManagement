<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemParameter extends Model {

    /**
     * 資料表名稱
     * @var string
     */
    protected $table = 'cm_systemparameter';

    /**
     * 主鍵值
     * @var string
     */
    protected $primaryKey = 'sp_id';

    /**
     * 是否自動遞增
     * @var string
     */
    public $incrementing = true;

    /**
     * 是否自動插入現在時間
     *
     * @var bool
     */
    public $timestamps = false;

}