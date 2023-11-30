library omise;

import 'dart:convert';
import 'package:http/http.dart' as http;

class OmiseError implements Exception {
  final Object error;

  OmiseError(this.error);

  @override
  String toString() {
    return 'OmiseError: $error';
  }
}

class Omise {
  static const String _vaultUrl = "https://vault.omise.co";
  static const String _apiUrl = "https://api.omise.co";

  final String _omisePubKey;

  Omise(this._omisePubKey);

  Future<String> createCardToken({
    required String strName,
    required String strCardNumber,
    required String expMonth,
    required String expYear,
    required String securityCode,
  }) async {
    try {
      final requestTokenUrl = Uri.parse("$_vaultUrl/tokens");
      final basicAuth = _getBasicAuth();

      final Map<String, String> cardInfo = {
        "card[name]": strName,
        "card[number]": strCardNumber,
        "card[expiration_month]": expMonth,
        "card[expiration_year]": expYear,
        "card[security_code]": securityCode,
      };

      final response = await http.post(
        requestTokenUrl,
        headers: <String, String>{
          'authorization': basicAuth,
        },
        body: cardInfo,
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> tokenData = jsonDecode(response.body);
        return tokenData['id'] as String;
      } else {
        throw OmiseError(
            "Failed to create token. Status code: ${response.statusCode}");
      }
    } catch (error) {
      if (error is OmiseError) {
        rethrow;
      } else {
        throw OmiseError(error);
      }
    }
  }

  Future<String> createSource({
    required int intAmount,
    required String strCurrency,
    required String strType,
  }) async {
    try {
      final requestSourceUrl = Uri.parse("$_apiUrl/sources");
      final basicAuth = _getBasicAuth();

      final Map<String, dynamic> sourceInfo = {
        "type": strType,
        "currency": strCurrency,
        "amount": intAmount,
      };

      final response = await http.post(
        requestSourceUrl,
        headers: <String, String>{
          'authorization': basicAuth,
        },
        body: sourceInfo,
      );

      if (response.statusCode == 200) {
        final sourceData = jsonDecode(response.body) as Map<String, dynamic>;
        return sourceData['id'] as String;
      } else {
        throw OmiseError(
            "Failed to create source. Status code: ${response.statusCode}");
      }
    } catch (error) {
      if (error is OmiseError) {
        rethrow;
      } else {
        throw OmiseError(error);
      }
    }
  }

  String _getBasicAuth() {
    return 'Basic ${base64.encode(utf8.encode('$_omisePubKey:'))}';
  }
}
