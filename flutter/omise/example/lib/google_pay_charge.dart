import 'package:flutter/material.dart';

class GooglePayCharge extends StatefulWidget {
  const GooglePayCharge({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<GooglePayCharge> createState() => _GooglePayChargeState();
}

class _GooglePayChargeState extends State<GooglePayCharge> {

  String _amount = "0";

    @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
               children: [
                Row(
              children: [
                Container(
                    padding: EdgeInsets.all(20),
                    child: const Text(
                      'Amount',
                      style: TextStyle(fontSize: 30),
                    ),
                ),
                Container(
                    padding: EdgeInsets.all(20),
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
                 
                 Row(
                  children: [
                    ElevatedButton(
                      child: const Text('Charge'),
                      style: ElevatedButton.styleFrom(
                        primary: Colors.orange,
                        onPrimary: Colors.white,
                      ),
                      onPressed: () {
                        

                      },
                    ),
                  ],
                 ),  
               ],
          ),
      )
    );  

  }  
}  
