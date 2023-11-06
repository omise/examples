"use client";

import { FormEvent, useEffect, useState } from "react";
import { loadScript } from "@/lib/client/util";
import Omise from "@/@types/omise/omise";
import { desc, input, note, table } from "../styles";
import { useAPICreditCard } from "@/lib/client/api";

export default function Page() {
  const [omise, setOmise] = useState<Omise>();
  // jsロード
  useEffect(() => {
    loadScript("https://cdn.omise.co/omise.js").then((e) => {
      setOmise(window.Omise);
      // 管理画面から取得したパブリックキーを指定する
      window.Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY);
    });
  }, []);

  // パラメータ一覧
  const [name, setName] = useState("TARO YAMADA");
  const [number, setNumber] = useState("4242424242424242");
  const [expirationMonth, setExpirationMonth] = useState(12);
  const [expirationYear, setExpirationYear] = useState(2024);
  const [securityCode, setSecurityCode] = useState("123");
  const [postalCode, setPostalCode] = useState("1040031");
  const [country, setCountry] = useState("JP");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 決済結果
  const [paymentResult, setPaymentResult] = useState("");

  // submit
  const creditCard = useAPICreditCard();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    omise?.createToken(
      "card",
      {
        name: name,
        number: number,
        expiration_month: expirationMonth,
        expiration_year: expirationYear,
        security_code: securityCode,
        country: country,
        postal_code: postalCode,
        state: state,
        city: city,
        street: street,
        street2: street2,
        phone_number: phoneNumber,
      },
      // トークン作成完了
      async (_, response) => {
        const res = await creditCard(1000, response.id);
        alert("決済完了");
        setPaymentResult(JSON.stringify(res.data, null, "\t"));
      }
    );
  }
  return (
    <main>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Credit card example</h2>
        <a
          href="https://github.com/omise/omise.js-example/blob/master/form-example/index.html"
          target="_blank"
        >
          https://github.com/omise/omise.js-example/blob/master/form-example/index.html
        </a>
        <a
          href="https://www.omise.co/omise-js#requesting-tokens-and-sources-directly"
          target="_blank"
        >
          https://www.omise.co/omise-js#requesting-tokens-and-sources-directly
        </a>
        <p style={{ marginTop: "8px", marginBottom: "8px" }}>
          UIは自前で作る。
        </p>
        <h2>指定可能なパラメーター一覧</h2>
        <form onSubmit={onSubmit}>
          <table style={table} border={1}>
            <tbody>
              <tr>
                <th>カード名義</th>
                <th>name</th>
                <th>
                  <input
                    style={input}
                    type="text"
                    placeholder="TARO YAMADA"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>必須項目</p>
                </th>
              </tr>
              <tr>
                <th>カード番号</th>
                <th>number</th>
                <th>
                  <input
                    style={input}
                    type="number"
                    placeholder="4242424242424242"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>必須項目</p>
                </th>
              </tr>
              <tr>
                <th>有効期限（月）</th>
                <th>expiration_month</th>
                <th>
                  <select
                    style={input}
                    value={expirationMonth}
                    onChange={(e) =>
                      setExpirationMonth(parseInt(e.target.value))
                    }
                  >
                    <option value="">MM</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </th>
                <th>
                  <p style={desc}>必須項目。`M` or `MM`</p>
                </th>
              </tr>
              <tr>
                <th>有効期限（年）</th>
                <th>expiration_year</th>
                <th>
                  <select
                    style={input}
                    value={expirationYear}
                    onChange={(e) =>
                      setExpirationYear(parseInt(e.target.value))
                    }
                  >
                    <option value="">YYYY</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </th>
                <th>
                  <p style={desc}>必須項目。`YY` or `YYYY`</p>
                </th>
              </tr>
              <tr>
                <th>セキュリティコード</th>
                <th>security_code</th>
                <th>
                  <input
                    style={input}
                    type="number"
                    placeholder="123"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>オプションだが推奨。</p>
                </th>
              </tr>
              <tr>
                <th>郵便番号</th>
                <th>postal_code</th>
                <th>
                  <input
                    style={input}
                    type="text"
                    placeholder="XXXXXXX"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>
                    オプションだが推奨。`-`はあってもなくてもよさげ。
                  </p>
                </th>
              </tr>
              <tr>
                <th>国</th>
                <th>country</th>
                <th>
                  <input
                    style={input}
                    type="text"
                    placeholder="JP"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>オプションだが推奨。ISO 3166。</p>
                </th>
              </tr>
              <tr>
                <th>州</th>
                <th>state</th>
                <th>
                  <input
                    style={input}
                    type="text"
                    placeholder="東京都"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>オプションだが推奨。</p>
                  <p style={note}>日本の場合、都道府県でいい？</p>
                </th>
              </tr>
              <tr>
                <th>都市</th>
                <th>city</th>
                <th>
                  <input
                    style={input}
                    type="text"
                    placeholder="港区"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>オプションだが推奨。</p>
                  <p style={note}>日本の場合、市区町村でいい？</p>
                </th>
              </tr>
              <tr>
                <th>通り</th>
                <th>street</th>
                <th>
                  <input
                    style={input}
                    type="text"
                    placeholder="1-1-1"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>オプションだが推奨。</p>
                  <p style={note}>日本の場合、X-X-Xでいい？</p>
                </th>
              </tr>
              <tr>
                <th>通り2</th>
                <th>street2</th>
                <th>
                  <input
                    style={input}
                    type="text"
                    placeholder="ホゲマンション 111号室"
                    value={street2}
                    onChange={(e) => setStreet2(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>オプション</p>
                  <p style={note}>日本の場合、マンション名などでいい？</p>
                </th>
              </tr>
              <tr>
                <th>電話番号</th>
                <th>phone_number</th>
                <th>
                  <input
                    style={input}
                    type="text"
                    placeholder="0311111111"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </th>
                <th>
                  <p style={desc}>オプション</p>
                </th>
              </tr>
            </tbody>
          </table>
          <button>Create token</button>
        </form>
        <br />
        <h2>決済結果</h2>
        <pre>{paymentResult}</pre>
      </div>
    </main>
  );
}
