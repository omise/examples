import 'package:example/environment.dart';
import 'package:omise/omise.dart';

import 'dart:convert';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;
import 'package:example/util/util.dart';

class OmiseModel {
  static final Omise _omise = Omise(Environment.omisePublicKey!);
  static String strApiHost =
      (isAndroid ? Environment.apiHostAndroid : Environment.apiHost) ?? "";

  // 課金する(chargeInfoの中にtokenを入れてください)
  static Future<http.Response> createCharge(
      int intAmount,
      String strName,
      String strCardNumber,
      String expMonth,
      String expYear,
      String securityCode,
      String strReturnUrl,
      String strPaymentId) async {
    String token = await _omise.createCardToken(
      strName: strName,
      strCardNumber: strCardNumber,
      expMonth: expMonth,
      expYear: expYear,
      securityCode: securityCode,
    );
    String requestUrl = "/api/credit-card";
    Map<String, String> chargeInfo = {
      "amount": intAmount.toString(),
      "token": token,
      "returnUri": strReturnUrl,
      "paymentId": strPaymentId
    };

    return await http.post(
      Uri.parse(strApiHost + requestUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(chargeInfo),
    );
  }

  static Future<http.Response> chargePayPay(
      int intAmount, String strReturnUrl, String strPaymentId) async {
    String requestUrl = "/api/paypay";
    Map<String, dynamic> chargeInfo = {
      "amount": intAmount.toString(),
      "returnUri": strReturnUrl,
      "paymentId": strPaymentId
    };

    return await http.post(
      Uri.parse(strApiHost + requestUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(chargeInfo),
    );
  }

  static Future<http.Response> chargePayPayAnother(
      int intAmount, String strReturnUrl, String strPaymentId) async {
    String sourceId = await _omise.createSource(
      intAmount: intAmount,
      strCurrency: "jpy",
      strType: "paypay",
    );

    String requestUrl = "/api/charge-by-source";
    Map<String, dynamic> chargeInfo = {
      "amount": intAmount.toString(),
      "returnUri": strReturnUrl,
      "paymentId": strPaymentId,
      "source": sourceId
    };

    return await http.post(
      Uri.parse(strApiHost + requestUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(chargeInfo),
    );
  }

  static Future<http.Response> fetchCharge(String strPaymentId) async {
    String requestUrl = "/api/charge-retrieve/$strPaymentId";

    return await http.get(
      Uri.parse(strApiHost + requestUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
  }
}
