$(function(){

  // 修改、新增、刪除之後在頁面會跳出的小視窗，確認的按鈕
  $('.btn_yes').on('click', function() {
    $('.prompt_body_admin').fadeOut(400);
    $('html').removeClass('over_hidden');
  })
})