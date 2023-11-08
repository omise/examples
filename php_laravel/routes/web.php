<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChargeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('action-list');
// });

Route::get('/charge_return', [ChargeController::class, 'chargeReturn']);
Route::get('/', [ChargeController::class, 'index']);
Route::get('/check_charge', [ChargeController::class, 'checkCharge']);
Route::post('/create_charge', [ChargeController::class, 'cardCharge']);
Route::post('/create_charge_omise', [ChargeController::class, 'cardChargeOmise']);
Route::post('/create_charge_omise_another', [ChargeController::class, 'cardChargeOmiseAnother']);
Route::post('/charge_paypay', [ChargeController::class, 'paypayCharge']);
Route::post('/charge_paypay_another', [ChargeController::class, 'paypayChargeAnother']);
Route::post('/charge_google', [ChargeController::class, 'googleCharge']);
