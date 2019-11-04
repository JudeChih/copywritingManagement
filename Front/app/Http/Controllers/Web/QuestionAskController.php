<?php
namespace App\Http\Controllers\Web;

use Request;
use \Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use App\Library\CommonTools;
use Excel;

class QuestionAskController extends Controller
{
	/**
	 * 取得所有問題提問的資料
	 * @param  [array] $searchdata [篩選條件資料]
	 */
	public function getQuestions($qa_type){
		$qa_r = new \App\Repositories\QuestionAskRepository;
		$searchdata = Request::all();
		try {
			if($qa_type == 'BBIN'){
				if(!$data = $qa_r->getBBINData($searchdata)){
					return CommonTools::returnData('資料獲取失敗');
				}
			}elseif($qa_type == 'BBOS'){
				if(!$data = $qa_r->getBBOSData($searchdata)){
					return CommonTools::returnData('資料獲取失敗');
				}
			}
			
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}

	/**
	 * 取得某$id的問題提問資料
	 * @param  [string] $id [就是qa_id問題編號]
	 */
	public function getQuestion($id){
		$qa_r = new \App\Repositories\QuestionAskRepository;
		try {
			if(!$data = $qa_r->getDataById($id)){
				return false;
			}
			if(count($data) == 1){
				$data = $data[0];
			}
			return response()->json($data);
		} catch (\Exception $e) {
			CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
		}
	}

    /**
     * 導出並下載檔案
     * @param  Request $request [要下載的資料]
     */
    public function downloadQuestions(){
    	$phpWord = new \PhpOffice\PhpWord\PhpWord();
    	$searchdata = Request::all();
    	$result = [];
        try {

			$section = $phpWord->createSection();
			$tableStyle = array(
			    'borderColor' => '006699',
			    'borderSize'  => 6,
			    'cellMargin'  => 50
			);
			$firstRowStyle = array('bgColor' => 'F2F2F2');
			$phpWord->addTableStyle('myTable', $tableStyle, $firstRowStyle);
			$table = $section->addTable('myTable');
			if(CommonTools::checkArrayValue($searchdata,'dq_data')){
            	$arraydata = json_decode($searchdata['dq_data'],true);
            	$table->addRow();
            	$table->addCell()->addText('編號');
            	$table->addCell()->addText('分類');
            	$table->addCell()->addText('問題');
                foreach ($arraydata as $key => $val) {
                	$key = $key + 1;
                	if(mb_strlen($key) == 1){
                		$key = '0'.$key;
                	}
                	$table->addRow();
                	$table->addCell()->addText($key);
                	$table->addCell()->addText($val['qc_name']);
                	$table->addCell()->addText($val['qa_content']);
	            }
            }
			// $section->addText(json_encode($result));
			$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
			$objWriter->save(storage_path('問題提問.docx'));
			return response()->download(storage_path('問題提問.docx'));




			// 以下是匯出Excel的作法
        	// $result = [];

         //    $data['qc_name'] = '分類';
         //    $data['qa_content'] = '問題';

         //    array_push($result,$data);

         //    return Excel::create('下載問題', function($excel) use ($result) {
         //        $excel->sheet('問題提問', function($sheet) use ($result)
         //        {
         //        	$sheet->freezeFirstRow();
         //            $sheet->fromArray($result);
         //        });
         //    })->download('xlsx');
        } catch (Exception $e) {
            CommonTools::writeErrorLogByException($e);
			return CommonTools::returnData('未知錯誤');
        }

    }
}