import 'package:flutter/material.dart';

import 'package:example/util/util.dart';

import 'package:example/environment.dart';
import 'package:example/google_pay_config.dart';
import 'package:example/viewmodel/omise_viewmodel.dart';
import 'package:example/charge_return.dart';

import 'package:pay/pay.dart';

import 'dart:convert' as convert;

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

  late List<PaymentItem> _paymentItems;
  bool isLoading = false;
  bool isDetailActive = false;
  String strPaymentId = "";

  OmiseViewModel objViewModel = OmiseViewModel();
  
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

    _paymentItems = [
      PaymentItem(
        label: 'Total',
        amount: widget.amount,
        status: PaymentItemStatus.final_price,
      )
    ];
    return PaymentConfiguration.fromJsonString(json);
  }

  
  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  Future<void> onGooglePayResult(paymentResult) async{
    strPaymentId = generateRandomString(10);
    // String strReturnUrl = "omise-flutter-sample://chargeReturn?payment_id=$strPaymentId";
    String strReturnUrl = "https://opn.ooo";

    String strData = paymentResult["paymentMethodData"]["tokenizationData"]["token"];

    setState(() {
      isLoading = true;
    });

    try {
      await objViewModel.googlePayCharge(widget.amount, "googlepay", "GooglePayTest", "GooglePayStreet", strData, "JPY", strReturnUrl, strPaymentId);

      if (!context.mounted) return;

      setState(() {
        isDetailActive = true;
        isLoading = false;
      });

      _goToChargeReturn();

    } catch(e){
      debugPrint(e.toString()); 
      setState(() {
        isLoading = false;
      });
      showTextDialog(context, "Failed PayPay Charge");

    }
  }

  void onGooglePayError(Object? error) {
    print(error);
    String errStr = error.toString();
    showTextDialog(context, errStr);
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
                          onError: onGooglePayError,
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
        if (isLoading)
          const ColoredBox(
            color: Colors.black54,
            child: Center(
              // Default Indicator.
              // https://api.flutter.dev/flutter/material/CircularProgressIndicator-class.html
              child: CircularProgressIndicator(),
            ),
          )
        ]
      )
    );  
  }

  void _goToChargeReturn(){

    Navigator.push<void>(
        context,
        MaterialPageRoute<void>(
          builder: (BuildContext context) => ChargeReturn(
              title: "Charge Return",
              strPaymentId: strPaymentId,
          )),
      );
  }
}  

