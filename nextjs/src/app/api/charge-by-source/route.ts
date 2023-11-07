import { OmiseCreateResponseSuccessful } from "@/@types/omise/omise";
import { NextResponse } from "next/server";
// import { IOmise } from "omise";
import { Payment } from "../../../models";
import FormData from 'form-data';
import { apiCharge } from "@/lib/client/api";



// const omise: IOmise = require("omise")({
//   secretKey: process.env.OMISE_SECRET_KEY,
//   omiseVersion: "2015-09-10",
// });

interface ChargePayPayRequest {
  amount: number;
  source: string;
  returnUri: string;
  paymentId: string;
}

export async function POST(request: Request) {
  const req: ChargePayPayRequest = await request.json();
  const params = new FormData()
  params.append('amount', req.amount.toString())
  params.append('currency', 'JPY')
  params.append('source', req.source)
  params.append('return_uri', req.returnUri)
  try {
    // omise-nodeはPayPayの実装が追いついてないようなので、
    // APIを直接callする
    // 
    
    const res = await apiCharge.post<any>(
      `https://api.omise.co/charges`,params
    )

    console.log(res)

    // chargeidとauthorized_uriを取り出す
    const chargeId = res?.data.id
    const redirectUri = res?.data.authorize_uri


    await Payment.create({
      paymentId: req.paymentId,
      chageId: chargeId,
      payment_type: "paypay",
      
    })
    return NextResponse.json({"redirectUri": redirectUri}, { status: 200 });
    // omise-nodeはPayPayの実装が追いついてないようなので、
    // APIを直接callする
    


    // const charge = await omise.charges.create({
    //   description: new Date().toLocaleString(),
    //   amount: req.amount,
    //   currency: "JPY",
    //   source: req.source,
    //   return_uri: req.returnUri
    // });
    // if (!charge) {
    //   return NextResponse.json("unknown error", { status: 500 });
    // }
    // await Payment.create({
    //   paymentId: req.paymentId,
    //   chageId: charge.id,
    //   payment_type: "paypay",
      
    // })
    // return NextResponse.json(charge);

  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
