@extends('layouts.plane')
@section('body')
<div id="page-header">
    <div class="header-wrapper">
        <a href="{{ url ('bbin-question-list') }}" class="logo_wrap"></a>
        <div class="user_wrap">
            <ul class="">
                <li>
                    @if(!empty(Session::get('user_name')))
                        Hello，{{ Session::get('user_name') }}
                    @endif
                </li>
                <li>
                    <a href="{{ url ('logout') }}" class="btn_logout">登出<i class="fa fa-sign-out fa-fw"></i></a>
                </li>
            </ul>
        </div>
        <div class="mainnav_wrap">
            <ul class="">
                <li {{ (Request::is('bbin-question-list') ? 'class=current' : '') }}>
                    <a href="{{ url ('bbin-question-list') }}">BBIN提問</a>
                </li>
                <li {{ (Request::is('bbos-question-list') ? 'class=current' : '') }}>
                    <a href="{{ url ('bbos-question-list') }}">NBB提問</a>
                </li>
                <li {{ (Request::is('language-list') ? 'class=current' : '') }}>
                    <a href="{{ url ('language-list') }}">語系列表</a>
                </li>
                <li {{ (Request::is('field-list') ? 'class=current' : '') }}>
                    <a href="{{ url ('field-list') }}">欄位管理列表</a>
                </li>
                <li {{ (Request::is('message-list') ? 'class=current' : '') }}>
                    <a href="{{ url ('message-list') }}">留言板列表</a>
                </li>
                <li {{ (Request::is('transaction-list') ? 'class=current' : '') }}>
                    <a href="{{ url ('transaction-list') }}">異動紀錄列表</a>
                </li>
                <li {{ (Request::is('user-list') ? 'class=current' : '') }}>
                    <a href="{{ url ('user-list') }}">使用者列表</a>
                </li>
                @if(Session::get('admin') == 1)
                    <li {{ (Request::is('batch/batch-import') ? 'class=current' : '') }}>
                        <a href="{{ url ('batch/batch-import') }}">批量新增</a>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</div>
<div id="page-container">
    @yield('section')
</div>
<div id="page-footer">
    <div class="footer-wrapper">
        
    </div>
</div>
@stop

