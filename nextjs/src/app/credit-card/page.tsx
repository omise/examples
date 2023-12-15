"use client";

import { FormEvent, useEffect, useState } from "react";
import { loadScript, generateRandomString } from "@/lib/client/util";
import Omise from "@/@types/omise/omise";
import { desc, input, note, table } from "../styles";
import { useAPICreditCard } from "@/lib/client/api";

export default function Page() {
  const [omise, setOmise] = useState<Omise>();
  // load Omise js
  useEffect(() => {
    loadScript("https://cdn.omise.co/omise.js").then((e) => {
      setOmise(window.Omise);
      // Set public key that is in Omise Dashboard.
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
        const paymentId= generateRandomString(8)
        const returnUri = 'http://localhost:3000/charge-return?payment_id='+paymentId
    
        const res = await creditCard(1000, response.id, paymentId, returnUri, "jpy");
        alert("Complete Payment");
        console.log(res);
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
      
        <h2>Parameter list that can be used.</h2>
        <form onSubmit={onSubmit}>
          <table style={table} border={1}>
            <tbody>
              <tr>
                <th>Card Holder Name</th>
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
                  <p style={desc}>required</p>
                </th>
              </tr>
              <tr>
                <th>Card Number</th>
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
                  <p style={desc}>required</p>
                </th>
              </tr>
              <tr>
                <th>expiration_month</th>
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
                  <p style={desc}>required.`M` or `MM`</p>
                </th>
              </tr>
              <tr>
                <th>expiration_year</th>
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
                  <p style={desc}>required.`YY` or `YYYY`</p>
                </th>
              </tr>
              <tr>
                <th>security_code</th>
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
                  <p style={desc}>Option, but recomended.</p>
                </th>
              </tr>
              <tr>
                <th>postal_code</th>
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
                  vit works both with '-' and without '-'.
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
                  <p style={desc}>Option, but recomended.ISO 3166.</p>
                </th>
              </tr>
              <tr>
                <th>state</th>
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
                  <p style={desc}>Option, but recomended.</p>
                  <p style={note}>In case of Japan, Is it pref?</p>
                </th>
              </tr>
              <tr>
                <th>city</th>
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
                  <p style={desc}>Option, but recomended.</p>
                  <p style={note}>In case of Japan, Is it city?</p>
                </th>
              </tr>
              <tr>
                <th>street</th>
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
                  <p style={desc}>Option, but recomended.</p>
                  <p style={note}>In case of Japan, Is it like X-X-X?</p>
                </th>
              </tr>
              <tr>
                <th>street2</th>
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
                  <p style={desc}>Option</p>
                  <p style={note}>In case of Japan, Is it condominium name?</p>
                </th>
              </tr>
              <tr>
                <th>phone number</th>
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
                  <p style={desc}>option</p>
                </th>
              </tr>
            </tbody>
          </table>
          <button>Create token</button>
        </form>
        <br />
        <h2>Payment Result</h2>
        <pre>{paymentResult}</pre>
      </div>
    </main>
  );
}
