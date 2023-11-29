"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import GooglePayButton from '@google-pay/button-react';
import { loadScript, generateRandomString } from "@/lib/client/util";
import { useAPICreditCard } from "@/lib/client/api";
import Omise from "@/@types/omise/omise";



// https://www.omise.co/googlepay
export default function Page() {

  const [omise, setOmise] = useState<Omise>();

  const searchParams = useSearchParams()
  const paramPaymentId = searchParams.get('payment_id') ?? ""
  const paramDone = searchParams.get('done') ?? ""
  const amount = searchParams.get('amount') ?? "100"
  const currencyCode = searchParams.get('currency_code') ?? "JPY"
  const countryCode = searchParams.get('country_code') ?? "JP"
  const router = useRouter()


  // Payment Result
  const creditCard = useAPICreditCard();
  
  // load omise js
  useEffect(() => {
    loadScript("https://cdn.omise.co/omise.js").then((e) => {
      setOmise(window.Omise);
      // set Omise Public key
      window.Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY);
    });
  }, []);


  async function createGoogleCharge(paymentRequest: google.payments.api.PaymentData) {
    omise?.createToken(
      "tokenization",
      {
        method: 'googlepay',
        data: paymentRequest.paymentMethodData.tokenizationData.token,
        billing_name: 'John Doe',
        billing_street1: '1600 Amphitheatre Parkway',
        
      },
      // トークン作成完了
      async (_: any, response: { id: any; }) => {
        
        const paymentId= (paramPaymentId != "") ? paramPaymentId : generateRandomString(8)
        const returnUri = 'http://localhost:3000/charge-return?payment_id='+paymentId
        const res = await creditCard(100, response.id, returnUri, paymentId, currencyCode);
        alert("done Payment");
        // console.log(res.data);
        // console.log(res.data.return_uri);
        // console.log(decodeURI(res.data.return_uri));
        // setPaymentResult(JSON.stringify(res.data, null, "\t"));

        if(paramDone != "" && !paramDone.includes('http')){
          router.replace(paramDone)
        }else{
          router.replace(res.data.return_uri)
        }

      }
    );
  }

  return (
    <main>
      <h1>Google payment example</h1>
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'omise',
                  gatewayMerchantId: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: amount,
            currencyCode: currencyCode,
            countryCode: countryCode,
          },
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('load payment data', paymentRequest);
          createGoogleCharge(paymentRequest);

        }}
        // onClick={ event => {
        //   console.log('event', event);
        // }}
      />
      
    </main>
  );
}
