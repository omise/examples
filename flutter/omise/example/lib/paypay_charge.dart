import 'package:flutter/material.dart';

import 'package:example/util/util.dart';
import 'package:example/viewmodel/omise_viewmodel.dart';
import 'package:example/charge_return.dart';
import 'package:url_launcher/url_launcher.dart';


class PayPayCharge extends StatefulWidget {
  const PayPayCharge({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<PayPayCharge> createState() => _PayPayChargeState();
}

class _PayPayChargeState extends State<PayPayCharge>  with WidgetsBindingObserver {

  String _amount = "0";
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
              Row(
                children: [
                  Container(
                      padding: const EdgeInsets.all(20),
                      child: const Text(
                        'Amount',
                        style: TextStyle(fontSize: 30),
                      ),
                  ),
                  Container(
                      padding: const EdgeInsets.all(20),
                      width: 260,
                      child: TextField(
                          decoration: const InputDecoration(
                            hintText: 'Input you need to pay'
                          ),
                          onChanged: (text) {
                            // TODO: ここで取得したtextを使う
                            _amount = text;
                          }
                        ),
                  )
                  
                ],
              ),
              
              Container(
                  padding: EdgeInsets.all(20),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white, backgroundColor: Colors.orange,
                    ),
                    onPressed: () {
                      sendPayPayCharge();
                    },
                    child: const Text('Charge1'),
                  ),
              ),
              Container(
                  padding: EdgeInsets.all(20),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white, backgroundColor: Colors.orange,
                    ),
                    onPressed: () {
                      sendPayPayCharge();
                    },
                    child: const Text('Charge2'),
                  ),
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

  Future<void> sendPayPayCharge() async{
    setState(() {
      isLoading = true;
    });

    try {
      strPaymentId = generateRandomString(10);
      String strReturnUrl = "omise-flutter-sample://chargeReturn?payment_id=$strPaymentId";
      await objViewModel.paypayCharge(int.parse(_amount), strReturnUrl, strPaymentId);

      Uri _url = Uri.parse(objViewModel.redirectUrl);
      if (!await launchUrl(_url, mode: LaunchMode.externalApplication)) {
        throw Exception('Could not launch $_url');
      }

      // ignore: use_build_context_synchronously
      if (!context.mounted) return;

      setState(() {
        isDetailActive = true;
        isLoading = false;
      });
    } catch(e){
      debugPrint(e.toString()); 
      setState(() {
        isLoading = false;
      });
      showTextDialog(context, "Failed PayPay Charge");

    }
        
  }

  Future<void> sendPayPayChargeAnother() async{
    setState(() {
      isLoading = true;
    });

    try {
      strPaymentId = generateRandomString(10);
      String strReturnUrl = "omise-flutter-sample://chargeReturn?payment_id=$strPaymentId";
      await objViewModel.paypayChargeAnother(int.parse(_amount), strReturnUrl, strPaymentId);

      Uri _url = Uri.parse(objViewModel.redirectUrl);
      if (!await launchUrl(_url, mode: LaunchMode.externalApplication)) {
        throw Exception('Could not launch $_url');
      }

      // ignore: use_build_context_synchronously
      if (!context.mounted) return;

      setState(() {
        isDetailActive = true;
        isLoading = false;
      });
    } catch(e){
      debugPrint(e.toString()); 
      setState(() {
        isLoading = false;
      });
      showTextDialog(context, "Failed PayPay Charge");

    }
        
  }

  
  
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if(isDetailActive && state == AppLifecycleState.resumed){

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
}  
