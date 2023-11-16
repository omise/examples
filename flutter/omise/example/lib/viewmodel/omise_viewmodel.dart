import 'dart:convert';

import 'package:example/model/omise_model.dart';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;


class OmiseViewModel {

  String redirectUrl = "";
  Map<String, dynamic> dicOmise = {};
  bool isProgress = false;

  Future<void> createCharge(int intAmount
                            , String strName
                            , String strCardNumber
                            , String expMonth
                            , String expYear
                            , String securityCode
                            , String strReturnUrl
                            , String strPaymentId
                              ) async{
    http.Response objResponse = await OmiseModel.createCharge(intAmount, strName, strCardNumber, expMonth, expYear, securityCode, strReturnUrl, strPaymentId);
    dicOmise = jsonDecode(objResponse.body);
                            
    return;
  }

  Future<void> paypayCharge(int intAmount, String strReturnUrl, String strPaymentId ) async{

    http.Response objResponse = await OmiseModel.chargePayPay(intAmount, strReturnUrl, strPaymentId);
    dicOmise = jsonDecode(objResponse.body);
    redirectUrl = (dicOmise["redirectUri"] ?? "").toString();
    return;
  }

  Future<void> paypayChargeAnother(int intAmount, String strReturnUrl, String strPaymentId ) async{

    http.Response objResponse = await OmiseModel.chargePayPayAnother(intAmount, strReturnUrl, strPaymentId);
    dicOmise = jsonDecode(objResponse.body);
    redirectUrl = (dicOmise["redirectUri"] ?? "").toString();
    return;
  }

  Future<void> fetchCharge(String strPaymentId) async{

    http.Response objResponse = await OmiseModel.fetchCharge(strPaymentId);
    dicOmise = jsonDecode(objResponse.body);
    return;
  }

}