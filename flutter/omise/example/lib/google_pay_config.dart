class Root {
    Root({
        this.provider,
        this.data,
    });

    String? provider;
    Data? data;

  //   Map<String, dynamic> toJson() {
  //   final Map<String, dynamic> data = new Map<String, dynamic>();
  //   data['provider'] = this.provider;
  //   if (this.data != null) {
  //     data['data'] = this.data?.toJson();
  //   }
  //   return data;
  // }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['provider'] = this.provider;
    if (this.data != null) {
      data['data'] = this.data?.toJson();
    }
    return data;
  }
}

class Data {
    Data({
        this.environment,
        this.apiVersion,
        this.apiVersionMinor,
        this.allowedPaymentMethods,
        this.merchantInfo,
        this.transactionInfo,
    });

    String? environment;
    int? apiVersion;
    int? apiVersionMinor;
    List<AllowedPaymentMethod>? allowedPaymentMethods;
    MerchantInfo? merchantInfo;
    TransactionInfo? transactionInfo;

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = <String, dynamic>{};
      data['environment'] = environment;
      data['apiVersion'] = apiVersion;
      data['apiVersionMinor'] = apiVersionMinor;
      if (allowedPaymentMethods != null) {
        data['allowedPaymentMethods'] =
            allowedPaymentMethods?.map((v) => v.toJson()).toList();
      }
      if (merchantInfo != null) {
        data['merchantInfo'] = merchantInfo?.toJson();
      }
      if (this.transactionInfo != null) {
        data['transactionInfo'] = transactionInfo?.toJson();
      }
      return data;
    }
}

class AllowedPaymentMethod {
    AllowedPaymentMethod({
        this.type,
        this.tokenizationSpecification,
        this.parameters,
    });

    String? type;
    TokenizationSpecification? tokenizationSpecification;
    AllowedPaymentMethodParameters? parameters;

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = <String, dynamic>{};
      data['type'] = type;
      if (tokenizationSpecification != null) {
        data['tokenizationSpecification'] =
            tokenizationSpecification?.toJson();
      }
      if (parameters != null) {
        data['parameters'] = parameters?.toJson();
      }
      return data;
    }
}

class AllowedPaymentMethodParameters {
    AllowedPaymentMethodParameters({
        this.allowedCardNetworks,
        this.allowedAuthMethods,
        this.billingAddressRequired,
        this.billingAddressParameters,
    });

    List<String>? allowedCardNetworks;
    List<String>? allowedAuthMethods;
    bool? billingAddressRequired;
    BillingAddressParameters? billingAddressParameters;

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = <String, dynamic>{};
      data['allowedCardNetworks'] = allowedCardNetworks;
      data['allowedAuthMethods'] = allowedAuthMethods;
      data['billingAddressRequired'] = billingAddressRequired;
      if (billingAddressParameters != null) {
        data['billingAddressParameters'] =
            billingAddressParameters?.toJson();
      }
      return data;
    }
}

class BillingAddressParameters {
    BillingAddressParameters({
        this.format,
        this.phoneNumberRequired,
    });

    String? format;
    bool? phoneNumberRequired;

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = <String, dynamic>{};
      data['format'] = format;
      data['phoneNumberRequired'] = phoneNumberRequired;
      return data;
    }
}

class TokenizationSpecification {
    TokenizationSpecification({
        this.type,
        this.parameters,
    });

    String? type;
    TokenizationSpecificationParameters? parameters;

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = <String, dynamic>{};
      data['type'] = this.type;
      if (this.parameters != null) {
        data['parameters'] = this.parameters?.toJson();
      }
      return data;
    }
}

class TokenizationSpecificationParameters {
    TokenizationSpecificationParameters({
        this.gateway,
        this.gatewayMerchantId,
    });

    String? gateway;
    String? gatewayMerchantId;

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = <String, dynamic>{};
      data['gateway'] = gateway;
      data['gatewayMerchantId'] = gatewayMerchantId;
      return data;
    }
}

class MerchantInfo {
    MerchantInfo({
        this.merchantId,
        this.merchantName,
    });

    String? merchantId;
    String? merchantName;

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = <String, dynamic>{};
      data['merchantId'] = merchantId;
      data['merchantName'] = merchantName;
      return data;
    }
}

class TransactionInfo {
    TransactionInfo({
        this.countryCode,
        this.currencyCode,
        this.totalPrice,
    });

    String? countryCode;
    String? currencyCode;
    String? totalPrice;

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = new Map<String, dynamic>();
      data['countryCode'] = countryCode;
      data['currencyCode'] = currencyCode;
      data['totalPrice'] = totalPrice;
      return data;
    }
}
