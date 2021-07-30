<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use \Illuminate\Support\Facades\View;
use App\Library\CommonTools;

class ErrorController extends Controller
{
	public function error(){
		try {
			return view('errors.503');
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return view('errors.503');
		}
	}
}