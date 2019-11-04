@extends('layouts.plane')
@section('body')
<div id="wrapper">
    <div class="header">
        <div class="header-main">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <figure class="logo">
                    <a href="{{ url ('bbin-question-list') }}">
                        <img src="images/logo.png">
                    </a>
                </figure>
            </div>
            <nav class="nav">
                <ul>
                    <li {{ (Request::is('bbin-question-list') ? 'class=active' : '') }}>
                        <a href="{{ url ('bbin-question-list') }}">BBIN提問</a>
                    </li>
                    <li {{ (Request::is('bbos-question-list') ? 'class=active' : '') }}>
                        <a href="{{ url ('bbos-question-list') }}">NBB提問</a>
                    </li>
                    <li {{ (Request::is('language-list') ? 'class=active' : '') }}>
                        <a href="{{ url ('language-list') }}">語系翻譯</a>
                    </li>
                    <li {{ (Request::is('message-list') ? 'class=active' : '') }}>
                        <a href="{{ url ('message-list') }}">留言板</a>
                    </li>
                </ul>
            </nav>
            <div class="time-wrap">
                <span class="date"></span>
                <span class="md">
                    <span class="month"></span>
                    <span class="day"></span>
                </span>
                <span class="time"></span>
                <span class="ampm"></span>
            </div>
        </div>
    </div>
    <div id="page-wrapper">
        @yield('section')
    </div>
</div>
@stop

