import {
  Currencies,
  Locales,
  OtherPaymentMethodsValues,
  YesOrNoValues,
} from "./values";

export interface OmiseResponseFailure {
  code: string;
  location: string;
  message: string;
  object: string;
}
export declare type Payment =
  | "alipay"
  | "barcode_wechat"
  | "barcode_alipay"
  | "bill_payment_tesco_lotus"
  | "econttext"
  | "installment_bay"
  | "installment_bbl"
  | "installment_first_choice"
  | "installment_kbank"
  | "installment_ktc"
  | "internet_banking_bay"
  | "internet_banking_bbl"
  | "internet_banking_ktb"
  | "internet_banking_scb"
  | "paynow"
  | "points_citi"
  | "promptpay"
  | "truemoney"
  | "paypay";
export declare type OtherPaymentMethods =
  (typeof OtherPaymentMethodsValues)[number];
export declare type Locale = (typeof Locales)[number];
export declare type HttpStatusCode =
  | 100
  | 101
  | 102
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 403
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 420
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 444
  | 449
  | 450
  | 451
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 598
  | 599;
export declare type Currency = (typeof Currencies)[number];
export declare type OmiseFlow = "redirect" | "offline";

export declare type YesOrNo = (typeof YesOrNoValues)[number];
