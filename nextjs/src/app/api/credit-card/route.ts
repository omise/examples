import { NextResponse } from "next/server";
import { IOmise } from "omise";
import { Payment } from "../../../models";


const omise: IOmise = require("omise")({
  secretKey: process.env.OMISE_SECRET_KEY,
});

interface CreditCardRequest {
  amount: number;
  token: string;
  returnUri: string;
  paymentId: string;
}

export async function POST(request: Request) {
  const req: CreditCardRequest = await request.json();
  try {
    const charge = await omise.charges.create({
      description: new Date().toLocaleString(),
      amount: req.amount,
      currency: "JPY",
      card: req.token,
      // return_uri: req.returnUri
    });
    if (!charge) {
      return NextResponse.json("unknown error", { status: 500 });
    }


    if (charge.paid) {

      const chargeId = charge.id

      await Payment.create({
        paymentId: req.paymentId,
        chageId: chargeId,
        payment_type: "paypay",
        
      })

      return NextResponse.json(charge);
    } else {
      return NextResponse.json(charge, { status: 500 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
