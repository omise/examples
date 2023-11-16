library omise;

import 'dart:convert';
import 'package:http/http.dart' as http;

class Omise {
  
  // Create Credit Card token
  static Future<http.Response> createToken(String omisePubKey
                                          , String strName
                                          , String strCardNumber
                                          , String expMonth
                                          , String expYear
                                          , String securityCode) async{
                                              
    var url = "https://vault.omise.co/tokens";
    var requestTokenUrl = Uri.parse(url);
    String basicAuth = 'Basic ${base64.encode(utf8.encode('$omisePubKey:'))}';

    Map<String, dynamic> cardInfos = {
      "card[name]": strName,
      "card[number]": strCardNumber,
      "card[expiration_month]": expMonth,
      "card[expiration_year]": expYear,
      "card[security_code]": securityCode,
    };

    return await http.post(
      requestTokenUrl,
      headers: <String, String>{
        'authorization': basicAuth,
      },
      body: cardInfos,
    );
  }

  
  // Create APM Source
  static Future<http.Response> createSource(String omisePubKey, int intAmount, String strCurrency, String strType) async {

    String requestTokenUrl = "https://api.omise.co/sources";
    String basicAuth = 'Basic ${base64.encode(utf8.encode('$omisePubKey:'))}';

    Map<String, dynamic> sourceInfos = {
      "type": strType,
      "currency": strCurrency,
      "amount": intAmount,
    };

    return await http.post(
      Uri.parse(requestTokenUrl),
      headers: <String, String>{
        'authorization': basicAuth,
      },
      body: sourceInfos,
    );
  }
  
}
