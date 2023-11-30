# Omise Flutter

This is a Flutter plugin for Omise.

## What Omise is

Opn Payments(Omise) is a PCI-certified payment gateway with an easy-to-use management dashboard and an intuitive REST API allowing integration across a variety of languages and frameworks. We give you the power to implement payments the way you want without the risk and overhead of directly handling payment details.

# What this cantains

This contains also the following things.

- Omise SDK for flutter
-- Creare Token
-- Create Source

- Some examples by using Omise SDK
-- Create Charge.
-- Create PayPay Charge

# Requirements
To follow along, you will need:

An Omise account (and your $OMISE_PUBLIC_KEY)

This example project use this flutter version

- flutter 3.7.8

# Installation 

To use the plugin, add omise as a [dependency in your pubspec.yaml file](https://docs.flutter.dev/packages-and-plugins/using-packages).

# Which OS it can work

- iOS
- Android

# Configuration

Copy android/local.properties.example to android/local.properties
And pet Android and Flutter SDK based on your environment

# Usage

In order to create a credit card charge, you need to create token beforehand.
You can create a token by the below scipt.

Create Token```
  static Future<http.Response> createCharge(int intAmount
                                            , String strName
                                            , String strCardNumber
                                            , String expMonth
                                            , String expYear
                                            , String securityCode
                                            , String strReturnUrl
                                            , String strPaymentId
                                            ) async{

    String strPubKey = dotenv.env['OMISE_PUB_KEY'] ?? "";

    http.Response objToken = await Omise.createCardToken(strPubKey
                                                      , strName  
                                                      , strCardNumber  
                                                      , expMonth  
                                                      , expYear  
                                                      , securityCode  
                                                      );
```

After you got token, you can create a credit card charge by using it.

For alternative payment, for example, AliPay, PayPay or something, 

you need to create a payment source.

You can create a source by the below scipt.

Create Source```    String strPubKey = dotenv.env['OMISE_PUBLIC_KEY'] ?? "";

    http.Response objSource = await Omise.createSource(strPubKey, intAmount, "jpy", "paypay");

```

After you got source, you can create a charge by using it.

# Warning.

Do not create a charge at device(Client side).
You need to create a charge at Backend API.

