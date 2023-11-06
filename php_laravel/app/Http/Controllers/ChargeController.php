<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use OmiseCharge;
use OmiseSource;
use OmiseToken;
use Illuminate\Support\Facades\Http;
use App\Models\Payment;

class ChargeController extends Controller
{
    //
    public function index() : View {
        return view('formcharge');
    }

    /**
     * 基本的にchargeをするときは、tokenを作って、それを元にchargeを作るものと理解してる
     */
    public function cardCharge(Request $req) : View {

        // print_r($req->name);
        \Log::debug($req->name);

        $token = OmiseToken::create(array(
            'card' => array(
              'name' => $req->name,
              'number' => trim($req->card_number),
              'expiration_month' => $req->expired_month,
              'expiration_year' => $req->expired_year,
              'security_code' => $req->security_code,
            )
          ));
        

        $charge = OmiseCharge::create(array(
            'amount' => $req->money,
            'currency' => 'jpy',
            'card' => $token['id']
        ));

        // print_r($charge);

        return view('charge-result', ['charge'=>$charge]);
    }

    /**
     * 
     */
    public function cardChargeOmise(Request $req) : View {

        \Log::debug($req);

        $charge = OmiseCharge::create(array(
            'amount' => 100,
            'currency' => 'jpy',
            'card' => $req->omiseToken
        ));

        // print_r($charge);

        return view('charge-result', ['charge'=>$charge]);
    }

    /**
     * 
     */
    public function cardChargeOmiseAnother(Request $req) : View {

        \Log::debug($req);

        $charge = OmiseCharge::create(array(
            'amount' => $req->money,
            'currency' => 'jpy',
            'card' => $req->omiseToken
        ));

        // print_r($charge);

        return view('charge-result', ['charge'=>$charge]);
    }

    private function random($length = 8)
    {
        return substr(str_shuffle('1234567890abcdefghijklmnopqrstuvwxyz'), 0, $length);
    }

    /**
     * 基本的にchargeをするときは、tokenを作って、それを元にchargeを作るものと理解してる
     */
    public function paypayCharge(Request $req) : RedirectResponse {

        $apiURL = 'https://api.omise.co/charges';

        $encoded = base64_encode(env('OMISE_SECRET_KEY') . ':' );

        $strPaymentId = $this->random(9);

        $postInput = [
            'amount' => $req->money,
            // 'tokenization[data]' => urlencoe($req->token),
            'currency' => 'JPY',
            'return_uri' => env('APP_URL').'/paypay_return?payment_id='.$strPaymentId,
            'source[type]' => "paypay"
        ];

        \Log::debug($postInput);

        $response = Http::withBasicAuth(env('OMISE_SECRET_KEY'),'')->asForm()->post($apiURL, $postInput);

        $statusCode = $response->status();
        $responseBody = json_decode($response->getBody(), true);
     
        \Log::debug($statusCode);
        \Log::debug($responseBody);

        // print_r($charge);

        $this->savePaymentInfo($strPaymentId, $responseBody['id'], 'paypay');

        return \Redirect::to($responseBody['authorize_uri']);
    }

    /**
     * 基本的にchargeをするときは、tokenを作って、それを元にchargeを作るものと理解してる
     */
    public function paypayChargeAnother(Request $req) : RedirectResponse {

        $source = OmiseSource::create(array(
            'amount' => $req->money,
            'currency' => 'jpy',
            'type' => 'paypay'
        ));    


        // $apiURL = 'https://api.omise.co/charges';

        // $encoded = base64_encode(env('OMISE_SECRET_KEY') . ':' );

        $strPaymentId = $this->random(9);

        
        $charge = OmiseCharge::create(array(
            'amount' => $req->money,
            'currency' => 'jpy',
            'source' => $source['id'],
            'return_uri' => env('APP_URL').'/paypay_return?payment_id='.$strPaymentId,
        ));


        // print_r($charge);

        $this->savePaymentInfo($strPaymentId, $charge['id'], 'paypay');

        return \Redirect::to($charge['authorize_uri']);
    }
    

    /**
     * 基本的にchargeをするときは、tokenを作って、それを元にchargeを作るものと理解してる
     */
    public function googleCharge(Request $req) : View {

        // まずはtokenを作成
        
        // 続いて課金する
        // $apiURL = 'https://api.omise.co/charges';

        // $postInput = [
        //     'amount' => '100',
        //     // 'tokenization[data]' => urlencoe($req->token),
        //     'currency' => 'jpy',
        //     'card' => $responseBody['id'],
        // ];

        // $response = Http::withBasicAuth(env('OMISE_SECRET_KEY'),'')->asForm()->post($apiURL, $postInput);

        // $statusCode = $response->status();
        // $responseBody = json_decode($response->getBody(), true);
     
        // \Log::debug($statusCode);
        // \Log::debug($responseBody);

        // $strPaymentId = $this->random(9);

        $charge = OmiseCharge::create(array(
            'amount' => '100',
            'currency' => 'jpy',
            'card' => $req->card_id,
        ));

        return view('charge-result', ['charge'=>$charge]);

    }

    /**
     * Paymentの情報をDBに保存する
     */
    private function savePaymentInfo($strPaymentId, $strChargeId, $strPaymentType){

        $flight = new Payment;
 
        $flight->payment_id = $strPaymentId;
        $flight->charge_id = $strChargeId;
        $flight->payment_type = $strPaymentType;
 
        $flight->save();
    }

    /**
     * paypayでリクエストした時、返って来る場所
     */
    public function paypayReturn(Request $req) : View {

        // chargeの結果をAPI経由で確認。
        $payment = Payment::where('payment_id', $req->payment_id)->first();

        // chargeの状態をAPIから取得
        $charge = OmiseCharge::retrieve($payment->charge_id);

        return view('charge-result', ['charge'=>$charge]);

    }    

}
