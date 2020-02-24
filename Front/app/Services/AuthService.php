<?php
namespace App\Services;

use Session;
use Request;

class AuthService {

    private static $sessionToken = 'jwttoken';
    private static $sessionUserData = 'userdata';
    private static $sessionUserName = 'user_name';
    private static $sessionUserId = 'id';
    private static $sessionUserAdmin = 'admin';
    private static $sessionUserAccount = 'account';

    /**
     * 儲存「JWT Token」
     * @param type $token
     */
    public static function saveToken($token, $userdata) {

        if (!isset($token) || !isset($userdata)) {
            return \Illuminate\Support\Facades\Redirect::route('logout');
        }
        // 存各式資料
        Session::put(AuthService::$sessionToken, $token);
        Session::put(AuthService::$sessionUserData, $userdata);
        Session::put(AuthService::$sessionUserName, $userdata['ud_name']);
        Session::put(AuthService::$sessionUserAdmin, $userdata['ud_admin']);
        Session::put(AuthService::$sessionUserId, $userdata['ud_id']);
        Session::put(AuthService::$sessionUserAccount, $userdata['ud_account']);
    }

    /**
     * 清除「JWT Token」
     */
    public static function clearToken() {
        Session::flush();
    }

    /**
     * 取得「JWT Token」
     */
    public static function token() {
        return Session::get(AuthService::$sessionToken);
    }

    /**
     * 使用者資料
     */
    public static function userData() {
        return Session::get(AuthService::$sessionUserData);
    }

    /**
     * 使用者帳號
     */
    public static function userAccount() {
        return Session::get(AuthService::$sessionUserAccount);
    }

    /**
     * 使用者名稱
     */
    public static function userName() {
        return Session::get(AuthService::$sessionUserName);
    }

    /**
     * 使用者權限
     */
    public static function userAdmin() {
        return Session::get(AuthService::$sessionUserAdmin);
    }

    /**
     * 使用者編號
     */
    public static function userId() {
        return Session::get(AuthService::$sessionUserId);
    }

}
