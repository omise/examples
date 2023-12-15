"use client";

import { useEffect, useState } from "react";
import { loadScript } from "@/lib/client/util";
import OmiseCard from "@/@types/omise/omiseCard";
import {
  Currency,
  Locale,
  OtherPaymentMethods,
  YesOrNo,
} from "@/@types/omise/utils";
import {
  Currencies,
  Locales,
  OtherPaymentMethodsValues,
  YesOrNoValues,
} from "@/@types/omise/values";
import { desc, input, note, table } from "../styles";
import { useAPICreditCard, useAPIPayPay } from "@/lib/client/api";

export default function Page() {
  const [omiseCard, setOmiseCard] = useState<OmiseCard>();
  useEffect(() => {
    // jsロード
    loadScript("https://cdn.omise.co/omise.js").then(() => {
      setOmiseCard(window.OmiseCard);
      window.OmiseCard.configure({
        // 管理画面から取得したパブリックキーを指定する
        publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
      });
    });
  }, [omiseCard]);

  // パラメーター一覧
  const [amount, setAmount] = useState(12345);
  const [publicKey, setPublicKey] = useState(
    process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY
  );
  const [buttonLabel, setButtonLabel] = useState("buttonLabel");
  const [currency, setCurrency] = useState<Currency>("JPY");
  const [defaultPaymentMethod, setDefaultPaymentMethod] =
    useState<OtherPaymentMethods>("credit_card");
  const [frameDescription, setFrameDescription] = useState(
    "sample: frameDescription"
  );
  const [frameLabel, setFrameLabel] = useState("sample: frameLabel");
  const [hideAmount, setHideAmount] = useState(true);
  const [image, setImage] = useState(
    "https://placehold.jp/ff0000/ffffff/350x350.png"
  );
  const [locale, setLocale] = useState<Locale>("ja");
  const [location, setLocation] = useState<YesOrNo>("yes");
  const [otherPaymentMethods, setOtherPaymentMethods] = useState<
    OtherPaymentMethods[]
  >(["convenience_store", "net_banking", "pay_easy", "credit_card", "paypay"]);
  const [submitLabel, setSubmitLabel] = useState("sample: submitLabel");

  // 決済結果
  const [paymentResult, setPaymentResult] = useState("");

  const creditCard = useAPICreditCard();
  const paypay = useAPIPayPay();
  const openForm = () => {
    // フォーム表示
    window.OmiseCard.open({
      amount: amount,
      publicKey: publicKey,
      buttonLabel: buttonLabel,
      currency: currency,
      defaultPaymentMethod: defaultPaymentMethod,
      frameDescription: frameDescription,
      frameLabel: frameLabel,
      hideAmount: hideAmount,
      image: image,
      locale: locale,
      location: location,
      otherPaymentMethods: otherPaymentMethods.join(","),
      submitLabel: submitLabel,
      // ノンス作成完了
      onCreateTokenSuccess: async (nonce) => {
        if (nonce.startsWith("tokn_")) {
          // クレカ
          const res = await creditCard(amount, nonce);
          alert("決済完了");
          setPaymentResult(JSON.stringify(res.data, null, "\t"));
        } else {
          // クレカ以外
          const res = await paypay(amount, nonce);
          alert("決済完了");
          setPaymentResult(JSON.stringify(res.data, null, "\t"));
          // 返却されたauthorize_uriに遷移し、後続処理を行う。。。が、エラーで課金が作成できない、、
        }
        console.log(nonce);
      },
      // フォームが閉じた時のイベント
      // onCreateTokenSuccessで閉じた時は呼ばれない
      onFormClosed: () => {
        console.log("onFormClosed");
      },
    });
  };
  return (
    <main>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Pre-built Payment Form example</h2>
        <a
          href="https://www.omise.co/omise-js#pre-built-payment-form"
          target="_blank"
        >
          https://www.omise.co/omise-js#pre-built-payment-form
        </a>
        <p style={{ marginTop: "8px", marginBottom: "8px" }}>
          UIを自前で作らずにOmise.js側が提供しているFormを利用することができる。
        </p>
        <h2>指定可能なパラメーター一覧</h2>
        <table style={table} border={1}>
          <tbody>
            <tr>
              <th>決済金額</th>
              <th>amount</th>
              <th>
                <input
                  style={input}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                />
              </th>
              <th>
                <p style={desc}>必須項目</p>
              </th>
            </tr>
            <tr>
              <th>パブリックキー</th>
              <th>publicKey</th>
              <th>
                <input
                  style={input}
                  type="text"
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                />
              </th>
              <th>
                <p style={note}>
                  requiredになっているがそもそもconfigureしないとフォームが開かない
                  ここで指定してもしなくても変わらなかった
                </p>
              </th>
            </tr>
            <tr>
              <th>ボタンに表示する文字列</th>
              <th>buttonLabel</th>
              <th>
                <input
                  style={input}
                  type="text"
                  value={buttonLabel}
                  onChange={(e) => setButtonLabel(e.target.value)}
                />
              </th>
              <th>
                <p style={note}>
                  どこにも反映されてなさそう。動いてるのかも不明。
                </p>
              </th>
            </tr>
            <tr>
              <th>決済通貨</th>
              <th>currency</th>
              <th>
                <select
                  style={input}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                >
                  {Currencies.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <p style={desc}>default THB</p>
              </th>
            </tr>
            <tr>
              <th>デフォルトの決済手段</th>
              <th>defaultPaymentMethod</th>
              <th>
                <select
                  style={input}
                  value={defaultPaymentMethod}
                  onChange={(e) =>
                    setDefaultPaymentMethod(
                      e.target.value as OtherPaymentMethods
                    )
                  }
                >
                  {OtherPaymentMethodsValues.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <p style={desc}>
                  こちらから指定:
                  https://www.omise.co/omise-js#supported-payment-methods-for-pre-built-form
                </p>
                <p style={desc}>指定しない場合、credit-card</p>
              </th>
            </tr>
            <tr>
              <th>説明</th>
              <th>frameDescription</th>
              <th>
                <input
                  style={input}
                  type="text"
                  value={frameDescription}
                  onChange={(e) => setFrameDescription(e.target.value)}
                />
              </th>
              <th>
                <p style={desc}>ヘッダーの下の部分に表示される文字列</p>
              </th>
            </tr>
            <tr>
              <th>タイトル</th>
              <th>frameLabel</th>
              <th>
                <input
                  style={input}
                  type="text"
                  value={frameLabel}
                  onChange={(e) => setFrameLabel(e.target.value)}
                />
              </th>
              <th>
                <p style={desc}>ヘッダーに表示される文字列</p>
                <p style={desc}> default Omise</p>
              </th>
            </tr>
            <tr>
              <th>金額を非表示にするかどうか</th>
              <th>hideAmount</th>
              <th>
                <input
                  style={input}
                  type="checkbox"
                  checked={hideAmount}
                  onChange={(e) => setHideAmount(!hideAmount)}
                />
              </th>
              <th>
                <p style={note}>NOTE: Next.jsだと？指定してもうまく動かない</p>
              </th>
            </tr>
            <tr>
              <th>ロゴ画像</th>
              <th>image</th>
              <th>
                <input
                  style={input}
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </th>
              <th>
                <p style={desc}>URL文字列を入力。</p>
                <p style={note}>NOTE: 指定可能なサイズや形式などは不明。</p>
              </th>
            </tr>
            <tr>
              <th>表示言語</th>
              <th>locale</th>
              <th>
                <select
                  style={input}
                  value={locale}
                  onChange={(e) => setLocale(e.target.value as Locale)}
                >
                  {Locales.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <p style={desc}>default en</p>
              </th>
            </tr>
            <tr>
              <th>国または地域 / 市 / 郵便番号の入力欄を表示するかどうか</th>
              <th>location</th>
              <th>
                <select
                  style={input}
                  value={location}
                  onChange={(e) => setLocation(e.target.value as YesOrNo)}
                >
                  {YesOrNoValues.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <p style={desc}>default no</p>
                <p style={note}>
                  NOTE:
                  国または地域はローカライズされていない。都道府県なしでいきなり市。郵便番号はハイフンありなしどちらも通る。
                </p>
              </th>
            </tr>
            <tr>
              <th>「他の決済手段」に表示する手段</th>
              <th>otherPaymentMethods</th>
              <th>
                <select
                  multiple
                  size={10}
                  style={input}
                  value={otherPaymentMethods}
                  onChange={(e) => {
                    var ret: Array<OtherPaymentMethods>;
                    if (
                      otherPaymentMethods.includes(
                        e.target.value as OtherPaymentMethods
                      )
                    ) {
                      ret = otherPaymentMethods.filter(
                        (x) => x !== (e.target.value as OtherPaymentMethods)
                      );
                    } else {
                      ret = otherPaymentMethods.concat([
                        e.target.value as OtherPaymentMethods,
                      ]);
                    }
                    setOtherPaymentMethods(ret);
                  }}
                >
                  {OtherPaymentMethodsValues.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <p style={desc}>カンマ区切りの文字列で指定。</p>
                <p style={desc}>指定できる値はdefaultPaymentMethodと同様</p>
              </th>
            </tr>
            <tr>
              <th>支払いボタンに表示する文字列</th>
              <th>submitLabel</th>
              <th>
                <input
                  style={input}
                  type="text"
                  value={submitLabel}
                  onChange={(e) => setSubmitLabel(e.target.value)}
                />
              </th>
              <th>
                <p style={desc}>default Pay</p>
                <p style={note}>
                  NOTE:
                  Prefixが変えられるだけで、通貨もローカライズされてないので使いにくい
                </p>
              </th>
            </tr>
            <tr>
              <th>submit form target</th>
              <th>submitFormTarget</th>
              <th></th>
              <th>
                <p style={desc}>
                  別ページにsubmitする場合などに指定すればよいと思われる
                </p>
                <p style={desc}>本サンプルでは割愛</p>
              </th>
            </tr>
          </tbody>
        </table>
        <br />
        <button onClick={openForm}>入力した値でフォーム表示</button>
        <br />
        <h2>決済結果</h2>
        <pre>{paymentResult}</pre>
      </div>
    </main>
  );
}
