import 'package:flutter/material.dart';
import 'package:example/viewmodel/omise_viewmodel.dart';
import 'package:example/util/util.dart';
import 'package:example/charge_return.dart';


enum InputContent {
  amount,
  cardHolderName,
  cardNumber,
  cardSecurityCode,
  cardExpiredMonth,
  cardExpiredYear
}

class CreditCardCharge extends StatefulWidget {
  const CreditCardCharge({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<CreditCardCharge> createState() => _CreditCardChargeState();
}

class _CreditCardChargeState extends State<CreditCardCharge> with WidgetsBindingObserver {

  String _amount = "0";
  String _cardHolderName = "";
  String _cardNumber = "";
  String _cardSecurityCode = "";
  String _cardExpiredMonth = "";
  String _cardExpiredYear = "";

  String strPaymentId = "";


  bool isDetailActive = false;
  bool isLoading = false;

  OmiseViewModel objViewModel = OmiseViewModel();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Stack(
        children: [Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _itemRow("Amount", "Input your amount", InputContent.amount, TextInputType.number),
                _itemRow("Name", "Input your name", InputContent.cardHolderName, TextInputType.name),
                _itemRow("Card Number", "Input your card number", InputContent.cardNumber, TextInputType.number),
                _itemRow("Expiration Month", "Input your card's expiration month", InputContent.cardExpiredMonth,  TextInputType.number),
                _itemRow("Expiration Year", "Input your card's expiration year", InputContent.cardExpiredYear,  TextInputType.number),
                _itemRow("Security Code", "Input your card's security code", InputContent.cardSecurityCode,  TextInputType.number),
                      
                Container(
                  padding: const EdgeInsets.fromLTRB(40.0, 10, 40.0, 10),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white, backgroundColor: Colors.orange,
                    ),
                    onPressed: () {
                      sendCreditCardCharge();
                    },
                    child: const Text('Charge'),
                  ),
                ),
              ],
            ),
          ),
        ),

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

  Future<void> sendCreditCardCharge() async{

    setState(() {
      isLoading = true;
    });

    try {
      strPaymentId = generateRandomString(10);
      String strReturnUrl = "omise-flutter-sample://paypay?payment_id=$strPaymentId";
      await objViewModel.createCharge(int.parse(_amount)
              , _cardHolderName
              , _cardNumber
              , _cardExpiredMonth
              , _cardExpiredYear
              , _cardSecurityCode
              , strReturnUrl
              , strPaymentId
              );

      
      // ignore: use_build_context_synchronously
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
      showTextDialog(context, "Failed Credit Card Charge");

    }
  }

  Widget _itemRow(String title, String hintText, InputContent item, TextInputType tType){
    return Row(
        children: [
          _showText(title),
          _showTextField(hintText, item, tType),
        ]
    );
  }  

  Widget _showText(String title){
    return Container(
        padding: const EdgeInsets.all(5),
        
        child: Text(
          title,
          style: const TextStyle(fontSize: 15),
        ),
    );
  }

  Widget _showTextField(String hintText, InputContent item, TextInputType tType){
    return Container(
          padding: const EdgeInsets.all(10),
          width: 280,
          child: TextField(
              keyboardType: tType,
              decoration: InputDecoration(
                hintText: hintText
              ),
              onChanged: (text) {
                
                switch (item) {
                  case InputContent.amount:
                    _amount = text;
                    break;
                  case InputContent.cardNumber:
                    _cardNumber = text;
                    break;
                  case InputContent.cardHolderName:
                    _cardHolderName = text;
                    break;
                  case InputContent.cardExpiredMonth:
                    _cardExpiredMonth = text;
                    break;
                  case InputContent.cardExpiredYear:
                    _cardExpiredYear = text;
                    break;
                  
                  case InputContent.cardSecurityCode:
                    _cardSecurityCode = text;
                    break;
                  
                  
                  default:
                    // print('default');
                }
                
              }
            ),
      );
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if(isDetailActive && state == AppLifecycleState.resumed){

      _goToChargeReturn();
    }
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
