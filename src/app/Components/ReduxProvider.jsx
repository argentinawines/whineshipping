"use client";

import { Provider } from "react-redux";
import { createContext, useContext, useEffect, useState } from "react";
import store  from "../../redux/store.js";
import { loadCartFromStorage, loadAdminFromStorage } from "../../redux/action.js";
import {
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { baseurl } from "../../redux/action.js";

const PayPalConfigContext = createContext("loading");

export function usePayPalConfigStatus() {
  return useContext(PayPalConfigContext);
}

function PayPalConfigLoader({ children }) {
  const [, dispatch] = usePayPalScriptReducer();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    fetch(`${baseurl}/paypal/config`)
      .then(async (response) => {
        const config = await response.json();
        if (!response.ok || !config.clientId) {
          throw new Error("PayPal is not configured.");
        }
        return config;
      })
      .then((config) => {
        if (!active) return;
        dispatch({
          type: "resetOptions",
          value: {
            "client-id": config.clientId,
            currency: "USD",
            intent: "capture",
            components: "buttons",
          },
        });
        setStatus("ready");
      })
      .catch((error) => {
        console.error("Unable to load PayPal configuration:", error);
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [dispatch]);

  return (
    <PayPalConfigContext.Provider value={status}>
      {children}
    </PayPalConfigContext.Provider>
  );
}

export default function ReduxProvider({ children }) {
  useEffect(() => {
    // Cargar estado persistido recién en cliente para evitar hydration mismatch
    store.dispatch(loadCartFromStorage());
    store.dispatch(loadAdminFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          currency: "USD",
          intent: "capture",
          components: "buttons",
        }}
        deferLoading
      >
        <PayPalConfigLoader>{children}</PayPalConfigLoader>
      </PayPalScriptProvider>
    </Provider>
  );
}
