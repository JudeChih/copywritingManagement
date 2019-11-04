<?php
// Route::group(['middleware' => 'userdata'],function(){

	// 首頁
	Route::get('/',function(){return redirect('/bbin-question-list');});

	// 問題提問相關
	// BBIN
	Route::get('/bbin-question-list',function(){return View::make('pages.bbinquestionlist');});
	Route::get('/questions/{qa_type}','Web\QuestionAskController@getQuestions');
	Route::post('/questions/{qa_type}','Web\QuestionAskController@getQuestions');
	Route::get('/questions/{id}','Web\QuestionAskController@getQuestion');
	Route::post('/questions-download','Web\QuestionAskController@downloadQuestions');
	// BBOS
	Route::get('/bbos-question-list',function(){return View::make('pages.bbosquestionlist');});

	// 語系翻譯相關
	Route::get('/language-list',function(){return View::make('pages.languagelist');});
	Route::get('/languages','Web\LanguageTranslationController@getLanguages');
	Route::post('/languages','Web\LanguageTranslationController@getLanguages');
	Route::get('/languages/{id}','Web\LanguageTranslationController@getLanguage');

	// 欄位管理相關
	Route::get('/field-list',function(){return View::make('pages.fieldlist');});
	Route::get('/fields','Web\FieldManagementController@getFields');
	Route::post('/fields','Web\FieldManagementController@getFields');
	Route::post('/field','Web\FieldManagementController@getField');

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
	Route::post('/message-create','Web\MessageBoardController@actionMessageCreate');


	// 批量上傳
	Route::post('/batch/import-excel','Web\BatchImportController@importExcel');
// });
