"use client";

import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const ButtonPaypal = ({ totalValue, handleSubmit }) => {
  const [paymentError, setPaymentError] = useState("");

  const createOrder = (data, actions) => {
    setPaymentError("");

    const amount = Number(totalValue);
    if (!Number.isFinite(amount) || amount <= 0) {
      const message =
        "We could not start the payment because the order total is invalid.";
      setPaymentError(message);
      throw new Error(message);
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toFixed(2),
          },
        },
      ],
    });
  };

  const handleApprove = async (data, actions) => {
    setPaymentError("");

    try {
      const order = await actions.order?.capture();

      if (order?.status !== "COMPLETED") {
        setPaymentError(
          "PayPal could not complete the payment. Please try again."
        );
        return;
      }

      await handleSubmit();
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      setPaymentError(
        "We could not confirm the PayPal payment. Please try again."
      );
    }
  };

  return (
    <div>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={handleApprove}
        onCancel={() =>
          setPaymentError("The PayPal payment was cancelled. No charge was made.")
        }
        onError={(error) => {
          console.error("PayPal payment error:", error);
          setPaymentError(
            "PayPal could not process the payment. Please try again."
          );
        }}
      />
      {paymentError && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {paymentError}
        </p>
      )}
    </div>
  );
};

export default ButtonPaypal;
