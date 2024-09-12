import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { amount } = await req.json();
    const stripe = require("stripe")(
      process.env.STRIPE_SECRET_KEY
    );

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
      },
      { status: 200 }
    );

    // res.send({
    //   clientSecret: paymentIntent.client_secret,
    //   // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    //   dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    // });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
