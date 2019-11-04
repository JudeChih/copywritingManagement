{{-- 框架導入 --}}
@extends('layouts.dashboard')

{{-- 個別CSS導入 --}}
@section('put_style')
<link href="{{ URL::asset('css/bbosquestion.css') }}" rel="stylesheet">
@endsection

{{-- 個別JS導入 --}}
@section('put_script')
<script src="/js/bbosquestion.js"></script>
@endsection

{{-- 主要內容處導入 --}}
@section('section')
<div id="app">
    <bbosquestion></bbosquestion>
</div>
@endsection

