# Omise Next.js example

This is a example project about using Opn Payment.

It has some examples.
- Credit Card Payment
- PayPay

## Opn Payments
- https://docs.opn.ooo/ja/japan

## How to implement Credit Card Payment

In order to run a charge, you need to implement
- Create a token for credit card
- Call Charge API using this token.

Please refer this page.

https://docs.opn.ooo/tokens-api/japan

https://docs.opn.ooo/charges-api/japan

https://docs.opn.ooo/ja/omise-js/japan


## How to implement PayPay

There are two ways.
- Create Source, then create charge using this source.
- Create Source and Charge at the same time.

Please refer this page.

https://docs.opn.ooo/paypay/japan

## Requirements
To follow along, you will need:

An Omise account (and your $OMISE_PUBLIC_KEY and $OMISE_SECRET_KEY)

- Node 16.19.1
- Yarn 1.22.19


## Instration
The first step is to clone the repo:

```
git clone git@github.com:omise/examples.git
```


Change to the `nextjs` directory. 

```
cd examples/nextjs
```

Run this command to install libraries

```
yarn install
```


## Configuration

Environment variables are a good way to prevent secret keys from leaking into your code (see The Twelve-Factor App). Use the `.env.sample` template to create your `.env`.

https://dashboard.omise.co/v2/settings/keys

Your `.env` should now look like this:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_OMISE_PUBLIC_KEY=pkey_test_xxxxxxx
OMISE_SECRET_KEY=skey_test_xxxxxx
```

Replace the values for NEXT_PUBLIC_API_BASE_URL,NEXT_PUBLIC_OMISE_PUBLIC_KEY and OMISE_SECRET_KEY with your keys. They can be found on your Omise Dashboard. After logging in, click "Keys" in the lower-left corner. Copy and paste them into this file.

At this point, you should be able to run the app by typing the following and hitting ENTER:

```
yarn dev
```

The Frontend app and API should be running at [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/api](http://localhost:3000/api).

Go look at it, check routing through this sample, try these samples.
- Credit Card Charge
- PayPay Charge

## Test Credit Card
https://www.omise.co/api-testing

## FrontEnd
- Next.js
- Typescript
- OmiseJS

### Omise.js
- Public document
  - https://docs.opn.ooo/ja/collecting-card-information/japan
  - https://docs.opn.ooo/omise-js
- Noted
  - This only provides javascript file from CDN.
    - https://cdn.omise.co/omise.js
  - On frontend, it only use `public key`.
    - 取得できるのはNonce (Token / Source) のみで、後続処理については
    Omise-nodeやその他バックエンドでの処理が必要。
    - It can only get Nonce ( Token / Source ), need to implement charge function or something at your backend by using Omise-node or something.
  - Omise.js does not support Typescript, so create tyoe defines in this project. 
    - plese refer this [README](src/@types/omise/README.md)
    - src/@types/omise

### Sample for frontend
- [Pre-built Payment Form](src/app/pre-built-form/page.tsx)
  - URL: http://localhost:3000/pre-built-form
- [Credit card](src/app/credit-card/page.tsx)
  - URL: http://localhost:3000/credit-card
- [PayPay](src/app/paypay/page.tsx)
  - URL: http://localhost:3000/paypay

## Backend
- Next.js
- Typescript
- Omise-Node
- mysql 8.1

### Omise-node
- Public document
  - https://github.com/omise/omise-node
- About Credit Card Payment
  - https://docs.opn.ooo/ja/charging-cards/japan

### Sample API
- [Credit card chage](src/app/api/charge/route.ts)
- [PayPay charge](src/app/api/paypay/route.ts)

