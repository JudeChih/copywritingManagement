<?php

Route::get('/login', 'Auth\LoginController@loginview');
Route::post('/login', 'Auth\LoginController@login');
Route::get('/logout', [
    'as' => 'logout',
    'uses' => 'Auth\LoginController@logout'
]);
Route::get('/', 'Auth\LoginController@loginview');


Route::group(['middleware' => 'userdata'],function(){

	// 首頁(目前暫定為bbin提問)
	Route::get('/index', function(){return View::make('pages.bbinquestionlist');});

	// 問題提問相關(分BBIN和BBOS兩大類)
	//// 列表首頁
	Route::get('/bbin-question-list',function(){return View::make('pages.bbinquestionlist');});
	Route::get('/bbos-question-list',function(){return View::make('pages.bbosquestionlist');});
	//// 功能
	Route::get('/questions/{qa_type}','Web\QuestionAskController@getQuestions');
	Route::post('/questions/{qa_type}','Web\QuestionAskController@getQuestions');
	Route::get('/question/{id}','Web\QuestionAskController@getQuestion');
	Route::post('/question-modify','Web\QuestionAskController@actionQuestionModify');
	Route::post('/question-create','Web\QuestionAskController@actionQuestionCreate');
	Route::get('/question-delete/{id}','Web\QuestionAskController@actionQuestionDelete');

	// 語系翻譯相關
	Route::get('/language-list',function(){return View::make('pages.languagelist');});
	Route::get('/languages','Web\LanguageTranslationController@getLanguages');
	Route::post('/languages','Web\LanguageTranslationController@getLanguages');
	Route::get('/languages/{id}','Web\LanguageTranslationController@getLanguage');
	Route::post('/language-modify','Web\LanguageTranslationController@actionLanguageModify');
	Route::post('/language-create','Web\LanguageTranslationController@actionLanguageCreate');
	Route::get('/language-delete/{id}','Web\LanguageTranslationController@actionLanguageDelete');

	// 欄位管理相關
	Route::get('/field-list',function(){return View::make('pages.fieldlist');});
	Route::get('/fields','Web\FieldManagementController@getFields');
	Route::post('/fields','Web\FieldManagementController@getFields');
	Route::post('/field','Web\FieldManagementController@getField');
	Route::post('/field-modify','Web\FieldManagementController@actionFieldModify');
	Route::post('/field-create','Web\FieldManagementController@actionFieldCreate');
	Route::post('/field-delete','Web\FieldManagementController@actionFieldDelete');

	//
	Route::get('/field-question/{qa_type}','Web\FieldManagementController@getField_qc');
	Route::get('/field-language-product','Web\FieldManagementController@getField_lp');
	Route::get('/field-language-platform/{id}','Web\FieldManagementController@getField_lpf');
	Route::post('/field-language-class','Web\FieldManagementController@getField_lc');
	Route::get('/field-language-class/{id}','Web\FieldManagementController@getField_lc_byId');
	Route::get('/field-language-subclass/{id}','Web\FieldManagementController@getField_lsc');

	// 留言板相關
	Route::get('/message-list',function(){return View::make('pages.messagelist');});
	Route::get('/messages','Web\MessageBoardController@getMessages');
	Route::post('/messages','Web\MessageBoardController@getMessages');
	Route::get('/message-solve/{id}','Web\MessageBoardController@actionMessageSolve');

	// 異動紀錄相關
	Route::get('/transaction-list',function(){return View::make('pages.transactionlist');});
	Route::get('/transactions','Web\TransactionRecordController@getTransactions');

	// 使用者相關
	Route::get('/user-list',function(){return View::make('pages.userlist');});
	Route::get('/users','Web\UserDataController@getUsers');
	Route::post('/users','Web\UserDataController@getUsers');
	Route::get('/users/{id}','Web\UserDataController@getUser');
	Route::post('/user-modify','Web\UserDataController@actionUserModify');
	Route::post('/user-create','Web\UserDataController@actionUserCreate');
	Route::get('/user-delete/{id}','Web\UserDataController@actionUserDelete');

	// 批量新增相關
	Route::get('/batch/batch-import',function(){return View::make('pages.batchimport');});
	Route::post('/batch/import-excel/{type}','Web\BatchImportController@importExcel');
	Route::get('/batch/export-excel/{type}', 'Web\BatchImportController@exportExcel');

});
