import 'dart:math';
import 'package:flutter/material.dart';
import 'dart:io';

// OSごとで判定するプロパティも提供されている
bool isAndroid = Platform.isAndroid;

String generateRandomString([int length = 32]) {
  const String charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';
  final Random random = Random.secure();
  final String randomStr =  List.generate(length, (_) => charset[random.nextInt(charset.length)]).join();
  return randomStr;
}

void showTextDialog(BuildContext context, String viewText) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext dialogContext) {
        return AlertDialog(
          title: Text(viewText),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.pop(dialogContext);
              },
            ),
          ],
        );
      },
    );
  }