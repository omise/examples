import 'package:flutter/material.dart';

import 'package:example/credit_card_charge.dart';
import 'package:example/paypay_charge.dart';
import 'package:example/google_pay_charge.dart';
import 'package:example/google_pay_charge_android.dart';

enum TabItem {
  creditCard(
    title: 'Credit Card Charge',
    icon: Icons.home,
    page: CreditCardCharge(title: 'Credit Card'),
  ),

  paypay(
    title: 'PayPay Charge',
    icon: Icons.timeline,
    page: PayPayCharge(title: 'PayPay'),
  ),

  googlePay(
    title: 'Google Payment',
    icon: Icons.settings,
    page: GooglePayCharge(title: 'Google Pay'),
  );

  const TabItem({
    required this.title,
    required this.icon,
    required this.page,
  });

  /// タイトル
  final String title;

  /// アイコン
  final IconData icon;

  /// 画面
  final Widget page;
}
