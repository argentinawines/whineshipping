"use client";

import React, { useRef, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { baseurl } from "../../redux/action.js";
import { usePayPalConfigStatus } from "./ReduxProvider.jsx";

async function readApiResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || "PAYPAL_REQUEST_FAILED");
    error.status = response.status;
    throw error;
  }
  return data;
}

const ButtonPaypal = ({ checkoutData, onSuccess }) => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  const configStatus = usePayPalConfigStatus();
  const localOrderId = useRef(null);
  const [paymentError, setPaymentError] = useState("");

  const createOrder = async () => {
    setPaymentError("");
    try {
      const response = await fetch(`${baseurl}/paypal/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutData),
      });
      const order = await readApiResponse(response);
      localOrderId.current = order.localOrderId;
      return order.orderId;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setPaymentError(
        "We could not start the payment. Please review your cart and delivery details."
      );
      throw error;
    }
  };

  const handleApprove = async (data, actions) => {
    setPaymentError("");

    try {
      const response = await fetch(
        `${baseurl}/paypal/orders/${encodeURIComponent(data.orderID)}/capture`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ localOrderId: localOrderId.current }),
        }
      );
      const capture = await readApiResponse(response);

      if (capture.status !== "COMPLETED") {
        throw new Error("PAYMENT_NOT_COMPLETED");
      }

      await onSuccess(capture);
    } catch (error) {
      if (error.message === "INSTRUMENT_DECLINED" && actions?.restart) {
        return actions.restart();
      }
      console.error("Error capturing PayPal payment:", error);
      setPaymentError(
        "We could not confirm the payment. If PayPal shows a charge, contact us before trying again."
      );
    }
  };

  if (configStatus === "loading" || isPending) {
    return <p className="mt-3 text-sm text-gray-600">Loading secure payment…</p>;
  }

  if (configStatus === "error" || isRejected) {
    return (
      <p className="mt-3 text-sm text-red-600" role="alert">
        PayPal is temporarily unavailable. Please try again later.
      </p>
    );
  }

  return (
    <div>
      <PayPalButtons
        forceReRender={[checkoutData]}
        createOrder={createOrder}
        onApprove={handleApprove}
        onCancel={() =>
          setPaymentError("The PayPal payment was cancelled. No charge was made.")
        }
        onError={(error) => {
          console.error("PayPal payment error:", error);
          setPaymentError("PayPal could not process the payment. Please try again.");
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
