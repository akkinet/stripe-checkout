"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements as StripeElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

function Elements({ children }) {
  const [clientSecret, setClientSecret] = useState(null);

  const stripe = loadStripe(
    process.env.STRIPE_PUBLISH_KEY
  );
  
  // Customize the appearance of Elements using the Appearance API.
  const appearance = {
    theme: "stripe",
  };
  
  // Enable the skeleton loader UI for the optimal loading experience.
  const loader = "auto";

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ amount: 100 }),
      });
      const data = await res.json();
      if (data) setClientSecret(data.clientSecret);
    };

    fetchApi();
  }, []);

  if(!clientSecret)
    return <div>Loading...</div>
  
  return (
    <StripeElements stripe={stripe} options={{ clientSecret, appearance, loader }}>
      {children}
    </StripeElements>
  );
}

export default Elements;
