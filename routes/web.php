<?php
// Route::group(['middleware' => 'userdata'],function(){

	Route::get('/login', 'Auth\LoginController@loginview');
	Route::post('/login', 'Auth\LoginController@login');
	Route::get('/logout', [
		'as' => 'logout',
		'uses' => 'Auth\LoginController@logout'
	]);

	// 首頁
	Route::get('/',function(){return View::make('pages.booklist');});

	// 問題提問相關(分BBIN和XBB兩大類)
	////取值
	Route::get('/questions/{qa_type}','Web\QuestionAskController@getQuestions');
	Route::post('/questions/{qa_type}','Web\QuestionAskController@getQuestions');
	Route::get('/question/{id}','Web\QuestionAskController@getQuestion');
	Route::post('/questions-download','Web\QuestionAskController@downloadQuestions');
	////執行
	Route::post('/question-modify','Web\QuestionAskController@actionQuestionModify');
	Route::post('/question-create','Web\QuestionAskController@actionQuestionCreate');
	Route::get('/question-delete/{id}','Web\QuestionAskController@actionQuestionDelete');
	
	// 語系翻譯相關
	////取值
	Route::get('/languages','Web\LanguageTranslationController@getLanguages');
	Route::post('/languages','Web\LanguageTranslationController@getLanguages');
	Route::get('/languages/{id}','Web\LanguageTranslationController@getLanguage');
	////執行
	Route::post('/language-modify','Web\LanguageTranslationController@actionLanguageModify');
	Route::post('/language-create','Web\LanguageTranslationController@actionLanguageCreate');
	Route::get('/language-delete/{id}','Web\LanguageTranslationController@actionLanguageDelete');

	// 欄位管理相關
	////取值
	Route::get('/fields','Web\FieldManagementController@getFields');
	Route::post('/fields','Web\FieldManagementController@getFields');
	Route::post('/field','Web\FieldManagementController@getField');
	////執行
	Route::post('/field-modify','Web\FieldManagementController@actionFieldModify');
	Route::post('/field-create','Web\FieldManagementController@actionFieldCreate');
	Route::get('/field-delete/{data}','Web\FieldManagementController@actionFieldDelete');

	// 取得各頁面"欄位"的資訊
	Route::get('/field-question/{qa_type}','Web\FieldManagementController@getField_qc');
	Route::get('/field-language-product','Web\FieldManagementController@getField_lp');
	Route::get('/field-language-platform/{id}','Web\FieldManagementController@getField_lpf');
	Route::post('/field-language-class','Web\FieldManagementController@getField_lc');
	Route::get('/field-language-class/{id}','Web\FieldManagementController@getField_lc_byId');
	Route::get('/field-language-subclass/{id}','Web\FieldManagementController@getField_lsc');

	// 異動紀錄相關
	Route::get('/transactions','Web\TransactionRecordController@getTransactions');

	// 使用者相關
	////取值
	Route::get('/users','Web\UserDataController@getUsers');
	Route::post('/users','Web\UserDataController@getUsers');
	Route::get('/users/{id}','Web\UserDataController@getUser');
	Route::get('/userstatus',function(){
		if(\App\Services\AuthService::userData()){
			$arraydata['user_status'] = true;
			$arraydata['user_data'] = \App\Services\AuthService::userData();
			return $arraydata;
		}else{
			$arraydata['user_status'] = false;
			return $arraydata;
		}
	});
	////執行
	Route::post('/user-modify','Web\UserDataController@actionUserModify');
	Route::post('/user-create','Web\UserDataController@actionUserCreate');
	Route::get('/user-delete/{id}','Web\UserDataController@actionUserDelete');

	// 留言板相關
	// Route::get('/messages','Web\MessageBoardController@getMessages');
	// Route::post('/messages','Web\MessageBoardController@getMessages');
	// Route::post('/message-create','Web\MessageBoardController@actionMessageCreate');


	// 批量新增相關
	// Route::post('/batch/import-excel/{type}','Web\BatchImportController@bigDataImport');
	// Route::get('/batch/export-excel/{type}', 'Web\BatchImportController@exportExcel');
// });
