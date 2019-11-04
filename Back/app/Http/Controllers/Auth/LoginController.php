<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Http\Controllers\Auth\JWTController;
use App\Services\AuthService;
use Firebase\JWT\JWT;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;
    use JWTController;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    public function loginview(){
        return \Illuminate\Support\Facades\View::make('login');
    }

    /**
     * 執行登入
     * @param \Illuminate\Http\Request $request
     * @return boolean
     */
    public function login(\Illuminate\Http\Request $request) {
        try {
            //檢查帳號密碼是否有填寫
            if (!isset($request->ud_account) || !isset($request->ud_pwd)) {
                AuthService::clearToken();
                return redirect()->back()->withInput()->withErrors(['error' => '沒有相符的帳號或密碼錯誤，請重新輸入。']);
            }
            //檢查是否有這個使用者資料
            $userdata = $this->checkUserStatus($request->ud_account,$request->ud_pwd);
            if (!isset($userdata)) {
                AuthService::clearToken();
                return redirect()->back()->withInput()->withErrors(['error' => '沒有相符的帳號或密碼錯誤，請重新輸入。']);
            }

            //建立「JWT Token」
            $jwttoken = $this->generateJWTToken($userdata);
            if (!isset($jwttoken)) {
                AuthService::clearToken();
                return redirect()->back()->withInput()->withErrors(['error' => '此帳號資料有誤，請聯絡開發組Toby！']);
            }
            //儲存「Token」
            AuthService::saveToken($jwttoken, $userdata);

            // 更新這個使用者的"最後一次登入時間"
            if(!$this->updateLastLogin($userdata)){
                AuthService::clearToken();
                return redirect()->back()->withInput()->withErrors(['error' => '更新"最後一次登入時間"失敗，請聯絡開發組Toby！']);
            }
            return redirect('/bbin-question-list');
        } catch (\Exception $e) {
            \App\Library\CommonTools::writeErrorLogByException($e);
            AuthService::clearToken();
            return redirect()->back()->withInput()->withErrors(['error' => '未知錯誤，請聯絡開發組Toby！']);
        }
    }

    /**
     * 執行登出
     * @param \Illuminate\Http\Request $request
     * @return type
     */
    public function logOut(\Illuminate\Http\Request$request) {
        //清除「Token」
        AuthService::clearToken();
        return redirect('/login');
    }

    /**
     * 檢查使用者狀態，啟用中才可以登入成功
     * @param type $userName 使用者帳號
     * @param type $userPassword 使用者密碼
     * @return type 使用者資料 [ ud_admin ,ud_name ,ud_id ]
     */
    public function checkUserStatus($userName,$userPassword) {
        $ud_r = new \App\Repositories\UserDataRepository;
        $userdata = $ud_r->getDataByAccountPwd($userName,$userPassword);
        if (count($userdata) > 0) {
            // 做成Json格式回傳
            return $userdata[0];
        } else {
            return null;
        }
    }

    /**
     * 更新該使用者的"最後一次登入時間"
     * @param  [array] $userdata  [使用者資料]
     */
    public function updateLastLogin($userdata){
        try {
            $ud_r = new \App\Repositories\UserDataRepository;
            $arraydata['ud_id'] = $userdata['ud_id'];
            $arraydata['ud_last_login'] = \Carbon\Carbon::now();
            if(!$ud_r->update($arraydata)){
                return false;
            }
            return true;
        } catch (\Exception $e) {
            \App\Library\CommonTools::writeErrorLogByException($e);
            return false;
        }
    }
}
