import { NextResponse } from "next/server";
import { Payment } from "../../../models";
import FormData from 'form-data';
import { apiCharge } from "@/lib/client/api";


interface PayPayRequest {
  amount: number;
  returnUri: String;
  paymentId: String;
}

// https://docs.opn.ooo/ja/paypay/japan
export async function POST(request: Request) {
  const req: PayPayRequest = await request.json();
  const params = new FormData()
  params.append('amount', req.amount.toString())
  params.append('currency', 'JPY')
  params.append('source[type]', 'paypay')
  params.append('return_uri', req.returnUri)

  try {
    
    const res = await apiCharge.post<any>(
      `https://api.omise.co/charges`,params
    )


    // Set chargeId and authorized_uri
    const chargeId = res?.data.id
    const redirectUri = res?.data.authorize_uri

    await Payment.create({
      paymentId: req.paymentId,
      chageId: chargeId,
      payment_type: "paypay",
      
    })

    
    return NextResponse.json({"redirectUri": redirectUri}, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
  
}
