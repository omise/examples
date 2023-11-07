# Omise.js用型定義
[original](https://www.npmjs.com/package/omise-js-typed)をベースに少しカスタマイズしてます。

## originalからの変更点
- Windowに追加
  - [index.d.ts](../index.d.ts)
- openconfig.otherPaymentMethods / location の型変更
  - [omiseCard.d.ts](./omiseCard.d.ts)
- OtherPaymentMethodsにpaypayを追加
- 各Union typeを配列とtypeに分割
  - [values.ts](./values.ts)
  - [utils.d.ts](./utils.d.ts)
