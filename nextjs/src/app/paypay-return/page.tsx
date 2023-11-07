"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useAPIRetrievCharge } from "@/lib/client/api";

export default function Page() {

  const [chargeId, setChargeId] = useState('')
  const [chargeStatus, setChargeStatus] = useState('')
  const chargeResult = useAPIRetrievCharge();
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id') ?? ""
  // console.log(paymentId);

  useEffect(() => {
    
    (async() => {
      const chargeData = await chargeResult(paymentId)
      setChargeId(chargeData.data.id)
      setChargeStatus(chargeData.data.status)
      // console.log(chargeData)
    })()
  }, []);

  return (
    <main>
      <h1>Paypay return</h1>
      chargeのID:{chargeId}
      <br />
      chargeのStatus:{chargeStatus}
      <br />
    </main>
  );
}  