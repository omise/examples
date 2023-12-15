"use client";

import { FormEvent, useEffect, useState } from "react";
import { loadScript, generateRandomString } from "@/lib/client/util";
import Omise from "@/@types/omise/omise";
import { useRouter } from 'next/navigation'
import { useAPIPayPay, useAPIChargeBySource } from "@/lib/client/api";


export default function Page() {


  const [omise, setOmise] = useState<Omise>();
  // jsロード
  useEffect(() => {
    loadScript("https://cdn.omise.co/omise.js").then((e) => {
      setOmise(window.Omise);
      //Set public key that is from merchant dashboard
      window.Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY);
    });
  }, []);

  const paybyPayPay = useAPIPayPay();  
  const paybyPayPayAnother = useAPIChargeBySource();  
  const router = useRouter()


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const paymentId= generateRandomString(8)
    const returnUri = 'http://localhost:3000/paypay-return?payment_id='+paymentId
    const paypayData = await paybyPayPay(1000, returnUri, paymentId)
    console.log(paypayData)
    router.replace(paypayData.data.redirectUri)
  }  
  async function onSubmitAnother(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const paymentId= generateRandomString(8)
    const returnUri = 'http://localhost:3000/paypay-return?payment_id='+paymentId

    window.Omise.createSource(
      "paypay",
      {
        "amount": 1000,
        "currency": "JPY",
      },
      
      async (_, response) => {
        const res = await paybyPayPayAnother(1000, response.id, returnUri, paymentId)
        console.log(res)
        router.replace(res.data.redirectUri)

        // router.replace(res.data.redirectUri)
      }
    );
  }  
  return (
    <main>
      <h1>Paypay example</h1>
      <form onSubmit={onSubmit}>
      <button>Pay by Paypay(create source and chrage at the same time)</button>  
      </form>
      <hr />
      <form onSubmit={onSubmitAnother}>
      <button>Pay by Paypay(charge that separated, source and charge)</button>  
      </form>
    </main>
  );
}
