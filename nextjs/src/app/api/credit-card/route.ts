import { OmiseCreateResponseSuccessful } from "@/@types/omise/omise";
import { NextResponse } from "next/server";
import { IOmise } from "omise";


const omise: IOmise = require("omise")({
  secretKey: process.env.OMISE_SECRET_KEY,
});

interface CreditCardRequest {
  amount: number;
  token: string;
}

export async function POST(request: Request) {
  const req: CreditCardRequest = await request.json();
  try {
    const charge = await omise.charges.create({
      description: new Date().toLocaleString(),
      amount: req.amount,
      currency: "JPY",
      card: req.token,
    });
    if (!charge) {
      return NextResponse.json("unknown error", { status: 500 });
    }

    
    // Omise-nodeに型定義がない
    if (charge.paid) {
      return NextResponse.json(charge);
    } else {
      return NextResponse.json(charge, { status: 500 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
