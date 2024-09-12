"use client"

import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/complete",
      },
    });

    if (error) {
      // handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Contact info</h3>
      <LinkAuthenticationElement
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            email: 'akash@hexerve.com',
          },
        }}
      />
      <h3>Shipping</h3>
      <AddressElement options={{mode: 'shipping', allowedCountries: ['US']}} />
      <h3>Payment</h3>
      <PaymentElement
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            billingDetails: {
              name: 'Akash Sharma',
              phone: '987-346-1234',
            },
          },
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}