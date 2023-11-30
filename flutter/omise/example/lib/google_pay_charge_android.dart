import 'package:flutter/material.dart';

import 'package:example/environment.dart';
import 'package:example/google_pay_config.dart';

import 'package:pay/pay.dart';

import 'dart:convert' as convert;


const _paymentItems = [
  PaymentItem(
    label: 'Total',
    amount: '99.99',
    status: PaymentItemStatus.final_price,
  )
];


class GooglePayChargeAndroid extends StatefulWidget {
  const GooglePayChargeAndroid({super.key, required this.title, required this.amount});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;
  final String amount;

  @override
  State<GooglePayChargeAndroid> createState() => _GooglePayChargeAndroidState();
}

class _GooglePayChargeAndroidState extends State<GooglePayChargeAndroid> with WidgetsBindingObserver {

  
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initGooglePayConfig();
  }

  Future<PaymentConfiguration> _initGooglePayConfig() async{
    // googlePayConfig = convert.json.decode(payment_configurations.defaultGooglePay) as Map<String, dynamic>;
    // print(googlePayConfig);
    
    MerchantInfo mInfos = MerchantInfo(
      merchantId: "01234567890123456789",
      merchantName: "Example Merchant Name",
    );
    BillingAddressParameters bInfos = BillingAddressParameters(
      format: "FULL",
      phoneNumberRequired: true
    );
    TransactionInfo tInfos = TransactionInfo(
      countryCode: "JP",
      currencyCode: "JPY",
      totalPrice: widget.amount
    );
    TokenizationSpecificationParameters tokenParams = TokenizationSpecificationParameters(
      gateway: "omise",
      gatewayMerchantId: Environment.omisePublicKey
    );
    TokenizationSpecification tokenInfo = TokenizationSpecification(
      type: "PAYMENT_GATEWAY",
      parameters: tokenParams
    );
    AllowedPaymentMethodParameters apmParams = AllowedPaymentMethodParameters(
      allowedCardNetworks: ["VISA", "MASTERCARD"],
      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
      billingAddressRequired: true,
      billingAddressParameters: bInfos,
    );
    AllowedPaymentMethod apmInfos = AllowedPaymentMethod(
      type: "CARD",
      tokenizationSpecification: tokenInfo,
      parameters: apmParams,
    );

    Data data = Data(
      environment: Environment.googlePayEnvironment,
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [apmInfos],
      merchantInfo: mInfos,
      transactionInfo: tInfos,
    );

    Root root = Root(data: data, provider: "google_pay");
    
    final rootMap = root.toJson();
    final json = convert.json.encode(rootMap);
    
    return PaymentConfiguration.fromJsonString(json);
  }

  
  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  void onGooglePayResult(paymentResult) {
    print(paymentResult);
    print(paymentResult["paymentMethodData"]);
    print(paymentResult["paymentMethodData"]["tokenizationData"]);
    print(paymentResult["paymentMethodData"]["tokenizationData"]["token"]);
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Stack(
        children: [
          Center(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
              Container(
                  padding: const EdgeInsets.all(20),
                  child: FutureBuilder<PaymentConfiguration>(
                  future: _initGooglePayConfig(),
                  builder: (context, snapshot) => snapshot.hasData
                      ? GooglePayButton(
                          paymentConfiguration: snapshot.data!,
                          paymentItems: _paymentItems,
                          type: GooglePayButtonType.buy,
                          margin: const EdgeInsets.only(top: 15.0),
                          onPaymentResult: onGooglePayResult,
                          loadingIndicator: const Center(
                            child: CircularProgressIndicator(),
                          ),
                        )
                      : const SizedBox.shrink()),
              ),
              
            ],
          ),
        ),
        // Stack.
        // if (isLoading)
        //   const ColoredBox(
        //     color: Colors.black54,
        //     child: Center(
        //       // Default Indicator.
        //       // https://api.flutter.dev/flutter/material/CircularProgressIndicator-class.html
        //       child: CircularProgressIndicator(),
        //     ),
        //   )
        ]
      )
    );  
  }

  
}  

