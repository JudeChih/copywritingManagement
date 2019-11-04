@extends ('app')
@section('content')
<div class="container">
    <div class="logo_block"></div>
    <div class="login_block">
        <form class="form_signin" action="/login" method="post">
            {!! csrf_field() !!}
            @if($errors->any())
                <div class="account_block">
                    <div class=account_title>
                        USERNAME 帳號
                    </div>
                    <input type="text" id="ud_account" class="error" name="ud_account" placeholder="請輸入您的帳號">
                </div>
                <div class="password_block">
                    <div class=password_title>
                        PASSWORD 密碼
                    </div>
                    <input type="password" id="ud_pwd" class="error" name="ud_pwd" placeholder="請輸入您的密碼">
                </div>
                <div class="error_tip">{{$errors->first()}}</div>
            @else
                <div class="account_block">
                    <div class=account_title>
                        USERNAME 帳號
                    </div>
                    <input type="text" id="ud_account" class="" name="ud_account" placeholder="請輸入您的帳號">
                </div>
                <div class="password_block">
                    <div class=password_title>
                        PASSWORD 密碼
                    </div>
                    <input type="password" id="ud_pwd" class="" name="ud_pwd" placeholder="請輸入您的密碼">
                </div>
            @endif
            <div class="keep_login_block">
                <input id="keep_login" class="chat-button-location-radio-input" type="checkbox" name="keep_login">
                <label  for="keep_login"></label >
                <span>保持登入</span>
            </div>
            <button type="submit" class="btn_login">
                <p>LOGIN</p>
                <i class="fa fa-chevron-circle-right"></i>
            </button>
        </form>
    </div>
</div>
@stop