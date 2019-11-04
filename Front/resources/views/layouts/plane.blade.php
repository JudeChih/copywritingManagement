<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
	<title>BOOK</title>

	<!-- 導入metatag資料 -->
    @include('layouts.metatag_list')

    <!-- 導入css -->
    @include('layouts.css_list')

    <!-- 各頁面各別的CSS匯入 -->
    @yield('put_style')

    <!-- laravel辨識用憑證 -->
    <script type='text/javascript'>
        window.Laravel = <?php echo json_encode(['csrfToken' => csrf_token(),]); ?>
    </script>

</head>
<body>

<!-- 提示框 -->
@yield('prompt_box')
<div class="prompt_body_admin">
    <div class="prompt_box_admin panel-default">
        <div class="panel-heading">
            <h3>提示</h3>
        </div>
        <h2></h2>
        <div>
            {{-- <button type="button" class="btn-style btn_no">取消</button> --}}
            <button type="button" class="btn-style btn_yes">確認</button>
        </div>
    </div>
</div>

<!-- 身體崁入 -->
@yield('body')

</body>

<!-- 導入js -->
@include('layouts.js_list')

<!-- 各頁面各別的JS匯入 -->
@yield('put_script')

</html>