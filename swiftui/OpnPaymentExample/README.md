# Omise SwiftUI Example

This is a example project about using Opn Payment.

It has some examples.
- Credit Card Charge
- PayPay

## How to implement PayPay

There are two ways.
- Create Source, then create charge using this source.
- Create Source and Charge at the same time.

Please refer this page.

https://docs.opn.ooo/paypay/japan

# Instration
The first step is to clone the repo:

```
git clone git@github.com:omise/examples.git 
```

```
cd examples/swiftui/OpnPaymentExample
```

Install OmiseSDK via Package Manager.

# Configuration

Use debug.config, like this.

```
OMISE_PUB_KEY = "pkey_test_123"
API_HOST = http:/$()/$()localhost
```

Get Omise public key from your dashboard.

# Need to prepare

This example uses [this one](https://github.com/omise/examples/tree/master/nextjs) as a backend API.

Please prepare it beforehand at your local.

