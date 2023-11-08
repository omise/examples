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
     * When creating charge, at first create a card token, next, create a charge with this token
     */
    public function cardCharge(Request $req) : View {

        $strPaymentId = $this->random(9);

        $token = OmiseToken::create([
            'card' => [
              'name' => $req->name,
              'number' => trim($req->card_number),
              'expiration_month' => $req->expired_month,
              'expiration_year' => $req->expired_year,
              'security_code' => $req->security_code,
            ]
          ]);
        

        $charge = OmiseCharge::create([
            'amount' => $req->money,
            'currency' => 'jpy',
            'card' => $token['id']
        ]);

        // print_r($charge);
        $this->savePaymentInfo($strPaymentId, $charge['id'], 'paypay');


        return view('charge-result', ['charge'=>$charge]);
    }

    /**
     * 
     */
    public function cardChargeOmise(Request $req) : View {

        $strPaymentId = $this->random(9);

        $charge = OmiseCharge::create([
            'amount' => 100,
            'currency' => 'jpy',
            'return_uri' => config('app.url').'/charge_return?payment_id='.$strPaymentId,
            'card' => $req->omiseToken
        ]);

        // print_r($charge);
        $this->savePaymentInfo($strPaymentId, $charge['id'], 'paypay');


        return view('charge-result', ['charge'=>$charge]);
    }

    /**
     * 
     */
    public function cardChargeOmiseAnother(Request $req) : View {

        $strPaymentId = $this->random(9);

        $charge = OmiseCharge::create([
            'amount' => $req->money,
            'currency' => 'jpy',
            'return_uri' => config('app.url').'/charge_return?payment_id='.$strPaymentId,
            'card' => $req->omiseToken
        ]);

        // print_r($charge);
        $this->savePaymentInfo($strPaymentId, $charge['id'], 'paypay');


        return view('charge-result', ['charge'=>$charge]);
    }

    private function random($length = 8)
    {
        return substr(str_shuffle('1234567890abcdefghijklmnopqrstuvwxyz'), 0, $length);
    }

    /**
     * When creating charge, at first create a card token, next, create a charge with this token
     */
    public function paypayCharge(Request $req) : RedirectResponse {

        $apiURL = 'https://api.omise.co/charges';

        $strPaymentId = $this->random(9);

        $postInput = [
            'amount' => $req->money,
            // 'tokenization[data]' => urlencoe($req->token),
            'currency' => 'JPY',
            'return_uri' => config('app.url').'/charge_return?payment_id='.$strPaymentId,
            'source[type]' => "paypay"
        ];


        $response = Http::withBasicAuth(config('omise.omise_secret_key'),'')->asForm()->post($apiURL, $postInput);

        $statusCode = $response->status();
        $responseBody = json_decode($response->getBody(), true);
     

        // print_r($charge);

        $this->savePaymentInfo($strPaymentId, $responseBody['id'], 'paypay');

        return \Redirect::to($responseBody['authorize_uri']);
    }

    /**
     * When creating charge, at first create a card token, next, create a charge with this token
     */
    public function paypayChargeAnother(Request $req) : RedirectResponse {

        $source = OmiseSource::create([
            'amount' => $req->money,
            'currency' => 'jpy',
            'type' => 'paypay'
        ]);    


        // $apiURL = 'https://api.omise.co/charges';

        // $encoded = base64_encode(env('OMISE_SECRET_KEY') . ':' );

        $strPaymentId = $this->random(9);

        
        $charge = OmiseCharge::create([
            'amount' => $req->money,
            'currency' => 'jpy',
            'source' => $source['id'],
            'return_uri' => config('app.url').'/charge_return?payment_id='.$strPaymentId,
        ]);


        // print_r($charge);

        $this->savePaymentInfo($strPaymentId, $charge['id'], 'paypay');

        return \Redirect::to($charge['authorize_uri']);
    }
    

    /**
     * When creating charge, at first create a card token, next, create a charge with this token
     */
    public function googleCharge(Request $req) : View {


        $strPaymentId = $this->random(9);

        $charge = OmiseCharge::create([
            'amount' => '100',
            'currency' => 'jpy',
            'card' => $req->card_id,
            'return_uri' => config('app.url').'/charge_return?payment_id='.$strPaymentId,

        ]);

        return view('charge-result', ['charge'=>$charge]);

    }

    /**
     * Store a payment info to DB 
     */
    private function savePaymentInfo($strPaymentId, $strChargeId, $strPaymentType){

        $flight = new Payment;
 
        $flight->payment_id = $strPaymentId;
        $flight->charge_id = $strChargeId;
        $flight->payment_type = $strPaymentType;
 
        $flight->save();
    }

    /**
     * it's a return_uri for charge
     */
    public function chargeReturn(Request $req) : View {

        // Fetch payment infomation from DB.
        $payment = Payment::where('payment_id', $req->payment_id)->first();

        // Fetch charge info via OmiseCharge API
        $charge = OmiseCharge::retrieve($payment->charge_id);

        return view('charge-result', ['charge'=>$charge]);

    }    

}
