import 'package:flutter/material.dart';
import 'package:example/viewmodel/omise_viewmodel.dart';
import 'package:example/util/util.dart';


class ChargeReturn extends StatefulWidget {
  const ChargeReturn({super.key, required this.title, required this.strPaymentId});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;
  final String strPaymentId;

  @override
  State<ChargeReturn> createState() => _ChargeReturnState();
}

class _ChargeReturnState extends State<ChargeReturn> {
  
  String strChargeId = "";
  String strStatus = "";

  OmiseViewModel objViewModel = OmiseViewModel();

  bool isLoading = false;


  @override
  void initState() {
    
    super.initState();

    fetchCharge();
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
        children: [Center(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
               children: [
                Row(
                  children: [
                    const Text('Charge ID: '),
                    Text(strChargeId),
                  ],
                 ),
                 
                 Row(
                  children: [
                    const Text('Charge Status: '),
                    Text(strStatus),
                  ],
                 ),  
                 ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white, backgroundColor: Colors.orange,
                    ),
                    onPressed: () {
                      fetchCharge();
                    },
                    child: const Text('ReFetch'),
                  ),
               ],
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
      ])
    );  
  }

  Future<void> fetchCharge() async {

    setState(() {
      isLoading = true;
    });

    try {
      await objViewModel.fetchCharge(widget.strPaymentId);
      strChargeId = objViewModel.dicOmise["id"];
      strStatus = objViewModel.dicOmise["status"];
      
    } catch(e){
      debugPrint(e.toString()); 
      
      showTextDialog(context, "Failed Credit Card Charge");

    }finally{
      setState(() {
        isLoading = false;
      });
    }
    
  }

}  