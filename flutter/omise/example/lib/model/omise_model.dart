import 'package:omise/omise.dart';

import 'dart:convert';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:example/util/util.dart';


class OmiseModel {
  

  // 課金する(chargeInfoの中にtokenを入れてください)
  static Future<http.Response> createCharge(int intAmount
                                            , String strName
                                            , String strCardNumber
                                            , String expMonth
                                            , String expYear
                                            , String securityCode
                                            , String strReturnUrl
                                            , String strPaymentId
                                            ) async{

    String strPubKey = dotenv.env['OMISE_PUB_KEY'] ?? "";

    http.Response objToken = await Omise.createToken(strPubKey
                                                      , strName  
                                                      , strCardNumber  
                                                      , expMonth  
                                                      , expYear  
                                                      , securityCode  
                                                      );
    Map dicToken = jsonDecode(objToken.body);
    if(objToken.statusCode != 200){
      String message = (dicToken["message"] ?? "").toString();
      throw Exception(message);
    }

    String token = (dicToken["id"] ?? "").toString();


    String requestUrl = "/api/credit-card";
    Map<String, String> chargeInfo = {"amount": intAmount.toString(),"token": token, "returnUri": strReturnUrl, "paymentId": strPaymentId};

    String strApiHost = (isAndroid ? dotenv.env['API_HOST_ANDROID'] : dotenv.env['API_HOST']) ?? "";

    return await http.post(
      Uri.parse(strApiHost+requestUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(chargeInfo),
    );
  }

  static Future<http.Response> chargePayPay(int intAmount, String strReturnUrl, String strPaymentId) async{

    String requestUrl = "/api/paypay";
    Map<String, String> chargeInfo = {"amount": intAmount.toString(),"returnUri": strReturnUrl, "paymentId": strPaymentId};

    String strApiHost = (isAndroid ? dotenv.env['API_HOST_ANDROID'] : dotenv.env['API_HOST']) ?? "";

    return await http.post(
      Uri.parse(strApiHost+requestUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(chargeInfo),
    );

  }

  static Future<http.Response> chargePayPayAnother(int intAmount, String strReturnUrl, String strPaymentId) async{

    
    String strPubKey = dotenv.env['OMISE_PUBLIC_KEY'] ?? "";

    http.Response objSource = await Omise.createSource(strPubKey, intAmount, "jpy", "paypay");
    Map dicSource = jsonDecode(objSource.body);

    String sourceId = (dicSource["id"] ?? "").toString();

    String requestUrl = "/api/charge-by-source";
    Map<String, String> chargeInfo = {"amount": intAmount.toString(),"returnUri": strReturnUrl, "paymentId": strPaymentId, "source": sourceId};

    String strApiHost = (isAndroid ? dotenv.env['API_HOST_ANDROID'] : dotenv.env['API_HOST']) ?? "";

    return await http.post(
      Uri.parse(strApiHost+requestUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(chargeInfo),
    );

  }    
  

  static Future<http.Response> fetchCharge(String strPaymentId) async{

    String requestUrl = "/api/charge-retrieve/$strPaymentId";

    String strApiHost = (isAndroid ? dotenv.env['API_HOST_ANDROID'] : dotenv.env['API_HOST']) ?? "";

    return await http.get(
      Uri.parse(strApiHost+requestUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
  }  
}