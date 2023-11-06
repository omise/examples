import { NextResponse } from "next/server";
import { IOmise } from "omise";
import { getPayment } from "../../../../models";

interface ChargeRetrieveRequest {
  paymentId: String;
}

const omise: IOmise = require("omise")({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: "2015-09-10",
});

export async function GET(
  request: Request,
  { params }: { params: { paymentId: string } }
) {

  const paymentId = params.paymentId

  const objPayment = await getPayment(paymentId)

  // console.log(paymentId)
  // console.log(objPayment)

  try {
    const charge = await omise.charges.retrieve(objPayment?.chageId ?? "");
    console.log(charge);

    // Omise-nodeに型定義がない
    if (charge.captured) {
      return NextResponse.json(charge);
    } else {
      return NextResponse.json(charge, { status: 500 });
    }

  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }  
}  