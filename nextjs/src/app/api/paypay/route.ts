import { NextResponse } from "next/server";
import { IOmise } from "omise";
import axios from "axios";
import { Payment } from "../../../models";
// import db from "../../../../models"
import FormData from 'form-data';
import { apiCharge } from "@/lib/client/api";


const omise: IOmise = require("omise")({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2015-09-10",
});


interface PayPayRequest {
  amount: number;
  returnUri: String;
  paymentId: String;
}

// https://docs.opn.ooo/ja/paypay/japan
export async function POST(request: Request) {
  console.log("aaabbb")
  const req: PayPayRequest = await request.json();
  const params = new FormData()
  params.append('amount', req.amount.toString())
  params.append('currency', 'JPY')
  params.append('source[type]', 'paypay')
  params.append('return_uri', req.returnUri)
  console.log("cccddd")
  console.log(params)

  try {
    
    const res = await apiCharge.post<any>(
      `https://api.omise.co/charges`,params
    )

    console.log(res)

    // chargeidとauthorized_uriを取り出す
    const chargeId = res?.data.id
    const redirectUri = res?.data.authorize_uri

    // dbにpaymentIdとchargeIdを保存しておく
    
    // await db.sequelize.payment.create({
    //   payment_id: req.paymentId,
    //   charge_id: chargeId,
    //   payment_type: "paypay",
      
    // });

    
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
